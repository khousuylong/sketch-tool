import React, { memo, Component } from 'react';
import { ApolloProvider, useMutation, useApolloClient, useQuery } from '@apollo/client';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import PubSub from 'pubsub-js';
import { UPDATE_PLUGIN_SETTING_MUTATION, PLUGIN_STORAGES_QUERY, UPDATE_PLUGIN_STORAGE_MUTATION, DELETE_PLUGIN_STORAGE_MUTATION, CREATE_PLUGIN_STORAGE_MUTATION } from 'plugin-storage';
import { makeStyles, withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import gql from 'graphql-tag';
import { withLeaflet, MapControl, FeatureGroup } from 'react-leaflet';
import 'react-leaflet-draw';
import L, { Map } from 'leaflet';
import 'leaflet-draw';
import isEqual from 'lodash-es/isEqual';
import ReactDOM from 'react-dom';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import reactCSS from 'reactcss';
import { CompactPicker } from 'react-color';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { green, red } from '@material-ui/core/colors';
import { v4 } from 'uuid';

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
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

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
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

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  query IsEditingGeoJson {\n    isEditingGeoJson @client\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query IsSketchOpened {\n    isSketchOpened @client\n    sketchId @client\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var OPEN_SKETCH = gql(_templateObject());
var EDIT_GEOJSON = gql(_templateObject2());

var StyleEditor = /*#__PURE__*/function (_React$Component) {
  _inherits(StyleEditor, _React$Component);

  var _super = _createSuper(StyleEditor);

  function StyleEditor() {
    _classCallCheck(this, StyleEditor);

    return _super.apply(this, arguments);
  }

  _createClass(StyleEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      PubSub.publish("style-editor-container-ready");
    }
  }, {
    key: "render",
    value: function render() {
      var id = this.props.id;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          width: '100%'
        },
        id: "sketch-container-".concat(id)
      });
    }
  }]);

  return StyleEditor;
}(React.Component);

var Sketch = /*#__PURE__*/memo(function (props) {
  var apolloClient = useApolloClient();

  var _apolloClient$readQue = apolloClient.readQuery({
    query: PLUGIN_STORAGES_QUERY,
    variables: {
      pluginId: props.data.pluginId
    }
  }),
      pluginStorages = _apolloClient$readQue.pluginStorages;

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
      apolloClient.writeQuery({
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
      apolloClient.cache.writeQuery({
        query: OPEN_SKETCH,
        data: {
          isSketchOpened: expanded,
          sketchId: props.data.id
        }
      });
    };
  };

  var Editor = function Editor() {
    var _useQuery = useQuery(EDIT_GEOJSON),
        data = _useQuery.data;

    if (data && data.isEditingGeoJson) {
      return /*#__PURE__*/React.createElement(StyleEditor, {
        id: props.data.id
      });
    } else return /*#__PURE__*/React.createElement(DeleteSketch, null);
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
    inputProps: {
      'data-testid': props.data.id
    },
    InputLabelProps: {
      shrink: true
    }
  })), /*#__PURE__*/React.createElement(AccordionDetails, {
    style: {
      flexFlow: 'column'
    }
  }, /*#__PURE__*/React.createElement(Editor, null)));
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
function AccordionView(props) {
  var apolloClient = useApolloClient();
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
      apolloClient.writeQuery({
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
              pluginId: props.pluginId,
              json: JSON.stringify(jsonPayload)
            }
          }
        });
      }
    }, "Create sketch");
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.centerItem
  }, /*#__PURE__*/React.createElement(NewSketch, null)), /*#__PURE__*/React.createElement(RenderSketches, null));
}

function ClientView(props) {
  return /*#__PURE__*/React.createElement(ApolloProvider, {
    client: props.client
  }, /*#__PURE__*/React.createElement(AccordionView, props));
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment=e;var Lazy=t;var Memo=r;var Portal=d;
var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};var typeOf=z;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs_development = createCommonjsModule(function (module, exports) {



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}
});

