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

Array.prototype.flatten = function () {
  var res = [];
  this.forEach(function (item) {
    return Array.isArray(item) ? res = res.concat(item.flatten()) : res.push(item);
  });
  return res;
};

},{}],3:[function(require,module,exports){
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

},{"./query":4}],4:[function(require,module,exports){
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

},{"./Wrapper":1,"./array":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvV3JhcHBlci5qcyIsImFzc2V0cy9qcy9hcnJheS5qcyIsImFzc2V0cy9qcy9tYWluLmpzIiwiYXNzZXRzL2pzL3F1ZXJ5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FxQixPO0FBRW5CLG1CQUFhLElBQWIsRUFBbUI7QUFBQTs7QUFDakIsU0FBSyxJQUFMLEdBQVksSUFBWjtBQUNEOzs7OzZCQUVTLFMsRUFBVztBQUNuQixhQUFPLEtBQUssSUFBTCxDQUFVLFNBQVYsQ0FBb0IsT0FBcEIsQ0FBNEIsU0FBNUIsSUFBeUMsQ0FBQyxDQUFqRDtBQUNEOzs7NkJBRVMsUyxFQUFXO0FBQ25CLFVBQUksS0FBSyxRQUFMLENBQWMsU0FBZCxDQUFKLEVBQThCO0FBQzlCLFVBQU0sVUFBYSxLQUFLLElBQUwsQ0FBVSxTQUF2QixTQUFvQyxTQUExQztBQUNBLFdBQUssSUFBTCxDQUFVLFNBQVYsR0FBc0IsUUFBUSxJQUFSLEVBQXRCO0FBQ0Q7OztnQ0FFWSxTLEVBQVc7QUFDdEIsV0FBSyxJQUFMLENBQVUsU0FBVixHQUFzQixLQUFLLElBQUwsQ0FBVSxTQUFWLENBQW9CLE9BQXBCLENBQTRCLFNBQTVCLEVBQXVDLEVBQXZDLENBQXRCO0FBQ0Q7OztnQ0FFWSxTLEVBQVc7QUFDdEIsV0FBSyxRQUFMLENBQWMsU0FBZCxJQUNFLEtBQUssV0FBTCxDQUFpQixTQUFqQixDQURGLEdBRUUsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUZGO0FBR0Q7Ozt5QkFFSyxJLEVBQU0sRyxFQUFLO0FBQ2YsVUFBRyxHQUFILEVBQVEsS0FBSyxJQUFMLENBQVUsWUFBVixDQUF1QixJQUF2QixFQUE2QixHQUE3QjtBQUNSLGFBQU8sS0FBSyxJQUFMLENBQVUsWUFBVixDQUF1QixJQUF2QixDQUFQO0FBQ0Q7Ozt5QkFFSyxJLEVBQU07QUFDVixhQUFPLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FBa0IsSUFBbEIsQ0FBUDtBQUNEOzs7eUJBRUssRyxFQUFLO0FBQ1QsV0FBSyxJQUFMLENBQVUsV0FBVixHQUF3QixHQUF4QjtBQUNEOzs7MkJBRU8sTyxFQUFTO0FBQ2YsV0FBSyxJQUFMLENBQVUsV0FBVixDQUFzQixRQUFRLElBQTlCO0FBQ0Q7Ozt1QkFFRyxLLEVBQU8sTyxFQUFTO0FBQ2xCLFdBQUssSUFBTCxDQUFVLGdCQUFWLENBQTJCLEtBQTNCLEVBQWtDLE9BQWxDO0FBQ0Q7Ozs4QkFFVTtBQUNULFVBQU0sVUFBVSxJQUFJLE9BQUosQ0FBWSxTQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBWixDQUFoQjtBQUNBLGNBQVEsUUFBUixDQUFpQixTQUFqQjtBQUNBLGNBQVEsSUFBUixDQUFhLEtBQUssSUFBTCxDQUFVLFNBQVYsQ0FBYjtBQUNBLFdBQUssTUFBTCxDQUFZLE9BQVo7O0FBRUEsV0FBSyxFQUFMLENBQVEsV0FBUixFQUFxQjtBQUFBLGVBQUssUUFBUSxRQUFSLENBQWlCLFNBQWpCLENBQUw7QUFBQSxPQUFyQjtBQUNBLFdBQUssRUFBTCxDQUFRLFlBQVIsRUFBc0I7QUFBQSxlQUFLLFFBQVEsV0FBUixDQUFvQixTQUFwQixDQUFMO0FBQUEsT0FBdEI7QUFDRDs7Ozs7O2tCQXZEa0IsTzs7O0FDQXJCOztBQUVBLE1BQU0sU0FBTixDQUFnQixPQUFoQixHQUEwQixZQUFZO0FBQ3BDLE1BQUksTUFBTSxFQUFWO0FBQ0EsT0FDQyxPQURELENBQ1M7QUFBQSxXQUFRLE1BQU0sT0FBTixDQUFjLElBQWQsSUFDYixNQUFNLElBQUksTUFBSixDQUFXLEtBQUssT0FBTCxFQUFYLENBRE8sR0FFYixJQUFJLElBQUosQ0FBUyxJQUFULENBRks7QUFBQSxHQURUO0FBS0EsU0FBTyxHQUFQO0FBQ0QsQ0FSRDs7Ozs7QUNGQTs7Ozs7O0FBRUEscUJBQUUsR0FBRixFQUFPLE1BQVAsQ0FBYztBQUFBLFNBQU0sR0FBRyxJQUFILENBQVEsTUFBUixFQUFnQixPQUFoQixDQUF3QixNQUF4QixNQUFvQyxDQUFDLENBQTNDO0FBQUEsQ0FBZCxFQUNDLE9BREQsQ0FDUztBQUFBLFNBQU0sR0FBRyxJQUFILENBQVEsUUFBUixFQUFrQixRQUFsQixDQUFOO0FBQUEsQ0FEVDs7QUFHQSxxQkFBRSxTQUFGLEVBQWEsT0FBYixDQUFxQjtBQUFBLFNBQU0sR0FBRyxPQUFILEVBQU47QUFBQSxDQUFyQjs7O0FDTEE7Ozs7O2tCQWV3QixDOztBQWJ4Qjs7QUFDQTs7Ozs7O0FBR0EsU0FBUyxJQUFULENBQWUsSUFBZixFQUFxQjtBQUNuQixTQUFPLHNCQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFNBQVMsWUFBVCxDQUF1QixLQUF2QixFQUE4QjtBQUM1QixTQUFRLEdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxTQUFTLGdCQUFULENBQTBCLEtBQTFCLENBQWQsRUFDQyxHQURELENBQ0ssSUFETCxDQUFSO0FBRUQ7O0FBRWMsU0FBUyxDQUFULEdBQWM7QUFDM0IsU0FBTyxHQUFHLEtBQUgsQ0FBUyxJQUFULENBQWMsU0FBZCxFQUF5QixHQUF6QixDQUE2QixZQUE3QixFQUEyQyxPQUEzQyxFQUFQO0FBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3JhcHBlciB7XG5cbiAgY29uc3RydWN0b3IgKG5vZGUpIHtcbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuICB9XG5cbiAgaGFzQ2xhc3MgKGNsYXNzTmFtZSkge1xuICAgIHJldHVybiB0aGlzLm5vZGUuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSA+IC0xO1xuICB9XG5cbiAgYWRkQ2xhc3MgKGNsYXNzTmFtZSkge1xuICAgIGlmICh0aGlzLmhhc0NsYXNzKGNsYXNzTmFtZSkpIHJldHVybjtcbiAgICBjb25zdCBuZXdOYW1lID0gYCR7dGhpcy5ub2RlLmNsYXNzTmFtZX0gJHtjbGFzc05hbWV9YDtcbiAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gbmV3TmFtZS50cmltKCk7XG4gIH1cblxuICByZW1vdmVDbGFzcyAoY2xhc3NOYW1lKSB7IFxuICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLm5vZGUuY2xhc3NOYW1lLnJlcGxhY2UoY2xhc3NOYW1lLCAnJyk7XG4gIH1cblxuICB0b2dnbGVDbGFzcyAoY2xhc3NOYW1lKSB7XG4gICAgdGhpcy5oYXNDbGFzcyhjbGFzc05hbWUpIFxuICAgID8gdGhpcy5yZW1vdmVDbGFzcyhjbGFzc05hbWUpIFxuICAgIDogdGhpcy5hZGRDbGFzcyhjbGFzc05hbWUpO1xuICB9XG4gIFxuICBhdHRyIChuYW1lLCB2YWwpIHtcbiAgICBpZih2YWwpIHRoaXMubm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsKTtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgfVxuXG4gIGRhdGEgKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmRhdGFzZXRbbmFtZV07XG4gIH1cblxuICB0ZXh0ICh2YWwpIHtcbiAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSB2YWw7XG4gIH1cblxuICBhcHBlbmQgKGVsZW1lbnQpIHsgXG4gICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKGVsZW1lbnQubm9kZSk7XG4gIH1cblxuICBvbiAoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICB0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XG4gIH1cblxuICB0b29sdGlwICgpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gbmV3IFdyYXBwZXIoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpKTtcbiAgICBlbGVtZW50LmFkZENsYXNzKCd0b29sdGlwJyk7XG4gICAgZWxlbWVudC50ZXh0KHRoaXMuZGF0YSgndG9vbHRpcCcpKTtcbiAgICB0aGlzLmFwcGVuZChlbGVtZW50KTtcbiAgXG4gICAgdGhpcy5vbignbW91c2VvdmVyJywgZSA9PiBlbGVtZW50LmFkZENsYXNzKCd2aXNpYmxlJykpO1xuICAgIHRoaXMub24oJ21vdXNlbGVhdmUnLCBlID0+IGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKSk7XG4gIH1cblxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5BcnJheS5wcm90b3R5cGUuZmxhdHRlbiA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHJlcyA9IFtdO1xuICB0aGlzXG4gIC5mb3JFYWNoKGl0ZW0gPT4gQXJyYXkuaXNBcnJheShpdGVtKSBcbiAgICA/IHJlcyA9IHJlcy5jb25jYXQoaXRlbS5mbGF0dGVuKCkpXG4gICAgOiByZXMucHVzaChpdGVtKVxuICApO1xuICByZXR1cm4gcmVzO1xufVxuIiwiaW1wb3J0ICQgZnJvbSAnLi9xdWVyeSc7XG5cbiQoJ2EnKS5maWx0ZXIoZWwgPT4gZWwuYXR0cignaHJlZicpLmluZGV4T2YoJ2h0dHAnKSAhPT0gLTEpXG4uZm9yRWFjaChlbCA9PiBlbC5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJykpXG5cbiQoJy5naXRodWInKS5mb3JFYWNoKGVsID0+IGVsLnRvb2x0aXAoKSlcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJy4vYXJyYXknO1xuaW1wb3J0IFdyYXBwZXIgZnJvbSAnLi9XcmFwcGVyJztcblxuXG5mdW5jdGlvbiB3cmFwIChub2RlKSB7XG4gIHJldHVybiBuZXcgV3JhcHBlcihub2RlKTtcbn1cblxuZnVuY3Rpb24gZXhlY3V0ZVF1ZXJ5IChxdWVyeSkge1xuICByZXR1cm4gIFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeSkpXG4gICAgICAgICAgLm1hcCh3cmFwKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gJCAoKSB7XG4gIHJldHVybiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykubWFwKGV4ZWN1dGVRdWVyeSkuZmxhdHRlbigpO1xufVxuXG4iXX0=
