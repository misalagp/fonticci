var lineSystem={} 
$(document).ready(function() {

	// the fox and the grapes scripts
	var width = $(window).width() - 250;
	var height = $(window).height() - 250;

	function run() {
		var top = Math.random() * height;
		var left = Math.random() * width;
		$('#grapes').css('top', top + 'px').css('left', left + 'px');
		$('#grapes').removeClass('shake');
	}
	$('#grapes').mouseover(run);
	// end the fox and the grapes scripts
});

/* -- Glow effect -- */

const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });
}

const speed = 10;

const moveBackground = () => {
    let mouseXPos = (event.x / window.innerWidth)*100;
    let mouseYPos = (event.y / window.innerHeight)*100;
    document.getElementById('movingtxt').style.backgroundPosition = `${mouseXPos / speed}% ${mouseYPos / speed}%`;
}

document.getElementById('jamigibbs').addEventListener('mousemove', moveBackground);


jQuery.fn.wraplines = function(options) {
	var options = jQuery.extend({
		lineWrap: 'span', //name of html element used to wrap lines
		lineClassPrefix: 'wrap_line_', // prefix for class name to be added to line wrapper element
		wordClassPrefix: 'w_line_',
		index: 0,
		offsetTop: 0,
		offsetLeft: 0
	}, options);
	return this.each(function() {
		options.index  = 0;
		options.offset = 0;
		var parentElm = $(this);
		var elmText = $(parentElm).text();
		$(parentElm).html(function(ind, htm) {
			var $repText = '<' + options.lineWrap + '>' + elmText.replace( /\s/g, '</' + options.lineWrap + '> <' + options.lineWrap + '>');
			$repText = $repText + '</' + options.lineWrap + '>';
			return $repText;
		});
		$(options.lineWrap, parentElm).each(function() {
			var spanOffset = $(this).offset();
			if (spanOffset.top > options.offsetTop) {
				options.offsetTop = spanOffset.top;
				options.index++;
			}
			$(this).addClass(options.wordClassPrefix + options.index);
		});
		for (var x = 1; x <= options.index; x++) {
			$('.' + options.wordClassPrefix + x, parentElm)
			.wrapAll('<' + options.lineWrap + ' class="line ' + options.lineClassPrefix + x + '" />')
			.append(" ");
			var innerText = $('.' + options.lineClassPrefix + x, parentElm).text();
			$('.' + options.lineClassPrefix + x, parentElm).html(function() {
				return innerText;
			});
		lineSystem.index=options.index
    }
	});
};

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to handle the scroll event
  function handleScroll() {
    var poemTitle = document.querySelector('.poem-title');
    var poem = document.querySelector('.poem');

    // Check if the h2 title is in the viewport
    if (isElementInViewport(poemTitle)) {
		$('.poem').wraplines();
		$('.poem  span').addClass('extra');
		$('.poem').removeClass('init');
		
		$("span").each(function(index) {  $(this).fadeOut(0).delay(100*index).fadeIn(200);
		});
      // Remove the scroll event listener after the first scroll
      window.removeEventListener('scroll', handleScroll);
    }
  }

  // Add a scroll event listener to trigger the animation when scrolling
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  new Vue({
    el: '#app',
    data: {
      poem: null,
      completion: 0,
    },
    computed: {
      position() {
        return 900 * this.completion + 75;
      },
    },
    mounted() {
      this.poem = document.getElementById('poem');
      this.updateCompletion();
      // Add an event listener to update completion when the user scrolls
      this.poem.addEventListener('scroll', this.updateCompletion);
    },
    methods: {
      updateCompletion() {
        this.completion = this.poem.scrollTop / this.poem.scrollHeight;
      },
    },
  });