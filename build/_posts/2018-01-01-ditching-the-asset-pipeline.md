---
layout: post
title: Ditching the asset pipeline
draft: true
sitemap: false
---

There's a lot of things to love about Rails: it greatly speeds up developement
by giving you a scaffold to work from, it has countless helper methods for
working with strings and dates - need a Date representing 30 days in the future?
No worries, just type `30.days.from_now`. Or maybe you want to convert
a JSON object with keys in [camelCase](https://en.wikipedia.org/wiki/Camel_case)
to [snake_case](https://en.wikipedia.org/wiki/Snake_case)? `String.underscore`
has you covered.

However, there's something that's always bugged me about Rails development: the
[asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html).

So, what is it? Let's check out the docs:

«The asset pipeline provides a framework to concatenate and minify or compress JavaScript
and CSS assets. It also adds the ability to write these assets in other languages and
pre-processors such as CoffeeScript, Sass and ERB. It allows assets in your application
to be automatically combined with assets from other gems. For example, jquery-rails
includes a copy of jquery.js and enables AJAX features in Rails.»

Please take note of that last sentence. You need to include a third-party library written
in **ruby** to use a JavaScript library. To me, that simply doesn't make sense at all.

The asset pipeline does have some nice features: not only does it concatenate all
CSS and JS assets into one file (through a manifest file), it also inserts a SHA256 fingerprint
into each file name (of _any_ asset - be that JS, CSS, fonts, or images) so they can be safely cached
by the browser. Since this fingerprint is based on the file's content it will be changed whenever the
contents change, invalidating the cache - nifty!

However, all these features can be obtained through using tools natively written in
JavaScript (and run through Node.js) which, in my opinion, makes more sense - you're using JavaScript
to bundle together (mostly) JavaScript. The absolutely insane speed of toolchain development in
the Node ecosystem also ensures that these tools are constantly updated and improved ensuring
you achieve a fast build time.

Additionally, in order to properly use the asset pipeline you need to (like so much with Rails)
embrace its conventions. You need a manifest file which adheres to a certain syntax of
directives (`//=` for JavaScript and `*=` for CSS). and call functions like `require_self`
and `require_tree`.

This is because the asset pipeline uses [sprockets](https://github.com/rails/sprockets) underneath
the hood, and these directives are parsed in sprocket's `DirectiveProcessor`[^1].

There's nothing inherently _bad_ about this approach. Though there are many who
have problems utilising the asset pipeline correctly (there are 7,298 questions regarding the
asset pipeline on StackOverflow ATOW) when it works, it simply _works_.

However, if you want to have more fine-grained control over your assets, and you feel like
it's silly to have to wait for third-party libraries written in ruby in order to use
JavaScript features there already are several working Node tools for - then this article is for you.

There are certainly other tools that touch upon the same subject, like
[browserify-rails](https://github.com/browserify-rails/browserify-rails) and
[webpacker](https://github.com/rails/webpacker), but the approach outlined below will get rid of the
asset pipeline _entirely_ - focusing only on using the latest Node tools to achieve the best
developer experience.

As any frontend developer will tell you: setting up your frontend build chain can be frustrating,
[really frustrating](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f).
If you spend some time reading up on the available tools you'll be able to avoid the worst
headaches, and you're in luck because that's literally what you're doing at this very moment. Well
played.

First of all, we need to separate between two concepts: **task runners** and **build tools**.

Task runners perform tasks you define in some configuration file and return the results. Examples
of task runners are [gulp](), [grunt](), and even yarn/npm.

Build tools on the other hand focus solely on taking source code as input and spitting out
usable assets as output. Examples of build tools are [browserify](), [webpack](), and recently
[parcel](). There is some overlap between these two groups of tools, but I find it very helpful
to try to keep them as separate entities in your mental model.

The build tools aren't necessarily needed at first - they might

---

[^1]:

  [Link](https://github.com/rails/sprockets/blob/983b53c1d114575b28a58cc91b99abd302c47cae/lib/sprockets/directive_processor.rb)
