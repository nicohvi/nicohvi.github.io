---
layout: post
title: Custom select tag with rails
draft: false
sitemap: true
---

Did you know that styling `select` tags is [not really possible?](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Advanced_styling_for_HTML_forms#Dealing_with_the_select_nightmare).

It certainly came as a surprise to me, and while there are [workarounds](http://stackoverflow.com/questions/1895476/how-to-style-a-select-dropdown-with-css-only-without-javascript), these are mostly hacked
together solutions that hardly seem very maintainable or something you want to include in your CSS.
Instead a common solution is to use an external library like [jQuery UI](http://jqueryui.com/), [bootstrap](http://getbootstrap.com/2.3.2/#forms), or to create
your own `select` tag using `ul` and `li` tags.

Including an external library might be worth your while, though they bring with them not only
a learning curve, but also performance overheads. Also, you're using code written by someone else, which
means that you need to go through their code in detail to truly understand the inner workings should
something go awry.

I wanted to create a general select list that I'd be able to re-use across different components in my Rails web app that is used to create a select list based on associations. I decided that I didn't want to rely on a third-party solution for that as it affords me more freedom to suit the list to my needs.

First off, I define a method in a helper.

```ruby
def select_list model, attribute, list, default = {}
  content_tag(:section, class: "select-list-contaienr js-select-list") do
    content_tag(:span, default[:text], class: "select-value") +
    content_tag(:ul, class: "list") do
      list
      .map { |item| content_tag(:li, item[:text], class: "item", data: { value: item[:value] }) }
      .reduce(:+)
    end + 
    content_tag(:input, 
      "",
      type: "hidden", 
      name: "#{model.model_name.singular}[#{attribute.to_s}]", 
      value: default[:value])
  end
end
```

So, what's going on here exactly?

We're creating a `section` tag which contains the visualisation and hidden
input field of our selection, as well as the actual list of values.

If you're wondering what all those `+` symbols are doing there, they're needed
because `content_tag` returns an instance of [ActiveSupport::SafeBuffer](https://github.com/rails/rails/blob/8e2feedd31df969746898f22576db4d605fc9d9c/activesupport/lib/active_support/core_ext/string/output_safety.rb) which inherts form the base
`String` class - meaning that we need to concatenate the strings to get the desired result.

First we create the `span` tag (which holds the textual representation of our value), then
we add the list itself. We do this by mapping over each item to set the appropriate `data-value` attribute before concatenating all the HTML-strings by passing the `+` function
as the aggregate function in the `reduce` method on the array returned from `list.map`.

Finally we add an `input` tag which will actually hold the value itself. This field is
hidden and will be submitted with the form once the user clicks the *submit* button (just
like the CSRF token). To adhere to the Rails convention of `model_name[atribute_name]` we 
need to fetch the name of the model passed into the function (using [model_name](https://github.com/rails/rails/blob/5473e390d362755125d2f47b64ef0a135f2fe111/activemodel/lib/active_model/naming.rb)).

To illustrate the list in its entirety we'll define some dummy data.

```ruby
class Person 
  has_one :kitten
end

Kitten.all
# => ["Mittens", "Percival", "Uggzah, Destroyer of Worlds"]

mary
# => <#Person, kitten: <#Kitten name: "Mittens" > >
```

```html
<section class="select-list-container js-select-list">
  <span class="select-value">Mittens</span>
  <ul class="list">
    <li class="item" data-value="1">Mittens</li>
    <li class="item" data-value="2">Percival</li>
    <li class="item" data-value="3">Uggzah, Destroyer of Worlds</li>
  </ul>
  <input type="hidden" name="person[kitten_id]" value="1">
</section>
```

Now, all you need to finish up (though you'll probably want some styling as well, to hide
the list etc.) is to change the value of the hidden field whenever you click one of the 
items in the list. This should be pretty straight-forward - here's a solution using my
[favourite Javascript library](https://baconjs.github.io/):

```javascript
const $list = $('.js-select-list');
$(document).asEventStream('click', '.js-select-list .item')
.map(event => {
  const $el = $(event.target);
  return { text: $el.text(), value: $el.data('value') }
})
.onValue(data => {
  const { text, value } = data;
  $list.find('span').text(text);
  $list.find('input').val(value);
});
```

For a complete demo of how a list like this might work (with CSS transitions) you can take
a look at [this GitHub repository](https://github.com/nicohvi/select-demo).