class Post

  constructor: ->
    @data = $('#data')
    @setCover()
    @setTitle()

  setCover: ->
    src = @data.data('src')
    $('#cover').css('background-image', "url('#{src}')")
    
  setTitle: ->
    title = @data.data('title')
    $('.title').text(title)
    
@Post = Post
