Mapifies.CreateStreetviewPanorama = function( element, options, callback ) {
	
	function defaults() {
		return {
			'overideContainer':'',
			'latlng':[40.75271883902363, -73.98262023925781],
			'pov': []
		}
	};
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);
	// Create Street View Overlay
	
	var container = null;
	if (options.overideContainer !== '') {
		container = jQuery(options.overideContainer).get(0);
	} else {
		container = jQuery(element).get(0);
	}
	
	var viewOptions = {};
	if (options.pov.length > 0) {
		jQuery.extend(viewOptions, {'pov':new GPov(options.latlng[0],options.latlng[1],options.latlng[2])});
	}
	if (options.latlng.length > 0) {
		jQuery.extend(viewOptions, {'latlng':new GLatLng(options.latlng[0],options.latlng[1])});
	}
	
	var overlay = new GStreetviewPanorama(container, viewOptions);
	if (typeof callback == 'function') return callback(overlay, options);
	return;
};

/**
 * Removes the specificed feed on the passed map
 * @param {Object} element
 * @param {Object} feed
 * @param {Object} callback
 * @return {Function}
 */
Mapifies.RemoveStreetviewPanorama = function ( element, view, callback ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	view.remove();
	if (typeof callback == 'function') return callback( view );
	return;
};