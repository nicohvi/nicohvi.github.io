(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _query2.default)('article a').concat((0, _query2.default)('.book a')).filter(function (el) {
  return !el.hasClass('footnote') && !el.hasClass('reverseFootnote');
}).forEach(function (el) {
  return el.attr('target', '_blank');
});

},{"./query":3}],2:[function(require,module,exports){
'use strict';

Array.prototype.flatten = function () {
  var res = [];
  this.forEach(function (item) {
    return Array.isArray(item) ? res = res.concat(item.flatten()) : res.push(item);
  });
  return res;
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = $;

require('./array');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getById(id, parent) {
  return parent.getElementById(id);
};

function getByClass(className, parent) {
  return parent.getElementsByClassName(className);
}

function getElement(selector, parent) {
  return parent.getElementsByTagName(selector);
}

function get(selector, parent) {
  var type = termType(selector);
  var res = undefined;
  switch (type) {
    case 'id':
      res = getById(selector.slice(1), parent);
      break;
    case 'class':
      res = getByClass(selector.slice(1), parent);
      break;
    default:
      res = getElement(selector, parent);
  }
  return [].slice.call(res);
}

function termType(term) {
  return term.charAt(0) === '#' ? 'id' : term.charAt(0) === '.' ? 'class' : '';
}

function filterByTerm(node, term) {
  var type = termType(term);

  switch (type) {
    case 'id':
      return node.id === term.slice(1);
    case 'class':
      return node.className === term.slice(1);
    default:
      return node.tagName.toLowerCase() === term;
  }
}

function filter(node, terms, i) {
  // passed in root as context
  if (i < 0) return true;
  return node.parentElement ? filter(node.parentElement, terms, --i) : filterByTerm(node, terms[i]);
}

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
    value: function addClass(classes) {
      console.log('implement');
    }
  }, {
    key: 'attr',
    value: function attr(name, val) {
      this.node.setAttribute(name, val);
    }
  }]);

  return Wrapper;
}();

function wrap(node) {
  return new Wrapper(node);
}

function $(query) {
  var terms = query.trim().split(' ');
  var selector = terms[terms.length - 1];
  if (terms.length === 1) return get(selector, document);

  var context = terms.slice(0, terms.length - 1);

  var i = context.length - 1;
  var cands = get(context[i], document);

  return cands.filter(function (cand) {
    return filter(cand, terms, --i);
  }).map(function (cand) {
    return get(selector, cand);
  }).flatten().map(wrap);
}

},{"./array":2}]},{},[1]);
