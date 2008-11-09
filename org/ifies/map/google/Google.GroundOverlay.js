/**
 * This function allows you to add a ground overlay to a map
 * @method
 * @namespace Mapifies
 * @id Mapifies.AddGroundOverlay
 * @alias Mapifies.AddGroundOverlay
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the feed object and options.
 */
Mapifies.AddGroundOverlay = function( element, options, callback) {
  /**
	 * Default options for AddGroundOverlay
	 * @method
	 * @namespace Mapifies.AddGroundOverlay
	 * @id Mapifies.AddGroundOverlay.defaults
	 * @alias Mapifies.AddGroundOverlay.defaults
	 * @param {Object} overlaySouthWestBounds The coordinates of the South West bounds of the image
	 * @param {Object} overlayNorthEastBounds The coordinates of the North East bounds of the image
	 * @param {String} overlayImage The URL of the image to be loaded
	 * @return {Object} The options for AddGroundOverlay
	 */
	function defaults() {
		return {
			// South West Boundry
			'overlaySouthWestBounds': undefined,
			// North East Boundry
			'overlayNorthEastBounds': undefined,
			// Image
			'overlayImage': undefined
		};
	};
	
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);
	
	var boundries = new GLatLngBounds(new GLatLng(options.overlaySouthWestBounds[0], options.overlaySouthWestBounds[1]), new GLatLng(options.overlayNorthEastBounds[0], options.overlayNorthEastBounds[1]));
	groundOverlay = new GGroundOverlay(options.overlayImage, boundries);
	
	thisMap.addOverlay(groundOverlay);
		
	if (typeof callback == 'function') return callback( groundOverlay, options );
	return;
};

/**
 * This function removes an existing ground overlay
 * @method
 * @namespace Mapifies
 * @id Mapifies.RemoveGroundOverlay
 * @alias Mapifies.RemoveGroundOverlay
 * @param {jQuery} element The element to initialise the map on.
 * @param {GGroundOverlay} groundOverlay The ground overlay to remove.
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the feed object and options.
 */
Mapifies.RemoveGroundOverlay = function ( element, groundOverlay, callback ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(groundOverlay);
	if (typeof callback === 'function') return callback(groundOverlay);
	return;
};
