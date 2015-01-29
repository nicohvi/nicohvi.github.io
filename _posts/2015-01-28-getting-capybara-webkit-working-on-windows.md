---
layout: post
title: Ruby 2.1, capybara-webkit 1.3, and Windows 7
---

Ever felt the need to test what *actually* happens when Bob clicks your amazing button? Does it properly render the marquee text? Was your effort to hijack Bob's bank session successful? How can you know?

Using [capybara](), that's how.

Capybara is a ruby gem which simulates a real user interacting wtih your web application. It accomplishes this by creating a browser process based on the driver you use (it can use [selenium]() to talk to Firefox for instance), and then manipulate the DOM rendered by the browser. You can also perform headless testing by using a driver which only creates a rendering engine process rather than a browser process, like [Poltergeist]().

A good case for using headless testing is that they are **much faster** (since a rendering engine process is smaller than a browser process), so that's what I'm fond of using. I don't think there's much difference between the aforementioned Poltergeist and [capybara-webkit](), but I was recently required to set up a project using the latter so that's the one I'll discuss.[^1]

It's pretty straightforward to set up on OS X and Linux - in fact there's a nifty [guide]() for you to follow. "Hey, there's a section about Windows in there as well!" you might say out loud, thinking that I'm an idiot who's writing a blog post about something that's already been covered in the wiki. Well, my past two days of misery beg to differ.

In order to not forego any necessary steps, we're going to take this step by step:

1. Install Ruby and the Ruby Devkit

2. Install Qt

3. Do some voodoo shit

4. Fix your path

5. Compile capybara-webkit from source

6. Install the gem

Now, if some of those words seemed weird to you - don't worry about it, I'll get to it in a second.

### Sidenote

In addition to be stuck with Windows, which is a pretty shitty platform for developing ruby in the first place, I was also stuck behind a rather agressive proxy - which made pulling the repositories I needed from github a rather taxing experience. I did, however, discoverd a neat ninja trick.

    GIT_SSL_NO_VERIFY

Those magic words saved my soul. Since my proxy settings blocked every port number from here to the moon expect 80 and 443 (HTTP and HTTPS respectively) I had to get creative. I in no way suggest you use this environment setting unless you *absolutely* need it, but if you're stuck behind a firewall/proxy it works like a charm. 

This way I was able to pull the code from github using the `https` URL (`https://github.com/thoughtbot/capybara-webkit`). Okay, let's get back to business.

## Installing ruby and the devkit

As stated earlier windows and ruby [are not best buds](), but sometimes you have to work with what you've got. For X-like systems there are many ways of installing ruby (homebrew, rbenv, rvm et. al.), but lukcily there's also a straightforward way for windows called the [rubyinstaller](). This is just like any other windows setup binary, so I just download the correct one and you're good to go. I'm using Windows 7 64-bit, so I downloaded the 64-bit binary. 

In order to use native C/C++ extensions (which is necessary to install gems like [puma]()[^2] and, surprise, capybara-webkit) you also need to install the [ruby devkit](). Please follow the [tutorial]() provided by the DevKit wiki step by step, it's really easy to follow. Once you're done you're ready for the real challenge, installing Qt.

## Here be dragons

So, what exactly is [Qt](), and why on earth do we need to install it? Well, Qt is a programming environment for developing cross-platform applications (think [Xamarin]()), and it provides tools for creating a [MinGW]() toolchain which is required for creating native Windows applications without depnding on 3rd-party DLLs. Having Qt installed allows us to compile Qt's implementation of [webkit]() browser engine, which capybara-webkit uses to power its rendering engine.

So, how do you install it? Excellent question.

