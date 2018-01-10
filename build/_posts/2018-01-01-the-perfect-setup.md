---
layout: post
title: The perfect setup
draft: false
sitemap: true
---

The holy grail amongst developers is the perfect setup of new projects. Of course,
there exists no such thing (sorry to disappoint), and addtionally each _perfect_ setup
will vary from person to person.

Do you enjoy working with F#? Then your choice of setup might be the [SAFE]() stack.
Maybe you think [Elixir]() looks interesting? Then defintively check out [Phoenix](). Or maybe
you fancy yourself a real bleeding-edge kind of guy and want to test out [Crystal]() - then
I think [Lucky]() from [Thoughtbot]() looks very promising.

Or, heck, maybe you want to go [all-in on JavaScript]().

I've found it very hard to leave ruby, even though I've had to fight the language
on occasion to suit my needs (I especially find the syntax for lambdas leaves a lot
to be desired) I still think it's absolutely **gorgeous**. And in the end, _developer happines_
is what really matters where productivity is concerned.

There is one thing that all web applications have in common these days though, and that
is the _front-end pipeline_. Wheter you use [Elm](), [TypeScript](), or plain ol' JavaScript
you still need to concatenate, minimise and modularise your code if you hope to ship
quality software.

The same goes for CSS obviously - so that means we will always needs tools that can
accomplish these tasks for us.

This space has been notoriously known as the most fast-paced (in mostly a bad way) aspect
of front-end development, often times making tools you've just learned obsolete in a
number of months - even weeks.

Grunt, Gulp, Broccoli, Browserify, Watchify, Webpack, Brunch, Elm, Babel, and now recently Parcel -
these are all tools that can accomplish the same tasks (some more so than others) that
often have a steep learning curve for the novice developer.

And that's just to mention the tools within the `node` ecosystem. There's also tools like Sprockets,
BundleConfig, Django Pipeline, et. al. Whenever I interacted with JavaScript through another langauge
it always felt intrinsically _wrong_, in addition to the fact that you couldn't simply use the new
features of, for instance, Babel whenever they became available - you had to wait until the tool
within your ecosystem (be that Rails or Django) had been patched to support them.

Due to this I decided some time ago that I'd simply ditch these built-in tools and instead use the ones
provided by `node` - which, after all, is JavaScript.

The problem with this, of coure, is the aforementioned plethora to choose from (and the fact that your
choice soon could become obsolete). [Analysis paralysis]() is a common problem for developers, and
I feel it's especially prevalent in the JavaScript scene.

In my experience, it's better to simply pick a tool, become proficient in it, and then
keep an eye out for new tools, but _do not change until it has been demonstratively
proven beyond doubt that these tools will improve your workflow._ It is far too common
to see new tools introduced into a workflow that simply solve the _exact_ same problems as
before, only in a slightly different way.