var reactIs = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = reactIs_production_min;
} else {
  module.exports = reactIs_development;
}
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning$1 = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning$1(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning$1(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has$1(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning$1(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = reactIs;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var eventHandlers = {
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
  onDeleteStop: 'draw:deletestop'
};
L.Draw.InvisibleMarker = L.Draw.Marker.extend({
  addHooks: function addHooks() {
    L.Draw.Feature.prototype.addHooks.call(this);

    if (this._map) {
      if (!this._mouseAnnotation) {
        this._mouseAnnotation = L.popup().setContent('Click on map to place annotation').setLatLng(this._map.getCenter());
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

      this._mouseMarker.on('click', this._onClick, this).addTo(this._map);

      this._map.on('mousemove', this._onMouseMove, this);

      this._map.on('click', this._onTouch, this);
    }
  },
  // @method removeHooks(): void
  // Remove listener hooks from this handler.
  removeHooks: function removeHooks() {
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
  _onMouseMove: function _onMouseMove(e) {
    var latlng = e.latlng;

    this._mouseMarker.setLatLng(latlng);

    this._mouseAnnotation.setLatLng(latlng);
  },
  _onClick: function _onClick() {
    this._fireCreatedEvent();

    this.disable();
  },
  _fireCreatedEvent: function _fireCreatedEvent() {
    var icon = L.icon({
      iconUrl: '/assets/1PX0.png',
      shadowUrl: '',
      iconSize: [0, 0],
      shadowSize: [0, 0],
      iconAnchor: [0, 0],
      shadowAnchor: [0, 0],
      popupAnchor: [1, 1]
    });
    var marker = new L.Marker.Touch(this._mouseAnnotation.getLatLng(), {
      icon: icon,
      type: 'annotation'
    });

    L.Draw.Feature.prototype._fireCreatedEvent.call(this, marker);
  }
});
L.CustomDrawToolbar = L.DrawToolbar.extend({
  // @method getModeHandlers(): object
  // Get mode handlers information
  getModeHandlers: function getModeHandlers(map) {
    var annotation = new L.Draw.InvisibleMarker(map, this.options.marker);
    annotation.type = "annotation";
    return [{
      enabled: this.options.polyline,
      handler: new L.Draw.Polyline(map, this.options.polyline),
      title: L.drawLocal.draw.toolbar.buttons.polyline
    }, {
      enabled: this.options.polygon,
      handler: new L.Draw.Polygon(map, this.options.polygon),
      title: L.drawLocal.draw.toolbar.buttons.polygon
    }, {
      enabled: this.options.rectangle,
      handler: new L.Draw.Rectangle(map, this.options.rectangle),
      title: L.drawLocal.draw.toolbar.buttons.rectangle
    }, {
      enabled: this.options.circle,
      handler: new L.Draw.Circle(map, this.options.circle),
      title: L.drawLocal.draw.toolbar.buttons.circle
    }, {
      enabled: this.options.marker,
      handler: new L.Draw.Marker(map),
      title: L.drawLocal.draw.toolbar.buttons.marker
    }, {
      enabled: this.options.marker,
      handler: annotation,
      title: ''
    }];
  },
  addToolbar: function addToolbar(map) {
    var container = L.DrawToolbar.prototype.addToolbar.call(this, map);
    container.removeChild(this._actionsContainer);
    return container;
  }
});
L.Control.CustomDraw = L.Control.Draw.extend({
  initialize: function initialize(options) {
    if (L.version < '0.7') {
      throw new Error('Leaflet.draw 0.2.3+ requires Leaflet 0.7.0+. Download latest from https://github.com/Leaflet/Leaflet/');
    }

    L.Control.prototype.initialize.call(this, options);
    var toolbar;
    this._toolbars = {}; // Initialize toolbars

    if (L.DrawToolbar && this.options.draw) {
      toolbar = new L.CustomDrawToolbar(this.options.draw);
      this._toolbars[L.DrawToolbar.TYPE] = toolbar; // Listen for when toolbar is enabled

      this._toolbars[L.DrawToolbar.TYPE].on('enable', this._toolbarEnabled, this);
    }

    if (L.EditToolbar && this.options.edit) {
      toolbar = new L.EditToolbar(this.options.edit);
      this._toolbars[L.EditToolbar.TYPE] = toolbar; // Listen for when toolbar is enabled

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
  onAdd: function onAdd(map) {
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

var EditControl = /*#__PURE__*/function (_MapControl) {
  _inherits(EditControl, _MapControl);

  var _super = _createSuper(EditControl);

  function EditControl() {
    var _this;

    _classCallCheck(this, EditControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onDrawCreate", function (e) {
      var onCreated = _this.props.onCreated;
      var layerContainer = _this.props.leaflet.layerContainer;
      layerContainer.addLayer(e.layer);
      onCreated && onCreated(e);
    });

    return _this;
  }

  _createClass(EditControl, [{
    key: "createLeafletElement",
    value: function createLeafletElement(props) {
      return createDrawElement(props);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _get(_getPrototypeOf(EditControl.prototype), "componentDidMount", this).call(this);

      var map = this.props.leaflet.map;
      var onMounted = this.props.onMounted;

      for (var key in eventHandlers) {
        map.on(eventHandlers[key], function (evt) {
          var handlers = Object.keys(eventHandlers).filter(function (handler) {
            return eventHandlers[handler] == evt.type;
          });

          if (handlers.length == 1) {
            var handler = handlers[0];
            _this2.props[handler] && _this2.props[handler](evt);
          }
        });
      }

      map.on(L.Draw.Event.CREATED, this.onDrawCreate);
      onMounted && onMounted(this.leafletElement);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(_getPrototypeOf(EditControl.prototype), "componentWillUnmount", this).call(this);

      var map = this.props.leaflet.map;
      map.off(L.Draw.Event.CREATED, this.onDrawCreate);

      for (var key in eventHandlers) {
        if (this.props[key]) {
          map.off(eventHandlers[key], this.props[key]);
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // super updates positions if thats all that changed so call this first
      _get(_getPrototypeOf(EditControl.prototype), "componentDidUpdate", this).call(this, prevProps);

      if (isEqual(this.props.draw, prevProps.draw) || this.props.position !== prevProps.position) {
        return false;
      }

      var map = this.props.leaflet.map;
      this.leafletElement.remove(map);
      this.leafletElement = createDrawElement(this.props);
      this.leafletElement.addTo(map);
      return null;
    }
  }]);

  return EditControl;
}(MapControl);

_defineProperty(EditControl, "propTypes", _objectSpread2(_objectSpread2({}, Object.keys(eventHandlers).reduce(function (acc, val) {
  acc[val] = propTypes.PropTypes.func;
  return acc;
}, {})), {}, {
  onCreated: propTypes.PropTypes.func,
  onMounted: propTypes.PropTypes.func,
  draw: propTypes.PropTypes.shape({
    polyline: propTypes.PropTypes.oneOfType([propTypes.PropTypes.object, propTypes.PropTypes.bool]),
    polygon: propTypes.PropTypes.oneOfType([propTypes.PropTypes.object, propTypes.PropTypes.bool]),
    rectangle: propTypes.PropTypes.oneOfType([propTypes.PropTypes.object, propTypes.PropTypes.bool]),
    circle: propTypes.PropTypes.oneOfType([propTypes.PropTypes.object, propTypes.PropTypes.bool]),
    marker: propTypes.PropTypes.oneOfType([propTypes.PropTypes.object, propTypes.PropTypes.bool])
  }),
  edit: propTypes.PropTypes.shape({
    edit: propTypes.PropTypes.oneOfType([propTypes.PropTypes.object, propTypes.PropTypes.bool]),
    remove: propTypes.PropTypes.oneOfType([propTypes.PropTypes.object, propTypes.PropTypes.bool]),
    poly: propTypes.PropTypes.oneOfType([propTypes.PropTypes.object, propTypes.PropTypes.bool]),
    allowIntersection: propTypes.PropTypes.bool
  }),
  position: propTypes.PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft']),
  leaflet: propTypes.PropTypes.shape({
    map: propTypes.PropTypes.instanceOf(Map),
    layerContainer: propTypes.PropTypes.shape({
      addLayer: propTypes.PropTypes.func.isRequired,
      removeLayer: propTypes.PropTypes.func.isRequired
    })
  })
}));

function createDrawElement(props) {
  var layerContainer = props.leaflet.layerContainer;
  var draw = props.draw,
      edit = props.edit,
      position = props.position;
  var options = {
    edit: _objectSpread2(_objectSpread2({}, edit), {}, {
      featureGroup: layerContainer
    })
  };

  if (draw) {
    options.draw = _objectSpread2({}, draw);
  }

  if (position) {
    options.position = position;
  }

  return new L.Control.CustomDraw(options);
}

var EditControl$1 = withLeaflet(EditControl);

var styles = function styles(theme) {
  return {
    listItem: {
      paddingTop: '5px',
      paddingBottom: '5px'
    }
  };
};

var ColorPickerPanel = /*#__PURE__*/function (_Component) {
  _inherits(ColorPickerPanel, _Component);

  var _super = _createSuper(ColorPickerPanel);

  function ColorPickerPanel(props) {
    var _this;

    _classCallCheck(this, ColorPickerPanel);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleClickOpen", function () {
      _this.setState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.setState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (color) {
      _this.setState({
        color: color.hex
      });

      _this.handleClose();

      _this.props.onChange(color.hex);
    });

    _this.state = {
      open: false,
      color: _this.props.color || "#FFF"
    };
    return _this;
  }

  _createClass(ColorPickerPanel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          title = _this$props.title,
          description = _this$props.description,
          buttonText = _this$props.buttonText,
          _this$props$testId = _this$props.testId,
          testId = _this$props$testId === void 0 ? "" : _this$props$testId;
      var styles = reactCSS({
        'default': {
          color: {
            width: '25px',
            height: '20px',
            borderRadius: '2px',
            background: this.state.color
          },
          swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer'
          }
        }
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: classes.listItem
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 12,
        alignItems: "center",
        sm: true,
        container: true
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true
      }, /*#__PURE__*/React.createElement(ListItemText, {
        primary: title
      }), /*#__PURE__*/React.createElement(ListItemText, {
        secondary: description,
        className: "no-padding"
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: true,
        container: true,
        justify: "flex-end"
      }, /*#__PURE__*/React.createElement("div", {
        "data-testid": "".concat(testId, "-open-picker"),
        style: styles.swatch,
        onClick: this.handleClickOpen
      }, /*#__PURE__*/React.createElement("div", {
        style: styles.color
      })))))), /*#__PURE__*/React.createElement(Dialog, {
        "data-testid": "color-picker-dialog",
        maxWidth: "lg",
        open: this.state.open,
        onClose: this.handleClose,
        "aria-labelledby": "form-dialog-title",
        "aria-describedby": "alert-dialog-description"
      }, /*#__PURE__*/React.createElement(DialogContent, {
        className: classes.noPadding,
        id: "alert-dialog-description"
      }, this.props.colors ? /*#__PURE__*/React.createElement(CompactPicker, {
        colors: this.props.colors,
        color: this.state.color,
        onChange: this.handleChange
      }) : /*#__PURE__*/React.createElement(CompactPicker, {
        color: this.state.color,
        onChange: this.handleChange
      }))));
    }
  }]);

  return ColorPickerPanel;
}(Component);

var ColorPickerPanel$1 = withStyles(styles)(ColorPickerPanel);

var styles$1 = function styles(theme) {
  return {
    listItem: {
      paddingTop: '5px',
      paddingBottom: '5px'
    }
  };
};

var ListPanel = function ListPanel(props) {
  var classes = props.classes,
      label = props.label;
  return /*#__PURE__*/React.createElement(ListItem, {
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.listItem
  }, /*#__PURE__*/React.createElement(ListItemText, {
    primary: label
  }), /*#__PURE__*/React.createElement(ListItemSecondaryAction, {
    style: {
      right: 0
    }
  }, props.children)));
};

var ListPanel$1 = withStyles(styles$1)(ListPanel);

var _FeildInput$propTypes;

var FeildInput = /*#__PURE__*/function (_React$Component) {
  _inherits(FeildInput, _React$Component);

  var _super = _createSuper(FeildInput);

  function FeildInput(props) {
    var _this;

    _classCallCheck(this, FeildInput);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleSize", function (event) {
      _this.setState({
        outlineSize: event.target.value
      });

      _this.props.onChange(event.target.value);
    });

    _this.state = {
      outlineSize: _this.props.size
    };
    return _this;
  }

  _createClass(FeildInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          label = _this$props.label;
      return /*#__PURE__*/React.createElement(ListPanel$1, {
        label: label
      }, /*#__PURE__*/React.createElement(TextField, {
        inputProps: {
          'data-testid': 'outline-size'
        },
        style: {
          width: 40
        },
        autoFocus: true,
        margin: "dense",
        id: "outlineSize",
        label: "",
        type: type,
        value: this.state.outlineSize,
        onChange: this.handleSize
      }));
    }
  }]);

  return FeildInput;
}(React.Component);

