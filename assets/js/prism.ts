import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-ruby';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

// Prism hooks
Prism.hooks.add('after-tokenize', function(env) {
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
