class Blog

  constructor: (options) ->
    @post = new Post() if options.post
    @initHandlers()

  initHandlers: ->
    $(document).on 'scroll', (event) =>
      offset = $(window).scrollTop() / 150.0
      @post.blur(offset) if @post

@Blog = Blog

$ ->
  options = {}
  options.post = true if $('#post').length > 0
  @blog = new Blog(options)
