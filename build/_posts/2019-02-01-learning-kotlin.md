---
layout: post
draft: false
title: Learning Kotlin as a Rails developer
date: 2019-01-01
---

I decided recently that I rather enjoy static typing, as long as the language
itself doesn't force you into typing an excessive number of characters and have
conventions and enforce architectures that fit poorly with modern, modular systems.

Good examples of well-implemented statically typed languages are (in my humble
opinion) Go, Haskell, F#, Elm, and TypeScript. I've recently fallen in love with
TypeScript and how it saves my bacon again and again by catching potential bugs at
*compile*time rather than runtime. I'd very much like the same assuarances for
server-side code, but unfortunately, ruby is rather lacking in the static typing
department.

Ruby is a gorgeous language, but the lack of static types have made me stumble more
times than I care to remember, and so I've been looking around for good alternatives. Go was an immediate contender, but its highly object-oriented nature
gave me pause. F# felt like an immediate success, but unfortunately the tooling simply wasn't there, especially not for someone used to the powerful tooltchain 
presented by Ruby on Rails.

TypeScript and Elm are solely client-side languages, which left me with Haskell. 
The problem one often has with Haskell is its overly academic nature, feeling that
one needs a Phd in category theory to even attempt to solve problems in the 
language. However, aside from this complication, it suffers from the same problem
as F#: the tooling simply isn't there.

Which leaves us with the JVM. Both Scala and Kotlin are languages which compile 
down to JVM bytecode, and both have a heavy functional focus. Now, Scala has
gotten some flak recently, and Kotlin seems to be on everyone's lips, so I
decided to go for Kotlin.

This is the story of my journey.

### Wait, a website?

Most experienced Kotlin-users will suggest that you start using Spring Boot if you
want to create web applications using Kotlin. I've had experience using Java
web frameworks before (shudders), so I'll admit an initial skepticism, but the 
docs for Spring Boot put my mind at ease:

* No XML configuration
* Embedded application server so there's no need to deploy WAR files and handle the business of making them listen to correct ports etc.

Well, that sounds great! How do I start? Is there a `spring-boot new` CLI command? I need to download a ZIP-archive from a website? Come again?

Apparently, CLI tools aren't as popular in the JVM ecosystem as in the ruby/python/
javascript environments, so instead you need to go through an actual website to 
download a zip-file, or you can use a plugin in your IDE.

Yes, forget about editors. If you sacrifice at the altar of the JVM, you better be
prepared to be saddled with a memory-hogging, slow starting IDE. That's the price 
one has to pay.

My spoiled ruby upbringing prevented me from actually deigning to download my new
project as a zip-file, so I decided to go the IDE-way. 

`File -> New Project -> Spring Initializr` (don't ask me why they dropped the 'e', guess it seemed like a cool idea at the time)