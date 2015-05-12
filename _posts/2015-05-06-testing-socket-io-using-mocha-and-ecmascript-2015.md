---
layout: post
title: Testing socket.io using mocha and EcmaScript 2015
---

**Disclaimer**: If all you want is to take a look at the final setup,
the TLDR is [here](https://github.com/nicohvi/mocha-socket.io).

[socket.io](http://socket.io) is really cool. It holds your hand through the setup of 
real-time applications (preferably using WebSockets), and falls back to older protocols 
should it be needed. Some people have claimed that it's no longer relevant since 
WebSockets have become standard fare for [most browsers](http://caniuse.com/#feat=websockets), 
but I still think socket.io is a viable component in a real-time stack, especially 
considering its excellent documentation and ease of use.

One area that can seem a bit hairy though, is *testing* your socket.io 
application. Things can quickly get out of hand when you need to listen 
for events asynchronously and then subsequently test the replies from 
the server (which might not come in the order you expect). This blog 
post will show you how you can setup an environment for test-driving
a real-time application, using the shiny new EcmaScript 2015 syntax
to boot (because, hey, it's the future).

[mocha](https://mochajs.org) is a test framework that executes on a javascript runtime, so 
we can run it either using node/[iojs](http://iojs.org) or in the browser. I 
like staying in the terminal, so for these tests we'll use the **iojs** 
runtime to run our tests (I'm using iojs because it has better EcmaScript 2015 
support - if you haven't heard of it before, I recommend taking a minute to 
take a gander at [this](https://iojs.org/en/faq.html)).

To run the examples in this blog post you need to enable arrow functions, which
ATOW are not yet fully enabled in iojs. You can enable them by adding the 
`--harmony_allow_arrow_functions` flag when running your tests.[^1]

Like [rspec](http://rspec.info), mocha has an API for writing your tests. `describe` groups your 
test cases together, `it` specifies a particular test case, and `before` and 
`after` hooks can (and will) be used to do necessary setup/teardown.[^2]

Let's see how they all work together with an example.

{% gist e4540243f7f9d9679619 server-api.test.js %}

First we define a set of constants we'll be using throughout our test suite,
then we define a simple `describe` closure to include our dummy test which
simply ensures that our root route returns 200 OK.

To setup our http server we'll use [express](http://expressjs.com) as our application/routing layer, 
and wrap the default http server exposed by iojs/node with our own custom `listen` and
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

In good TDD fashion ([if that's your cup of tea](https://medium.com/written-in-code/tdd-whatever-that-means-8b3932ddddd6))
we write our tests before we implement the feature. 

{% gist 536cff0d6760957889db server-api.test.js %}

To properly use embrace the power of mocha we nest this second `describe` closure
within the previously defined one, so that the `before` hook of the parent closure
is run before we run the respective hooks in our nested `describe` block. This way
we start our http server before we run `io.connect`.

Now, it's not *strictly* necessary to disconnect the client(s) between each test, 
but I **highly** recommend it as maintaining state between tests when they should be
able to run in any given order is a bad idea.

This new test will fail if we run mocha again (or, times out to be specific), so let's 
do something about that.

{% gist 536cff0d6760957889db server.js %}

All the realtime server does is broadcast the name of the newly joined user to all connected 
sockets (within the **realtime** namespace[^3]), as well as the number of connected users[^4].
Running the tests again we see that they both pass - hurray!

![test-2](/public/images/posts/test-2.png)

These realtime tests might seem a little bit more hairy, but all we're doing is ensuring
that the `new-user` event is emitted from the server *twice*, and that the payload is
as expected (the first client's name before the second). Since things are working as expected,
let's wrap things up by adding another test to ensure that messages from clients are
broadcast to all other clients.

Again, we write our test.

{% gist d3566d3356e9664a9470 server-api.test.js %}

We connect several clients using the `socket.io-client` package (`client` is already connected in the `before`
hook, in case you had forgotten) and once they have connected we register their name on the server.
Our initial client then listens for the last `new-user` event (when the number of users equals 3 - line 29),
and emits a message to be broadcast using the `say` event.

In our defined test we await the `say` event from the server, and ensure that all clients
receive the event and that the payload is as expected.

Now for the actual implementation.
 
{% gist d3566d3356e9664a9470 server.js %}

And we're green again!

![test-3](/public/images/posts/test-3.png)
*And the suite is even faster than before, now that's some mad skills right there.*

Would you look at that, we've successfully setup a dummy project using socket.io (1.3.5), iojs, and mocha!
And we wrote it all using delicious EcmaScript 2015 syntax, [dayyyum](https://www.youtube.com/watch?v=95SYdjRVCR0).
To take things a step further you might want to automate the testing or maybe define some build scripts 
([gulp](http://gulpjs.com) is great for that sort of thing!). To see what that might look like, you can 
check out this [GitHub repository](https://github.com/nicohvi/mocha-socket.io).

---
[^1]: To see how the flags are applied, please see the `package.json` file of this 
      [repository](https://github.com/nicohvi/socket-io).

[^2]: For a nice and succinct summary of the mocha API, please see this lovely 
      [gist](https://gist.github.com/samwize/8877226).

[^3]: Namespacing is a powerful tool exposed by socket.io. You can read more 
      about it [here](http://socket.io/docs/rooms-and-namespaces/).

[^4]: If you're wondering what that `_` is doing there, I'm using [lodash](http://lodash.com) to count 
      the number of clients since they are stored in a hash, which has a faster lookup time than an array 
      (not that it really matters for this small example).
