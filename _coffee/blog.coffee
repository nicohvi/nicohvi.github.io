class Blog

  constructor: (options) ->
    @post = new Post() if options.post

@Blog = Blog

$ ->
  options = {}
  options.post = true if $('#post').length > 0
  @blog = new Blog(options)
