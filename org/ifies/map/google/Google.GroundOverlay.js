/**
 * Adds an ground overlay image to the selected map
 * @id Mapifies.AddGroundOverlay
 * @param {Object} element
 * @param {Object} options
 * @param {Function} callback
 * @return {Function} Returns a passed callback function or true
 * @method
 * @namespace Mapifies
 */
Mapifies.AddGroundOverlay = function( element, options, callback) {
	
	/**
	 * Default options for AddGroundOverlay
	 * @id Mapifies.AddGroundOverlay.defaults
	 * @alias Mapifies.AddGroundOverlay.defaults
	 * @return {Object} The options for AddGroundOverlay
	 * @method
	 * @namespace Mapifies.AddGroundOverlay
	 */
	function defaults() {
		return {
			// South West Boundry
			overlaySouthWestBounds: [],
			// North East Boundry
			overlayNorthEastBounds: [],
			// Image
			overlayImage: ""
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
 * Removes an ground overlay image to the selected map
 * @id Mapifies.RemoveGroundOverlay
 * @param {Object} element
 * @param {Object} groundOverlay
 * @return {Boolean} True
 * @method
 * @namespace Mapifies
 */
Mapifies.RemoveGroundOverlay = function ( element, groundOverlay ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(groundOverlay);
	return;
};
