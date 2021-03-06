'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by elly on 2017/4/7.
                                                                                                                                                                                                                                                                   */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _util = require('../util');

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _confirm = require('./confirm');

var _confirm2 = _interopRequireDefault(_confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function renderComponent(instance) {
    if (instance.props.visible) {
        if (!instance.container) {
            instance.container = instance.getContainer();
        }
        _reactDom2['default'].unstable_renderSubtreeIntoContainer(instance, _react2['default'].createElement(_modal2['default'], _extends({}, instance.props, { key: 'el-modal' })), instance.container);
    }
}

var Wrap = function (_Component) {
    _inherits(Wrap, _Component);

    function Wrap(props) {
        _classCallCheck(this, Wrap);

        return _possibleConstructorReturn(this, (Wrap.__proto__ || Object.getPrototypeOf(Wrap)).call(this, props));
    }

    _createClass(Wrap, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            renderComponent(this);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            renderComponent(this);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(_ref) {
            var visible = _ref.visible;

            return !!(this.props.visible || visible);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref2) {
            var visible = _ref2.visible;

            if (!visible) {
                this.removeComponent();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.removeComponent();
        }
    }, {
        key: 'getContainer',
        value: function getContainer() {
            this.container || (this.container = document.createElement('div'));
            document.body.appendChild(this.container);
            return this.container;
        }
    }, {
        key: 'removeComponent',
        value: function removeComponent() {
            if (this.container) {
                _reactDom2['default'].unmountComponentAtNode(this.container);
                document.body.removeChild(this.container);
                this.container = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return Wrap;
}(_react.Component);

exports['default'] = Wrap;


Wrap.confirm = function (props) {
    props = (0, _util.extend)({}, {
        title: 'confirm',
        content: '',
        size: 'default'
    }, props);
    return (0, _confirm2['default'])(props);
};

Wrap.propTypes = {
    visible: _propTypes2['default'].bool
};

Wrap.defaultProps = {
    visible: false
};