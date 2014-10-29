class Post

  constructor: ->
    @data = $('#data')
    @setHeader()

  setHeader: ->
    @setCover()
    @setTitle()
    @setSub()

  setCover: ->
    src   = @data.data('src')
    blur  = @data.data('blur')
    $('.cover-photo').css('background-image', "url('#{src}')")
    $('.blur').css('background-image', "url('#{blur}')")
    
  setTitle: ->
    title = @data.data('title')
    $('.title').text(title)

  setSub: ->
    sub = @data.data('sub')
    $('.sub').text(sub)
    
  blur: (opacity) ->
    $('.blur').css('opacity', opacity)

@Post = Post
