---
layout: post
---

I freakin' love Ruby on Rails.

Not only does it let you utilise what is undoubtably the sexiest programming language on earth - it also let you be productive in that language. Totes amaze.

After first hearing the gospel according to Heinemeyer Hansson I spent quite some time flapping about in the darkness (that's a new idiom I'm trying out), playing with all kinds of workflows before finding something that I was happy with.

Though my approach is obviously just one of many, my mom taught me that if I've found something that makes me happy then I'm obliged to share it with the world. After all, who knows - it might just make them happy as well.

So, in this altrustic spirit I intend to write a series of blog posts detailing my workflow in Ruby and/or Rails, trying my very best to cover all bases: which editor/programs I use (and how my dotfiles are setup); how I structure code running client-side; which gems I employ for solving common problems; which application servers I prefer (hint: It’s Passenger. Not the singer-songwriter, although he’s pretty cool as well) and how I set them up with nginx/apache; which bear gifs I prefer to leave in as easter eggs — the list goes on.

<div class="image left">
  <img src="https://d262ilb51hltx0.cloudfront.net/max/460/1*Nb2OEr0dljhB4R7RLGQpUA.gif" />
  <span class="legend">This is the preferred bear gif, obviously.</span>
</div>

Anyway, I’ll kick this series of covering the sexiest topic of them all: **testing**.

## Getting off on the right foot

