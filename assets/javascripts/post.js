$(document).ready(function() {

	var isPlaying = false;

	$('.list-image-item').each(function(index, element) {

		$(element).on('mouseover', function(event) {
			$('.list-image-item.active').removeClass('active')
			$(this).addClass('active')
			$(this).children('.list-image-meta').addClass('active')
		})

	})

	$('.controls button').on('click', function(event) {
		isPlaying ? stopVideo() : beginVideo()
		isPlaying = !isPlaying		
	})

	var stopVideo = function() {
		$('video').get(0).pause()
		$('.controls button i').removeClass('fa-pause').addClass('fa-play')
	}

	var beginVideo = function() {
		$('video').get(0).play()
		$('.controls button i').removeClass('fa-play').addClass('fa-pause')
	}

})