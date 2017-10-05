/*
	Initialize a slider on img element designated by 'selector'.
	'img_url' must be an array containing all the images to be displayed (in order).
	Options can be customized by modifing the properties of the return value.
*/
function init_slider(selector, img_urls) {
	var ret = {};
	
	// Overridable options
	ret.auto_slide_speed = 150;
	ret.auto_slide_onload = true;
	ret.auto_loop = false;
	ret.speed = 25;
	
	ret.current_image = 0;
	ret.img = document.querySelector(selector);
	ret.img.draggable = 'false';
	ret.preload = new Image();
	
	ret.img_urls = img_urls || [];
	
	// Wait for the image to be loaded behind the scenes to avoid flickers.
	ret.load_current = function() {
		ret.preload.src = ret.img_urls[ret.current_image];
		ret.preload.onload = function() {
			ret.img.src = ret.preload.src;
		};
	};
	ret.load_current();
	
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
			ret.auto_slide_timeout = setTimeout(ret.auto_slide, ret.auto_slide_speed);
	};
	if(ret.auto_slide_onload)
		ret.auto_slide_timeout = setTimeout(ret.auto_slide, ret.auto_slide_speed);
	
	ret.last_x = 0;
	ret.diff_x = 0;
	
	ret.sliding = function(e) {
		ret.diff_x += e.clientX - ret.last_x;
		ret.last_x = e.clientX;
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
		document.removeEventListener("mousemove", ret.sliding);
		document.removeEventListener("mouseup", ret.end_slide);
	};
	
	ret.img.onmousedown = function(e) {
		clearTimeout(ret.auto_slide_timeout);
		ret.last_x = e.clientX;
		
		document.addEventListener("mousemove", ret.sliding);
		document.addEventListener("mouseup", ret.end_slide);
		
		return false;
	};
	
	return ret;
}
