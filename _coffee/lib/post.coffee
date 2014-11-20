class Post

  constructor: (@el) ->
    @initBindings()

  initBindings: ->
    $(document).on 'keyup', (event) ->
      if event.which == 78 # n
        $('html, body').animate({scrollTop: $("#notes").offset().top}, 1000)
      else if event.which == 84 # t
        $('html, body').animate({scrollTop: $("#post").offset().top}, 1000)

@Post = Post