FeildInput.propTypes = (_FeildInput$propTypes = {
  type: propTypes.string,
  label: propTypes.string
}, _defineProperty(_FeildInput$propTypes, "label", propTypes.any.isRequired), _defineProperty(_FeildInput$propTypes, "size", propTypes.number), _FeildInput$propTypes);

var theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  }
});

var ShapeEditor = /*#__PURE__*/function () {
  function ShapeEditor(client, layer, options) {
    _classCallCheck(this, ShapeEditor);

    this._options = options;
    this._apolloClient = client;
    this._layer = layer;
    this._callBack = options.callBack;

    this._initEvents();
  }

  _createClass(ShapeEditor, [{
    key: "_initEvents",
    value: function _initEvents() {
      var self = this;

      this._layer.on('click', function (e) {
        if (!window._sketchEditing) {
          self.open();
          window._sketchEditing = true;
        }

        L.DomEvent.stop(e);
      });
    }
  }, {
    key: "_updateQueryCache",
    value: function _updateQueryCache(isEditing) {
      this._apolloClient.cache.writeQuery({
        query: EDIT_GEOJSON,
        data: {
          isEditingGeoJson: isEditing
        }
      });
    }
  }, {
    key: "_done",
    value: function _done() {
      this._updateQueryCache(false);

      window._sketchEditing = false;

      this._options.done();
    }
  }, {
    key: "_cancel",
    value: function _cancel() {
      this._updateQueryCache(false);

      window._sketchEditing = false;

      this._layer.editing.disable();
    }
  }, {
    key: "_renderForm",
    value: function _renderForm() {
      var _this = this;

      var containerId = this._options.containerId;

      var App = function App() {
        return /*#__PURE__*/React.createElement("div", {
          ref: _this._myAppRef
        }, /*#__PURE__*/React.createElement(Typography, {
          variant: "subtitle2",
          gutterBottom: true
        }, "Stroke"), /*#__PURE__*/React.createElement(ColorPickerPanel$1, {
          testId: "",
          onChange: function onChange(color) {
            return _this._layer.setStyle({
              color: color
            });
          },
          title: "Color",
          description: "",
          color: _this._layer.options['color']
        }), /*#__PURE__*/React.createElement(FeildInput, {
          onChange: function onChange(weight) {
            return _this._layer.setStyle({
              weight: weight
            });
          },
          size: _this._layer.options['weight'],
          label: "Width",
          type: "number"
        }), /*#__PURE__*/React.createElement(FeildInput, {
          onChange: function onChange(opacity) {
            return _this._layer.setStyle({
              opacity: opacity
            });
          },
          size: _this._layer.options['opacity'],
          label: "Opacity",
          type: "number"
        }), /*#__PURE__*/React.createElement(Divider, {
          style: {
            marginTop: 10,
            marginBottom: 10
          }
        }), /*#__PURE__*/React.createElement(Typography, {
          variant: "subtitle2",
          gutterBottom: true
        }, "Fill"), /*#__PURE__*/React.createElement(ColorPickerPanel$1, {
          testId: "",
          onChange: function onChange(fillColor) {
            return _this._layer.setStyle({
              fillColor: fillColor
            });
          },
          title: "Color",
          description: "",
          color: _this._layer.options['fillColor']
        }), /*#__PURE__*/React.createElement(FeildInput, {
          onChange: function onChange(fillOpacity) {
            return _this._layer.setStyle({
              fillOpacity: fillOpacity
            });
          },
          size: _this._layer.options['fillOpacity'],
          label: "Opacity",
          type: "number"
        }), /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: 10,
            "float": 'right'
          }
        }, /*#__PURE__*/React.createElement(ThemeProvider, {
          theme: theme
        }, /*#__PURE__*/React.createElement(Button, {
          onClick: function onClick() {
            return _this._cancel();
          },
          style: {
            color: '#fff',
            fontWeight: 'bold'
          },
          variant: "contained",
          color: "secondary"
        }, "Cancel")), /*#__PURE__*/React.createElement(ThemeProvider, {
          theme: theme
        }, /*#__PURE__*/React.createElement(Button, {
          onClick: function onClick() {
            return _this._done();
          },
          style: {
            color: '#fff',
            fontWeight: 'bold',
            marginLeft: 5
          },
          variant: "contained",
          color: "primary"
        }, "Done"))));
      };

      ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById(containerId));
    }
  }, {
    key: "_initShapeEditControl",
    value: function _initShapeEditControl() {
      var self = this;
      PubSub.subscribe("style-editor-container-ready", function (msg, data) {
        self._renderForm();
      });

      this._updateQueryCache(true);
    }
  }, {
    key: "open",
    value: function open() {
      this._callBack();

      this._layer.editing.enable();

      this._initShapeEditControl();
    }
  }]);

  return ShapeEditor;
}();

