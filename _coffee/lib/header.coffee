class Header

  constructor: (@el) ->
    @el.headroom()
    @tipsy()

  tipsy: ->
    @el.find('a img').tipsy(gravity: 'n', fade: true)

  setColor: (color) ->
    @el.css 'background', color

  hide: ->
    @el.addClass 'headroom--unpinned'

@Header = Header
