(function(){
	// constructor function
	var PixelBanner = function(opts){
		this.options = Object.assign(PixelBanner.defaults , opts);
		this.target_div = document.querySelector(this.options.target);
		console.log(this.target_div);

		drawPixels(this);
	}

    // Attach our defaults for plugin to the plugin itself
    PixelBanner.defaults = {
		target: "body"
    }

	// Draw the pixels
	function drawPixels(src){
		src.target_div.style.background = "red";
	}

    // make accessible globally
    window.PixelBanner = PixelBanner;
})()
