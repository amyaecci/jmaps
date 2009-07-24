
/**
 * A helper method that allows you to pass the status code of a search and get back a friendly oject
 * @method
 * @namespace Mapifies
 * @id Mapifies.SearchCode
 * @param {Number} code The status code of the query
 * @return {Object} Returns a friendly object that contains the 'code', a 'success' boolean and a helpful 'message'.
 */
Mapifies.SearchCode = function ( code ) {
	switch (code) {
		case G_GEO_SUCCESS:
			return {'code':G_GEO_SUCCESS,'success':true,'message':'Success'};
		case G_GEO_UNKNOWN_ADDRESS:
			return {'code' : G_GEO_UNKNOWN_ADDRESS, 'success' : false, 'message' : 'No corresponding geographic location could be found for one of the specified addresses. This may be due to the fact that the address is relatively new, or it may be incorrect'};
			break;
		case G_GEO_SERVER_ERROR:
			return {'code' : G_GEO_UNKNOWN_ADDRESS, 'success' : false, 'message' : 'A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.'};
			break;
		case G_GEO_MISSING_QUERY:
			return {'code' : G_GEO_UNKNOWN_ADDRESS, 'success' : false, 'message' : 'The HTTP q parameter was either missing or had no value. For geocoder requests, this means that an empty address was specified as input. For directions requests, this means that no query was specified in the input.'};
			break;
		case G_GEO_BAD_KEY:
			return {'code' : G_GEO_UNKNOWN_ADDRESS, 'success' : false, 'message' : 'The given key is either invalid or does not match the domain for which it was given.'};
			break;
		case G_GEO_BAD_REQUEST:
			return {'code' : G_GEO_UNKNOWN_ADDRESS, 'success' : false, 'message' : 'A directions request could not be successfully parsed.'};
			break;
		default:
			return {
				'code': null,
				'success': false,
				'message': 'An unknown error occurred.'
			};
		break;
	};
}

/**
 * An internal function to get the google travel mode constant
 * @method
 * @namespace Mapifies
 * @id Mapifies.GetTravelMode
 * @alias Mapifies.GetTravelMode
 * @param {String} travelMode The string of the travel mode.
 * @return {String} travelMode The Google constant for a travel mode.
 */
Mapifies.GetTravelMode = function ( travelMode ) {
	switch(travelMode) {
		case 'driving':	
			travelMode = G_TRAVEL_MODE_DRIVING;
		break;
		case 'walking':	
			travelMode = G_TRAVEL_MODE_WALKING;
		break;
	};
	return travelMode;
};

/**
 * A helper function to create a google GIcon
 * @method
 * @namespace Mapifies
 * @id Mapifies.createIcon
 * @alias Mapifies.createIcon
 * @param {Object} options The options to create the icon
 * @return {GIcon} A GIcon object
 */
Mapifies.createIcon = function (options) {
	/**
	 * Default options for createIcon
	 * @method
	 * @namespace Mapifies.createIcon
	 * @id Mapifies.createIcon.defaults
	 * @alias Mapifies.createIcon.defaults
	 * @param {String} iconImage The foreground image URL of the icon.
	 * @param {String} iconShadow The shadow image URL of the icon.
	 * @param {GSize} iconSize The pixel size of the foreground image of the icon.
	 * @param {GSize} iconShadowSize The pixel size of the shadow image.
	 * @param {GPoint} iconAnchor The pixel coordinate relative to the top left corner of the icon image at which this icon is anchored to the map.
	 * @param {GPoint} iconInfoWindowAnchor The pixel coordinate relative to the top left corner of the icon image at which the info window is anchored to this icon.
	 * @param {String} iconPrintImage The URL of the foreground icon image used for printed maps. It must be the same size as the main icon image given by image.
	 * @param {String} iconMozPrintImage The URL of the foreground icon image used for printed maps in Firefox/Mozilla. It must be the same size as the main icon image given by image.
	 * @param {String} iconPrintShadow The URL of the shadow image used for printed maps. It should be a GIF image since most browsers cannot print PNG images.
	 * @param {String} iconTransparent The URL of a virtually transparent version of the foreground icon image used to capture click events in Internet Explorer. This image should be a 24-bit PNG version of the main icon image with 1% opacity, but the same shape and size as the main icon.
	 * @return {Object} The options for createIcon
	 */
	function defaults() {
		return {
			'iconImage': undefined,
			'iconShadow': undefined,
			'iconSize': undefined,
			'iconShadowSize': undefined,
			'iconAnchor': undefined,
			'iconInfoWindowAnchor': undefined,
			'iconPrintImage': undefined,
			'iconMozPrintImage': undefined,
			'iconPrintShadow': undefined,
			'iconTransparent': undefined
		};
	};
	
	options = jQuery.extend(defaults(), options);
	var icon = new GIcon(G_DEFAULT_ICON);
		
	if(options.iconImage)
		icon.image = options.iconImage;
	if(options.iconShadow)
		icon.shadow = options.iconShadow;
	if(options.iconSize)
		icon.iconSize = options.iconSize;
	if(options.iconShadowSize)
		icon.shadowSize = options.iconShadowSize;
	if(options.iconAnchor)
		icon.iconAnchor = options.iconAnchor;
	if(options.iconInfoWindowAnchor)
		icon.infoWindowAnchor = options.iconInfoWindowAnchor;
	return icon;
};

/**
 * A helper function to get the map center as a GLatLng
 * @method
 * @namespace Mapifies
 * @id Mapifies.getCenter
 * @alias Mapifies.getCenter
 * @param {jQuery} element The element that contains the map.
 * @return {GLatLng} A object containing the center of the map
 */
Mapifies.getCenter = function ( element ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	return thisMap.getCenter();
};

/**
 * A helper function to get the bounds of the map
 * @method
 * @namespace Mapifies
 * @id Mapifies.getBounds
 * @alias Mapifies.getBounds
 * @param {jQuery} element The element that contains the map.
 * @return {GSize} The bounds of the map
 */
Mapifies.getBounds = function (element){
	var thisMap = Mapifies.MapObjects.Get(element);
	return thisMap.getBounds();
};