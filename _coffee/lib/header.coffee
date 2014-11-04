class Header

  constructor: (@el) ->
    $('header').headroom()

  setColor: (color) ->
    @el.css 'background', color

@Header = Header
