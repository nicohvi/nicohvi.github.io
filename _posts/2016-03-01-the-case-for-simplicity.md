---
layout: post
title: The case for simplicity
draft: true
date: 2016-02-01 +0100
---

Something that truly annoys me is the world of front-end build systems.
Whether you're using `gulp`, `grunt`, `webpack`, `fly`, `broccoli` or `cthulhu` (one of those is a fake
btw, though I bet cthulhu.js is right around the corner[^1]) there's nothing
quite like learning a new DSL in order to add some files together which
will be obsolete before you finish reading this sentence.

There are even [scaffolding tools](http://yeoman.io) which help you link them all together
with their various configs and `.jsons` so I'm guessing I'm not the only one
having a problem keeping them all straight. 

Now I don't mean to say there's anything inherently *bad* about front-end
build systems, it's just that many times they're completely uncecessary. Why build
a mansion when all you need is an outhouse.

So, what do?

If you're an elitist jerk like myself you enjoy simplicity, and in the land of 
`npm install` this is rather hard to come by. Especially if you want some of the
fancy features like [arrow functions](http://exploringjs.com/es6/ch_arrow-functions.html) or [module import/export statements](http://exploringjs.com/es6/ch_modules.html) from
Ecmascript 6 (I refuse to use the 2015 notation, because *ugh*).

Recently I faced the problem of "I want to write some simple javascript for this
project, *and* I want to use Ecmascript 6 features". 

Though I think javascript is a beautiful language ([haters gonna hate](http://giphy.com/gifs/dancing-happy-new-girl-74Mdfuy08qylO/tile)) it
hardly makes it easy to write modular code without polluting the global namespace.
Also, unless you want your users to DDOS your server with HTTP
requests it's a really good idea to combine all your javascript files into *one* 
file (to rule them all).

My first instinct was to do this all in ruby (because ruby is amazing). Now this
isn't a problem if you're using plain old vanilla javascript, **but** if you've 
fallen for the sweet allure of ecmascript 6 features like arrow functions et. al.
(hard to resist, I know) then you're shit out of luck because you need 
to transpile those bad boys.

So after wondering "hey, how hard could it be to transpile ES6 to ES5 using ruby"
(can't believe no one's thought of this yet) for about ten minutes I 
realised that I'd have to create my own gem ([sprockets](https://github.com/rails/sprockets) is a bit big for such
a small task) and that I'd be better off just using good ol' [babel]().

However, after transpilation another problem rears its ugly head: how can I 
*concatenate* these transpiled files into one, so my clients' poor browsers only 
have to make one HTTP request to get my delicious javascript?

Dependency injection is no joke, and there's no easy way around this. Thus I was
forced to install an external dependency (*shudder*) to get the job done.
I think [browserify]() is absolutely brilliant (and hassle free) so I chose that
even though some people will probably say "omg wait webpack or cthulhu is 
much better". Fuck you. 

Prefreably I'd have *no* build tool for dependencies at all (ah, the simplicity
beckons) - but that's not really feasable at this point in time. Some glorious 
day when [HTTP/2 arrives]() I'll pop the champagne.

Now for the sad part: installing said dependencies. 

As I stated initially I want to enforce the minimum amount of dependencies
that allow me to **1**: write Emcascript 6 compliant code and **2**: concatenate said
code to *one* javascript file. To do this I require `browserify`, `babelify` 
(which is a [transform]() for browserify, allowing me to *transform* my 
Ecmascript 6 code into Ecmascript 5), and `watchify` so it can be transpiled
on the fly.

That last dependency isn't *strictly* necessary, but it makes life sooo much
easier.

So I run `npm install browserify babelify watchify` and watch my `node_modules`
folder gorge itself like some starved tourist at an all-you-can-eat buffet. 
Browserify alone has **47** dependencies, which in-turn have their own 
dependencies until it all turns into a ridiculous russian doll situation.

Once the installation process is complete I have the worryingly lagre number of
**247** directories within my `node_modules` folder, which now sits at an
impressive size of 33MB. For reference the first Pokemon game was [372KB]().

And that's *without* a build system.

After installing my 248 dependencices however, I am good to go!

Now I can write fancy code like this (please ignore the fact that the 
highlighting is a bit off, ecmascript 6 isn't really that well 
supported by [pygments]() yet):

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

Babel will transpile it for me, while browserify concatenates all
my javascript files into one. Watchify in turn re-transpiles on the fly
using this simple command:

`watchify app.js -t babelify -o public/bundle.js`

`app.js` is the entry-point for the application, `babelify` is the
only transformer I need, and `bundle.js` is the file I'll reference
from the HTML.

It might require 88 Pokemon Red games, but now I can write all the
Ecmascript 6 code I want without having to define a single gulp task. 

Victory!

**PS**: For giggles I installed gulp to see how many more dependencies
that would include (without installing `gulp-browserify`, 
`gulp-watchify`, `gulp-cthulhufy` etc. which I'd be forced to 
eventually) and that alone added **99** new dependencies. Jesus.

---

[^1]: Of course there's already an [npm package](https://www.npmjs.com/package/cthulhu) named that.
