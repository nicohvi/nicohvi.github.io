$(document).ready(function() {

	$('.post-container').each(function(index, element) {

		$(element).on('webkitTransitionEnd', function(event) {
			if( parseInt($(this).css('margin-left')) > 0 ) { return false }
			$(this).siblings('.post-tags').addClass('active')
		})

		$(element).on('mouseover', function(event) {
			$(this).css('margin-left', 0)
		})

		$(element).on('mouseout', function(event) {
			$(this).siblings('.post-tags').removeClass('active')
			$(element).css('margin-left', $(this).siblings('.post-tags').css('width'))
		})

		$(element).css('margin-left', $(this).siblings('.post-tags').css('width'))
	})

})