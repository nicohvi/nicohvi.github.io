import $ from './query';

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

function addClassesBasedonSiblings(el) {
  const [prev, next] = [
    el.node.previousElementSibling,
    el.node.nextElementSibling
  ];
  let result = [prev, next]
    .filter(el => el)
    .map(sibling => sibling.innerHTML)
    .filter(
      text =>
        text === '(' ||
        text === ')' ||
        text === ',' ||
        text === '.' ||
        text === '()'
    );
  if (result.length === 0) return;
  if (prev.innerHTML === 'function') return el.addClass('func-def');
  // function calls
  if (next.innerHTML === '(' && !prev.innerHTML === '.') return;
  if (next.innerHTML === '.') return el.addClass('obj');
  // function calls on objects
  if (prev.innerHTML === '.') return el.addClass('func-invoke');

  return el.addClass('func-param');
}

function isColon(el) {
  return el.node.innerHTML === ':';
}

function clauseTypeOf(el) {
  return el.node.previousElementSibling.innerHTML === 'typeof';
}

// mute func params
$('.highlight .nx').forEach(addClassesBasedonSiblings);

// highlight object keys
$('.highlight .p')
  .filter(isColon)
  .forEach(el => el.addClass('colon-key'));

// remove highligh in typeof clause
$('.highlight .nx')
  .filter(clauseTypeOf)
  .forEach(el => el.addClass('clause'));
