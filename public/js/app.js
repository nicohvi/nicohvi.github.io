import $ from './query';

$('article a', '.now a', '.book a', '.project a', '.ext')
.filter(el => !el.hasClass('footnote') && !el.hasClass('reverseFootnote'))
.forEach(el => el.attr('target', '_blank'))

$('.github').forEach(el => el.tooltip())

