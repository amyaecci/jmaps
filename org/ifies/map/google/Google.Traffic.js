
/**
 * Adds a traffic layer to the selected map.
 * @id Mapifies.AddTrafficInfo
 * @param {Object} element
 * @param {Object} options
 * @param {Function} callback
 * @return {Function} Returns a passed callback function or true
 * @method
 * @namespace Mapifies
 */
Mapifies.AddTrafficInfo = function( element, options, callback) {
	
	/**
	 * Default options for AddTrafficInfo
	 * @id Mapifies.AddTrafficInfo.defaults
	 * @alias Mapifies.AddTrafficInfo.defaults
	 * @return {Object} The options for AddTrafficInfo
	 * @method
	 * @namespace Mapifies.AddTrafficInfo
	 */
	function defaults() {
		return {
			// Center the map on this point (optional)
			mapCenter: []
		};
	};
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);

	var trafficOverlay = new GTrafficOverlay;
	// Add overlay
	thisMap.addOverlay(trafficOverlay);
	// If the user has passed the optional mapCenter,
	// then center the map on that point
	if (options.mapCenter[0] && options.mapCenter[1]) {
		thisMap.setCenter(new GLatLng(options.mapCenter[0], options.mapCenter[1]));
	}
	if (typeof callback == 'function') return callback(trafficOverlay, options);
};

/**
 * Removes a traffic layer to the selected map.
 * @id Mapifies.RemoveTrafficInfo
 * @param {Object} element
 * @param {Object} trafficOverlay
 * @param {Boolean} True
 */
Mapifies.RemoveTrafficInfo = function ( element, trafficOverlay ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(trafficOverlay);
	return;
};