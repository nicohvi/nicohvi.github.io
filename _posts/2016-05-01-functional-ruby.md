---
layout: post
draft: true
date: 2016-05-01 +0100
---

I've been really into javascript lately, mainly because it makes
it easy to write in a functional style due to attributes like functions 
being first-class citizens, and nifty functions like Array.map and
Object.assign for cloning objects.

I was recently completing a test assignment in ruby, and I found myself
wanting to emulate the functional style I was using for javascript
projects[^1].

For instance, say you wanted to create a simple checkout system, with
rules for the various items in your store. To keep things simple, 
let's assume you just sell three things: pokemon cards, chewing gum,
and soda.

---
[^1]: Currently using [redux]() and [elm]().
