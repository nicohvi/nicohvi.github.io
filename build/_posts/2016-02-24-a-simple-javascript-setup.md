---
layout: post
title: A simple javascript setup
draft: false
date: 2016-02-24 +0100
---

Recently I wanted to add some javascript to a project of mine. 

I've grown fond of using various ecmascript 6 features on other
projects ([arrow functions](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-arrow-functions/) and [modules](https://eviltrout.com/2014/05/03/getting-started-with-es6.html) especially), so transpilation
of ecmascript 6 was something I really wanted.

Additionally I wanted to concatenate my transpiled javascript into one file 
(to rule them all) so my clients' browsers wouldn't have to 
DDOS my server getting my delicious javascript, **and** I wanted it
re-transpiled and concatenated on-the-fly as I made changes to my code.

Commonly this is the place where people install some sort of build tool[^1],
but I wanted to see if could skip that extra layer of complexity and simply
use npm for my needs.

I mean there's no need to build a mansion if an outhouse will do.

<img class="flex float-center" src="/public/images/posts/outhouse.jpg" />
*It can even be a fancy outhouse with angel wings.*

To solve my three direct requirements (ecmascript 6, concatenation, and on-the-fly 
transpilation) I needed a total of *three* external dependencies: [babel](https://babeljs.io),
[browserify](https://browserify.org), and [watchify](https://github.com/substack/watchify)[^2].

If you wonder why I needed a module loader (like browserify) in addition to babel it's because
the ecmascript 6 modules aren't yet supported by browsers, and babel translates them into
CommonJS modules by default. Thus I need to resolve the dependencies introduced by these
modules, which is **hard**. So we use a module loader instead!

These three external dependencies come at the cost of **32MB**, but that's just
something we'll have to live with these days if we want fancy transpiled 
ecmascript 6. Adding something like `gulp` into the mix not only introduces another
layer of complexity, but it will also signifcantly increase[^3] the bytes used by our
poor old `node_modules` folder.

After installing the dependencies I can add the following to my `package.json` file:

```json
"scripts": { 
  "js": "watchify app.js -t babelify -o bundle.js"
}
```

And I'm done!

Now I can type `npm run js` into my console and write amazing ecmascript 6 
compliant code like this[^4]:

```js 
// Pokemon.js
export default const Pokemon = {
  all () {
    // returns an imaginary array of pokemon
  }
}

// app.js
import Pokemon from './Pokemon';

const myPokemon = Pokemon
    .all() 
    .filter(pokemon => pokemon.level === 100);

myPokemon
  .forEach(pokemon => {
    console.log(`name: ${pokemon.name} level: ${pokemon.level}`)
  });
```

Babel will transpile it into ecmascript 5 compliant code, browserify concatenates all
my transpiled files into one, and watchify in turn ensures everything is being re-transpiled
and concatenated on-the-fly.

## In summary

All you need to write modular javascript using ecmascript 6 features 
are three external dependencies, npm can handle the rest. It's important
to remember that you needen't introduce another layer of complexity just
because "that's what everybody else is doing" when you can accomplish
what you need with your existing tools[^5].

Because external dependencies come at a cost, both in terms of complexity and megabytes.

In the ever-growing world of javascript libraries you must fight
to retain your sanity, and simplicity is the spikiest mace in your armoire.

---

[^1]: Like [gulp](https://gulpjs.com), or [grunt](https://gruntjs.com).
[^2]: Actually I need to use something called [babelify](https://github.com/babel/babelify) to make browserify and babel play together nicely. You also need to include some [presets](https://babeljs.io/docs/plugins/#presets) in babel 6.
[^3]: Gulp sits at about 5MB by itself, but it requires various [additional libraries](https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-transforms.md) to be of use in this context.
[^4]: Please ignore the fact that the syntax highlighting is a bit wonky, [pygments](https://pygments.org) doesn't support ecmascript 6 that well yet.
[^5]: A colleague of mine wrote an [interesting blog post](https://open.bekk.no/scaling-frontend-build-steps-by-necessity) about this recently.
