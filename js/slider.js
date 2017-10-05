// Toggle fullscreen on element el.
// Return true if requested fullscreen and false if exited fullscreen.
function fullscreen(el) {
	var fullscreenElement = 
		(document.fullscreenElement && document.fullscreenElement !== null) ||
		(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
		(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
		(document.msFullscreenElement && document.msFullscreenElement !== null);

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
	Initialize a slider on img element designated by 'selector'.
	'img_url' must be an array containing all the images to be displayed (in order).
	Options can be customized by modifing the properties of the return value.
*/
function init_slider(selector, img_urls, options) {
	var ret = {};
	
	// Overridable options
	ret.auto_slide_period = 150;
	ret.auto_slide_onload = true;
	ret.auto_loop = false;
	ret.speed = 25;
	
	if(options)
		for(var opt in options) 
			if(options.hasOwnProperty(opt))
				ret[opt] = options[opt];
	
	ret.img_urls = img_urls || [];
	ret.current_image = 0;
	ret.img = document.querySelector(selector);
	ret.img.draggable = 'false';
	
	ret.load_current = function() {
		ret.img.src = ret.img_urls[ret.current_image];
	};
	
	// Display a loading spinner
	ret.img.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.75)), url(' + ret.img_urls[ret.current_image] + ')';
	ret.img.style.backgroundSize = 'cover';
	ret.img.src = 'data:image/svg+xml;utf8,<svg class="lds-spinner" width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background:none"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.8250000000000001s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(30 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.75s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(60 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.6749999999999999s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(90 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.6s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(120 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.525s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(150 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.45s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(180 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.375s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(210 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.3s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(240 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.225s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(270 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.15s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(300 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="-0.075s" repeatCount="indefinite"/></rect><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="rgba(255, 255, 255, 0.75)" transform="rotate(330 50 50)"><animate attributeName="opacity" values="1;0" dur="0.9s" begin="0s" repeatCount="indefinite"/></rect></svg>';
	
	// Preload images
	ret.loaded_count = 0;
	ret.preload = [];
	for(var idx in ret.img_urls)
	{
		ret.preload.push(new Image()) - 1;
		ret.preload[idx].onload = function() {
			ret.loaded_count++;
			if(ret.loaded_count == ret.img_urls.length)
				ret.on_loading_done();
		};
		ret.preload[idx].src = ret.img_urls[idx];
		console.log(ret.preload[idx]);
	}
	
	ret.next_image = function() {
		ret.current_image = (ret.current_image + 1) % ret.img_urls.length;
		ret.load_current();
	};
	
	ret.prev_image = function() {
		ret.current_image = ret.current_image - 1;
		if(ret.current_image < 0) ret.current_image = ret.img_urls.length + ret.current_image;
		ret.load_current();
	};
	
	ret.auto_slide = function() {
		ret.next_image();
		if(ret.auto_loop || ret.current_image > 0)
			ret.auto_slide_timeout = setTimeout(ret.auto_slide, ret.auto_slide_period);
	};
	
	ret.last_x = 0;
	ret.diff_x = 0;
	
	ret.sliding = function(e) {
		var clientX;
		if(e.type == "touchmove")
			clientX = e.changedTouches[0].clientX;
		else
			clientX = e.clientX;
		
		ret.diff_x += clientX - ret.last_x;
		ret.last_x = clientX;
		if(ret.diff_x > ret.speed) {
			ret.prev_image();
			ret.diff_x -= ret.speed;
		}
		
		if(ret.diff_x < -ret.speed) {
			ret.next_image();
			ret.diff_x += ret.speed;
		}
	};
	
	ret.end_slide = function(e) {
		if(e.type == "touchend") {
			document.removeEventListener("touchmove", ret.sliding);
			document.removeEventListener("touchend", ret.end_slide);
		} else {
			document.removeEventListener("mousemove", ret.sliding);
			document.removeEventListener("mouseup", ret.end_slide);
		}
	};
	
	ret.start_slide = function(e) {
		clearTimeout(ret.auto_slide_timeout);
		ret.diff_x = 0;
		
		if(e.type == "touchstart") {
			ret.last_x = e.changedTouches[0].clientX;
			document.addEventListener("touchmove", ret.sliding);
			document.addEventListener("touchend", ret.end_slide);
		} else {
			ret.last_x = e.clientX;
			document.addEventListener("mousemove", ret.sliding);
			document.addEventListener("mouseup", ret.end_slide);
		}
		
		return false;
	};
	
	ret.fullscreen = function() {
		if(fullscreen(ret.img))
		{
			ret.original_style = ret.img.style.cssText;
			ret.img.style.cssText = 'background-color: black; width:100vw; height:100vh; object-fit: contain';
		} else {
			ret.img.style = ret.original_style;
		}
	};
	
	ret.on_loading_done = function() {
		// Delete spinner
		ret.img.style.backgroundImage = '';
		ret.load_current();
	
		// Launch animation if enabled
		if(ret.auto_slide_onload)
			ret.auto_slide_timeout = setTimeout(ret.auto_slide, ret.auto_slide_period);
	
		// Enable Interactivity
		ret.img.onmousedown = ret.start_slide;
		ret.img.ontouchstart = ret.start_slide;
		ret.img.addEventListener("dblclick", ret.fullscreen);
	};
	
	return ret;
}
