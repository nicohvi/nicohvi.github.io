---
layout: post
title: Ruby 2.1, capybara-webkit 1.3, and Windows 7
---

Ever felt the need to test what *actually* happens when Bob clicks your amazing button? Does it properly render the marquee text? Was your effort to hijack Bob's bank session successful? How can you know?

Using [capybara](), that's how.

Capybara is a ruby gem which simulates a real user interacting wtih your web application. It accomplishes this by creating a browser process based on the driver you use (it can use [selenium]() to talk to Firefox for instance), and then manipulate the DOM rendered by the browser. You can also perform headless testing by using a driver which only creates a rendering engine process rather than a browser process, like [Poltergeist]().

A good case for using headless testing is that they are **much faster** (since a rendering engine process is smaller than a browser process), so that's what I'm fond of using. I don't think there's much difference between the aforementioned Poltergeist and [capybara-webkit](), but I was recently required to set up a project using the latter so that's the one I'll discuss.[^1]

It's pretty straightforward to set up on OS X and Linux - in fact there's a nifty [guide]() for you to follow. "Hey, there's a section about Windows in there as well!" you might say out loud, thinking that I'm an idiot who's writing a blog post about something that's already been covered in the wiki. Well, my past two days of misery beg to differ.

In order to not forego any steps necessary, we're going to take this step by step:

1. Install Ruby and the Ruby Devkit

2. Install Qt

3. Do some voodoo shit

4. Fix your path

5. Compile capybara-webkit from source

6. Install the gem

Now, if some of those words seemed weird to you - don't worry about it, I'll get to it in a second.

In addition to be stuck with Windows, which is a pretty shitty platform for developing ruby in the first place, I was also stuck behind a rather agressive proxy - which made pulling the repositories I needed from github a rather taxing experience. I did, however, discoverd a neat ninja trick.

    GIT_SSL_NO_VERIFY

Those magic words saved my soul. Since my proxy settings blocked every port number from here to the moon expect 80 and 443 (HTTP and HTTPS respectively) I had to get creative. I in no way suggest you use this environment setting unless you *absolutely* need it, but if you're stuck behind a firewall/proxy it works like a charm. 

This way I was able to pull the code from github using the `https` URL (`https://github.com/thoughtbot/capybara-webkit`). Getting the source was only the first step though.

Capybara-webkit uses a webkit implementation by [Qt](), a cross-platform development toolkit in order to support all platforms. So, in order to build the gem from source we also need to install Qt. 

---
[^1]: It turns out that Poltergeist actually runs the headless browser in a separate thread, which has implications for transactional tests (since transactions aren't shared between threads).
