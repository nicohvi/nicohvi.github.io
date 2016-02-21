---
layout: post
title: How to create a google login for your next ruby web app
draft: true
date: 2016-03-01 +0100
---

Say you've got a great idea for a new website. Maybe you and your 
friends have decided to undergo a 30-day challenge, and you want a place
where you can brag about your achievements and give each other feedback (and
let's not use facebook because that's for old people).

So, being a programmer, you decide that "what the hell, I'll just make it". 
And so you sit down at your ergonomic desk, draw up the basic relationships
between your domain objects on a sheet of paper and off you go.

<!-- Crude drawing of domain objects -->
<img>

Then you run into the inevitable problem of *authentication*. You want to ensure
the posts made by your friends are actually made by *them*, and not some random
person on the internet who wants in on your challenge. Fuck that guy, amirite?

Well, this shouldn't be that much of a problem. 
You just add a `password` field to your
user model, right? Hmm, and maybe a `password_confirmation`, because it just 
seems sloppy to allow the user to type in his password *once* and then be
done with it - what if that idiot spells it wrong? 

But wait - you really, *really* shouldn't store your passwords as cleartext
in your database (eh, [Sony](http://arstechnica.com/tech-policy/2011/06/sony-hacked-yet-again-plaintext-passwords-posted/)?). What you *should* do is to create
a hash of your password using a good encryption algorithm. That way, if anyone
out there in the vast sphere of cat gifts and pornography called the internet 
gets access to your database all he can see is a bunch of jibberish.

<!-- Eminem jibberish -->
<img>

So how do you do this? 

I really like to use [bcrypt](), which you get out of the box if you're using
Rails. Okay, that's the passwords taken care of - but, wait: what if the user has
forgotten his password? He should have the option to reset it, right? That means
you need to be able to send out emails and - *ugh*.

So, yeah - this is all kinda annoying, and can be a hassle to set up *properly*. But seeing as this is a **universal problem**, you'd think that someone has fixed
it already, right? Someone like Google or something.

The good news is that they totally have. The bad news is that it's based on the
[oauth]() standard (in order to stay secure), which can be a real mind-fuck to
wrap your head around. Luckily Google is an [OpenID provider](), which means 
that users that have a Google account can use that account to identify 
themselves following the OpenID Connect specification.

Google, being pretty smart, has reduced this seemingly complicated process
into three basic steps:

1. 	You send an HTTP `GET` request to Google's authentication servers,
		requesting that the user logs into his Google account.
2.	When the user has logged in, you receive a response from Google's
		authentication servers containing an `authentication_code`.
3.	In your callback handler, you send a HTTPS `POST` request to
		Google's servers to exchange this code for an `id_token`.

This id token contains the user information you want.

Notice how that last request used `HTTPS`? That's important. This is 
because SSL (which is the security layer HTTPS uses) encrypts the channel
and thus doesn't allow any potential third party sniffers to see the 
`authentication_code` or `id_token` in cleartext.

Once we receive our `id_token?` (which is a [JWT]()) we simply decode it,
and then we can validate the user information against what we have stored
in our own database. We're done!

<!-- funny image. Text: image not related -->
<img>

There are a lot of [gems]() to do this sort of thing, but it's actually
really simple to do yourself, and it's my opinion that if you can do something
yourself (and learn from it) - then fucking do it yourself.

The first step is the enable the Google+ API in your [google developer console](
) and generate a `client_id` and `client_secret`, you need these for your calls
to Google's servers. There's a very good and detailed description of all the
setup you need [here]().

Once your setup is complete, you simply implement the HTTP requests in
your web application.

Here's an example using [sinatra](http://sinatrarb.com).

{% gist 11b3bc9414180db6bbfc %}

You can literally copy/paste that, enter your own `client_id` and `client_secret`
, run it on your local computer, and go to `localhost:4567` to see a 
working example. It's **that** easy.

You're welcome.