We’ve all been there: Snoozing 5 more minutes (actually make that 15), eating that last piece of chocolate cake (and hate your diabetes 2-ridden self afterwards) even if you [literally have chocolate all over your face](http://www.urbandictionary.com/define.php?term=chocolate%20face) (don’t click that), put off writing the relevant test until you’ve completed that final finicky part of the controller action you’re working on — actually, you’ll test it sometime next week, when the weather’s nicer and the omens more favorable.

Dude, it’s okay. But also — dude, you can do better.

TDD is a good way to keep the context switching of testing and coding at a constant pace, but it requires a lot of discipline to maintain if you’re not pairing or a [programming god](https://twitter.com/r00k). 

If you should find yourself stranded in an ocean of code in a small skiff of tests, don’t feel too bad — everyone has sinned against writing good tests for their code. And there is always a way to get back to shore.

<div class="full image">
  <img src="/public/images/posts/sucks-quote.png" />
</div>

In my opinion, the best way to incorporate testing in your workflow, and keeping your coverage up, is to make testing *fun*. That might sound lame, but it's totally possible.

<div class="full-image">
  <img src="/public/images/posts/totally-quote.png" />
</div>

First of all, you need a good testing framework.

## Picking the right tools
I’m a big fan of **rspec**.

rspec provides a lot of great short-hands, has many friends it plays well with (such as [capybara](https://github.com/jnicklas/capybara) and [factory_girl](https://github.com/thoughtbot/factory_girl)) and it avoids the verbose mess that is cucumber.

{% highlight gherkin %}
  Given /^there exists a "User" with attributes$/
  | name      | age                     | occupation |
  | Rambo     | No one knows            | Madman     |
  And /^I am logged in as "Rambo"$/
  Then /^There should be an error in the flash$/
  And /^I should be redirected to "root_url"$/

  Given /^there exists an? "([^"]*)"*
          with attributes$/ do |model_name, table|
  # the rest omitted for sanity
{% endhighlight %}
<span class="legend">Ugh.</span>

Just look at how pretty it is!

{% highlight ruby %}
describe 'authentication' do
  let(:user) { create :rambo }

  it "doesn't allow rambo access to admin routes, 
     because that would go badly" do
    get :admin
    expect(flash[:error]).to_not be_nil
    expect(respone).to redirect_to(root_url)
  end
end
{% endhighlight %}
<span class="legend">Glorious.</span>

I really enjoy working with rspec, and a tool you enjoy working with is a good first step. When it feels like you’re writing code, and not an essay, writing tests is a breeze.

Even if I’m tooting rspec’s horn (man, idioms are fun) — what truly matters is that you find a testing framework *you* like. For me rspec is that framework, but there certainly are other options out there - many developers enjoy using MiniTest, for example. 

Once you have your testing framework of choice, we can really get down to business.

## Rspec and friends

Wouldn’t it be sweet to automatically run your tests while you’re coding — but in the background? Is this a leading question? Yes. Yes, it is.

Guard watches for changes in certain files and then runs a command you decide. So, if you make it watch your spec files (and associated controllers/models as well if you want, which you do), you can automatically run your specs whenever a relevant file changes.

This is an extremely helpful way to avoid [blowing your feet off](http://i.imgur.com/fprOm49.webm).

Didn’t dare click that link did you? Good on you. If you did though, wasn’t that dog/table hilarious? Man, dogs are funny.

The granularity of the specs run is entirely up to you — by default it runs the single spec file you’re either working in, or the ones who are associated with the model/controller you’re modifying. You can even run single specs identified by line numbers if you’re really OCD about it.

This is what my `Guardfile` usually looks like:

{% highlight ruby %}
guard :rspec, cmd: "spring rspec" do
  watch(%r{^spec/.+_spec\.rb$})
  watch(%r{^lib/(.+)\.rb$})     { |m| "spec/lib/#{m[1]}_spec.rb" }
  watch('spec/spec_helper.rb')  { "spec" }
  watch('spec/rails_helper.rb') { "spec" }

  # Rails example
  watch(%r{^app/(.+)\.rb$})                           { |m| "spec/#{m[1]}_spec.rb" }
  watch(%r{^app/(.*)(\.erb|\.haml|\.slim)$})          { |m| "spec/#{m[1]}#{m[2]}_spec.rb" }
  watch(%r{^app/controllers/(.+)_(controller)\.rb$})  { |m| ["spec/controllers/#{m[1]}_spec.rb", "spec/routing/#{m[1]}_routing_spec.rb", "spec/#{m[2]}s/#{m[1]}_#{m[2]}_spec.rb", "spec/acceptance/#{m[1]}_spec.rb"] }
  watch(%r{^spec/support/(.+)\.rb$})                  { "spec" }
  watch(%r{^app/models/(.+)\.rb$})          { |m| ["spec/controllers/#{m[1]}s_spec.rb"] }
  watch('config/routes.rb')                           { "spec/routing" }
  watch('app/controllers/application_controller.rb')  { "spec/controllers" }

  # Capybara features specs
  watch(%r{^app/views/(.+)/.*\.(erb|haml|slim)$})     { |m| "spec/features/#{m[1]}_spec.rb" }
end
{% endhighlight %}
<span class="legend">Check it out on <a href="https://github.com/nicohvi/nplol/blob/master/Guardfile">github</a>.</span>

## A dream of spring

Spring loads your rails application in memory (and keeps it there). This makes running your own local webserver using the good ol’ rails s command much faster than usual. It also significantly speeds up your test suite.

Since you no longer have to interpret and run your application codebase from scratch each time you run a test spec, but rather use the in-memory instance of your application, testing can be really fast.

This is by no means an extensive test suite (only 34 specs after all), but it tests 98.83% of the code-base of the project, and in less than two seconds. Pretty sweet!

When you can write tests using a tool you like (regardless of preference), and run them in the background without ever worrying about them while you code features (and complete all suites in less than two seconds), the context switch is minimised and incorporating testing in your workflow is a lot easier.

Even if you employ these tools, and try your very best to strictly enforce the habit of continuously writing tests (you might even practice TDD if that’s your cup of hot beverage), you might still find yourself immersed in a caffeine-induced coding spree only to snap out of it hours later realising you haven’t written a single test all day.

Don’t feel bad — you might be stuck in the middle of the ocean again, but this time you’re not in a skiff, you’re in a goddamn cruise liner. And there’s bound to be an open bar somewhere.

---

Next time around I’ll dive into how I use these testing tools with the programs I use to stay productive — Vim and Tmux.