var theme$1 = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  }
});
var useStyles$1 = makeStyles({
  smallThumb: {
    border: '3px solid #ECECEC',
    cursor: 'pointer',
    borderRadius: '3px',
    margin: '0 3px 3px 0',
    padding: '2px 10px',
    "float": 'left',
    transition: 'all 0.06s',
    '&:hover': {
      border: '3px solid #B1AFAF'
    }
  }
});
var markers = ["default-marker.png", "pin-2.png", "pin-3.png", "pin-4.png", "pin-5.png", "pin-6.png", "pin-7.png", "pin-8.png", "pin-9.png", "pin-10.png", "pin-11.png", "pin-12.png", "pin-13.png", "pin-14.png", "pin-15.png", "pin-16.png", "pin-17.png", "pin-18.png", "pin-19.png", "pin-20.png"];

var MarkerEditor = /*#__PURE__*/function () {
  function MarkerEditor(client, layer, options) {
    _classCallCheck(this, MarkerEditor);

    this._options = options;
    this._apolloClient = client;
    this._layer = layer;
    this._callBack = options.callBack;

    this._initEvents();
  }

  _createClass(MarkerEditor, [{
    key: "_initEvents",
    value: function _initEvents() {
      var self = this;

      this._layer.on('click', function (e) {
        if (!window._sketchEditing) {
          self.open();
          window._sketchEditing = true;
        }

        L.DomEvent.stop(e);
      });
    }
  }, {
    key: "_updateQueryCache",
    value: function _updateQueryCache(isEditing) {
      this._apolloClient.cache.writeQuery({
        query: EDIT_GEOJSON,
        data: {
          isEditingGeoJson: isEditing
        }
      });
    }
  }, {
    key: "_done",
    value: function _done() {
      this._updateQueryCache(false);

      window._sketchEditing = false;

      this._options.done();
    }
  }, {
    key: "_cancel",
    value: function _cancel() {
      this._updateQueryCache(false);

      window._sketchEditing = false;

      this._layer.editing.disable();
    }
  }, {
    key: "_updateMarker",
    value: function _updateMarker(icon) {
      var customIcon = L.icon({
        iconUrl: "//mangomap.com/assets/pushpin_symbols/".concat(icon),
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      });

      this._layer.setIcon(customIcon);
    }
  }, {
    key: "_handleChange",
    value: function _handleChange(icon) {
      this._updateMarker(icon);
    }
  }, {
    key: "_renderForm",
    value: function _renderForm() {
      var _this = this;

      var containerId = this._options.containerId;

      var RenderIcon = function RenderIcon(props) {
        var classes = useStyles$1();
        return /*#__PURE__*/React.createElement("div", {
          onClick: function onClick() {
            return _this._handleChange(props.icon);
          },
          className: classes.smallThumb
        }, /*#__PURE__*/React.createElement("img", {
          src: "//mangomap.com/assets/pushpin_symbols/".concat(props.icon)
        }));
      };

      var App = function App() {
        return /*#__PURE__*/React.createElement("div", {
          ref: _this._myAppRef
        }, /*#__PURE__*/React.createElement(Typography, {
          variant: "subtitle2",
          gutterBottom: true
        }, "Stroke"), markers.map(function (marker) {
          return /*#__PURE__*/React.createElement("div", {
            style: {
              "float": 'left'
            },
            key: marker
          }, /*#__PURE__*/React.createElement(RenderIcon, {
            icon: marker
          }));
        }), /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: 10,
            "float": 'right'
          }
        }, /*#__PURE__*/React.createElement(ThemeProvider, {
          theme: theme$1
        }, /*#__PURE__*/React.createElement(Button, {
          onClick: function onClick() {
            return _this._cancel();
          },
          style: {
            color: '#fff',
            fontWeight: 'bold'
          },
          variant: "contained",
          color: "secondary"
        }, "Cancel")), /*#__PURE__*/React.createElement(ThemeProvider, {
          theme: theme$1
        }, /*#__PURE__*/React.createElement(Button, {
          onClick: function onClick() {
            return _this._done();
          },
          style: {
            color: '#fff',
            fontWeight: 'bold',
            marginLeft: 5
          },
          variant: "contained",
          color: "primary"
        }, "Done"))));
      };

      ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById(containerId));
    }
  }, {
    key: "_initShapeEditControl",
    value: function _initShapeEditControl() {
      var self = this;
      PubSub.subscribe("style-editor-container-ready", function (msg, data) {
        self._renderForm();
      });

      this._updateQueryCache(true);
    }
  }, {
    key: "open",
    value: function open() {
      this._callBack();

      this._layer.editing.enable();

      this._initShapeEditControl();
    }
  }]);

  return MarkerEditor;
}();

