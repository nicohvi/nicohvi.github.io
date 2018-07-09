---
layout: post
title: JavaScript/TypeScript and Rails i18n
draft: false
sitemap: true
---

One feature I _really_ enjoy about Ruby on Rails is its i18n feature.
Need to show some text in a different language? No problem, just add a YAML
file to `config/locales` and the i18n library picks it up - all you need to do
is provide a key with the same name as the locale you set.

```ruby
config.locale = :cat

# cat.yml
cat:
  greeting: I don't greet humans
```

Wouldn't it be nice to have the same powerful capabilities for our JavaScript/TypeScript code
as well?[^1] That's exactly what we did for all our client-side applications at [Brevio](https://www.brevio.com).

In order to do this we need to convert the `.yml` files Rails uses to JSON so they can be used by our TS code. First off, we off we add a task in our `package.json` file.

```json
"scripts": {
  "translate": "gulp translate"
}
```

Two quick notes:

1.  I'm using [gulpjs](https://gulpjs.org) as my task runner, but you can use whichever tool you're most comfortable with[^2].

2.  I prefer to have [multiple i18n files](http://guides.rubyonrails.org/i18n.html#organization-of-locale-files) for my translations, since that reduces the mental load whenever I have to change/add a translation (i.e. if I need to add a translation for something user specific I'll look in `user.yml` instead of `nn.yml` and scan down all nested rows of translations - which can get daunting as your application grows).

The gulp script needs to find the various `.yml` files and convert them to JSON. This is done using [js-yaml](https://github.com/nodeca/js-yaml), which reads YAML files and produces a JSON object (using a function called `safeLoad`).

```javascript
function translate() {
  const path = // ... path to your locales folder
  const jsonPath = // ... path to your JSON-file for the JS app
  log('Merging all translations');
  glob(path, (err, files) => { // using the glob library to read all files.
    if(err) throw new Error(err);
    const result =
      R.reduce((res, json) => R.mergeDeepRight(res, json),
        R.map(yaml.safeLoad,
        R.map(name => fs.readFileSync(name, 'utf-8'), files)));
    log('Writing translations to JSON file');
    fs.writeFileSync(jsonPath, JSON.stringify(result));
    log('Translations complete')
  })
}
```

This task can easily be extended to be run on-the-fly like so:

```javascript
function translate(watch = false) {
  const path = // ... path to your locales folder
  const jsonPath = // ... path to your JSON-file for the JS app

  function run() {
    // ... previous function body
  }

  if(watch) gulp.watch(path, run)
  return run();
}
```

Once the `translate` task has completed you'll have a lovely JSON file containing all your i18n-translations:

```json
{
  "cat": {
    "greeting": "I don't greet humans"
  }
}
```

Which can be used by your TS code like so:

```typescript
import translations from './translations.json';

export default function translate(key: string) {
  return R.path(key.split('.'), translations);
}
```

This way you can easily add i18n to any React (for instance) components using the following syntax:

```typescript
import t from '@t';

const CatComponent = () => (
  <div className="cat-greeting">
    <h1>{t('cat.greeting')}</h1>
  </div>
);

// <div class="cat-greeting"><h1>I don't greet humans</h1></div>
```

Nifty!

---

[^1]: TypeScript is obiously the best choice.
[^2]: [This](https://blogg.bekk.no/scaling-frontend-build-steps-by-necessity-9091e9eff952) is worth a read.
