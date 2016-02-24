---
layout: post
title: A simple javascript setup
draft: false
date: 2016-02-24 +0100
---

Recently I wanted to add some javascript to a project of mine. 

I've grown fond of using various ecmascript 6 features on other
projects ([arrow functions](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-arrow-functions/) and [modules](https://eviltrout.com/2014/05/03/getting-started-with-es6.html) especially), so transpilation
of ecmascript 6 was necessary.

Additionally I wanted to concatenate my transpiled javascript into one file 
(to rule them all) so my clients' browsers wouldn't have to 
DDOS my server getting my delicious javascript, **and** I wanted it
re-transpiled and concatenated on-the-fly as I made changes to my code.

Commonly this is the place where people install some sort of build tool[^1],
but I wanted to see if could skip that extra layer of complexity and simply
use npm for my needs.

I mean there's no need to build a mansion if an outhouse will do.

![outhouse](/public/images/posts/outhouse.jpg)
*It can even be a fancy outhouse with angel wings.*

To solve my three direct requirements (ecmascript 6, concatenation, and on-the-fly 
transpilation) I needed a total of *three* external dependencies: [babel](https://babeljs.io),
[browserify](https://browserify.org), and [watchify](https://github.com/substack/watchify)[^2].

If you wonder why I needed a module loader (like browserify) in addition to babel it's because
the ecmascript 6 modules aren't yet supported by browsers, and babel translates them into
CommonJS modules by default. Thus I need to resolve the dependencies introduced by these
modules, which is **hard**. So we use a module loader instead!

Though these three external dependencies came at the cost of **32MB**, I'm still
doing pretty good on dependency management (I mean, they would've been a necessary part of my
pipline anyway) as well as avoiding the extra layer of complexity introduced by a build tool.

After installing the dependences I can add the following to my `package.json` file:

{% highlight json %}
"scripts": { 
  "js": "watchify app.js -t babelify -o bundle.js"
}
{% endhighlight %}

And I'm done!

Now I can type `npm run js` into my console and I write amazing ecmascript 6 
compliant code like this[^3]:
 
{% highlight javascript %}
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
{% endhighlight %}

Babel will transpile it into ecmascript 5 compliant code, browserify concatenates all
my transpiled files into one, and watchify in turn ensures everything is being re-transpiled
and concatenated on-the-fly.

## In summary

It's night impossible to write modular javascript using ecmascript 6 
features without having *some* external dependencies, and that's fine
because thankfully there are [crazy effecient developers](https://github.com/substack) who create open source
libraries we can use. 

However, it's important to remember to not simply
include a library because "that's what every body else is using" when 
you can accomplish the same thing with your existing tools[^4], because they **come at a cost**. 
Both in terms of complexity and megabytes.

In the ever-growing world of javascript libraries you must fight
to retain your sanity, and simplicity is the spikiest mace in your armoire.

---

[^1]: Like [gulp](https://gulpjs.com), or [grunt](https://gruntjs.com).
[^2]: Actually I need to use something called [babelify](https://github.com/babel/babelify) to make browserify and babel play together nicely. You also need to include some [presets](https://babeljs.io/docs/plugins/#presets) in babel 6.
[^3]: Please ignore the fact that the syntax highlighting is a bit wonky, [pygments](https://pygments.org) doesn't support ecmascript 6 that well yet.
[^4]: A colleague of mine wrote an [interesting blog post](https://open.bekk.no/scaling-frontend-build-steps-by-necessity) about this recently.
