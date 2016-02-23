'use strict';

import './array';

function getById (id, parent) {
  return parent.getElementById(id);
};

function getByClass (className, parent) {
  return parent.getElementsByClassName(className);
}

function getElement (selector, parent) {
  return parent.getElementsByTagName(selector);
}

function get (selector, parent) {
  const type = termType(selector);
  let res;
  switch(type) {
    case 'id':
      res = getById(selector.slice(1), parent);
      break;
    case 'class':
      res = getByClass(selector.slice(1), parent);
      break;
    default:
      res = getElement(selector, parent)
  }
  return [].slice.call(res);
}

function termType (term) {
  return term.charAt(0) === '#' ? 'id' : term.charAt(0) === '.' ? 'class' : '';
}

function filterByTerm (node, term) {
  const type = termType(term);
  
  switch(type) {
    case 'id':
      return node.id === term.slice(1);
    case 'class':
      return node.className === term.slice(1);
    default:
      return node.tagName.toLowerCase() === term;
  }  
}

function filter (node, terms, i) {
  // passed in root as context
  if( i < 0 ) return true;
  return node.parentElement
    ? filter(node.parentElement, terms, --i)
    : filterByTerm(node, terms[i]);
}

class Wrapper {

  constructor (node) {
    this.node = node;
  }

  hasClass (className) {
    return this.node.className.indexOf(className) > -1;
  }

  addClass (classes) {
    console.log('implement');
  }
  
  attr (name, val) {
    this.node.setAttribute(name, val)
  }

}

function wrap (node) {
  return new Wrapper(node);
}

export default function $ (query) {
  const terms = query.trim().split(' ');
  const selector = terms[terms.length-1];
  if(terms.length === 1) return get(selector, document);
 
  const context = terms.slice(0, terms.length-1);
    
  let i = context.length -1;
  let cands = get(context[i], document);
  
  return cands
    .filter(cand => filter(cand, terms, --i) )
    .map(cand => get(selector, cand))
    .flatten()
    .map(wrap);
}

