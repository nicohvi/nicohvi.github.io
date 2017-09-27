import $ from './query';

$('a').filter(el => el.attr('href').indexOf('http') !== -1)
.forEach(el => el.attr('target', '_blank'))

$('.github').forEach(el => el.tooltip())

