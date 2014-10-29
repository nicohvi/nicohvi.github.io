class Post

  constructor: ->
    @data = $('#data')
    @setHeader()

  setHeader: ->
    @setCover()
    @setTitle()

  setCover: ->
    src   = @data.data('src')
    blur  = @data.data('blur')
    $('.image').css('background-image', "url('#{src}')")
    $('.blur').css('background-image', "url('#{blur}')")
    
  setTitle: ->
    title = @data.data('title')
    $('.title').text(title)
    
  blur: (opacity) ->
    $('.blur').css('opacity', opacity)

@Post = Post
