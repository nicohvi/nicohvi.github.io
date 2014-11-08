class Image

  constructor: (@el) ->
    @images = ['pikachu', 'giant', 'dhh']
    @imagePath = '/public/images/'
    @counter = 0
    @notice = $('.notice')
    @throttle = false
  
  shuffle: ->
    return if @throttle
    @throttle = true
    @el.addClass('fade')
    oldImage = _.last(@el.attr('src').split('/')).replace('.svg', '')
    newImage = _.sample @images
    if oldImage == newImage
      @counter += 1
    else
      @counter = 0
    @showMessage() if @counter >= 2
    callback = =>
      @el.attr 'src', "#{@imagePath}/#{newImage}.svg"
      @el.removeClass('fade')
      @throttle = false
    setTimeout callback, 400

  showMessage: ->
    clearTimeout()
    @notice
      .text("Same image #{@counter+1} times in a row, 
            that must be really annoying for you.")
      .append("<img src='#{@imagePath}/avatar_white.svg'>")
      .css('opacity', 1)

    callback = -> $('.notice').css('opacity', 0)
    setTimeout callback, 3000 

@Image = Image

