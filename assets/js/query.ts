import * as R from 'ramda';
import Wrapper, { IWrapper } from './Wrapper';

function wrap(node: HTMLElement) {
  return new Wrapper(node);
}

function executeQuery(query: string) {
  return [].slice.call(document.querySelectorAll(query)).map(wrap);
}

export default function $(query: string): IWrapper[] {
  return executeQuery(query);
}
