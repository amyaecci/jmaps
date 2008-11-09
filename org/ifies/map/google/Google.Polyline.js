/**
 * This function allows you to add a polyline to a map using GLatLng points
 * @method
 * @namespace Mapifies
 * @id Mapifies.AddPolyline
 * @alias Mapifies.AddPolyline
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the polygon object, polygon options and options.
 */
Mapifies.AddPolyline = function (element, options, callback) {
	/**
	 * Default options for AddPolyline
	 * @method
	 * @namespace Mapifies.AddPolyline
	 * @id Mapifies.AddPolygon.defaults
	 * @alias Mapifies.AddPolygon.defaults
	 * @param {Object} polylinePoints An array of Lat/Lng points that make up the vertexes of the polyline.
	 * @param {String} polylineStrokeColor The stroke colour for the polyline.
	 * @param {Number} polylineStrokeWidth The thickness of the polyline line.
	 * @param {Number} polylineStrokeOpacity A value from 0 to 1 of for the line opacity.
	 * @param {Object} mapCenter An array containing the LatLng point to center on.
	 * @param {Boolean} polylineGeodesic Defines if the line follows the curve of the earth.  Default false.
	 * @param {Boolean} polylineClickable Defines if the polygon is clickable or not. Default true.
	 * @return {Object} The options for AddPolyline
	 */
	function defaults() {
		return {
			// An array of GLatLng objects
			'polylinePoints': [],
			// Colour of the line
			'polylineStrokeColor': "#ff0000",
			// Width of the line
			'polylineStrokeWidth': 10,
			// Opacity of the line
			'polylineStrokeOpacity': 1,
			// Optional center map
			'mapCenter': [],
			// Is line Geodesic (i.e. bends to the curve of the earth)?
			'polylineGeodesic': false,
			// Is line clickable?
			'polylineClickable': true
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
 * This function allows you to remove a polyline from the map
 * @method
 * @namespace Mapifies
 * @id Mapifies.RemovePolyline
 * @alias Mapifies.RemovePolyline
 * @param {jQuery} element The element to initialise the map on.
 * @param {GPolyline} polyline The polyline to be removed
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the polyline.
 */
Mapifies.RemovePolyline = function (element, polyline, callback ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(polyline);
	if (typeof callback === 'function') return callback(polyline);
	return;
};
