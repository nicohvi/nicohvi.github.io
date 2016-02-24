---
layout: post
title: The case for simplicity
draft: true
date: 2016-02-01 +0100
---

Something that truly annoys me is the world of front-end build systems.

Whether you're using gulp, grunt, webpack, fly, broccoli or cthulhu (one of those is a fake
btw, though I bet cthulhu.js is right around the corner[^1]) there's nothing
quite like learning a new DSL in order to add some files together which
will be obsolete before you finish reading this sentence.

There are even [scaffolding tools](http://yeoman.io) which help you link them all together
with their various configs and `.jsons` so I'm guessing I'm not the only one
having a problem keeping them all straight. 

Now I don't mean to say there's anything inherently *bad* about front-end
build systems, it's just that many times they're completely uncecessary. Why build
a mansion when all you need is an outhouse.

![outhouse](/public/images/posts/outhouse.jpg)
*It can even be a fancy outhouse with angel wings.*

So, what do?

## Define the scope

Well, first off let's define **exactly what it is we actually want**. If you're like 
me and have fallen in love with fancy ecmascript 6 features (I refuse to use the 2015 notation because *ugh*)
like [arrow functions](http://exploringjs.com/es6/ch_arrow-functions.html) or 
[modules](http://exploringjs.com/es6/ch_modules.html) you're gonna need to transpile those bad boys.

Transpilation is no trivial task, so we need an external dependency for that.

Additionally you want to *concatenate* your transpiled javascript into **one** file (to rule them all) 
so your users don't DDOS your server with HTTP requests (it also takes way longer to load your website 
since HTTP has a heavy overhead). HTTP/2 has ambitions to solve these problems, but
that's still a ways off, so for now we need to stick with another external library for handling
our concatenation and dependency injection.

Finally I enjoy live transpilation and concatenation of my code whenever I make
a change. This isn't **strictly** a necessity, but it makes development life 
sooo much easier. 

So, we have **three** defined requirements:

1.  ecmascript 6 transpilation

2.  Concatenation

3.  Live transpilation/concatenation

The go-to for ecmascript 6 (and why not [7 while you're at it](http://technologyadvice.github.io/es7-decorators-babel6/)) transpilation is [babel](https://babeljs.io),
so we add that as the first entry to our list of dependencies. As for concatenation
I've got plenty of experience with [browserify](https://browserify.org) so I'll go with that
even though some people will probably say "omg wait webpack or cthulhu is much better". Fuck you. 

For live transpilation/concatenation the obvious option is [watchify](https://github.com/substack/watchify).

## Actually installing the dependencies

So we need to install three external dependencies, that doesn't sound like too many? right? Right?

Well, due to the incredible fascination with micro-libraries[^2] our dependencies have a 
number of their *own* dependencies - browserify alone has **47** - and they'll need to
install those (which again have their own dependencies) until it all turns into a 
ridiculous russian doll situation.

![fine](/public/images/posts/fine.png)

Running `npm install browserify` will increase your precious project size by 12MB (distributed
on it's **119** russian doll dependencies (henceforth referred to as *RDDs*). In contrast, 
the first Pokemon game was 512KB[^3]. 

You know what, I'll use that as a reference point from now on. 
So, browserify comes in at 24 Pokemon.

Interstingly [babelify](https://github.com/babel/babelify)[^4] almost exactly the same size at 11MB / 22 Pokemon, so with both of them
installed our `node_modules` folder sits at 46 Pokemon total. 

Finally we install watchify which comes in at a whopping 41 Pokemon. Now this large size is due
to the fact that it actually has browserify as one of its dependencies, so it luckly only
increases our project size by 9MB. I mean 18 Pokemon.

So in total we have installed 32MB/64 Pokemon distributed on **212** external dependencies.
And that's *without* a build system.

Anyway, after installing our 212 dependencices we're good to go!

Now we can write fancy code like this (please ignore the fact that the 
highlighting is a bit off, ecmascript 6 isn't really that well 
supported by [pygments](http://pygments.org) yet):

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
and concatenated on the fly with this simple command:

`watchify app.js -t babelify -o public/bundle.js`[^5]

`app.js` is the entry-point for the application, `babelify` is the
only transformer I need, and `bundle.js` is the file I'll reference
from the HTML.

It might require 64 Pokemon, but now I can write all the
ecmascript 6 code I want without having to define a single gulp task - **victory!**

## In summary

It's night impossible to write modular javascript using ecmascript 6 
features without having *some* external dependencies, and that's fine
because thankfully there are [crazy effecient developers](https://github.com/substack) who create open source
libraries we can use. However it's important to remember not to simply
include a library because "that's what every body else is using" when 
you can accomplish the same thing with your existing tools.

In the ever-growing world of javascript libraries you must fight
to retain your sanity, and simplicity is the spikiest mace in your armoire.

**PS**: For giggles I installed gulp to see how many additional dependencies
that would include (without installing gulp-browserify, 
gulp-watchify, gulp-cthulhufy etc. which I'd be forced to 
eventually) and that alone added **99** new dependencies. Jesus.

---

[^1]: Of course there's already an [npm package](https://www.npmjs.com/package/cthulhu) named that.
[^2]: This lovely [blog post](https://medium.com/@Rich_Harris/small-modules-it-s-not-quite-that-simple-3ca532d65de4#.ord2vv650) addresses the issue nicely.
[^3]: [source](https://en.wikipedia.org/wiki/Game_Boy#Technical_specifications).
[^4]: We have to use babelify instead of babel-core to make it play smoothly with browserify.
[^5]: Which can be simplified even further using npm. By adding `"scripts": { "js": "watchify app.js -t babelify -o bundle.js" }` to your `package.json` file you can run the run the command like so: `npm run js`.
