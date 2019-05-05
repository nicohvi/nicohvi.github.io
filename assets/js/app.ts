import $ from './query';
import * as R from 'ramda';
import { IWrapper } from './Wrapper';
import './prism';

$('pre > code').forEach(node =>
  R.path<Element>(['node', 'parentNode'], node)!.classList.add('line-numbers')
);

$('a')
  .filter(el => el.attr('href')!.indexOf('http') !== -1)
  .forEach(el => el.attr('target', '_blank'));

$('.github').forEach((el: IWrapper) => el.tooltip());

$('nav')
  .pop()!
  .on('click', () =>
    $('nav')
      .pop()!
      .toggleClass('active')
  );
