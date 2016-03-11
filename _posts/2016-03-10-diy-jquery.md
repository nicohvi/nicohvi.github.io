---
layout: post
title: DIY jQuery
draft: false
date: 2016-03-10 +0100
---

I'm quite [fond of simplicity]({% post_url 2016-02-24-a-simple-javascript-setup %}). 

Some might think that sounds weird coming from someone who loves
ruby on rails, but I'd argue that rails is all about simplicity[^1]. 
Also ruby is probably the simplest language in the world, with the
possible exception of [whitespace](https://en.wikipedia.org/wiki/Whitespace_(programming_language)).

Anyway, I was tinkering with some simple javascript for this blog
and since I'm a proclaimed proponent of not shooting sparrows with
cannons (to quote a favourite professor of mine) I decided that I
wouldn't include **any** javascript libraries that I didn't strictly
require.

My first objective was to have a way to add `target="blank"` to links
in my blog posts because, like a desperate mother whose children are
about to move out, I didn't want any readers to leave my blog when
they clicked on any external links.

Since my posts these are written using markdown[^2] I would 
need to add the classes through inline HTML, which is a pain.
Or, of course, I could write a liquid template - but that 
seemed like overkill. So javascript seemed like the obvious solution.

In order to find the links I needed a way to query the DOM for
elements, and jQuery was the obvious candidate. Then I
stopped and thought for a moment.

"Wait, do I really need 10 000 lines of javascript to find a 
collection of DOM elements?"

Well, the answer is obviously *no*. In fact all I need to find a group
of DOM elements is already implemented by all browsers that count, and
it's called `querySelectorAll`.

So, without further ado, meet my first jQuery replacement:

{% highlight javascript %}
export default function $ (query) {
  return [].slice.call(document.querySelectorAll(query));
}
{% endhighlight %}

Pretty impressive, I know.

You might wonder why I need the `[].slice.call` function call. It's due
to the fact that `querySelectorAll` returns a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) which is **not**
the same as an array (learned that the hard way). So we need to 
[slice](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) it into one.

I used my fake jQuery like this and felt like a total boss:

{% highlight javascript %}
import $ from './fquery'

$('article a')
.forEach(el => el.setAttribute('target', 'blank')
{% endhighlight %}

It totally worked too.

However, I quickly ran into another problem. I really enjoy 
using footnotes[^3], and I didn't want these links to open their
targets in a new window - that would totally ruin the acclaimed
footnote experience.

Luckily for me my markdown processor[^4] adds a class
to both the actual footnote reference and its accompanying note, so
all I had to do was filter the links based on their class.

{% highlight javascript %}
$('article a')
.filter(el => el.className.indexOf('footnote') === -1)
.forEach(el => el.setAttribute('target', 'blank')
{% endhighlight %}

And now my footnotes were being filtered out of the result - success!

Granted there's more to jQuery than finding DOM elements (granted, [a lot](http://api.jquery.com/) more), so I decided that I'd create a general wrapper class
which would implement the most common jQuery methods (such as 
`hasClass`, `data`, `attr`, `on` etc.) when I needed them.

Turns out they were really simple.

{% highlight javascript %}
class Wrapper {
  constructor (node) {
    this.node = node;
  }
  
  hasClass (className) {
    return this.node.className.indexOf(className) > -1;
  }

  attr (name, val) {
    if(val) this.node.setAttribute(name, val);
    return this.node.getAttribute(val);
  }
}
{% endhighlight %}

Most of those implementations are one-liners, and that's because
the DOM element API is actually really good (I had no idea). All I'm
doing is renaming stuff, which makes me feel useful as well - win win!

To use this new wrapper class I can simply do this

{% highlight javascript %}
// fquery.js
import Wrapper from './Wrapper';

function wrap (node) {
  return new Wrapper(node);
}

export default function $ (query) {
  return  [].slice.call(document.querySelectorAll(query))
            .map(wrap);
}

// app.js
$('article a')
.filter(el => !el.hasClass('footnote'))
.forEach(el => el.attr('target', 'blank'))
{% endhighlight %}

Ah, so amazing. 

Just like that I had all the features I needed (for now anyway), 
and it came at the total cost of 61 LOC. Joy to the world etc.

*UPDATE*

I actually decided that I wanted to make *all* external links open
in a new window, and this was easily accomplished like so:

{% highlight javascript %}

$('a')
.filter(el => el.attr('href').indexOf('http') !== -1)
.forEach(el => el.attr('target', 'blank'))
{% endhighlight %}

---

[^1]: Which I'll definitively write about, eventually. Promise.
[^2]: [jekyll](https://jekyllrb.org) for life, amirite.
[^3]: Meta, I know.
[^4]: I use [kramdown](http://kramdown.gettalong.org/).
