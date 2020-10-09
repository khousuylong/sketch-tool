import React from 'react';
import ReactDOM from 'react-dom'; 
import L from 'leaflet'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ColorPickerPanel from './commons/colorPickerPanel'
import {EDIT_GEOJSON} from '../../queries/pluginQuery'
import FeildInput from './commons/feildInput'
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import PubSub from 'pubsub-js'
import Button from '@material-ui/core/Button';
import { green, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  },
});

const ShapeEditor = class{
  constructor(client, layer, options){
    this._options = options;
    this._apolloClient = client;
		this._layer = layer;
		this._callBack = options.callBack;
		this._initEvents();
  }

	_initEvents() {
		const self  = this;
		this._layer.on('click', function(e) {
      if(!window._sketchEditing){
        self.open();
        window._sketchEditing = true;
      }
			L.DomEvent.stop(e);
		});
	}

  _updateQueryCache(isEditing){
    this._apolloClient.cache.writeQuery({
      query: EDIT_GEOJSON,
      data: {
        isEditingGeoJson: isEditing
      },
    });
  }

  _done(){
    this._updateQueryCache(false);
    window._sketchEditing = false;
    this._options.done();
  }

  _cancel(){
    this._updateQueryCache(false);
    window._sketchEditing = false;
		this._layer.editing.disable();
  }

  _renderForm(){
    const {containerId} = this._options;
    const App = () => (  
      <div ref={this._myAppRef}>
        <Typography variant="subtitle2" gutterBottom>
          Stroke
        </Typography> 
        <ColorPickerPanel testId='' onChange={color=>this._layer.setStyle({color})} title='Color' description="" color={this._layer.options['color']}/> 
        <FeildInput onChange={weight=>this._layer.setStyle({weight})} size={this._layer.options['weight']} label="Width" type="number"/>
        <FeildInput onChange={opacity=>this._layer.setStyle({opacity})} size={this._layer.options['opacity']} label="Opacity" type="number"/>
        <Divider style={{marginTop: 10, marginBottom: 10}} />
        <Typography variant="subtitle2" gutterBottom>
          Fill
        </Typography> 
        <ColorPickerPanel testId='' onChange={fillColor=>this._layer.setStyle({fillColor})} title='Color' description="" color={this._layer.options['fillColor']}/> 
        <FeildInput onChange={fillOpacity=>this._layer.setStyle({fillOpacity})} size={this._layer.options['fillOpacity']} label="Opacity" type="number"/>
        <div style={{marginTop: 10, float: 'right'}}>
          <ThemeProvider theme={theme}>
            <Button onClick={()=>this._cancel()} style={{color: '#fff', fontWeight: 'bold'}} variant="contained" color="secondary">
              Cancel
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button onClick={() => this._done()} style={{color: '#fff', fontWeight: 'bold', marginLeft: 5}} variant="contained" color="primary">
              Done
            </Button>
          </ThemeProvider>
        </div>
      </div>
    );
    ReactDOM.render(<App />, document.getElementById(containerId)); 
  }
  

  _initShapeEditControl(){
    const self = this;
    PubSub.subscribe("style-editor-container-ready", function (msg, data) {
      self._renderForm();
    });
    this._updateQueryCache(true);
  }

  open() {
		this._callBack();
		this._layer.editing.enable();
		this._initShapeEditControl();
	}
}

export default ShapeEditor
