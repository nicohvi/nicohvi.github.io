class Blog
   
  constructor: (options) ->
    @post = new Post($('#post')) if options.post?
    @image = new Image($('.main-image')) if options.image?
    @header = new Header $('header')
    @initHandler()

  initHandler: ->
    $(document).on 'click', '.shuffle', (e) =>
      e.preventDefault()
      @image.shuffle()
      @header.hide()
    
    $(document).on 'scroll', (event) =>
      main = _.min $('#main section'), (post) =>
        Math.abs(post.getBoundingClientRect().top)
      @changeColor $(main).data('color')
   
   changeColor: (color) ->
    $('body').removeClass().addClass(color)

@Blog = Blog

$ ->
  options = {}
  options.post = true if $('#post').length > 0
  options.image = true if $('.main-image').length > 0
  @blog = new Blog(options)
