/**
 * This function allows you to pass a GeoXML or KML feed to a Google map.
 * @method
 * @namespace Mapifies
 * @id Mapifies.AddFeed
 * @alias Mapifies.AddFeed
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Object} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the feed object and options.
 */
Mapifies.AddFeed = function( element, options, callback ) {
	/**
	 * Default options for AddFeed
	 * @method
	 * @namespace Mapifies.AddFeed
	 * @id Mapifies.AddFeed.defaults
	 * @alias Mapifies.AddFeed.defaults
	 * @param {String} feedUrl The URL of the GeoXML or KML feed.
	 * @param {Object} mapCenter An array with a lat/lng position to center the map on
	 * @return {Object} The options for AddFeed
	 */
	function defaults() {
		return {
			// URL of the feed to pass (required)
			'feedUrl': null,
			// Position to center the map on (optional)
			'mapCenter': []
		};
	};
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);

	// Load feed
	var feed = new GGeoXml(options.feedUrl);
	// Add as overlay
	thisMap.addOverlay(feed);
	
	// If the user has passed the optional mapCenter,
	// then center the map on that point
	if (options.mapCenter[0] && options.mapCenter[1])
		thisMap.setCenter(new GLatLng(options.mapCenter[0], options.mapCenter[1]));
		
	if (typeof callback == 'function') return callback( feed, options );
	return;
};

/**
 * This function allows you to pass a GeoXML or KML feed to a Google map.
 * @method
 * @namespace Mapifies
 * @id Mapifies.RemoveFeed
 * @alias Mapifies.RemoveFeed
 * @param {jQuery} element The element to initialise the map on.
 * @param {GGeoXML} feed The feed to remove from the map
 * @param {Object} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the feed object and options.
 */
Mapifies.RemoveFeed = function ( element, feed, callback ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(feed);
	if (typeof callback == 'function') return callback( feed, options );
	return;
};
