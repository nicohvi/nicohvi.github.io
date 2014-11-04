class Blog
   
  constructor: (options) ->
    @post = new Post($('#post')) if options.post?
    @header = new Header $('header')

@Blog = Blog

$ ->
  options = {}
  options.post = true if $('#post').length > 0
  @blog = new Blog(options)
