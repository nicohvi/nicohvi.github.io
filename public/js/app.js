import $ from './query';

$('article a').concat($('.book a'))
.filter(el => !el.hasClass('footnote') && !el.hasClass('reverseFootnote'))
.forEach(el => el.attr('target', '_blank'));
