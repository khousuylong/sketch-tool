import L from 'leaflet'
import ShapeEditor from './shapeEditor'
export default class Editor{
  constructor(container, client){
    this.container = container;
    this._client = client
  }
  edit(layer, options){
		var shape;
    /*
		if(options['type'] == "annotation"){
      console.log('annotation')
		//	shape = MangoGis.init("MangoGis.bookmark.sketch.sketchList.EditAnnotation", this._parentContainer, layer, callback);
		}else{
    */

			if( layer instanceof L.Marker ){
        console.log('marker')
				//shape = MangoGis.init("MangoGis.bookmark.sketch.sketchList.EditMarker", this._parentContainer, layer, callback);
			}else{
        shape = new ShapeEditor(this._client, layer, {container: this.container, ...options });
			}
		//}
    /*
		MangoGis.Event.bind(shape, "shape-updated", this, function() {
			this._done();					
		});
		MangoGis.Event.bind(shape, "remove-sketch", this, function(layer) {
			this._removeSketch(layer)
		});
		MangoGis.Event.bind(shape, "shape-clicked", this, function(layer) {
			MangoGis.Event.trigger(this, "shape-clicked");
		});
    */
		return shape;
	}

	_done() {
		//MangoGis.Event.trigger(this, "shape-updated");
	}

	_removeSketch(layer) {
		//MangoGis.Event.trigger(this, "remove-sketch", layer);
	}
}
