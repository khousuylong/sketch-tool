import React from 'react';
import ReactDOM from 'react-dom'; 
import L from 'leaflet'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {EDIT_GEOJSON} from '../../queries/pluginQuery'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import PubSub from 'pubsub-js'
import Button from '@material-ui/core/Button';
import { green, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  },
});

const useStyles = makeStyles({
  smallThumb: {
    border: '3px solid #ECECEC',
    cursor: 'pointer',
    borderRadius: '3px',
    margin: '0 3px 3px 0',
    padding: '2px 10px',
    float: 'left',
    transition: 'all 0.06s',
    '&:hover': {
      border: '3px solid #B1AFAF'
    }
  },
});

const markers = ["default-marker.png", "pin-2.png", "pin-3.png", "pin-4.png", "pin-5.png", "pin-6.png", "pin-7.png", "pin-8.png", "pin-9.png", "pin-10.png", "pin-11.png", "pin-12.png", "pin-13.png", "pin-14.png", "pin-15.png", "pin-16.png", "pin-17.png", "pin-18.png", "pin-19.png", "pin-20.png"]; 

const MarkerEditor = class{
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

  _updateMarker(icon) {
		var customIcon = L.icon({
			iconUrl: `//mangomap.com/assets/pushpin_symbols/${icon}`,
			iconSize:     [25, 41], 
			iconAnchor:   [12, 41]
		});

		this._layer.setIcon(customIcon);
	}

  _handleChange(icon){
    this._updateMarker(icon)
  }

  _renderForm(){
    const {containerId} = this._options;
    const RenderIcon = props => {
      const classes = useStyles() 
      return(<div onClick={()=> this._handleChange(props.icon) } className={classes.smallThumb}><img src={`//mangomap.com/assets/pushpin_symbols/${props.icon}`} /></div>)
    }
    const App = () => (  
      <div ref={this._myAppRef}>
        <Typography variant="subtitle2" gutterBottom>
          Stroke
        </Typography> 
        {
          markers.map(marker=>{
            console.log('this is marker', marker)
            return(<div style={{float: 'left'}} key={marker}>
              <RenderIcon icon={marker} />
            </div>)
          })
        }
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

export default MarkerEditor
