
/**
 * This function allows you to add a screen overlay to a map.
 * @method
 * @namespace Mapifies
 * @id Mapifies.AddScreenOverlay
 * @alias Mapifies.AddScreenOverlay
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the screen overlay and options.
 */
Mapifies.AddScreenOverlay = function( element, options, callback ) {
	/**
	 * Default options for AddScreenOverlay
	 * @method
	 * @namespace Mapifies.AddScreenOverlay
	 * @id Mapifies.AddScreenOverlay.defaults
	 * @alias Mapifies.AddScreenOverlay.defaults
	 * @param {String} imageUrl The URL of the image to load.
	 * @param {Object} screenXY The X/Y position in the viewport to place the image.
	 * @param {Object} overlayXY The overlay X/Y position in the viewport.
	 * @param {Object} size The size of the image, which is converted to a GSize.
	 * @return {Object} The options for AddScreenOverlay
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
 * This function allows you to remove a screen overlay from the map
 * @method
 * @namespace Mapifies
 * @id Mapifies.RemoveScreenOverlay
 * @alias Mapifies.RemoveScreenOverlay
 * @param {jQuery} element The element to initialise the map on.
 * @param {GScreenOverlay} overlay The overlay to be removed
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the overlay.
 */
Mapifies.RemoveScreenOverlay = function ( element, overlay, callback ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(overlay);
	if (typeof callback === 'function') return callback(overlay);
	return;
};
