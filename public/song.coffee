verses = $('#next-verse').asEventStream('click')
  .map (event) ->
    id = $('.verse').not('.hidden').data('id')
    id += 1
    id = 1 if id == 4
    id

verses.onValue (id) ->
  $('.verse').addClass('hidden')
  $(".verse[data-id=#{id}]").removeClass('hidden')
