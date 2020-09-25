import React from 'react';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import PubSub from 'pubsub-js';
import { UPDATE_PLUGIN_SETTING_MUTATION as UPDATE_PLUGIN_SETTING_MUTATION$1, PLUGIN_STORAGES_QUERY, CREATE_PLUGIN_STORAGE_MUTATION } from 'plugin-storage';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { v4 } from 'uuid';
import { withLeaflet } from 'react-leaflet';
import MeasureControlDefault from 'react-leaflet-measure';
import gql from 'graphql-tag';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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
    var _useMutation = useMutation(UPDATE_PLUGIN_SETTING_MUTATION$1),
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
  var pluginStorages;

  var _React$useState = React.useState({
    createNew: false
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];
  /*
  const createNewSketch = () => {
    setState({ ...state, createNew: true });
  }
  */


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
        var json = JSON.parse(storage.json);
        return /*#__PURE__*/React.createElement(Accordion, {
          key: storage.id
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
          value: json.name,
          placeholder: "Placeholder",
          fullWidth: true,
          margin: "normal",
          InputLabelProps: {
            shrink: true
          }
        })), /*#__PURE__*/React.createElement(AccordionDetails, null, /*#__PURE__*/React.createElement(Typography, {
          color: "textSecondary"
        }, "The click event of the nested action will propagate up and expand the accordion unless you explicitly stop it.")));
      }));
    }

    return null;
  };

  var NewSketch = function NewSketch() {
    var _useMutation = useMutation(CREATE_PLUGIN_STORAGE_MUTATION),
        _useMutation2 = _slicedToArray(_useMutation, 2),
        createStorage = _useMutation2[0],
        data = _useMutation2[1].data;

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
          },
          refetchQueries: [{
            query: PLUGIN_STORAGES_QUERY,
            variables: {
              pluginId: props.pluginId
            }
          }]
        });
      }
    }, "Create storage");
  };

  return /*#__PURE__*/React.createElement(ApolloProvider, {
    client: props.client
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.centerItem
  }, /*#__PURE__*/React.createElement(NewSketch, null)), /*#__PURE__*/React.createElement(RenderSketches, null)));
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  mutation($id: ID!, $setting: String){\n    updatePluginSetting(id: $id, setting: $setting){\n      id\n      pluginId\n      setting\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query PluginSettingQuery($id: ID!) {\n    pluginSetting(id: $id) {\n      id\n      pluginId\n      setting\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var PLUGIN_SETTING_QUERY = gql(_templateObject());
var UPDATE_PLUGIN_SETTING_MUTATION = gql(_templateObject2());

var MeasureControl = withLeaflet(MeasureControlDefault);

var MeasureTool = function MeasureTool(props) {
  var storeControl = function storeControl(control) {
    PubSub.subscribe("start-measure", function (msg, data) {
      control.leafletElement._startMeasure();
    });
  };

  var LoadSetting = function LoadSetting() {
    var _useQuery = useQuery(PLUGIN_SETTING_QUERY, {
      variables: {
        id: props.settingId
      }
    }),
        loading = _useQuery.loading,
        error = _useQuery.error,
        data = _useQuery.data;

    if (loading) return /*#__PURE__*/React.createElement("div", {
      style: {
        height: 200
      }
    }, "Loadding...");
    if (error) console.log('this is error', error);

    if (data) {
      var setting = data.pluginSetting.setting;
      var metrix = JSON.parse(setting).metrix;
      var measureOptions = {
        position: 'topright',
        primaryLengthUnit: metrix === "imperial" ? 'feet' : 'meters',
        secondaryLengthUnit: metrix === "imperial" ? 'miles' : 'kilometers',
        primaryAreaUnit: metrix === "imperial" ? 'sqfeet' : 'sqmeters',
        secondaryAreaUnit: metrix === "imperial" ? 'acres' : 'hectars',
        activeColor: '#db4a29',
        completedColor: '#9b2d14'
      };
      return /*#__PURE__*/React.createElement(MeasureControl, _extends({}, measureOptions, {
        ref: function ref(control) {
          return storeControl(control);
        }
      }));
    }

    return null;
  };

  return /*#__PURE__*/React.createElement(ApolloProvider, {
    client: props.client
  }, /*#__PURE__*/React.createElement(LoadSetting, null));
};

export { AdminSetting, ActionsInAccordionSummary as Client, MeasureTool };
