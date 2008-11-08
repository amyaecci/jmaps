Mapifies.AddPolygon = function(element, options, callback) {
	
	function defaults() {
		return {
			// An array of GLatLng objects
			polygonPoints: [],
			// The outer stroke colour
	 		polygonStrokeColor: "#000000",
	 		// Stroke thickness
	 		polygonStrokeWeight: 5,
	 		// Stroke Opacity
	 		polygonStrokeOpacity: 1,
	 		// Fill colour
	 		polygonFillColor: "#ff0000",
	 		// Fill opacity
	 		polygonFillOpacity: 1,
	 		// Optional center map
	 		mapCenter: [],
	 		// Is polygon clickable?
	 		polygonClickable: true
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

Mapifies.RemovePolygon = function (element, polygon ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(polygon);
	return;
};
