---
layout: post
title: TDD with node, express, mocha and supertest
tags: node express mocha supertest
---

# TDD with node, express, mocha and supertest

When I started learning how to write **node** applications, I found it hard
to create a good workflow for doing test-driven development. There were
surprisingly few articles covering the subject, and so I ended up creating my
own workflow.

If you're not one for reading you can skip straight to the
[bottom](#tldr) of the article for the **tldr** version. However, if you feel
inclined to read my lyrical prose on the subject of programming - please, do
read on.

## Setting up the application

The application structure I chose (and you can safely choose to ignore) is as
follows:

~~~ 
- config
  - routes.coffee
- test
  - routes.test.coffee
  - spec_helper.coffee
- app.coffee
- server.coffee
~~~

The `package.json` file for this project has the following dependencies:

~~~ javascript
{
  "dependencies": {
    "express": "3.x"
  },
  "devDependencies": {
    "mocha": "*",
    "should": "*",
    "supertest": "*"
  }
}
~~~

After running `npm install` we can create the basic configuration for our
server:

~~~ coffeescript
# server.coffee
module.exports = (port) ->
  express = require 'express'
  app = express()
  port = port || 8000

  app.listen port,
    console.log "Express server listening on port #{port}"
~~~
