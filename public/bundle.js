(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wrapper = function () {
  function Wrapper(node) {
    _classCallCheck(this, Wrapper);

    this.node = node;
  }

  _createClass(Wrapper, [{
    key: 'hasClass',
    value: function hasClass(className) {
      return this.node.className.indexOf(className) > -1;
    }
  }, {
    key: 'addClass',
    value: function addClass(className) {
      if (this.hasClass(className)) return;
      var newName = this.node.className + ' ' + className;
      this.node.className = newName.trim();
    }
  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      this.node.className = this.node.className.replace(className, '');
    }
  }, {
    key: 'toggleClass',
    value: function toggleClass(className) {
      this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
    }
  }, {
    key: 'attr',
    value: function attr(name, val) {
      if (val) this.node.setAttribute(name, val);
      return this.node.getAttribute(name);
    }
  }, {
    key: 'data',
    value: function data(name) {
      return this.node.dataset[name];
    }
  }, {
    key: 'text',
    value: function text(val) {
      this.node.textContent = val;
    }
  }, {
    key: 'append',
    value: function append(element) {
      this.node.appendChild(element.node);
    }
  }, {
    key: 'on',
    value: function on(event, handler) {
      this.node.addEventListener(event, handler);
    }
  }, {
    key: 'tooltip',
    value: function tooltip() {
      var element = new Wrapper(document.createElement('section'));
      element.addClass('tooltip');
      element.text(this.data('tooltip'));
      this.append(element);

      this.on('mouseover', function (e) {
        return element.addClass('visible');
      });
      this.on('mouseleave', function (e) {
        return element.removeClass('visible');
      });
    }
  }]);

  return Wrapper;
}();

exports.default = Wrapper;

},{}],2:[function(require,module,exports){
'use strict';

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _query2.default)('a').filter(function (el) {
  return el.attr('href').indexOf('http') !== -1;
}).forEach(function (el) {
  return el.attr('target', '_blank');
});

(0, _query2.default)('.github').forEach(function (el) {
  return el.tooltip();
});

},{"./query":4}],3:[function(require,module,exports){
'use strict';

Array.prototype.flatten = function () {
  var res = [];
  this.forEach(function (item) {
    return Array.isArray(item) ? res = res.concat(item.flatten()) : res.push(item);
  });
  return res;
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = $;

require('./array');

var _Wrapper = require('./Wrapper');

var _Wrapper2 = _interopRequireDefault(_Wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrap(node) {
  return new _Wrapper2.default(node);
}

function executeQuery(query) {
  return [].slice.call(document.querySelectorAll(query)).map(wrap);
}

function $() {
  return [].slice.call(arguments).map(executeQuery).flatten();
}

},{"./Wrapper":1,"./array":3}]},{},[2]);
