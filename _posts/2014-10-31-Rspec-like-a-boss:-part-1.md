--- 
layout: post
---

Learning ruby (and Rails) is a fun experience, but you'll definitively encounter some roadblocks on the way. 

One of personal hurdles while (and a fairly common one at that I'm willing to guess)  was how to properly set up my testing environment. Somehow MiniTest didn't really feel right to me, and so I tried I didn't really like the feel of fixtures and the syntax of MiniTest, so I wanted to try something different. 

After discovering [rspec](https:/rpsec.info), and loving it, I suddenly felt more comfortable writing tests for my code - which is always a good thing. However, some things still didn't seem right: my specs took too long to run, I had to break out of my programming flow to run my tests and sometimes I'd just run a single spec that I was working on (which is a nice feature), only to realise hours later that I had broken something crucial - much like glueing pieces of a broken vase together only to realise the kitchen is on fire.

<div class="image full">
  <img src="/public/images/posts/1/glue-quote.png" />
</div>

And so I ventured once again into the great network of tubes in an attempt to find a better way to incorporate testing in my workflow with as few jarring context switches as possible. After a while I found a setup that simply *clicked*, and it has made me a happier programmer as a result. 

When I was little, my mother taught me that if I ever found something that made me happy I was obligated to share it with the world. After all, it might make someone else happy as well.

Unfortunately I think an in-depth blog post covering my setup in its entirety might be a bit on the TLDR side, so this will instead be the first post in a seriess. Today we'll cover how to properly set up rspec, and what cool stuff the various configuration settings can do.

Let's do this thing.

## Getting up and running with rspec

The first step is to add `rspec-rails` to your `Gemfile`. According to the [rspec docs](https://github.com/rspec/rspec-rails/blob/master/README.md) you should include it in *both* `development` and `test` (I don't really know why).

```ruby
gem 'rspec-rails', group: [:development, :test]
```

Anyway, once `rspec-rails` is bundled you can generate the rspec configuration files (.rspec, spec/rails_helper.rb and spec/spec_helper.rb) by running the following command.

```ruby
rails generate rspec:install
``` 

You can specify configuration options in all three generated files, but options specified in `spec_helper.rb` and `rails_helper.rb` will override those in `.rspec`. Anything defined in `.rspec` will be applied globally however (given that rspec can find the file), while the latter two configuration files are on a per-project basis.

There really isn't that much interesting you can do with the `.rspec` file, but a very common option that many set here is the `-- color` option which colorises your test output (successful specs turn green while failing ones turn red).

## The two helpers

There's some confusion regarding the difference between `spec_helper.rb` and `rails_helper.rb` that I'll attempt to remedy here. If you inspect the `.rspec` file you'll see the following line:

```ruby
-- require spec_helper
```

Which essentially means that `spec_helper.rb` is loaded for **every** spec file that you want to run. This means that you really don't want to bog down this file with a lot of heavy requirements, but instead have the *bare minimum* - things which are essential to configure rspec to your satisfaction. 

For instance, by default rspec uses the `rspec-expectations` and `rspec-mocks` gems for making assertions and mocking data, but if you would like to change this to use for instance [wrong](https://github.com/sconover/wrong) and/or [bogus](https://github.com/psyho/bogus), `spec_helper.rb` would be the place to do this.

```ruby
config.expect_with  :wrong
config.mock_with    :bogus
```

The `expect_with` and `mock_with` methods yield configuration objects of their own when invoked, which you can use to specify your rspec setup even further. This, for example, ensures that you don't mock out any methods that the class you're mocking doesn't implement.

```ruby
config.mock_with :rspec do |mocks|
  mocks.verify_partial_doubles = true
end
```

<div id="data" 
  data-src="/public/images/posts/dhh.png" 
  data-blur="/public/images/posts/dhh-blur.png"
  data-title="Rspec like a boss"
  data-sub="Part 1: Getting started" ></div>