Unfortunately, the wiki from the capybara-webkit repository is rather obtuse at this point and simply links to the official Qt downloads page which will not give you the correct version.[^3] It took me two days of frustration and contless efforts of google fu before I eventually combined several StackOverflow answers into something that worked for me. [This is the Qt version you're looking for](http://sourceforge.net/projects/qtx64/files/qt-x64/4.8.5/mingw-4.8/qt-4.8.5-x64-mingw481r1.exe/download).[^4]

The important distinction between this specific version of Qt and the one linked to on the official download page is that the former is compiled using MinGW (important) and the latter isn't. This tripped me up for a couple of days.

Anyways, once you have installed the *correct* version of Qt feel free to fistpump in the air before continuing, you just saved yourself two days of hell.

Well, you're not quite done with Qt yet.

In order to compile the native extensions for capybara-webkit correctly you need to set some flags for the `qmake` tool, which is provided by our Qt installation in order to generate the necessary Makefiles we need for our compilation process. Luckily some wizard figured out the correct flags you need to set:

{% highlight bash %}
# In QT_INSTALL_DIR\4.8.5\mkspecs\win32-g++\qmake.conf)
# Ex: C:\Qt\4.8.5\mkspecs\win32-g++\qmake.conf
# Add the follwing after the line beginning with QMAKE_IDC
QMAKE_RCC = $$[QT_INSTALL_BINS]$${DIR_SEPARATOR}rcc$${EXE_SUFFIX}
QMAKE_LFLAGS = -static-libgcc -static-libstdc++
{% endhighlight %}

Once you've done this you're ready to compile capybara-webkit! Well, almost.

## Setup your environment

Remember the DevKit you downloaded earlier? It's time to put it to use. 

It actually contains a MinGW environment which we need to use with MinGW-friendly Qt install to properly compile capybara-webkit and get the proper native extensions. In order to utilise the DevKit's environment we need to add it to our `PATH`.

Hit the Windows button, right-click on 'My Computer' and click 'Properties'. Then click 'Advanced System Settings', and from this new pop-up window click the button with the text 'Environment Variables'. Add the following directories to your `PATH`:

{% highlight bash %}
RUBY_INSTALL_DIR\ruby-version\bin, QT_INSTALL_DIR\4.8.5\bin, DEVKIT_INSTALL_DIR\bin
# Ex: C:\Ruby21-x64\bin, C:\qt\4.8.5\bin, C:\ruby21-x64\devkit\bin
{% endhighlight %}

You also need your DevKit to perform some additional magic which is contained within a batch file in the `DEVKIT_INSTALL_DIR` called `devkitvars.bat`. So open up a CMD session by hitting the Windows button, typing in 'cmd' and hitting the Return key, move into the `DEVKIT_ISNTALL_DIR` and run the batch job.

    C:\> cd Ruby21-x64\devkit
    C:\Ruby21-x64\devkit> devkitvars.bat

Running this command should **produce no errors**. If you get some errors, you haven't properly installed the DevKit, or something is wrong with your path - so ensure that your environment is correct. I spent some hours debugging this step because I was using the `git bash` shell rather than the CMD shell and didn't have my environment properly setup.

Once this is done you're finally ready to compile capybara-webkit!

## Actually doing what you set out to do

First off, clone the capybara-webkit repository (if you haven't already done so), and cd into it within the *same session* that you ran the batch job (this is important). Run `bundle install` to install all the gem's dependencies, and once this is done you're ready to peform the compilation by running `bundle exec rake build`.

This is the part where, if you have the wrong Qt version installed, you'll see obscure error messages like `./build/SetUnknownUrlMode.o: bad reloc address 0x0 in section .pdata` and subsequently stare at your screen dreaming of killing someone.

If you should encounter some errors in this step it's probably due to either incorrect settings in your `qmake.conf` file (did you remember to set the flags?) or an incorrect Qt version (maybe you installed the Vistual Studio edition instead of the MinGW edition). Just check the step concerned with Qt and you should be good to go.

And that's it.

Take a deep breath and go outside, you've earned it.

---
[^1]: It turns out that Poltergeist actually runs the headless browser in a separate thread, which has implications for transactional tests (since transactions aren't shared between threads).
[^2]: Puma is a thread-based webserver for ruby applications, and it performs very well for applications that aren't bound by the CPU for heavy computation (which is slow in ruby due to the GIL).
[^3]: No discredit intended to the maintainers of the project, they actually maintain the wiki for a vast amount of various OSes and it's only to be expected that some parts of the wiki would become outdated.
[^4]: [32-bit version](http://sourceforge.net/projects/qtx64/files/qt-x86/4.8.5/mingw-4.8/sjlj/qt-4.8.5-x86-mingw481r1.exe/download).

