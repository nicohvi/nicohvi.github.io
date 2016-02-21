---
layout: post
title: OWIN, MVC API, and SPAs
draft: false
date: 2015-03-01 +0100
---

I'm not really a big fan of .NET. In my opinion APIs like <LongName> and 
lock-in IDEs are not really what makes programming fun - in fact quite the 
opposite. However, there are many people who use .NET, and it's basically
impossible to avoid getting introduced to it in client work, so learning it
isn't really the worst idea ever. Also, [MVC]() isn't half bad to work with, 
mainly because they've [stolen all their good shit from Rails]().

Anyway, Microsoft is doing this whole [open]() thing these days, in stark 
contrast to their historical approach, and an interesting thing that's come
out of this is [OWIN](), which is a way to host .NET web applications 
_in-process_ as opposed to being part of the monster known as [IIES]().

This makes setting up a public API is really easy by using MVC API's OWIN
self-hosting implementation. For a bare-bones setup of how to achieve this
there's a really nifty [guide written by Microsoft](http://www.asp.net/web-api/overview/hosting-aspnet-web-api/use-owin-to-self-host-web-api).

Now that's all and well, but we want to know how we can host an API _and_
serve a javascript SPA at the same time (which, for some reason, is the holy
grail of web development these days - I mean, what happened to good old fashioned
server-rendered HTML?). Now _that_ requires some tweaking and insane google fu.

<!-- Google fu -->
<img />

One problem with using such an integrated platform as .NET is that there are
a [million]() different ways to achieve something, all through a bloated API
which might not work in your current circumstance (for instance, something
as supposedly simple as getting the root directory of the current project is
absolutely impossible using OWIN). Luckily for you I have dug through all the
solutions that don't work for OWIN, and have (thanks to a good colleague of mine, 
and certified Microsoft fanboy [Jonas](https://twitter.com/follesoe)) created
one that actually does.

What we want to achieve is the following:
  1.  Route all traffic going to `api/*` to our `WebApi` controllers so they
      can return the desired JSON responses.
  2.  Return a static HTML file linking to our javascript application for
      **all other routes**.
  3.  Serve all assets (javascripts, fonts, css etc.) to which are requested
      by the HTML file.

Solving the first problem is straightforward. All we need to do is add the
wep api routes to our `Startup` class (which will be the class that manages
setting up and configuring self-hosting), and define said route in our
`WebApiConfig`.

{% highlight c# %}
// in Startup.cs
public void Configuration(IAppBuilder app)
{
  HttpConfiguration config = new HttpConfiguration();
  app.UseWebApi(WebApiConfig.Register(config));
}

// in WebApiConfig.cs
config.Routes.MapHttpRoute
(
  name: "API Default",
  routeTemplate: "api/{controller}/{id}",
  defaults: new { id = RouteParameter.Optional }
);
{% endhighlight %}

Given that we've created any controllers we can now start our OWIN application
and hit any endpoint beginning with `api/` to verify that this route is 
indeed handled by our `WebApiConfig` route.

<!--Image of web page view of the api endpoint. Text: success!-->
<img />

Our second problem is a bit more tricky, but luckily, once you've found the
magic words it all works out. Turns out this can easily be solved by routing
_all other routes_ to a given `ApiController` which will return a static file.

"But wait!" you yell at your screen. "ApiControllers should only return data!
They're a clean mapping from one data stream (say, JSON) to another (JSON
returned from the server)!" While you're not wrong it's entirely possible to
return HTML with an `ApiController` by leveraging the `ContentResult` class.

Usually in this context you'd return a _dynamic_ view rendered by the server
(say, a [Razor]() view for regular MVC apps), but this time we just want
to return a _static_ HTML file. We do this by reading said static file, convert
it to a string, and add it to the `Response.Content`. Like so:

{% highlight c# %}
// Note that File.ReadAllText requires an absolute path to the file.
var html = File.ReadAllText(String.Format("{0}public/index.html", fileStreamPrefix));
var result = new HttpResponseMessage(HttpStatusCode.OK)
{
    Content = new StringContent(html, Encoding.UTF8, "text/html")
};
{% endhighlight %}

There's a tricky catch here. 

Due to the http server being self-hosted, you don't 
have access to the `Server` object, which could give you a relative path to the file
as seen by the server. 

Instead you have to specify an absolute path for the static
file, which you can get by getting the current running directory for the server 
(which defaults to `bin/debug`) by calling `<cmd>` and then tracking back to the 
root using `..\..`).

It isn't pretty, but it gets the job done. 


