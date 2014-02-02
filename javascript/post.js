$(document).ready(function() {

	$('.list-image-item').each(function(index, element) {

		$(element).on('mouseover', function(event) {
			$('.list-image-item.active').removeClass('active')
			$(this).addClass('active')
			$(this).children('.list-image-meta').addClass('active')
		})

	})

})