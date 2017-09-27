---
layout: post
title: Rails active menu item pattern
draft: false
sitemap: true
---

A very common pattern in web development is having a menu consisting of **n** items,
where the currently active item is given a particular CSS class (often called, hold your breath, *active*). 
Doing this can be somewhat of a hassle since you need to inspect the current URL and compare it with the 
various `href` attributes of your links.

In Rails, however, there's a really nifty function called `current_page?`[^1] this is available
in all your views that does all the heavy lifting.


```haml
-# _menu.haml
%ul.menu
  = link_item home_path, 'home'
  = link_item about_path, 'about'
  = link_item tos_path, 'tos'
```

```ruby
# view_helper.rb
def link_item (url, text)
  content_tag(:li, class: "menu-item #{current_page?(url) ? 'active' : ''}") do
    link_to url, text
  end
end
```

Which produces HTML like this (assuming we're on the "about" page):

```html
<ul class="menu">
  <li class="item">home</li>
  <li class="item active">about</li>
  <li class="item">tos</li>
</ul>
```

That's all, folks!

---

[^1]: [API dock](https://apidock.com/rails/ActionView/Helpers/UrlHelper/current_page%3F)
