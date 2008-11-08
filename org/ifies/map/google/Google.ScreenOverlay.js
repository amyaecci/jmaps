/**
 * Adds a screen overlau to the selected map.
 * @id Mapifies.AddScreenOverlay
 * @param {Object} element
 * @param {Object} options
 * @param {Function} callback
 * @return {Function} Returns a passed callback function or true
 * @method
 * @namespace Mapifies
 */
Mapifies.AddScreenOverlay = function( element, options, callback ) {
	
	/**
	 * Default options for AddScreenOverlay
	 * @id Mapifies.AddScreenOverlay.defaults
	 * @alias Mapifies.AddScreenOverlay.defaults
	 * @return {Object} The options for AddScreenOverlay
	 * @method
	 * @namespace Mapifies.AddScreenOverlay
	 */
	function defaults() {
		return {
			'imageUrl':'',
			'screenXY':[],
			'overlayXY':[],
			'size':[]
		};
	};
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);

	var overlay = new GScreenOverlay(options.imageUrl, new GScreenPoint(options.screenXY[0],options.screenXY[1]), new GScreenPoint(options.overlayXY[0],options.overlayXY[1]), new GScreenSize(options.size[0],options.size[1]));
	thisMap.addOverlay(overlay);
		
	if (typeof callback == 'function') return callback(overlay, options);
};

/**
 * Removes a screen overlay to the selected map.
 * @id Mapifies.RemoveScreenOverlay
 * @param {Object} element
 * @param {Object} overlay
 * @param {Boolean} True
 */
Mapifies.RemoveScreenOverlay = function ( element, overlay ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(overlay);
	return;
};
