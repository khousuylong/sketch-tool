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
import TextField from '@material-ui/core/TextField';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  },
});

const AnnotationEditor = class{
  constructor(client, layer, options){
    this._map = window._mapRef;
    this._options = options;
    this._apolloClient = client;
		this._layer = layer;
		this._callBack = options.callBack;

    if( !this._layer['options']['annotation'] ) this._layer['options']['annotation'] = {content: "content here"};

    this._editAnnotation();

    if( options.open ) this.open();

		this._initEvents();
  }

  _editAnnotation() {
		var self = this;

		this._popup = new L.Popup({closeOnClick: false, closeButton: false, minWidth: 50 ,maxWidth: 500, maxHeight: 500});

		this._popup.setContent('<div class="redactor-output">' + this._layer['options']['annotation']['content'] + '</div>')
		.setLatLng( this._layer.getLatLng() )
		.addTo(this._map);

    L.DomEvent.addListener(this._popup.getElement(), 'click', function(e){
      if(!window._sketchEditing){
        self.open();
        window._sketchEditing = true;
      }
			L.DomEvent.stop(e);
    }, this);


    this._layer.on('remove', function() {
			self._map.removeLayer(self._popup);
		});
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
    this._cancel(); 
    this._options.done();
  }

  _cancel(){
    this._draggable.disable();
    this._updateQueryCache(false);
    window._sketchEditing = false;
		this._layer.editing.disable();
    this._popup._container.style.cursor = "auto";
  }

  _renderForm(){
    const {containerId} = this._options;
    const App = () => (  
      <div ref={this._myAppRef}>
        <div>
          <TextField
            onChange={e => this._updateText(e.target.value) }
            id="outlined-textarea"
            defaultValue={this._layer['options']['annotation'].content}
            label="Annotation"
            placeholder="Placeholder"
            multiline
            variant="outlined"
          />
        </div>
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

  _updateText(value) {
		this._layer['options']['annotation'] = {
			'content': value 
		};
		this._popup.setContent(`<div class="redactor-output">${value}</div>`);
	}

  _enableEdit() {
		var pos = this._map.latLngToLayerPoint(this._popup._latlng);
		L.DomUtil.setPosition(this._popup._wrapper.parentNode, pos);

		this._draggable = new L.Draggable(this._popup._container, this._popup._wrapper);
		this._draggable.enable();

		const self = this;
		this._draggable.on('dragend', function(e) {
			var latlng = self._map.layerPointToLatLng(e.target._newPos);
			self._popup.setLatLng(latlng);
			self._layer.setLatLng(latlng);
		});
    this._popup._container.style.cursor = "move";
	}

  open() {
		this._callBack();
		this._initShapeEditControl();
    this._enableEdit()
	}
}

export default AnnotationEditor