var theme$2 = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  }
});

var AnnotationEditor = /*#__PURE__*/function () {
  function AnnotationEditor(client, layer, options) {
    _classCallCheck(this, AnnotationEditor);

    this._map = window._mapRef;
    this._options = options;
    this._apolloClient = client;
    this._layer = layer;
    this._callBack = options.callBack;
    if (!this._layer['options']['annotation']) this._layer['options']['annotation'] = {
      content: "content here"
    };

    this._editAnnotation();

    if (options.open) this.open();

    this._initEvents();
  }

  _createClass(AnnotationEditor, [{
    key: "_editAnnotation",
    value: function _editAnnotation() {
      var self = this;
      this._popup = new L.Popup({
        closeOnClick: false,
        closeButton: false,
        minWidth: 50,
        maxWidth: 500,
        maxHeight: 500
      });

      this._popup.setContent('<div class="redactor-output">' + this._layer['options']['annotation']['content'] + '</div>').setLatLng(this._layer.getLatLng()).addTo(this._map);

      L.DomEvent.addListener(this._popup.getElement(), 'click', function (e) {
        if (!window._sketchEditing) {
          self.open();
          window._sketchEditing = true;
        }

        L.DomEvent.stop(e);
      }, this);

      this._layer.on('remove', function () {
        self._map.removeLayer(self._popup);
      });
    }
  }, {
    key: "_initEvents",
    value: function _initEvents() {
      var self = this;

      this._layer.on('click', function (e) {
        if (!window._sketchEditing) {
          self.open();
          window._sketchEditing = true;
        }

        L.DomEvent.stop(e);
      });
    }
  }, {
    key: "_updateQueryCache",
    value: function _updateQueryCache(isEditing) {
      this._apolloClient.cache.writeQuery({
        query: EDIT_GEOJSON,
        data: {
          isEditingGeoJson: isEditing
        }
      });
    }
  }, {
    key: "_done",
    value: function _done() {
      this._cancel();

      this._options.done();
    }
  }, {
    key: "_cancel",
    value: function _cancel() {
      this._draggable.disable();

      this._updateQueryCache(false);

      window._sketchEditing = false;

      this._layer.editing.disable();

      this._popup._container.style.cursor = "auto";
    }
  }, {
    key: "_renderForm",
    value: function _renderForm() {
      var _this = this;

      var containerId = this._options.containerId;

      var App = function App() {
        return /*#__PURE__*/React.createElement("div", {
          ref: _this._myAppRef
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TextField, {
          onChange: function onChange(e) {
            return _this._updateText(e.target.value);
          },
          id: "outlined-textarea",
          defaultValue: _this._layer['options']['annotation'].content,
          label: "Annotation",
          placeholder: "Placeholder",
          multiline: true,
          variant: "outlined"
        })), /*#__PURE__*/React.createElement("div", {
          style: {
            marginTop: 10,
            "float": 'right'
          }
        }, /*#__PURE__*/React.createElement(ThemeProvider, {
          theme: theme$2
        }, /*#__PURE__*/React.createElement(Button, {
          onClick: function onClick() {
            return _this._cancel();
          },
          style: {
            color: '#fff',
            fontWeight: 'bold'
          },
          variant: "contained",
          color: "secondary"
        }, "Cancel")), /*#__PURE__*/React.createElement(ThemeProvider, {
          theme: theme$2
        }, /*#__PURE__*/React.createElement(Button, {
          onClick: function onClick() {
            return _this._done();
          },
          style: {
            color: '#fff',
            fontWeight: 'bold',
            marginLeft: 5
          },
          variant: "contained",
          color: "primary"
        }, "Done"))));
      };

      ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById(containerId));
    }
  }, {
    key: "_initShapeEditControl",
    value: function _initShapeEditControl() {
      var self = this;
      PubSub.subscribe("style-editor-container-ready", function (msg, data) {
        self._renderForm();
      });

      this._updateQueryCache(true);
    }
  }, {
    key: "_updateText",
    value: function _updateText(value) {
      this._layer['options']['annotation'] = {
        'content': value
      };

      this._popup.setContent("<div class=\"redactor-output\">".concat(value, "</div>"));
    }
  }, {
    key: "_enableEdit",
    value: function _enableEdit() {
      var pos = this._map.latLngToLayerPoint(this._popup._latlng);

      L.DomUtil.setPosition(this._popup._wrapper.parentNode, pos);
      this._draggable = new L.Draggable(this._popup._container, this._popup._wrapper);

      this._draggable.enable();

      var self = this;

      this._draggable.on('dragend', function (e) {
        var latlng = self._map.layerPointToLatLng(e.target._newPos);

        self._popup.setLatLng(latlng);

        self._layer.setLatLng(latlng);
      });

      this._popup._container.style.cursor = "move";
    }
  }, {
    key: "open",
    value: function open() {
      this._callBack();

      this._initShapeEditControl();

      this._enableEdit();
    }
  }]);

  return AnnotationEditor;
}();

