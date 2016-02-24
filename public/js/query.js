'use strict';

import './array';
import Wrapper from './Wrapper';


function wrap (node) {
  return new Wrapper(node);
}

function executeQuery (query) {
  return  [].slice.call(document.querySelectorAll(query))
          .map(wrap);
}

export default function $ () {
  return [].slice.call(arguments).map(executeQuery).flatten();
}

