/**
 * This function allows you to add a Google Traffic Layer
 * @method
 * @namespace Mapifies
 * @id Mapifies.AddTrafficInfo
 * @alias Mapifies.AddTrafficInfo
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the traffic layer.
 */
Mapifies.AddTrafficInfo = function( element, options, callback) {
	/**
	 * Default options for AddTrafficInfo
	 * @method
	 * @namespace Mapifies.AddTrafficInfo
	 * @id Mapifies.AddTrafficInfo.defaults
	 * @alias Mapifies.AddTrafficInfo.defaults
	 * @param {Object} mapCenter The Lat/Lng to center the map on
	 * @return {Object} The options for AddTrafficInfo
	 */
	function defaults() {
		return {
			// Center the map on this point (optional)
			'mapCenter': []
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
 * This function allows you to remove a traffic layer from the map
 * @method
 * @namespace Mapifies
 * @id Mapifies.RemoveTrafficInfo
 * @alias Mapifies.RemoveTrafficInfo
 * @param {jQuery} element The element to initialise the map on.
 * @param {GTrafficOverlay} trafficOverlay The traffic overlay to be removed
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the traffic overlay.
 */
Mapifies.RemoveTrafficInfo = function ( element, trafficOverlay, callback ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(trafficOverlay);
	if (typeof callback === 'function') return callback(trafficOverlay);
	return;
};