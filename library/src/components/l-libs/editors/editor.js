import L from 'leaflet'
import ShapeEditor from './shapeEditor'
import MarkerEditor from './markerEditor'
import AnnotationEditor from './annotationEditor' 
export default class Editor{
  constructor(containerId, client){
    this.containerId = containerId;
    this._client = client
  }
  edit(layer, options){
		var shape;
		if(layer.options['type'] == "annotation"){
			  shape = new AnnotationEditor(this._client, layer, {containerId: this.containerId, ...options })
		}else{
			if( layer instanceof L.Marker ){
				shape = new MarkerEditor(this._client, layer, {containerId: this.containerId, ...options }); 
			}else{
        shape = new ShapeEditor(this._client, layer, {containerId: this.containerId, ...options });
			}
		}
		return shape;
	}
}
