/**
 * This function allows you to add a polygon to a map using GLatLng points
 * @method
 * @namespace Mapifies
 * @id Mapifies.AddPolygon
 * @alias Mapifies.AddPolygon
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the polygon object, polygon options and options.
 */
Mapifies.AddPolygon = function( element, options, callback ) {
	/**
	 * Default options for AddPolygon
	 * @method
	 * @namespace Mapifies.AddPolygon
	 * @id Mapifies.AddPolygon.defaults
	 * @alias Mapifies.AddPolygon.defaults
	 * @param {Object} polygonPoints An array of Lat/Lng points that make up the vertexes of the polygon.
	 * @param {String} polygonStrokeColor The stroke colour for the polygon.
	 * @param {Number} polygonStrokeWeight The thickness of the polygon line.
	 * @param {Number} polygonStrokeOpacity A value from 0 to 1 of for the line opacity.
	 * @param {String} polygonFillColor The colour of the fill area for the polygon.
	 * @param {Number} polygonFillOpacity The value from 0 to 1 for the polygon fill opacity.
	 * @param {Object} mapCenter An array containing the LatLng point to center on.
	 * @param {Boolean} polygonClickable Defines if the polygon is clickable or not. Default true.
	 * @return {Object} The options for AddPolygon
	 */
	function defaults() {
		return {
			// An array of GLatLng objects
			'polygonPoints': [],
			// The outer stroke colour
	 		'polygonStrokeColor': "#000000",
	 		// Stroke thickness
	 		'polygonStrokeWeight': 5,
	 		// Stroke Opacity
	 		'polygonStrokeOpacity': 1,
	 		// Fill colour
	 		'polygonFillColor': "#ff0000",
	 		// Fill opacity
	 		'polygonFillOpacity': 1,
	 		// Optional center map
	 		'mapCenter': undefined,
	 		// Is polygon clickable?
	 		'polygonClickable': true
		}
	}
	
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);
	var polygonOptions = {};
	
	if (!options.polygonClickable)
		polygonOptions = jQuery.extend(polygonOptions, {clickable: false});
	 		
	if(options.mapCenter[0] && options.mapCenter[1])
		thisMap.setCenter(new GLatLng(options.mapCenter[0], options.mapCenter[1]));
	
	var allPoints = [];
	jQuery.each(options.polygonPoints, function(i, point) {
		allPoints.push(new GLatLng(point[0],point[1]));
	});
	
	var polygon = new GPolygon(allPoints, options.polygonStrokeColor, options.polygonStrokeWeight, options.polygonStrokeOpacity, options.polygonFillColor, options.polygonFillOpacity, polygonOptions);
	thisMap.addOverlay(polygon);
		
	if (typeof callback == 'function') return callback(polygon, polygonOptions, options);
	return;
}

/**
 * This function allows you to remove a polygon from the map
 * @method
 * @namespace Mapifies
 * @id Mapifies.RemovePolygon
 * @alias Mapifies.RemovePolygon
 * @param {jQuery} element The element to initialise the map on.
 * @param {GPolygon} polygon The polygon to be removed
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the polygon.
 */
Mapifies.RemovePolygon = function ( element, polygon, callback ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(polygon);
	if (typeof callback === 'function') return callback(polygon);
	return;
};
