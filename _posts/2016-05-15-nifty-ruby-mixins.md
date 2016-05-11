---
layout: post
title: Nifty ruby mixins
draft: true
---

Recently I undertook a ruby coding challenge, and it's been a while since
I've left javascript land. I've really grown to love the possibilities
for functional programming in javascript (the arrow functions[^1] in the ES2015
specification is a personal favourite), and I found myself immediately
wanting to employ these new tools in the ruby challenge.

This proved to be somewhat problematic, because while ruby is a beautiful
language it hardly lends itself well to functional programming. For one you cannot
pass functions to other functions (you can pass blocks[^2] though), and it's really, **really**
easy to mutate state. Found that out the hard way.

Did you, for instance, know that since everything in ruby is an object

<everything is mutable>
<immutable module>
<findable module>
<functional style>
