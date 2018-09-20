---
layout: post
title: Interactive hamburger menu using CSS
draft: false
date: 2016-05-04 +0100
---

Animations are funny, and I think it really provides the user with an 
engaged immersive experience at low cost to the developer. In this
post I'll quickly share a snippet that's very common at my current company[^1],
which you could easily incorporate into your next design.

To see a demo of what I'm going to discuss, [click here](http://codepen.io/nicohvi/pen/aNPdMV).

We're going to make an interactive hamburger menu which turns into an arrow when
it's been activated. We'll do this using css and very minimal javascript (all we
need javascript for is to add a class to the DOM element). 

To accomplish this we're going to use absolutely positioned elements inside a 
relative container, like so:

```html
<header>
  <a>Logo</a>
  <aside>
    <figure class="hamburger-menu">
      <i class="line"></i>
    </figure>
  </aside>
</header>
```

```css
header { background: #333; }
.hamburger-menu { 
  position: relative; 
  width: 25px;
  height: 26px;
}
.hamburger-menu i { 
  position: absolute; 
  height: 3px;
  width: 100%;
  background: white;
  top: calc(50% - 3px); 
}
```

This places a horizontal line squarely in the middle of your figure container 
(whose width you're free to decide for yourself). We create the last two lines
using CSS [pseudo elements](https://developer.mozilla.org/en/docs/Web/CSS/Pseudo-elements), like this:

```css
i:before, i:after {
  position: absolute;
  width: 100%;
  height: 3px;
  background: #fff;
  content: '';
  top: -7px;
  transition: transform 300ms ease-out;
}

i:after { top: 7px; }
```

The lines above is shifted by `-7` pixels, and the one to appear below our
centered line is shifted by `7` pixels. Thus, we've created our hamburger menu, 
success! Now, let's make it fancy.

```css
.hamburger-menu:hover i:before{
  transform: translate3d(0, -2px, 0);
}
.hamburger-menu:hover i:after{
  transform: translate3d(0, 2px, 0);
}
```

Now the lines above and below are shifted slighty away from the center whenever
the user hovers our menu, which is a good signal that the icon is indeed 
interactive, and should incentivise the user to click it. If you're wondering
why we're using `translate3d` as opposed to for instance `translateY` (which
would require only the Y-axis argument), this is because elements that are
transformed using the Z-axis (the final argument to `translate3d`) are [rendered
using the GPU, rather than the CPU](http://blog.teamtreehouse.com/increase-your-sites-performance-with-hardware-accelerated-css), making for a smoother animation.

Anyway, we still need to transform our hamburger menu into an arrow whenever
the user has clicked it. That's actually surprisingly easy.

```css
.hamburger-menu.active i {
  transform: rotate(-90deg) translateZ(0);
}
.hamburger-menu.active i:before {
  transform: rotate(45deg) scaleX(.75) translate3d(7px, -4px, 0);
}
.hamburger-menu.active i:after {
  transform: rotate(-45deg) scaleX(.75) translate3d(7px, 4px, 0);
}
```

The first statement flips *all* the three elements *negative* 90 degrees,
meaning that the horizontal lines are now all vertical (a counter-clockwise 
vertical flip). The upper line is then rotated 45 degrees clockwise, 
and the bottom line 45 degrees counter-clockwise, to create the point of the
arrow.

Finally the lines are shifted so their points intersect with the center
line at its apex, once more accomplished using `translate3d`.

To see the final result, [click here](http://codepen.io/nicohvi/pen/aNPdMV) 
(same link as the beginning of the post).

But there's one small step remaining: you still need to add the `active` class
to the hamburger menu when someone clicks it! This is easily done using
either jQuery (why not [make your own]({% post_url 2016-03-10-diy-jquery %}) while you're at it?) or even the native DOM APIs.

```js
import $ from './fquery';

$('.hamburger-menu').on('click', e => {
  $(e.currentTarget).toggleClass('active');
});
```

And just like that you're done, give yourself a pat on the back.

---

[^1]: [Bekk Consulting](http://bekk.no)
