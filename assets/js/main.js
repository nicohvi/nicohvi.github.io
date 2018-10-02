import $ from './query';
import * as R from 'ramda';
$('pre > code').forEach(code => {
  R.path(['node', 'parentNode'], code).classList.add('line-numbers');
});
import Prism from './vendor/prism';

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

// Prism hooks
Prism.hooks.add('after-tokenize', function(env) {
  if (env.language !== 'ts') return;

  for (var i = 0; i < env.tokens.length; i++) {
    var token = env.tokens[i];

    if (token.type === 'string') continue;
    if (token.type === 'operator' && /^[<]$/.test(token.content)) {
      const keyword = env.tokens[i + 1];
      if (keyword.type) continue;
      env.tokens[i + 1] = new Prism.Token('constant', keyword);
    }
    if (token.type === 'punctuation' && token.content === ':') {
      const keyword = env.tokens[i + 1];
      if (keyword.type) continue;
      env.tokens[i + 1] = new Prism.Token('constant', keyword);
    }
  }
});

Prism.highlightAll();
