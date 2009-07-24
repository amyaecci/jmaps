
/**
 * This function allows you to add a Google Streetview
 * @method
 * @namespace Mapifies
 * @id Mapifies.CreateStreetviewPanorama
 * @alias Mapifies.CreateStreetviewPanorama
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the street view.
 */
Mapifies.CreateStreetviewPanorama = function( element, options, callback ) {
	/**
	 * Default options for CreateStreetviewPanorama
	 * @method
	 * @namespace Mapifies.CreateStreetviewPanorama
	 * @id Mapifies.CreateStreetviewPanorama.defaults
	 * @alias Mapifies.CreateStreetviewPanorama.defaults
	 * @param {String} overideContainer A ID of a div to put the street view into, otherwise it will default to the map.
	 * @param {Object} latlng The starting Lat/Lng of the streetview - this is required.
	 * @param {Object} pov The point of view to initialse the map on.  This is 3 values, X/Y/Z
	 * @return {Object} The options for CreateStreetviewPanorama
	 */
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
 * This function allows you to remove a street view from the map
 * @method
 * @namespace Mapifies
 * @id Mapifies.RemoveStreetviewPanorama
 * @alias Mapifies.RemoveStreetviewPanorama
 * @param {jQuery} element The element to initialise the map on.
 * @param {GStreetView} view The view to be removed
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the view.
 */
Mapifies.RemoveStreetviewPanorama = function ( element, view, callback ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	view.remove();
	if (typeof callback == 'function') return callback( view );
	return;
};