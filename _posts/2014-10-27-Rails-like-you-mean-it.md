---
layout: post
---

Rails is amazing. Not only does it let you utilise what is undoubtably the sexiest programming language on earth (name omitted due to obviousness) — it also lets you be productive in that language. Totes amaze.

If you’ve never heard the gospel according to Heinemayer Hansson I’m afraid this article isn’t for you. This is the first post in a series covering how I work with Ruby on Rails, and it assumes that you have some experience with Rails. If you do not, then there really are better ways to spend your time.

This series will tackle all kinds of subject matter: which programs I use to edit and test code; how I structure code running client-side; which gems I employ for solving common problems; which application servers I prefer (hint: It’s Passenger. Not the singer-songwriter, although he’s pretty cool as well.) and how I set them up with nginx/apache; which bear gifs I prefer to leave in as easter eggs — the list goes on.

<div class="left">
  <img src="https://d262ilb51hltx0.cloudfront.net/max/460/1*Nb2OEr0dljhB4R7RLGQpUA.gif" />
  This is the preferred bear gif obviously
</div>

My approach is obviously just one of many, but it has always been my opinion that if you’ve found something that makes you happy you’re obligated to share it with the world.

Who knows, it just might work for someone else as well.

Anyway, I’ll kick the series of covering the sexiest topic of them all: **testing**.

## Getting off on the right foot

We’ve all been there: Snoozing 5 more minutes (actually make that 15), eating that last piece of chocolate cake (and hate your diabetes 2-ridden self afterwards) even if you literally have chocolate all over your face (don’t click that), put off writing the relevant test until you’ve completed that final finicky part of the controller action you’re working on — actually, you’ll test it sometime next week, when the weather’s nicer and the omens more favorable.

Dude, it’s okay. But also — dude, you can do better.

Writing tests is important, pretty much everyone agrees on that point (and if you don’t, odds are you’re not reading this) — but unless you’ve hard-wired your brain into writing them (by making a habit out of it) it’s hard to motivate yourself to actually write them, even if you know damn well how important they are. Why?

Well, unfortunately brains are assholes (no medical implications intended), and context switching is really hard. When you’re coding an exciting new feature (if you’re like me) you really want to keep going . Flow is easily induced while programming — “Hey man, I know Michael is bleeding from his ears, but he’s wired in so there’s no talking to him” — and not easily broken out of.

TDD is a good way to keep the context switching of testing and coding at a constant pace, but it requires a lot of discipline to maintain if you’re not pairing or a programming god.

If you should find yourself stranded in an ocean of code in a small skiff of tests, don’t feel too bad — everyone has sinned against writing good tests for their code. And there is always a way to get back to shore.

<div class="full-image">
  <img src="/public/images/posts/sucks-quote.png" />
</div>

If you’re a regular mortal programmer, much like myself, a situation like this isn’t uncommon. A good way to avoid being stuck in the middle of my imaginary code ocean however, is to minimise the context switch between coding and testing. “But how?” you may ask aloud, attracting stares from co-workers for talking at your screen.

First of all, you need a good testing framework.

## Picking the right tools
I’m a big fan of rspec, it provides a lot of great short-hands, has many friends it plays well with and it avoids the verbose mess that is cucumber.

{% highlight gherkin %}
  Given /^the person "(.*?)" should not be "(*.?)"$/
{% endhighlight %}

<div class="full-image">
  <img src="https://d262ilb51hltx0.cloudfront.net/max/1692/1*vlKhS_YEhV9pRwCmVVeHaw.png" />
</div>

I really enjoy working with rspec, and a tool you enjoy working with is a good first step. When it feels like you’re writing code, and not an essay, it’s easier to switch contexts.

Even if I’m tooting rspec’s horn (man, idioms are fun) — what truly matters is that you find a testing framework you like. For me rspec is that framework (many developers love MiniTest, for example).

Once you have your testing framework of choice, we can really get down to business.

## Rspec and friends

First off, wouldn’t it be sweet to automatically run your tests while you’re coding — but in the background? Is this a leading question? Yes. Yes, it is.

Guard watches for changes in certain files and then runs a command you decide. So, if you make it watch your spec files (and associated controllers/models as well if you want, which you do), you can automatically run your specs whenever a relevant file changes.

This is an extremely helpful way to avoid blowing your feet off.

Didn’t dare click that link did you? Good on you. If you did though, wasn’t that dog/table hilarious? Man, dogs are funny.

The granularity of the specs run is entirely up to you — by default it runs the single spec file you’re either working in, or the ones who are associated with the model/controller you’re modifying. You can even run single specs identified by line numbers if you’re really OCD about it.

## A dream of spring

Spring loads your rails application in memory (and keeps it there). This makes running your own local webserver using the good ol’ rails s command much faster than usual. It also significantly speeds up your test suite.

Since you no longer have to interpret and run your application codebase from scratch each time you run a test spec, but rather use the in-memory instance of your application, testing can be really fast.

This is by no means an extensive test suite (only 34 specs after all), but it tests 98.83% of the code-base of the project, and in less than two seconds. Pretty sweet!

When you can write tests using a tool you like (regardless of preference), and run them in the background without ever worrying about them while you code features (and complete all suites in less than two seconds), the context switch is minimised and incorporating testing in your workflow is a lot easier.

Even if you employ these tools, and try your very best to strictly enforce the habit of continuously writing tests (you might even practice TDD if that’s your cup of hot beverage), you might still find yourself immersed in a caffeine-induced coding spree only to snap out of it hours later realising you haven’t written a single test all day.

Don’t feel bad — you might be stuck in the middle of the ocean again, but this time you’re not in a skiff, you’re in a goddamn cruise liner. And there’s bound to be an open bar somewhere.

---

Next time around I’ll dive into how I use these testing tools with the programs I use to stay productive — Vim and Tmux.

<div id="data" 
  data-src="/public/images/posts/dhh.png" 
  data-blur="/public/images/posts/dhh-blur.png"
  data-title="Rails like you mean it">


