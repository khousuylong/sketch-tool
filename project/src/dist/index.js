import React, { memo } from 'react';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import 'pubsub-js';
import { UPDATE_PLUGIN_SETTING_MUTATION, PLUGIN_STORAGES_QUERY, UPDATE_PLUGIN_STORAGE_MUTATION, DELETE_PLUGIN_STORAGE_MUTATION, CREATE_PLUGIN_STORAGE_MUTATION } from 'plugin-storage';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { v4 } from 'uuid';
import gql from 'graphql-tag';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var AdminSetting = function AdminSetting(props) {
  var _React$useState = React.useState('metric'),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selectedValue = _React$useState2[0],
      setSelectedValue = _React$useState2[1];

  var handleChange = function handleChange(event) {
    setSelectedValue(event.target.value);
  };

  var Form = function Form() {
    var _useMutation = useMutation(UPDATE_PLUGIN_SETTING_MUTATION),
        _useMutation2 = _slicedToArray(_useMutation, 1),
        saveSetting = _useMutation2[0];

    var saveMe = function saveMe(event) {
      var payload = {
        metrix: selectedValue
      };
      var data = saveSetting({
        variables: {
          id: props.settingId,
          setting: JSON.stringify(payload)
        }
      });
      console.log('save me', payload);
    };

    return /*#__PURE__*/React.createElement(FormControl, {
      component: "fieldset"
    }, /*#__PURE__*/React.createElement(FormLabel, {
      component: "legend"
    }, "Unit of Measurement"), /*#__PURE__*/React.createElement(RadioGroup, {
      defaultValue: "metric",
      "aria-label": "gender",
      name: "customized-radios"
    }, /*#__PURE__*/React.createElement(FormControlLabel, {
      value: "metric",
      control: /*#__PURE__*/React.createElement(Radio, {
        checked: selectedValue === 'metric',
        onChange: handleChange,
        value: "metric",
        color: "default",
        name: "radio-button-demo",
        inputProps: {
          'aria-label': 'Metric'
        }
      }),
      label: "Kilometers / Hectares / Meters"
    }), /*#__PURE__*/React.createElement(FormControlLabel, {
      value: "imperial",
      control: /*#__PURE__*/React.createElement(Radio, {
        checked: selectedValue === 'imperial',
        onChange: handleChange,
        value: "imperial",
        color: "default",
        name: "radio-button-demo",
        inputProps: {
          'aria-label': 'Imperial'
        }
      }),
      label: "Miles / Acres / Feet"
    })), /*#__PURE__*/React.createElement(Button, {
      onClick: saveMe,
      type: "submit",
      variant: "outlined",
      color: "primary"
    }, "Save"));
  };

  return /*#__PURE__*/React.createElement(ApolloProvider, {
    client: props.client
  }, /*#__PURE__*/React.createElement(Form, null));
};

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query IsSketchOpened {\n    isSketchOpened @client\n    sketchId @client\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var OPEN_SKETCH = gql(_templateObject());

var Sketch = /*#__PURE__*/memo(function (props) {
  var _props$client$readQue = props.client.readQuery({
    query: PLUGIN_STORAGES_QUERY,
    variables: {
      pluginId: props.data.pluginId
    }
  }),
      pluginStorages = _props$client$readQue.pluginStorages;

  var _useMutation = useMutation(UPDATE_PLUGIN_STORAGE_MUTATION),
      _useMutation2 = _slicedToArray(_useMutation, 2),
      updateStorage = _useMutation2[0],
      data = _useMutation2[1].data;

  var json = JSON.parse(props.data.json);
  var timer = null;

  var handleTextChange = function handleTextChange(evt) {
    var value = evt.target.value;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      json['name'] = value;
      updateStorage({
        variables: {
          id: props.data.id,
          json: JSON.stringify(json)
        }
      });
    }, 500);
  };

  var DeleteSketch = function DeleteSketch() {
    var _useMutation3 = useMutation(DELETE_PLUGIN_STORAGE_MUTATION),
        _useMutation4 = _slicedToArray(_useMutation3, 2),
        deleteSketch = _useMutation4[0],
        data = _useMutation4[1].data;

    if (data) {
      props.client.writeQuery({
        query: PLUGIN_STORAGES_QUERY,
        variables: {
          pluginId: props.data.pluginId
        },
        data: {
          pluginStorages: pluginStorages.filter(function (storage) {
            return storage.id !== data.deletePluginStorage.id;
          })
        }
      });
    }

    return /*#__PURE__*/React.createElement(Button, {
      variant: "contained",
      onClick: function onClick() {
        deleteSketch({
          variables: {
            id: props.data.id
          }
        });
      }
    }, "Delete Sketch");
  };

  var handleChanges = function handleChanges(panel) {
    return function (evt, expanded) {
      props.onChange(panel, expanded);
      props.client.cache.writeQuery({
        query: OPEN_SKETCH,
        data: {
          isSketchOpened: expanded,
          sketchId: props.data.id
        }
      });
    };
  };

  return /*#__PURE__*/React.createElement(Accordion, {
    expanded: props.expanded === props.data.id,
    onChange: handleChanges(props.data.id)
  }, /*#__PURE__*/React.createElement(AccordionSummary, {
    expandIcon: /*#__PURE__*/React.createElement(ExpandMoreIcon, null),
    "aria-label": "Expand",
    "aria-controls": "additional-actions1-content",
    id: "additional-actions1-header"
  }, /*#__PURE__*/React.createElement(TextField, {
    onClick: function onClick(event) {
      return event.stopPropagation();
    },
    onFocus: function onFocus(event) {
      return event.stopPropagation();
    },
    id: "standard-full-width",
    style: {
      margin: 8
    },
    onChange: handleTextChange,
    defaultValue: json.name,
    placeholder: "Placeholder",
    fullWidth: true,
    margin: "normal",
    InputLabelProps: {
      shrink: true
    }
  })), /*#__PURE__*/React.createElement(AccordionDetails, null, /*#__PURE__*/React.createElement(DeleteSketch, null)));
});

