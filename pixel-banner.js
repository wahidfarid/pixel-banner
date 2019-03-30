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
		target: "body",
		pixel_options: {
			size: {width: 50, height: 50},
			color_pallete: ["#6d8891", "#dfe6ea", "#dacdbe", "#cda20b", "#6b3603"]
		}
    }

	// Draw the pixels
	function drawPixels(src){
		
		// Get target size
		src.target_width = src.target_div.offsetWidth;
		src.target_height = src.target_div.offsetHeight;

		// Create Canvas Element
		src.canvas = src.target_div.appendChild(initializeCanvas(src.target_width, src.target_height));

		// Draw on Canvas
		drawOnCanvas(src.canvas, src.options.pixel_options);

	}

	//Create Canvas Element
	function initializeCanvas(width, height){
		var canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		canvas.style.position = "absolute";

		return canvas;
	}

	// Draw on Canvas
	function drawOnCanvas(c, opt){
		var ctx = c.getContext("2d");
		var w = opt.size.width;
		var h = opt.size.height;
		var pallete = opt.color_pallete;
		
		ctx.imageSmoothingEnabled = false;

		ctx.fillStyle = pallete[Math.floor(Math.random() * pallete.length)];
		ctx.fillRect(10, 10, w, h);
	}

    // make accessible globally
    window.PixelBanner = PixelBanner;
})()
