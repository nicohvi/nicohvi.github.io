---
layout: post
title: SEO and progressive enhancement for SPAs
draft: false 
---

(For a TLDR of these principles, you can just check out the accompanying github repository[^1])

Consider the following: you've created a dashing single-page application sporting the recent trends in werewolf-themed sweaters (aptly named sweaterwolves.com).

You have a single view (`index.jade`) which renders the HTML, and then your HTTP server provides JSON endpoints which the SPA will consume through client-side javascript.


Your application basically has three pages: the home page containing information about the recent trends, an FAQ page (because there are always questions about these kinds of things), and of course an about page since you want to show the world your handsome face. 

![face](/public/images/posts/face.png)
*Smooth*

Once it's done you settle into your cosy chair and stroke your imaginary cat as you watch the visitors flood in using Google Analytics. But then you notice something disconcerting: hardly anyone visits your about page! 

This is horrible news, how else are you going to meet the werewolf-sweater loving woman of your dreams? You quickly open a new tab and google "werewolf sweaters about" and to your horror realise that the only result you find is a link to your main page.

You sink down to a fetal position on the floor and contemplate the cruelty of fate. Then, you being a determined individual, you decide to do something about it. 

So what do you do? You google it, of course. The problem with this approach is that there are many, *many* different approaches to this particular problem, and they all have various drawbacks and tricks. 

For instance, the approach suggested by Google (in their docs anyway) is to have static HTML-files generated in advance to be served to crawlers and other pages to be served to your regular users. How will it know which is which? Well, all you have to do is to map all fragment keys to their own escaped_fragment URL. 

Sound like a hassle? That's because it is. 

![google-seo](/public/images/posts/google-seo.png)
*Kill me*

Fortunately, there's a better way.

The basic concept behind updating a page with dynamic content is to intercept the click event on a link, send a call to the server based on the URL in the link's href attribute, and once the data has been sent to the client a callback function updates the DOM to reflect the change in state (for an example of this, see the `app.js` file in the gist 31bd7545831dde186ae4 back-button.js %}-->

And just like that you have all the sexy fluidity and dynamic prowess of AJAX and your pages will show up as unique hits in search engines.And, even more importantly some (like me) would argue, your website now supports [progressive enhancement](http://alistapart.com/article/understandingprogressiveenhancement).

The theme-sweater loving girl of your dreams is only a search query away.

---
[^1]: Found [here](https://github.com/nicohvi/spa-seo).
