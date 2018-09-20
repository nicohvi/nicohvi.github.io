---
layout: post
title: Immutable ruby
draft: false
---

Recently I undertook a ruby coding challenge, and it's been a while since
I've left javascript land. I've really grown to love the possibilities
for functional programming in javascript (the [arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) in the ES2015
specification is a personal favourite), and I found myself immediately
wanting to employ these new tools in the ruby challenge.

This proved to be somewhat problematic, because while ruby is a beautiful
language it hardly lends itself well to functional programming. For one you cannot
pass functions to other functions (you can pass [blocks](https://rubymonk.com/learning/books/1-ruby-primer/chapters/34-lambdas-and-blocks-in-ruby/lessons/78-blocks-in-ruby) though), and it's really, **really**
easy to mutate state. Found that out the hard way.

Did you know, for instance, that basically [everything in ruby is mutable](http://stackoverflow.com/questions/8580304/are-strings-in-ruby-mutable)? This makes
things trickier when you're trying to use functional paradigms that rely heavily
on immutability. So, you need to do some heavy lifting yourself.

## Map

`map` is a very common function in functional paradigms. It simply applies a 
passed function to every element of the enumerable which implements it, [and 
returns this new enumerable](http://ruby-doc.org/core-2.2.0/Array.html#method-i-map). There's a problem however, because even though
you really do return a **new** array, it gives no promises regarding the 
mutability of the elements themselves.

```ruby
arr1 = [1, 2, 3]
arr2 = arr1.map{ |n| n * 2 }
p arr1
# => [1, 2, 3]
p arr2
# => [2, 4, 6]
```

Seems unproblematic right? Not quite.

Consider the following: you have a group of cats because you're sad and lonely,
and they keep you company. In order to keep track of them you write a ruby
program which tracks their names and ages.

```ruby
class Cat
  attr_accessor :name, :age

  def initialize (name, age)
    @name = name
    @age = age
  end
end

names = ['Frank', 'Ted', 'Spot', 'Nibbles', 'Destructor']

cats = 5.times.map do |n|
  # You can't really remember their ages, but you know they're no
  # older than 10.
  Cat.new(names[n], Random.new.rand(10))
end

p cats
# <Cat @name="Frank" @age=1>, <Cat @name="Ted" @age=7>, ...
```

All's well so far, but consider getting a new litter of kittens. You're not
a very creative person, so instead of coming up with a whole host of new names,
you simply add a "II" to the previous names - just like in Roman times!

```ruby
kittens = cats.map do |cat|
  cat.name = "#{cat.name} II"
  cat.age = 0
  cat
end

p kittens
# <Cat @name="Frank II", @age=0>, <Cat @name="Ted II" @age=0>, ...
```

Totally works, right? Except, what happens to your old list of cats?

```ruby
p cats
# <Cat @name="Frank II", @age=0>, <Cat @name="Ted II" @age=0>, ...
```

Whops. 

Why did this happen? The problem occurs when you have an array of
*objects* as opposed to native values. Because the native values have different
`object_id`s, they are not mutated but replaced. Objects, however, still
keep their `object_id` because, well, we don't really create a new object,
we simply  (dun, dun, **dun**) mutate the old one.

![turtles](/public/images/posts/turtles.jpg)
*Boom*

## Duplication

To fix this problem we can simply call `object.dup` which clones the object,
giving it a new `object_id`.

```ruby
kittens = cats.map do |cat|
  kitten = cat.dup
  # ...
  kitten
end

p cats
# <Cat @name="Frank" @age=1>, <Cat @name="Ted" @age=7>, ...
```

Problem solved, right? *Right*? Well, no.

Consider now that you want each of your cats to have an appropriate hat, because
as mentioned you're lonely and you want your cats to feel special so they don't
run away from home.

```ruby
class Hat
  def initialize (color)
    @color = color
  end
end

class Cat
  def initialize (name, age, hat_color)
    # ...
    @hat = Hat.new(hat_color) 
  end
end

colors = ["red", "gold", "dark as night"]

cats = 5.times.map do |n|
  Cat.new(names[n], Random.new.rand(10), colors.sample)
end

p cats
# <Cat @name="Frank" @age=1 @hat =<Hat @color="gold">>, 
# <Cat @name="Ted" @age=7 @hat=<Hat @color="dark as night">>, ...
```

However, you feel very strongly that kittens need to earn their place in your
sad pack, and should be forced to wear **pink** hats until they've proven
themselves.

```ruby
kittens = cats.map do |cat|
  kitten = cat.dup
  kitten.hat.color = "pink"
  # ... 
end

p kittens
# <Cat @name="Frank II" @age=0 @hat =<Hat @color="pink">>, 
# <Cat @name="Ted II" @age=0 @hat=<Hat @color="pink">>, ...
p cats
# <Cat @name="Frank" @age=1 @hat =<Hat @color="pink">>, 
# <Cat @name="Ted" @age=7 @hat=<Hat @color="pink">>, ...
```

Wait, what? 

The reason *all* hats changed color, even for the rugged, proven
cats, is that `Object.dup` creates a **shallow** copy of the object. This means
that "the instance variables of obj are copied, but not the objects they
reference"[^1]. As you can see, this presents a problem.

## Introducing immutability

So, how do we solve this? You'd think ruby would provide some native method,
but alas it doesn't. Luckily, we can do some magic and fix it ourself.

```ruby
module Immutable
  def deep_dup
    Marshal.load(Marshal.dump(self))
  end
end
```

Now, what strange magic is this? The `Marshal` class allows the 
conversion of ruby objects into a byte stream, which lets them be stored
outside the currently interpreted code. These objects can then subsequently
be reconstituted at a later time.

`Marshal.dump` converts the object to a byte stream, and `Marshal.load` 
reconstitutes the object. Reading the [documentation](http://ruby-doc.org/core-2.2.0/Marshal.html) for the `dump` method
we see that it "serializes obj and all descendant objects". This is 
important, because this means that it actually converts **not only** the parent
object (cats in our example), but also the children (i.e. the hats).

```ruby
module Immutable
  def deep_dup
    Marshal.load( Marshal.dump(self) )
  end
end

class Cat
  include Immutable

  # ...

kittens = cats.map do |cat|
  kitten = cat.deep_dup
  # ... 

p kittens
# <Cat @name="Frank II" @age=0 @hat =<Hat @color="pink">>, 
# <Cat @name="Ted II" @age=0 @hat=<Hat @color="pink">>, ...
p cats
# <Cat @name="Frank" @age=1 @hat =<Hat @color="gold">>, 
# <Cat @name="Ted" @age=7 @hat=<Hat @color="dark as night">>, ...
```

Huzzah! 

That one line of code actually solves all our problems[^2], though we can actually
take it one step further. Remember how `Marshal.dump` serializes all children? Well,
we can use that to make the entire array immutable instead of only its contents.

```ruby
class Array
  include Immutable
end

kittens = cats.deep_dup.map do |cat|
# ...
```

And just like that we can iterate over our various collections without
having fear of mutating the original contents. 

---
[^1]: Taken from the [docs](http://apidock.com/ruby/Object/dup).
[^2]: Though I have no idea how well it'd scale.
