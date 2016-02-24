import $ from './query';

$('article a', '.book a', '.project a')
.filter(el => !el.hasClass('footnote') && !el.hasClass('reverseFootnote'))
.forEach(el => el.attr('target', '_blank'))

$('.github').forEach(el => el.tooltip())

