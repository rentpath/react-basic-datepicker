'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _is_after = require('date-fns/is_after');

var _is_after2 = _interopRequireDefault(_is_after);

var _is_before = require('date-fns/is_before');

var _is_before2 = _interopRequireDefault(_is_before);

var _is_valid = require('date-fns/is_valid');

var _is_valid2 = _interopRequireDefault(_is_valid);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {
  return null;
}

function hasOpenHandler(props) {
  return props.externalOpenHandler && props.externalOpenHandler.subscribe && typeof props.externalOpenHandler.subscribe === 'function';
}

var Datepicker = function (_Component) {
  _inherits(Datepicker, _Component);

  function Datepicker(props) {
    _classCallCheck(this, Datepicker);

    var _this2 = _possibleConstructorReturn(this, (Datepicker.__proto__ || Object.getPrototypeOf(Datepicker)).call(this, props));

    _this2.onOutsideClick = _this2.onOutsideClick.bind(_this2);
    _this2.handleCalendarVisibility = _this2.handleCalendarVisibility.bind(_this2);
    _this2.dateChange = _this2.dateChange.bind(_this2);
    _this2.outsideHandler = null;
    _this2.handleChange = _this2.handleChange.bind(_this2);

    _this2.state = {
      showCalendar: false,
      selectedDate: _this2.props.startDate,
      textInput: '',
      usingExternalOpenHandler: hasOpenHandler(_this2.props)
    };
    return _this2;
  }

  _createClass(Datepicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this = this;
      if (hasOpenHandler(_this.props)) {
        _this.props.externalOpenHandler.subscribe(function (next) {
          _this.handleCalendarVisibility();
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.showCalendar && !this.outsideHandler) {
        document.removeEventListener('click', this.onOutsideClick, false);
        this.outsideHandler = document.addEventListener('click', this.onOutsideClick, false);
      } else if (this.outsideHandler) {
        document.removeEventListener(this.outsideHandler, this.onOutsideClick, false);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.onOutsideClick, false);
    }
  }, {
    key: 'onOutsideClick',
    value: function onOutsideClick(event) {
      if (!this.mainNode.contains(event.target) && this.state.showCalendar) {
        this.setState({ showCalendar: false });
      }
    }
  }, {
    key: 'dateChange',
    value: function dateChange(selectedDate) {
      if (this.props.handleDateChange) this.props.handleDateChange(selectedDate);
      this.setState({
        selectedDate: selectedDate,
        showCalendar: false,
        textInput: (0, _format2.default)(selectedDate, this.props.dateFormat)
      });
    }
  }, {
    key: 'handleCalendarVisibility',
    value: function handleCalendarVisibility() {
      this.setState({
        showCalendar: !this.state.showCalendar
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var text = e.target.value;
      this.setState({
        textInput: text
      });
      var dateRegex = /\d{2}\/\d{2}\/\d{4}/;

      // check length first to avoid doing excessive regex checks
      if (text.length === 10 && dateRegex.test(text)) {
        var theDate = new Date(text);
        var isDisabled = !(0, _is_valid2.default)(theDate) || (0, _is_before2.default)(theDate, new Date(this.props.minDate)) || (0, _is_after2.default)(theDate, new Date(this.props.maxDate));

        if (!isDisabled) {
          this.dateChange(text);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var open = this.state.usingExternalOpenHandler ? noop : this.handleCalendarVisibility;
      return _react2.default.createElement(
        'div',
        {
          ref: function ref(node) {
            _this3.mainNode = node;
          }
        },
        _react2.default.createElement('input', {
          name: this.props.datepickerName,
          className: this.props.datepickerClassName,
          id: this.props.datepickerId, onFocus: open,
          value: this.props.enableTextInput ? this.state.textInput : (0, _format2.default)(this.state.selectedDate, this.props.dateFormat),
          readOnly: !this.props.enableTextInput,
          onChange: this.props.enableTextInput ? this.handleChange : null
        }),
        this.state.showCalendar && _react2.default.createElement(_Calendar2.default, { startDate: this.state.selectedDate, dateChange: this.dateChange, minDate: this.props.minDate, maxDate: this.props.maxDate })
      );
    }
  }]);

  return Datepicker;
}(_react.Component);

exports.default = Datepicker;


Datepicker.defaultProps = {
  dateFormat: 'DD-MM-YYYY',
  startDate: new Date(),
  datepickerName: 'react-simple-datepicker',
  datepickerId: 'react-simple-datepicker',
  datepickerClassName: 'react-simple-datepicker-input',
  enableTextInput: false
};