import $ from './query';
import prism from 'prismjs';

$('a')
  .filter(el => el.attr('href').indexOf('http') !== -1)
  .forEach(el => el.attr('target', '_blank'));

$('.github').forEach(el => el.tooltip());

$('nav')
  .pop()
  .on('click', () =>
    $('nav')
      .pop()
      .toggleClass('active')
  );

prism.highlightAll();
