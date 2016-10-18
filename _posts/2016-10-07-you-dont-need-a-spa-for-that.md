---
layout: post
title: You don't need a spa for that
draft: true
---

So if you're a developer and have been on the internet recently,
there's a good chance you've heard the word "React" and "Redux",
and how those two combined can cure cancer and save the
relationship between Isreal and Palestine. 

The arguement usually goes like this: "Facebook uses it, so that
means we should use it. I mean, Facebook employees are smart." 
Sure, they're smart, and React (and Redux for that matter) are
very interesting libraries/frameworks[^1], but that doesn't mean
you **need** to use them (or any other library for that 
matter).

Let me elaborate.

Consider the basic use case for almost any website today: you
have visiting users, perhaps they need to fill out a form (maybe
not), maybe the need to click on some buttons to see some more
information about something, maybe they need to click your 
"about us" link to see the picture of the company cat. Heck,
maybe they even need to see a list of recent news that would
preferably reload once the user clicks a button called "see
more". 

For some reason this is seen as a perfect use case for 
a SPA[^2], I'd argue that it isn't. 

In fact I'd go so far as to argue that you don't need **any** 
external library in fact, except for a nice tool to abstract away 
XHTTPRequests (I mean, let's not go *completely* overboard).

Consider the use cases we listed (filling out forms, expanding
information, page transitions, reloading recent news 
asynchronously) - these are all things modern browsers are more
than capable of doing. [Since 1999](), in fact.

The first use case works out of the box, you simply declare the
form's markup in HTML, render a view on the server, and pass it
down to the client. Regardless of your framework of choice,
and platform, this should be trivial.

```
= form_for @pizza do |f|

  %label Toppings
  = f.select @pizza, @toppings

  %label Crust
  = f.checkbox @pizza, :with_cheese

  %label Your contact email
  = f.email

  = f.submit "Order pizza"

end
```

When the user clicks the "Order pizza" button, the form is
submitted. Presto, magico. I'd argue thought that any form 
without client-side validation is severely hampered UX wise,
so let's add some.

Let's assume for the sake of arugment that the user is
using IE10 or something, and doesn't have access to the built-in
email-validation.

---
[^1]: I'd argue React is a framework and Redux is a library.
[^2]: **S**ingle **P**age **A**pplication, not a place where you
      get to chill with cucumbers on your eyelids. 
