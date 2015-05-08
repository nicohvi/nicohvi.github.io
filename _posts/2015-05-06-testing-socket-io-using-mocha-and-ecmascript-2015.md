---
layout: post
title: Testing socket.io using mocha and EcmaScript 2015
published: false
---

[socket.io]() is really cool. It holds your hand through the setup of 
real-time applications, and falls back to older protocols should it be 
needed. Some people have claimed that it's no longer relevant since 
websockets have become standard fare for [most browsers](), but I 
still think socket.io has a place in any stack given its excellent 
documentation and ease of use.

One area that can seem a bit hairy though, is *testing* your socket.io 
application. Things can quickly get out of hand when you need to listen 
for events asynchronously and then subsequently test the replies from 
the servers (which might not come in the order you expect). This blog 
post will show you how you can get yourself setup for writing [useful]() 
tests for your real-time application, using the new EcmaScript 6 syntax 
(because, hey, it's the future).

[mocha]() is a test framework that executes on a javascript runtime, so 
we can run it either using node/[iojs](iojs.org) or in your browser. I 
like staying in the terminal, so for these tests will use the **iojs** 
runtime to run our tests (I'm using iojs because it has better EcmaScript 6 
support - if you haven't heard of it before, I recommend taking a minute to 
take a gander at [this](https://iojs.org/en/faq.html)).

Like [rspec](), mocha has a DSL for writing your tests. `describe` groups your 
test cases together, `it` specifies a particular test case, and `before` and 
`after` hooks can (and will) be used to do necessary setup/teardown. 

Let's see how they all work together with an example.

{% gist e4540243f7f9d9679619 server-api.test.js %}

First we define a set of constants we'll be using throughout our test suite,
then we define a simple `describe` closure to include our dummy test which
simply ensures that our root route returns 200 OK.

To setup our http server we'll use [express]() as our application/routing layer, 
and wrap the default http server exposed by iojs with our own custom `listen` and
`close` methods so we can pass in a custom port (as seen in the example above). By
allowing a custom port to be passed into the listen interface we can run our actual
application and tests simultaniously, which is pretty neat.

`listen` and `close` are called in a `before` and an `after` hook respectively, which will,
unsurprisingly, run *before* and *after* the test cases within the current `describe` closure. 
The first test case (denoted by the `it` function call) makes a HTTP GET call to the server,
and ensures that the recieved status code is 200 OK, which of course isn't the case yet. Let's
fix that.

{% gist e4540243f7f9d9679619 server.js %}

As you can see the root route simply returns a static file called `index.html`.

Now, when we run our test suite we get the following output.

![test-1](/public/images/posts/test1.png)

Great - everything's working properly. Now the real fun begins: testing
socket.io connections and validating the responses from the server.

---

In good TDD fashion ([if that's your cup of tea]()) we write our tests before
we implement the feature. 

{% gist 212065cc32bd5616e4b8 server-api.test.js %}

To properly use embrace the power of mocha we nest this second `describe` closure
within the previously defined one, so that the `before` hook of the parent closure
is run before we run the respective hooks in our nested `describe` block. This way
we start our http server before we run `io.connect`.

Now, it's not *strictly* necessary to disconnect the client(s) between each test, 
but I **highly** recommend it as maintaining state between tests when they should be
able to run in any given order is a bad idea.

This new test will fail if we run mocha again (or, times out to be specific), so let's 
do something about that.

{% gist 212065cc32bd5616e4b8 server.js %}

All the realtime server does is broadcast the name of the newly joined user to all connected sockets (within the **realtime** namespace[^1]), as well as the number of connected users[^2].

---
[^1]: Namespacing is a powerful tool exposed by socket.io. You can read more about it [here]().
[^2]: If you're wondering what that `_` is doing there, I'm using [lodash]() to count the number of objects within a hash, because I think it's a good idea to have a hashmap of the clients rather than an array since the lookup time is linear.
