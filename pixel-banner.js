(function(){

	// constructor function
	var PixelBanner = function(opts){

		configureOptions(this, opts)

		drawPixels(this);
	}

    // Attach our defaults for plugin to the plugin itself
    PixelBanner.defaults = {
		target: "body",
		static: false,
		pixel_options: {
			size: {width: 30, height: 30},
			color_pallete: ["#6d8891", "#dfe6ea", "#dacdbe", "#cda20b", "#6b3603"],
			probability: {x_axis: "always", y_axis: "always"}
		}
    }
	
	// Configuration
	function configureOptions(src, opts){

		// Merge user given options with default
		src.options = mergeDeep(PixelBanner.defaults , opts);
		src.target_div = document.querySelector(src.options.target);

		// Dynamic runner
		//if(src.options.static)

		// Probability method lookups
		if(src.options.pixel_options.probability.x_axis == "always")
			src.options.pixel_options.probability.x_axis = probabilityAlways;
		if(src.options.pixel_options.probability.y_axis == "always")
			src.options.pixel_options.probability.y_axis = probabilityAlways;

		if(src.options.pixel_options.probability.x_axis == "distance")
			src.options.pixel_options.probability.x_axis = probabilityFromDistanceToCenter;
		if(src.options.pixel_options.probability.y_axis == "distance")
			src.options.pixel_options.probability.y_axis = probabilityFromDistanceToCenter;
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

		for(var x = 0; x < c.width; x+= w){
			for(var y = 0; y < c.height; y+= h){
			  if(calculateProbability(opt.probability, x, y, c))
				drawPixel(x, y, w, h, pallete, ctx);
			}
		}
	}

	// Calculate Probability
	function calculateProbability(prob, x, y, c){
		// Skip based on probability
		if(Math.random() > prob.x_axis(x, c.width) * prob.y_axis(y, c.height))
			return false;
		return true;
	}
	// Draw a single pixel
	function drawPixel(x, y, w, h, pallete, ctx){
		ctx.imageSmoothingEnabled = false;
		ctx.fillStyle = pallete[Math.floor(Math.random() * pallete.length)];
		ctx.fillRect(x, y, w, h);
	}
	// Probability Functions
	function probabilityFromDistanceToCenter(position, length) {
		return   1 - (Math.abs(position - (length/2))  / (length/2));
	}
	function probabilityAlways(position, length){return 1;}

    // make accessible globally
    window.PixelBanner = PixelBanner;
})()


//////////////////////////
/// Deep Merge Code Courtesy of https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
//////////////////////////

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