var Editor = /*#__PURE__*/function () {
  function Editor(containerId, client) {
    _classCallCheck(this, Editor);

    this.containerId = containerId;
    this._client = client;
  }

  _createClass(Editor, [{
    key: "edit",
    value: function edit(layer, options) {
      var shape;

      if (layer.options['type'] == "annotation") {
        shape = new AnnotationEditor(this._client, layer, _objectSpread2({
          containerId: this.containerId
        }, options));
      } else {
        if (layer instanceof L.Marker) {
          shape = new MarkerEditor(this._client, layer, _objectSpread2({
            containerId: this.containerId
          }, options));
        } else {
          shape = new ShapeEditor(this._client, layer, _objectSpread2({
            containerId: this.containerId
          }, options));
        }
      }

      return shape;
    }
  }]);

  return Editor;
}();

var newlyCreatedId = "";
var GeoJsonLayer = /*#__PURE__*/memo(function (props) {
  var fgRef = props.fgRef,
      data = props.data;
  var editor = new Editor("sketch-container-".concat(props.data.id), props.client);

  var _rendreGeoJsonLayer = function _rendreGeoJsonLayer(storage) {
    var json = JSON.parse(storage.json);
    if (!json.geoJson) return;
    json.geoJson.map(function (geojson) {
      var geojsonLayer = L.geoJson(geojson['geojson'], {
        style: geojson['options'],
        pointToLayer: function pointToLayer(feature, latlng) {
          if (feature.properties.radius) {
            return new L.Circle(latlng, feature.properties.radius);
          }

          if (geojson['options']['type'] === "annotation") {
            var icon = L.icon({
              iconUrl: '/assets/1PX0.png',
              shadowUrl: '',
              iconSize: [0, 0],
              shadowSize: [0, 0],
              iconAnchor: [0, 0],
              shadowAnchor: [0, 0],
              popupAnchor: [1, 1]
            });
            return L.marker(latlng, {
              icon: icon,
              type: 'annotation',
              annotation: geojson['options']['annotation']
            });
          }

          if (geojson['options']['icon']['options'].hasOwnProperty('iconUrl')) return L.marker(latlng, {
            icon: L.icon({
              iconUrl: geojson['options']['icon']['options']['iconUrl'],
              iconSize: [25, 41],
              iconAnchor: [12, 41]
            })
          });else return L.marker(latlng);
        }
      });
      geojsonLayer.eachLayer(function (layer) {
        if (fgRef) {
          fgRef.addLayer(layer);
          editor.edit(layer, {
            done: _save,
            open: newlyCreatedId && newlyCreatedId === geojson.options.id,
            callBack: function callBack() {
              return console.log('this is callback');
            }
          });
        }
      });
    });
  };

  var _save = function _save() {
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

  var _onCreated = function _onCreated(e) {
    var id = v4();
    e.layer['options']['id'] = id;
    newlyCreatedId = id;

    _save();
  };

  var _onEditStart = function _onEditStart(e) {
    console.log('on edit start', e);
  };

  var _stopEditing = function _stopEditing() {
    window._sketchEditing = false;
    props.client.cache.writeQuery({
      query: EDIT_GEOJSON,
      data: {
        isEditingGeoJson: false
      }
    });
  };

  if (fgRef) {
    fgRef.clearLayers();

    if (props.expanded) {
      _rendreGeoJsonLayer(props.data);

      return /*#__PURE__*/React.createElement(EditControl$1, {
        onCreated: _onCreated,
        position: "topright",
        onEditStart: _onEditStart,
        draw: {}
      });
    } else {
      _stopEditing();

      return null;
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
          var activeStorage = _this.props.storages.find(function (storage) {
            return storage.id === data.sketchId;
          });

          if (activeStorage) return /*#__PURE__*/React.createElement(GeoJsonLayer, {
            client: _this.props.client,
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
          if (reactFGref) {
            _this._fGref = reactFGref.leafletElement;
            window._mapRef = _this._fGref._map;
          }
        }
      }, /*#__PURE__*/React.createElement(RenderEditControl, null));
    }
  }]);

  return FGroup;
}(React.Component);

var LControl = /*#__PURE__*/memo(function (props) {
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

export { AccordionView, AdminSetting, ClientView, LControl };
