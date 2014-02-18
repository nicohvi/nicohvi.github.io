$(document).ready(function() {

	var bindPosts = function() {
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
	}

	var removeBindings = function(mediaQuery) {
		if(mediaQuery.matches) {
			$('.post-container').each(function(index, element) {
				$(element).unbind()
				$(element).css('margin-left', 0)
			})
		}
		else {
			bindPosts();
		}
	}

	if(matchMedia) {
		var mediaQuery = window.matchMedia("(max-width: 900px)")
		mediaQuery.addListener(removeBindings)
		removeBindings(mediaQuery)
	}

})