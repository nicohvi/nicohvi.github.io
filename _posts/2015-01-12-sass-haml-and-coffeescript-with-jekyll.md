---
layout: post
title: Sass, haml, and coffeescript with Jekyll
draft: false
---

Having a static website is a pretty sweet gig.

They require minimal effort to maintain, and with tools like [Jekyll](http://jekyllrb.com) they are incredibly easy to create. You can also opt to host them through [Github pages](https://pages.github.com), which will get you up and running literally within minutes.

However, if you're coming from regular web development (perhaps using the lovely Ruby on Rails framework) you might be used to preprocessors generating your static files. You might consider typing *actual HTML* to be dirty and beneath you. I totally agree.

Luckily for elitist jerks such as ourselves there's a way to use these tools with Jekyll. 

---

[Sass](https://sass-lang.org) is the easiest, since Jekyll already supports it out of the box. Simply specify the location of your **.scss** files in your configuration, add your **.scss** files to the specified directory and add a couple of triple dashes at the top of the file you want the resulting css to end up in (like **public/application.scss** for instance).


To see an example of what the processed file looks like, [click here](/public/application.css).

---

Well, that was easy enough. Unfortunately, using things like [coffeescript](http://coffeescript.org) and [haml](http://haml.info), which in my opinon makes web development *a lot* more enjoyable[^1], requires a bit more work.

Jekyll does support coffeescript out of the box as well, but not nearly as well as sass. For instance, there's no way to concatenate several files during compilation, which is sort of a deal breaker. There simply isn't any support for haml (there are [plugins](https://github.com/samvincent/jekyll-haml) available owever, but github pages don't allow them, so we'll pretend they don't exist).

To remedy this problem we'll use our insane ruby skills.

*Pictured: Insane skills.*

What we have done here is simply define a manifest file (just like in the [sprockets](https://github.com/sstephenson/sprockets) gem) wherein we specify the order of the files to be compiled (and subsequently concatinated).

In this example, we're reading, compiling and concatenating five files, starting with **_coffee/vendor/bacon.js**, then **_coffee/vendor/jquery.js**, followed by **_coffee/header.coffee** and so on.

The contents of these files are finally stored in the file **public/application.js**. This file can then by minified using the `minify_coffeescript` method.

We can easily do the same thing for haml.


A nice thing about these two methods is that they also log any errors to the console, so that you know when you've nested something illegally in haml.[^2]

I've also defined a `get_relative_path` method which specifies where your haml files are. This is a convenient place to strip out the leading underscore from your layout files.

---

To wrap everything up you can use the lovely [Listen](https://github.com/guard/listen) gem to have your pimpin' script generate your javascript and HTML on the fly.

*Helpful logging statements mandatory*

Now whenever you change one of your coffeescript files the entire *application.js* will be recompiled, and once you edit a haml file the corresponding html file will be generated/updated.

To see the full script in its eternal glory, [click here](https://gist.github.com/nicohvi/82b227685a955f115f05).

You never have to write HTML again - huzzah!

---
[^1]: Javascript ain't too bad, but coffeescript is like javascript's cool cousin who smokes and has girlfriends.
[^2]: i.e. all the time.
