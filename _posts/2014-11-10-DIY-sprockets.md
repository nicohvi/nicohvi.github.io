---
layout: post
title: DIY Sprockets
teaser: Writing blog posts in jekyll using coffeescript, sass and haml. Much like a boss would.
intro: "
Creating a static website through Jekyll can be a blast. It can also be a pain to configure correctly, especially if you want to use the tools you know and love, such as preprocessors and so on. In this blog post I'll show how you can use sass, coffeescript and haml alongside jekyll, and feel like a pimp while doing so.
<p>
Luckily jekyll supports sass and coffeescript out of the box (the former integration is much better than the latter, though), and there are <a href=''>plugins</a> that solve some of these problems. However, if you're publishing to Gihub Pages (which alot of us are), then the plugins are really not that much help. Sure, there are <a href=''>workarounds</a>, but why not solve it ourselves? That's way more <a href=''>badass</a>."
color: red
---

## Sass

Jekyll's sass integration is very well handled. To use sass as your precompiler, simply add two lines of `---` at the top of your file. Then you can include any `.scss` files from your project in a directory you can specify in the `_config.yml` file. Since pictures is helluva lot more informative than words, observe:

```yaml
# _config.yml
sass:
  sass_dir: _sass
  style: compressed

# _sass/layout.scss
$professional: 'comic-sans';

body { font-family: $professional; }

# public/application.scss
---
---
  
@import 'layout';

```

This way, all the files I add to the `_scss` directory are made available to the sass files in your application. Since I want to ultimately have *one* css file after the precompilation is done, I simply add the various sass files concerned with different areas of my posts in `_sass` and include them in `public/application.scss` (which then, in turn, becomes `public/application.css` once jekyll serves it up.

Another nice feature in this integration is that Jekyll allows you to send parameters to the sass compiler - such as `compress`. Here's an example of what *my* `_sass` directory contains at time of writing:

```yaml
_sass
  - bourbon # love this plugin
  - code.scss
  - colors.scss
  - fonts.scss
  - header.scss
  - layout.scss # contains the main styles
  - posts.scss
  - queries.scss # media queries
  - reset.scss 
```

To see the result, simply [click here](/public/application.css)! Though, unless you're CSS-rainman or fuckin' [Tank](http://matrix.wikia.com/wiki/Tank) you won't get much out of it.

So that's really all you need to do to get sass playing along with jekyll, but now get to the interesting bits: coffeescirpt and haml!

## The interesting bits

As I said initially, jekyll *does* support coffeescript out of the box, but unfortunately there's no `_coffee` configuration option. This means that if you want to compile and concatenate your coffeescript into a single file (which isn't really that uncommon), then you're shit out of luck. Certainly you could add something like [RequireJS]() and *require* all coffeescript modules from a single file in your `public` folder, but then we're messing about with an additional tool which we don't really need.

So, how do we go about doing this? 

First off, we should create the file that will serve as our script (I call it `sprockets.rb` because it kinda works like [sprockets](https://github.com/sstephenson/sprockets), well - kinda not), and include the methods we'll need.

```ruby
# sprockets.rb 
def compile_haml(file)
  
end

def compile_coffeescript

end

```

Since we started off the section talking about coffeescript, let's tackle that method first! First off, we should define the target<sup>1</sup> file where all our compiled javascript should go. Then we should find all coffeescript files in our directory of choice<sup>2</sup> and pass them to a [coffeescript compiler]()<sup>3</sup>. Finally, we should write the compiled javascript to our target file<sup>4</sup>.

```ruby
# @root, @coffee = Dir.pwd, "#{@root}/_coffee"

def compile_coffeescript
  target, javascript = "#{@root}/public/application.js", '' # 1
  Dir.glob("#{@coffee}/*.coffee") do |coffeescript| # 2
    javascript += File.open(coffeescript, 'r') do |file| 
      CoffeeScript.compile file.read  # 3
    end
  end
  File.open(target, 'w') { |file| file.write(javascript) } # 4
end

```

Now, if we inspect our `application.js` file, we'll see all the contents of our coffeescript files neatly placed after one another. Huzzah! This could be easily extracted into a raketask or simply run from the command line using `ruby sprockets.rb`.

## Haml

Now that we've got our scripting sorted out, it's time to focus on not typing HTML - because what could be worse than that? So let's take a peek into our `compile_haml` method!

This method operates slightly different from the coffeescript compilation one since we don't need to concatinate or finished HTML -  it's a 1:1 relationship. So, instead, we take the haml file as a parameter<sup>1</sup>, find out what the resulting HTML file should be called<sup>2</sup>, pass the haml file to the haml compilator<sup>3</sup>, find out the path of the file and simply create it (or overwrite an existing file).<sup>4</sup>

```ruby
def compile_haml(file) # 1
  file_name = "#{File.basename(file, '.haml')}.html" # 2 
  html = File.open(file, 'r') { |file| Haml::Engine.new(file.read).render } # 3
  path = "#{@root}/views/#{file_name}"
  File.open(path, 'w') { |file| file.write(html) } # 4
end
```

Here we just assume that all the HTML files generated through haml should live in `views/`, but that's solely for the purpose of this demonstration - you can choose any destination you want! It should also be noted that [File.basename]() simply retreives the last component of the given filename (in this case \<name\>.haml), and can optionally replace it with the latter argument (.html).

There are many ways you could use this method (like for instance a rake task), but for the purposes of this demo we simply invoke it like so at the bottom of our script:

```ruby
# still sprockets.rb
# @haml = "#{@root}/_haml"
Dir.glob("#{@haml/*.haml}").each do |haml|
  compile_haml(haml)
end
```

## Tadah!

That's *literally* all you need to use coffeescript, sass and haml in your workflow - but this really is just the **bare minimum**. 

I mean, sass is all fine and dandy, but concerning coffeescript and haml we haven't even considered things like error handling, automatic compilation, the option to decide which files are compiled in what order (which is kinda crucial in cruel world of 'method undefined' in javascript'). 

I'll go over every one of these concerns in the next blog post, and show you how you can automatically compile haml and coffeescript whenever a file changes. I'll also cover how you can have your own haml partials, and how you should format your files to avoid pissing off the liquid formatter.

Until then, [do like a dog and pretend you're a table]().
