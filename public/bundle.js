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
      this.node.className += ' ' + className;
      this.node.className = this.node.className.trim();
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
      val ? this.node.setAttribute(name, val) : this.node.getAttribute(val);
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

(0, _query2.default)('article a', '.book a', '.project a').filter(function (el) {
  return !el.hasClass('footnote') && !el.hasClass('reverseFootnote');
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

function wrap(node) {
  return new _Wrapper2.default(node);
}

function executeQuery(query) {
  var terms = query.trim().split(' ');
  var selector = terms[terms.length - 1];
  if (terms.length === 1) return get(selector, document).map(wrap);

  var context = terms.slice(0, terms.length - 1);

  var i = context.length - 1;
  var cands = get(context[i], document);
  return cands.filter(function (cand) {
    return filter(cand, terms, --i);
  }).map(function (cand) {
    return get(selector, cand);
  }).flatten().map(wrap);
}

function $() {
  return [].slice.call(arguments).map(executeQuery).flatten();
}

},{"./Wrapper":1,"./array":3}]},{},[2]);
