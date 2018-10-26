function getFullscreenElement() {
	return (document.fullscreenElement && document.fullscreenElement !== null) ||
		(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
		(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
		(document.msFullscreenElement && document.msFullscreenElement !== null);
}

// Toggle fullscreen on element el.
// Return true if requested fullscreen and false if exited fullscreen.
function fullscreen(el) {
	var fullscreenElement = getFullscreenElement();
	if(!fullscreenElement) {
		if(el.requestFullScreen)
			el.requestFullScreen();
		else if(el.webkitRequestFullScreen)
			el.webkitRequestFullScreen();
		else if(el.mozRequestFullScreen)
			el.mozRequestFullScreen();
		else if(el.msRequestFullScreen)
			el.msRequestFullScreen();
		return true;
	} else {
		if (document.exitFullscreen)
			document.exitFullscreen();
		else if (document.webkitExitFullscreen)
			document.webkitExitFullscreen();
		else if (document.mozCancelFullScreen)
			document.mozCancelFullScreen();
		else if (document.msExitFullscreen)
			document.msExitFullscreen();
		return false;
	}
}

/*
	Initialize a slider on img element designated by 'selector' (required).
	'img_url' (required) must be an array containing all the images to be displayed (in order).
	'options' (optional) must be an object with the desired values for the parameters listed at the begining of the function.
	Example:
		init_slider('#my_slider', ['0.jpg', '1.jpg', ...], {autoSlideLoop: true});
*/
function init_slider(selector, imgUrls, options) {
	var ret = {};
	
	// Overridable options
	ret.autoSlideOnLoad = true; // Automatically animate after loading.
	ret.autoSlidePeriod = 150;  // In milliseconds.
	ret.autoSlideLoop = false;  // Stops after one complete rotation if false. Continues otherwise.
	ret.speed = 25;               // 'Distance' between two images. (Bad name...)
	
	if(options)
		for(var opt in options) 
			if(options.hasOwnProperty(opt))
				ret[opt] = options[opt];
	
	ret.imgUrls = imgUrls || [];
	ret.currentImage = 0;
	ret.img = document.querySelector(selector);
	ret.img.draggable = 'false';
	ret.img.ondragstart = function() { return false; }
	
	ret.load_current = function() {
		ret.img.src = ret.imgUrls[ret.currentImage];
	};
	
	// Display a loading spinner
	ret.img.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.75)), url(' + ret.imgUrls[ret.currentImage] + ')';
	ret.img.style.backgroundSize = 'cover';
	ret.img.src = 'data:image/svg+xml;utf8,<svg class="lds-spinner" width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background:none"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.8250000000000001s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(30 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.75s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(60 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.6749999999999999s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(90 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.6s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(120 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.525s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(150 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.45s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(180 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.375s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(210 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.3s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(240 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.225s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(270 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.15s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(300 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.075s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(330 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="0s" repeatCount="indefinite"/></rect></svg>';
	
	// Preload images
	ret.loadedCount = 0;
	ret.preload = [];
	for(var idx in ret.imgUrls)
	{
		ret.preload.push(new Image()) - 1;
		ret.preload[idx].onload = function() {
			ret.loadedCount++;
			if(ret.loadedCount == ret.imgUrls.length)
				ret.onLoadingDone();
		};
		ret.preload[idx].src = ret.imgUrls[idx];
	}
	
	ret.nextImage = function() {
		ret.currentImage = (ret.currentImage + 1) % ret.imgUrls.length;
		ret.load_current();
	};
	
	ret.prevImage = function() {
		ret.currentImage = ret.currentImage - 1;
		if(ret.currentImage < 0) ret.currentImage += ret.imgUrls.length;
		ret.load_current();
	};
	
	ret.autoSlide = function() {
		ret.nextImage();
		if(ret.autoSlideLoop || ret.currentImage > 0)
			ret.autoSlide_timeout = setTimeout(ret.autoSlide, ret.autoSlidePeriod);
	};
	
	ret.lastX = 0;
	ret.diffX = 0;
	
	ret.sliding = function(e) {
		var clientX;
		if(e.type == "touchmove")
			clientX = e.changedTouches[0].clientX;
		else
			clientX = e.clientX;
		
		ret.diffX += clientX - ret.lastX;
		ret.lastX = clientX;
		if(ret.diffX > ret.speed) {
			ret.prevImage();
			ret.diffX -= ret.speed;
		}
		
		if(ret.diffX < -ret.speed) {
			ret.nextImage();
			ret.diffX += ret.speed;
		}
	};
	
	ret.endSlide = function(e) {
		if(e.type == "touchend") {
			document.removeEventListener("touchmove", ret.sliding);
			document.removeEventListener("touchend", ret.endSlide);
		} else {
			document.removeEventListener("mousemove", ret.sliding);
			document.removeEventListener("mouseup", ret.endSlide);
		}
	};
	
	ret.startSlide = function(e) {
		clearTimeout(ret.autoSlide_timeout);
		ret.diffX = 0;
		
		if(e.type == "touchstart") {
			ret.lastX = e.changedTouches[0].clientX;
			document.addEventListener("touchmove", ret.sliding);
			document.addEventListener("touchend", ret.endSlide);
		} else {
			ret.lastX = e.clientX;
			document.addEventListener("mousemove", ret.sliding);
			document.addEventListener("mouseup", ret.endSlide);
		}
		
		return false;
	};
	
	ret.fullscreen = function() {
		fullscreen(ret.img);
	};
	
	ret.onFullscreen = function() {
		if(getFullscreenElement())
		{
			ret.original_style = ret.img.style.cssText;
			// Aiming for an uniform behavior across browsers
			ret.img.style.cssText = 'background-color: black; width:100vw; height:100vh; object-fit: contain';
			
			ret.img.addEventListener("mousewheel", ret.mouseWheel);
			ret.img.addEventListener("DOMMouseScroll", ret.mouseWheel);
		} else {
			ret.img.style = ret.original_style;
			
			ret.img.removeEventListener("mousewheel", ret.mouseWheel);
			ret.img.removeEventListener("DOMMouseScroll", ret.mouseWheel);
		}
	}
	
	ret.mouseWheel = function(e) {
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		
		if(delta < 0)
			ret.prevImage();
		else
			ret.nextImage();
		
		return false;
	};
	
	ret.onLoadingDone = function() {
		// Delete spinner
		ret.img.style.backgroundImage = '';
		ret.load_current();
	
		// Launch animation if enabled
		if(ret.autoSlideOnLoad)
			ret.autoSlide_timeout = setTimeout(ret.autoSlide, ret.autoSlidePeriod);
	
		// Enable Interactivity
		ret.img.addEventListener("mousedown", ret.startSlide);
		ret.img.addEventListener("touchstart", ret.startSlide);
		ret.img.addEventListener("dblclick", ret.fullscreen);
		
		document.addEventListener("fullscreenchange", ret.onFullscreen);
		document.addEventListener("mozfullscreenchange", ret.onFullscreen);
		document.addEventListener("webkitfullscreenchange", ret.onFullscreen);
		document.addEventListener("msfullscreenchange", ret.onFullscreen);
	};
	
	// Call this if you have to delete your img element
	ret.cleanup = function() {
		ret.preload = [];
		ret.img.removeEventListener("mousedown", ret.startSlide);
		ret.img.removeEventListener("touchstart", ret.startSlide);
		ret.img.removeEventListener("dblclick", ret.fullscreen);
		
		document.removeEventListener("fullscreenchange", ret.onFullscreen);
		document.removeEventListener("mozfullscreenchange", ret.onFullscreen);
		document.removeEventListener("webkitfullscreenchange", ret.onFullscreen);
		document.removeEventListener("msfullscreenchange", ret.onFullscreen);
		
		document.removeEventListener("touchmove", ret.sliding);
		document.removeEventListener("touchend", ret.endSlide);
		document.removeEventListener("mousemove", ret.sliding);
		document.removeEventListener("mouseup", ret.endSlide);
	};
	
	return ret;
}
