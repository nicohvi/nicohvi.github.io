'use strict';

Array.prototype.flatten = function () {
  let res = [];
  this
  .forEach(item => Array.isArray(item) 
    ? res = res.concat(item.flatten())
    : res.push(item)
  );
  return res;
}
