import { PropTypes } from 'prop-types';
import Draw from 'leaflet-draw'; // eslint-disable-line
import isEqual from 'lodash-es/isEqual';
import L from 'leaflet'
import { MapControl, withLeaflet } from 'react-leaflet';
import leaflet, { Map, Control } from 'leaflet';

const eventHandlers = {
  onEdited: 'draw:edited',
  onDrawStart: 'draw:drawstart',
  onDrawStop: 'draw:drawstop',
  onDrawVertex: 'draw:drawvertex',
  onEditStart: 'draw:editstart',
  onEditMove: 'draw:editmove',
  onEditResize: 'draw:editresize',
  onEditVertex: 'draw:editvertex',
  onEditStop: 'draw:editstop',
  onDeleted: 'draw:deleted',
  onDeleteStart: 'draw:deletestart',
  onDeleteStop: 'draw:deletestop',
};

L.Draw.InvisibleMarker = L.Draw.Marker.extend({

	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);

		if (this._map) {

			if(!this._mouseAnnotation){
				this._mouseAnnotation = L.popup().setContent('this is content').setLatLng(this._map.getCenter());
			}
			this._mouseAnnotation.addTo(this._map);

			if (!this._mouseMarker) {
				this._mouseMarker = L.marker(this._map.getCenter(), {
					icon: L.divIcon({
						className: 'leaflet-mouse-marker',
						iconAnchor: [20, 20],
						iconSize: [40, 40]
					}),
					opacity: 0,
					zIndexOffset: this.options.zIndexOffset
				});
			}
			
			this._mouseMarker
				.on('click', this._onClick, this)
				.addTo(this._map);

			this._map.on('mousemove', this._onMouseMove, this);
			this._map.on('click', this._onTouch, this);
		}
	},

	// @method removeHooks(): void
	// Remove listener hooks from this handler.
	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);

		if (this._map) {
			this._map.removeLayer(this._mouseAnnotation);
			delete this._mouseAnnotation;
			this._map.off('mousemove', this._onMouseMove, this);
			this._map.off('click', this._onTouch, this);

			this._mouseMarker.off('click', this._onClick, this);
			this._map.removeLayer(this._mouseMarker);
			delete this._mouseMarker;
		}
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng;
		this._mouseMarker.setLatLng(latlng);
		this._mouseAnnotation.setLatLng(latlng);
	},

	_onClick: function () {
		this._fireCreatedEvent();
		this.disable();
	},

	_fireCreatedEvent: function () {
		var icon = L.icon({
			iconUrl: '/assets/1PX0.png',
			shadowUrl: '',
			iconSize:     [0, 0],
			shadowSize:   [0, 0], 
			iconAnchor:   [0, 0], 
			shadowAnchor: [0, 0], 
			popupAnchor:  [1, 1]
		});

		var marker = new L.Marker.Touch(this._mouseAnnotation.getLatLng(), { icon: icon, type: 'annotation' });
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, marker);
	}
});



L.CustomDrawToolbar = L.DrawToolbar.extend({
	// @method getModeHandlers(): object
	// Get mode handlers information
	getModeHandlers: function (map) {
		var annotation = new L.Draw.InvisibleMarker(map, this.options.marker);
		annotation.type = "annotation";

		return [
			{
				enabled: this.options.polyline,
				handler: new L.Draw.Polyline(map, this.options.polyline),
				title: L.drawLocal.draw.toolbar.buttons.polyline
			},
			{
				enabled: this.options.polygon,
				handler: new L.Draw.Polygon(map, this.options.polygon),
				title: L.drawLocal.draw.toolbar.buttons.polygon
			},
			{
				enabled: this.options.rectangle,
				handler: new L.Draw.Rectangle(map, this.options.rectangle),
				title: L.drawLocal.draw.toolbar.buttons.rectangle
			},
			{
				enabled: this.options.circle,
				handler: new L.Draw.Circle(map, this.options.circle),
				title: L.drawLocal.draw.toolbar.buttons.circle
			},
			{
				enabled: this.options.marker,
				handler: new L.Draw.Marker(map),
				title: L.drawLocal.draw.toolbar.buttons.marker
			},
			{
				enabled: this.options.marker,
				handler: annotation,
				title: '' 
			},
		];
	},

	addToolbar: function(map) {
		var container = L.DrawToolbar.prototype.addToolbar.call(this, map);

		container.removeChild(this._actionsContainer);

		return container;
	}
});

