# jquery setup
$('header').headroom().find('a').tipsy(gravity: 'n', fade: true)

# variables
images = ['pikachu', 'giant', 'dhh', 'posts/listen', 'posts/frp']
notice = $('.notice')
image  = $('.main-image')
posts  = $('#main .welcome, #main .post')

# functions
checkEqual = (values) ->
  values[0] == values[1] == values[2]

# streams
shuffleClicks = $('.shuffle').asEventStream('click')
  .doAction (event) -> event.preventDefault()

newImageStream = shuffleClicks
  .debounceImmediate(1000)
  .map -> _.sample images

messageStream = newImageStream
  .slidingWindow(3,3)
  .filter(checkEqual)

scrolls = $(document).asEventStream('scroll')
  .filter -> $('.welcome').length > 0
  .map -> _.min posts, (post) -> Math.abs(post.getBoundingClientRect().top)
  .map (mainPost) -> $(mainPost).data 'color'

# subscribers
messageStream
  .doAction ->
    notice.text 'Same image 3 times in a row, that must be really annoying for you'
    notice.css 'opacity', 1
  .delay(3000)
  .onValue -> notice.css 'opacity', 0

newImageStream
  .doAction ->
    image.css 'opacity', 0
  .delay(500)
  .onValue (newImage) ->
    image.attr('src', "/public/images/#{newImage}.svg").css('opacity', 1)

scrolls.onValue (color) ->
  $('body').removeClass().addClass(color)
