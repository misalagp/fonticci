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