L.Control.CustomDraw = L.Control.Draw.extend({

	initialize: function (options) {
		if (L.version < '0.7') {
			throw new Error('Leaflet.draw 0.2.3+ requires Leaflet 0.7.0+. Download latest from https://github.com/Leaflet/Leaflet/');
		}

		L.Control.prototype.initialize.call(this, options);

		var toolbar;

		this._toolbars = {};

		// Initialize toolbars
		if (L.DrawToolbar && this.options.draw) {
			toolbar = new L.CustomDrawToolbar(this.options.draw);

			this._toolbars[L.DrawToolbar.TYPE] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[L.DrawToolbar.TYPE].on('enable', this._toolbarEnabled, this);
		}

		if (L.EditToolbar && this.options.edit) {
			toolbar = new L.EditToolbar(this.options.edit);

			this._toolbars[L.EditToolbar.TYPE] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[L.EditToolbar.TYPE].on('enable', this._toolbarEnabled, this);
		}
		L.toolbar = this; //set global var for editing the toolbar
	},

	// Options
	options: {
		position: 'topleft',
		draw: {},
		edit: false
	},

	// @method onAdd(): container
	// Adds the toolbar container to the map
	onAdd: function (map) {
		var container = L.DomUtil.create('div', 'leaflet-draw'),
			addedTopClass = false,
			topClassName = 'leaflet-draw-toolbar-horizontal',
			toolbarContainer;

		for (var toolbarId in this._toolbars) {
			if (this._toolbars.hasOwnProperty(toolbarId)) {
				toolbarContainer = this._toolbars[toolbarId].addToolbar(map);

				if (toolbarContainer) {

					
					// Add class to the first toolbar to remove the margin
					if (!addedTopClass) {
						if (!L.DomUtil.hasClass(toolbarContainer, topClassName)) {
							L.DomUtil.addClass(toolbarContainer.childNodes[0], topClassName);
						}
						addedTopClass = true;
					}

					container.appendChild(toolbarContainer);
				}
			}
		}

		return container;
	}
});


class EditControl extends MapControl {
  static propTypes = {
    ...Object.keys(eventHandlers).reduce((acc, val) => {
      acc[val] = PropTypes.func;
      return acc;
    }, {}),
    onCreated: PropTypes.func,
    onMounted: PropTypes.func,
    draw: PropTypes.shape({
      polyline: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      polygon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      rectangle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      circle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      marker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    }),
    edit: PropTypes.shape({
      edit: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      remove: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      poly: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      allowIntersection: PropTypes.bool,
    }),
    position: PropTypes.oneOf([
      'topright',
      'topleft',
      'bottomright',
      'bottomleft'
    ]),
    leaflet: PropTypes.shape({
      map: PropTypes.instanceOf(Map),
      layerContainer: PropTypes.shape({
        addLayer: PropTypes.func.isRequired,
        removeLayer: PropTypes.func.isRequired
      })
    })
  };

  createLeafletElement(props) {
    return createDrawElement(props);
  }

  onDrawCreate = (e) => {
    const { onCreated } = this.props;
    const { layerContainer } = this.props.leaflet;

    layerContainer.addLayer(e.layer);
    onCreated && onCreated(e);
  };

  componentDidMount() {
    super.componentDidMount();
    const { map } = this.props.leaflet;
    const { onMounted } = this.props;

    for (var key in eventHandlers) {
      map.on(eventHandlers[key], (evt) => {
        let handlers = Object.keys(eventHandlers).filter(handler => eventHandlers[handler] == evt.type)
        if (handlers.length == 1) {
          let handler = handlers[0]
          this.props[handler] && this.props[handler](evt)
        }
      });
    }

    map.on(leaflet.Draw.Event.CREATED, this.onDrawCreate);

    onMounted && onMounted(this.leafletElement);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    const { map } = this.props.leaflet;

    map.off(leaflet.Draw.Event.CREATED, this.onDrawCreate);

    for (const key in eventHandlers) {
      if (this.props[key]) {
        map.off(eventHandlers[key], this.props[key]);
      }
    }
  }

  componentDidUpdate(prevProps) {
    // super updates positions if thats all that changed so call this first
    super.componentDidUpdate(prevProps);

    if (isEqual(this.props.draw, prevProps.draw) || this.props.position !== prevProps.position) {
      return false;
    }

    const { map } = this.props.leaflet;

    this.leafletElement.remove(map);
    this.leafletElement = createDrawElement(this.props);
    this.leafletElement.addTo(map);

    return null;
  }
}

function createDrawElement(props) {
  const { layerContainer } = props.leaflet;
  const { draw, edit, position } = props;
  const options = {
    edit: {
      ...edit,
      featureGroup: layerContainer
    }
  };

  if (draw) {
    options.draw = { ...draw };
  }

  if (position) {
    options.position = position;
  }

  return new L.Control.CustomDraw(options);
}

export default withLeaflet(EditControl);
