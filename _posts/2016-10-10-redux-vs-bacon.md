---
layout: post
title: Why is javascript development so complicated?
draft: true
sitemap: false
---

Is a question I've asked myself alot. There's been a lot of
fun made out of the fact that the status quo of javascript is
[seemingly changing each week](), and that the framework/library
you learned yesterday will be obsolute tomorrow, but while this
can seem intimidating for sure I think it's also a healthy sign
of progress. 

However, there's another thing that's been bugging me about this.
It seems to me that these tools are growing with increased levels
of complexity (routers, state, history, data-flow) and
the terms used to describe these concepts do the same (props,
mutation, actions, dispatchers, reducers, and so on). And, even
more worryingly, I'd argue that most of the time you don't even
need to consider these things, because what you're making can
easily be accomplished using [more primitive tools]().

However, if you want to create a non-trivial javascript component,
like a music player, you'd surely need to learn all these 
advanced concepts, right? Right?

Not really.

In this blog post I'll give a quick example of how you can create
a simple web player based on the Spotify Web API[^1], using
nothing more than a simple library for XMLHTTPRequests (also 
known as AJAX), and a functional reactive library[^2]. 
