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
		
		// Get target size
		src.target_width = src.target_div.offsetWidth;
		src.target_height = src.target_div.offsetHeight;

		// Create Canvas Element
		src.canvas = src.target_div.appendChild(initializeCanvas(src.target_width, src.target_height));

		// Draw on Canvas
		drawOnCanvas(src.canvas);

		src.target_div.style.background = "yellow";
	}

	//Create Canvas Element
	function initializeCanvas(width, height){
		var canvas = document.createElement("canvas");
		canvas.style.width = width;
		canvas.style.height = height;
		canvas.style.position = "absolute";

		return canvas;
	}

	// Draw on Canvas
	function drawOnCanvas(c){
		var ctx = c.getContext("2d");
		ctx.beginPath();
		ctx.arc(95, 50, 40, 0, 2 * Math.PI);
		ctx.stroke();
	}

    // make accessible globally
    window.PixelBanner = PixelBanner;
})()
