class Header

  constructor: (@el) ->
    $('header').headroom()

  setColor: (color) ->
    @el.css 'background', color
  
  hide: ->
    @el.addClass 'headroom--unpinned'

@Header = Header