var useStyles = makeStyles({
  centerItem: {
    display: 'flex',
    padding: 15,
    justifyContent: 'center'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    width: '100%'
  }
});
function ActionsInAccordionSummary(props) {
  var classes = useStyles();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      expanded = _React$useState2[0],
      setExpanded = _React$useState2[1];

  var handleChange = function handleChange(panel, isExpanded) {
    setExpanded(isExpanded ? panel : false);
  };

  var pluginStorages;

  var RenderSketches = function RenderSketches() {
    var _useQuery = useQuery(PLUGIN_STORAGES_QUERY, {
      variables: {
        pluginId: props.pluginId
      }
    }),
        data = _useQuery.data;

    if (data) {
      pluginStorages = data.pluginStorages;
      return /*#__PURE__*/React.createElement(Paper, {
        style: {
          overflow: 'auto'
        }
      }, data.pluginStorages.map(function (storage) {
        return /*#__PURE__*/React.createElement(Sketch, {
          expanded: expanded,
          onChange: handleChange,
          client: props.client,
          key: storage.id,
          data: storage
        });
      }));
    }

    return null;
  };

  var NewSketch = function NewSketch() {
    var _useMutation = useMutation(CREATE_PLUGIN_STORAGE_MUTATION),
        _useMutation2 = _slicedToArray(_useMutation, 2),
        createStorage = _useMutation2[0],
        data = _useMutation2[1].data;

    if (data) {
      props.client.writeQuery({
        query: PLUGIN_STORAGES_QUERY,
        variables: {
          pluginId: props.pluginId
        },
        data: {
          pluginStorages: [].concat(_toConsumableArray(pluginStorages), [data.createPluginStorage])
        }
      });
    }

    return /*#__PURE__*/React.createElement(Button, {
      variant: "contained",
      onClick: function onClick() {
        var jsonPayload = {
          'name': 'Untitled sketch',
          'description': '',
          'geoJson': ''
        };
        createStorage({
          variables: {
            input: {
              id: v4(),
              pluginId: props.pluginId,
              json: JSON.stringify(jsonPayload)
            }
          }
        });
      }
    }, "Create sketch");
  };

  return /*#__PURE__*/React.createElement(ApolloProvider, {
    client: props.client
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.centerItem
  }, /*#__PURE__*/React.createElement(NewSketch, null)), /*#__PURE__*/React.createElement(RenderSketches, null)));
}

