
/**
 * The SearchAddress function takes a map, options and callback function.  The options can contain either an address string, to which a point is returned - or reverse geocoding a GLatLng, where an address is returned
 * @method
 * @namespace Mapifies
 * @id Mapifies.SearchAddress
 * @param {jQuery} element The jQuery object containing the map element.
 * @param {Object} options An object of options
 * @param {Function} callback The callback function that returns the result
 * @return {Function} Returns a passed callback function or true if no callback specified
 */
Mapifies.SearchAddress = function( element, options, callback) {
	/**
	 * Default options for SearchAddress
	 * @method
	 * @namespace Mapifies.SearchAddress
	 * @id Mapifies.SearchAddress.defaults
	 * @alias Mapifies.SearchAddress.defaults
	 * @param {String} query The Address or GLatLng to query in the geocoder
	 * @param {String} returnType The type of value you want to return from Google.  This is mapped to the function names available, the options are 'getLatLng' which returns coordinates, and 'getLocations' which returns points.
	 * @param {GGeoCache} cache The GGeoCache to store the results in if required
	 * @param {String} countryCode The country code to localise results
	 * @return {Object} The options for SearchAddress
	 */
	function defaults() {
		return {
			// Address to search for
			'query': null,
			// Return Type
			'returnType': 'getLatLng',
			// Optional Cache to store Geocode Data (not implemented yet)
			'cache': undefined,
			// Country code for localisation (not implemented yet)
			'countryCode': 'uk'
		};
	};
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);
	
	// Check to see if the Geocoder already exists in the object
	// or create a temporary locally scoped one.
	if (typeof thisMap.Geocoder === 'undefined') {	
		if (typeof options.cache === 'undefined') {
		 	var geoCoder = new GClientGeocoder();
		} else {
			var geoCoder = new GClientGeocoder(cache);
		}
		Mapifies.MapObjects.Append(element, 'Geocoder', geoCoder);
		// We need to get the map object again, now we have attached the geocoder
		thisMap = Mapifies.MapObjects.Get(element);
	}
	thisMap.Geocoder[options.returnType](options.query, function(result){
		if (typeof callback === 'function') {
			return callback(result, options); 
		}
	});
	return;
};
	
/**
 * The SearchDirections function allows you to search for directions between two or more points and return it to a map and a directions panel
 * @method
 * @namespace Mapifies
 * @id Mapifies.SearchDirections
 * @param {jQuery} element The jQuery object containing the map element.
 * @param {Object} options An object of options
 * @param {Function} callback The callback function that returns the result
 * @return {Function} Returns a passed callback function or true if no callback specified
 */
Mapifies.SearchDirections = function( element, options, callback) {
	/**
	 * Default options for SearchDirections
	 * @method
	 * @namespace Mapifies.SearchDirections
	 * @id Mapifies.SearchDirections.defaults
	 * @alias Mapifies.SearchDirections.defaults
	 * @param {String} query The directions query to parse.  Must contain one 'from:' and one 'to:' query, but can contain multiple 'to:' queries.
	 * @param {String} panel The ID of the panel that the directions will be sent to.
	 * @param {String} local The local for the directions.
	 * @param {String} travelMode Allows you to specify the travel mode, either 'driving' or 'walking'.  Driving is the default.
	 * @param {Boolean} avoidHighways Allows you to avoid Highways/Motorway's on trips.  Please note this may not always be possible depending on the route.
	 * @param {Boolean} getPolyline Decides if the returned result will draw a polyline on the map on the journey.  Default is True.
	 * @param {Boolean} getSteps Decides if the textual directions are returned to the directions panel.
	 * @param {Boolean} preserveViewport Decides if the map will zoom and center in on the directions results.
	 * @param {Boolean} clearLastSearch Clears the last direction search if you do not want to have multiple points.
	 * @return {Object} The options for SearchDirections
	 */
	function defaults() {
		return {
			// From address
			'query': null,
			// Optional panel to show text directions
			'panel': null,
			//The locale to use for the directions result.
			'locale': 'en_GB',
			//The mode of travel, such as driving (default) or walking
			'travelMode': 'driving',
			// Option to avoid highways
			'avoidHighways': false,
			// Get polyline
			'getPolyline': true,
			// Get directions
			'getSteps': true,
			// Preserve Viewport
			'preserveViewport' : false,
			// clear last search
			'clearLastSearch' : false
		};
	};
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);
	
	var queryOptions = {
		'locale': options.locale,
		'travelMode': options.travelMode,
		'avoidHighways': options.avoidHighways,
		'getPolyline': options.getPolyline,
		'getSteps': options.getSteps,
		'preserveViewport' : options.preserveViewport
	};
	
	var panel = $(options.panel).get(0);
	
	if (typeof thisMap.Directions === 'undefined') {
  	Mapifies.MapObjects.Append(element, 'Directions', new GDirections(thisMap, panel));
  }	
	
	GEvent.addListener(thisMap.Directions, "load", onLoad);
  GEvent.addListener(thisMap.Directions, "error", onError);
	
	if (options.clearLastSearch) {
		thisMap.Directions.clear();
	}
	
	thisMap.Directions.load(options.query, queryOptions);
	
	function onLoad() {
		if (typeof callback == 'function') return callback(thisMap.Directions, options);	
	}
	
	function onError() {
		if (typeof callback == 'function') return callback(thisMap.Directions, options);	
	}
	
	return;
};

/**
 * A jMaps helper method that returns an friendly object based on the SearchDirections return code
 * @method
 * @id SearchDirectionsCode
 * @param {Number} code The number of the code returned
 * @return {Object} Result Returns a result object with code, success and a friendly message
 */
function SearchCode(code){
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
};
