/**
 * Adds an polyline to the map made up of several geopoints.
 * @id Mapifies.AddPolyline
 * @param {Object} element
 * @param {Object} options
 * @param {Function} callback
 * @return {Function} Returns a passed callback function or true
 * @method
 * @namespace Mapifies
 */
Mapifies.AddPolyline = function (element, options, callback) {
	
	/**
	 * Default options for AddPolyline
	 * @id Mapifies.AddPolyline.defaults
	 * @alias Mapifies.AddPolyline.defaults
	 * @return {Object} The options for AddPolyline
	 * @method
	 * @namespace Mapifies.AddPolyline
	 */
	function defaults() {
		return {
			// An array of GLatLng objects
			polylinePoints: [],
			// Colour of the line
			polylineStrokeColor: "#ff0000",
			// Width of the line
			polylineStrokeWidth: 10,
			// Opacity of the line
			polylineStrokeOpacity: 1,
			// Optional center map
			mapCenter: [],
			// Is line Geodesic (i.e. bends to the curve of the earth)?
			polylineGeodesic: false,
			// Is line clickable?
			polylineClickable: true
		};
	};
	
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);
	var polyLineOptions = {};
	if (options.polylineGeodesic)
		jQuery.extend(polyLineOptions, {geodesic: true});
			
	if(!options.polylineClickable)
		jQuery.extend(polyLineOptions, {clickable: false});

	if (options.mapCenter[0] && options.mapCenter[1])
		thisMap.setCenter(new GLatLng(options.mapCenter[0], options.mapCenter[1]));

	var allPoints = [];
	jQuery.each(options.polylinePoints, function(i, point) {
		allPoints.push(new GLatLng(point[0],point[1]));
	});

	var polyline = new GPolyline(allPoints, options.polylineStrokeColor, options.polylineStrokeWidth, options.polylineStrokeOpacity, polyLineOptions);
	thisMap.addOverlay(polyline);
		
	if (typeof callback == 'function') return callback(polyline, polyLineOptions, options);
	return;
}

/**
 * Removes an polyline to the map made up of several geopoints.
 * @id Mapifies.RemovePolyline
 * @param {Object} element
 * @param {Object} polyline
 * @param {Function} callback
 * @return {Function} Returns a passed callback function or true
 * @method
 * @namespace Mapifies
 */
Mapifies.RemovePolyline = function (element, polyline, callback ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(polyline);
	return;
};