var GeoJsonLayer = /*#__PURE__*/memo(function (props) {
  var fgRef = props.fgRef,
      data = props.data;

  var _rendreGeoJsonLayer = function _rendreGeoJsonLayer(storage) {
    var json = JSON.parse(storage.json);
    if (!json.geoJson) return;
    json.geoJson.map(function (geojson) {
      var geojsonLayer = L.geoJson(geojson['geojson'], {
        style: geojson['options']
        /*
        pointToLayer: function(feature, latlng) {
          if (feature.properties.radius) {
            return new L.Circle(latlng, feature.properties.radius);
          }
          if( geojson['options']['type'] === "annotation"){
            var icon = L.icon({
              iconUrl: '',
              shadowUrl: '',
              iconSize:     [0, 0],
              shadowSize:   [0, 0], 
              iconAnchor:   [0, 0], 
              shadowAnchor: [0, 0], 
              popupAnchor:  [1, 1]
            });
            return L.marker(latlng, { icon: icon, type: 'annotation', annotation: geojson['options']['annotation']});
          }
          return L.marker(latlng, {icon: L.icon({
            iconUrl: geojson['options']['icon']['options']['iconUrl'],
            iconSize:     [25, 41], 
            iconAnchor:   [12, 41]
          })});
        }
        */

      });
      geojsonLayer.eachLayer(function (layer) {
        if (fgRef) fgRef.addLayer(layer);
      });
    });
  };

  var onCreated = function onCreated(e) {
    var geoJsons = [];
    fgRef.getLayers().map(function (layer) {
      var geoJSON = layer.toGeoJSON();

      if (layer instanceof L.Circle) {
        geoJSON['properties']['radius'] = layer.getRadius();
        geoJSON['properties']['type'] = "circle";
      }

      geoJsons.push({
        options: layer['options'],
        geojson: geoJSON
      });
    });
    var json = JSON.parse(data.json);
    json['geoJson'] = geoJsons;
    var payload = {
      id: data.id,
      json: JSON.stringify(json)
    };
    props.onUpdated(payload);
  };

  if (fgRef) {
    fgRef.clearLayers();

    if (props.expanded) {
      _rendreGeoJsonLayer(props.data);

      return /*#__PURE__*/React.createElement(EditControl, {
        onCreated: onCreated,
        position: "topright",
        draw: {}
      });
    }
  }
});

var FGroup = /*#__PURE__*/function (_React$Component) {
  _inherits(FGroup, _React$Component);

  var _super = _createSuper(FGroup);

  function FGroup() {
    _classCallCheck(this, FGroup);

    return _super.apply(this, arguments);
  }

  _createClass(FGroup, [{
    key: "render",
    value: function render() {
      var _this = this;

      var RenderEditControl = function RenderEditControl() {
        var _useQuery = useQuery(OPEN_SKETCH),
            data = _useQuery.data;

        if (data) {
          // && data.isSketchOpened){
          var activeStorage = _this.props.storages.find(function (storage) {
            return storage.id === data.sketchId;
          });

          return /*#__PURE__*/React.createElement(GeoJsonLayer, {
            onUpdated: _this.props.onUpdated,
            expanded: data.isSketchOpened,
            data: activeStorage,
            fgRef: _this._fGref
          });
        }

        return null;
      };

      return /*#__PURE__*/React.createElement(FeatureGroup, {
        ref: function ref(reactFGref) {
          if (reactFGref) _this._fGref = reactFGref.leafletElement;
        }
      }, /*#__PURE__*/React.createElement(RenderEditControl, null));
    }
  }]);

  return FGroup;
}(React.Component);

var SketchTool = /*#__PURE__*/memo(function (props) {
  var RenderFGroup = function RenderFGroup() {
    var _useMutation = useMutation(UPDATE_PLUGIN_STORAGE_MUTATION),
        _useMutation2 = _slicedToArray(_useMutation, 1),
        updateStorage = _useMutation2[0];

    var _useQuery = useQuery(PLUGIN_STORAGES_QUERY, {
      variables: {
        pluginId: props.pluginId
      }
    }),
        data = _useQuery.data;

    var handleUpdate = function handleUpdate(payload) {
      updateStorage({
        variables: payload
      });
    };

    if (data) {
      console.log('this is data', data);
      return /*#__PURE__*/React.createElement(FGroup, {
        onUpdated: handleUpdate,
        client: props.client,
        pluginId: props.pluginId,
        storages: data.pluginStorages
      });
    }

    return null;
  };

  return /*#__PURE__*/React.createElement(ApolloProvider, {
    client: props.client
  }, /*#__PURE__*/React.createElement(RenderFGroup, null));
});

export { AdminSetting, ActionsInAccordionSummary as Client, SketchTool };
