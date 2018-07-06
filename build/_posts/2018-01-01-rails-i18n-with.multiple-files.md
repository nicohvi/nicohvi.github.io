---
layout: post
title: Rails i18n with multiple files
draft: true
---

One feature I really enjoy about ruby on rails is its inherit i18n feature.
Need to show some text in a different language? No problem, just add a YAML
file to `config/locales` and the i18n library picks it up - all you need to do
is provide a key with the same name as the locale you set.

```ruby
config.locale = :cat

# cat.yml
cat:
  greeting: I don't greet mortals
```

Something that can quickly happen, however, is that these files will grow to _immense_
sizes. At [Brevio](https://brevio.com) we recently had a `nn.yml` file that spanned **451
lines**. Adding new translation key/value pairs became quite a pain, and I often discovered
entries that were defined in two (or even three) places (`audit_requests.email.titles.general`
and `emails.audit_reuqests.title.general` was a classic).

This quickly becomes a nuisance when you're absolutely _certain_ you've changed a
translation, only to have the same text stare defiantly back at you from the screen once you're
done slamming the CMD+R keys for the fifth time.

A quick google search told me that it is indeed possible to use multiple files for
internationalisation[^1], but there was one problem that seemed to be glossed over: If you
separate the translations into multiple files you **cannot have more than one entry per key**.

Here's an example:

```yml
# fancy.yml
en:
  cats:
    greetings:
      dinner_party: Fancy seeing you here, Albert - you here for the mice or the bird?
```

```yml
# street.yml
en:
  cats:
    greetings:
      street: This is my trash can Albert, best move along.
```
