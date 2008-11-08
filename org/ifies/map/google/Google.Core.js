/**
 * @classDescription The Mapifies variable is the main class object for jMaps
 */
var Mapifies;

if (!Mapifies) Mapifies = {};

/**
 * The main object that holds the maps
 */
Mapifies.MapObjects = {};

/**
 * Creates a new map on the passed element with the defined options.  Creates a global object that contains the map.
 * @method
 * @namespace Mapifies.MapObjects
 * @id Mapifies.MapObjects.Set
 * @alias Mapifies.MapObjects.Set
 * @param {jQuery} element The element that contains the map.
 * @param {Object} options An object that contains the options.
 * @return {Object} The object that contains the map.
 */
Mapifies.MapObjects.Set = function ( element, options ) {
	var mapName = jQuery(element).attr('id');
	var thisMap = new GMap2(element);
	Mapifies.MapObjects[mapName] = thisMap;
	Mapifies.MapObjects[mapName].Options = options;
	return Mapifies.MapObjects[mapName];
};

/**
 * Adds additional objects and functions to an existing MapObject
 * @method
 * @namespace Mapifies.MapObjects
 * @id Mapifies.MapObjects.Append
 * @alias Mapifies.MapObjects.Append
 * @param {jQuery} element The element that contains the map
 * @param {Object} description The name of the object to create
 * @param {Object} appending The object or function to append
 */
Mapifies.MapObjects.Append = function ( element, description, appending ) {
	var mapName = jQuery(element).attr('id');
	Mapifies.MapObjects[mapName][description] = appending;
};

/**
 * Returns the current map object for the passed element
 * @method
 * @namespace Mapifies.MapObjects
 * @id Mapifies.MapObjects.Get
 * @alias Mapifies.MapObjects.Get
 * @param {jQuery} element The element that contains the map.
 * @return {Object} Mapifies The Mapifies object that contains the map.
 */
Mapifies.MapObjects.Get = function ( element ) {
	return Mapifies.MapObjects[jQuery(element).attr('id')];
};

/**
 * The main function to initialise the map
 * @method
 * @namespace Mapifies
 * @id Mapifies.Initialise
 * @alias Mapifies.Initialise
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Object} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the map object and options.
 */
Mapifies.Initialise = function ( element, options, callback ) {
	/**
	 * Default options for Initialise
	 * @method
	 * @namespace Mapifies.Initialise
	 * @id Mapifies.Initialise.defaults
	 * @alias Mapifies.Initialise.defaults
	 * @param {String} language The locale language for the map
	 * @param {String} mapType The type of map to create.  Options are 'map' (default), 'sat' and 'hybrid'.
	 * @param {Object} mapCenter An array that contains the Lat/Lng coordinates of the map center.
	 * @param {Number} mapZoom The initial zoom level of the map.
	 * @param {String} mapControl The option for the map control.  The options are 'small' (default), 'large' or 'none'
	 * @param {Boolean} mapEnableType Defines if the buttons for map type are shown.  Default false.
	 * @param {Boolean} mapEnableOverview Defines if the map overview is shown.  Default false.
	 * @param {Boolean} mapEnableDragging Defines if the map is draggable or not.  Default true.
	 * @param {Boolean} mapEnableInfoWindows Defines if info windows are shown on the map or not.  Default true.
	 * @param {Boolean} mapEnableDoubleClickZoom Defines if double clicking zooms the map.  Default false.
	 * @param {Boolean} mapEnableSmoothZoom Defines if smooth scrolling is enabled.  Default false.
	 * @param {Boolean} mapEnableGoogleBar Defines if the google map search tool is enabled.  Default false.
	 * @param {Boolean} mapEnableScaleControl Defines if the scale bar is shown.  Default false.
	 * @param {Boolean} mapShowjMapsIcon Defines if the jMaps icon is shown.  Default true.
	 * @param {Boolean} debugMode Defines if the map object created is returned to the Firebug console.  Default false.
	 * @return {Object} The options for SearchAddress
	 */
	function defaults() {
		return {
			// Initial type of map to display
			'language': 'en',
			// Options: "map", "sat", "hybrid"
			'mapType': 'map',
			// Initial map center
			'mapCenter': [55.958858,-3.162302],
			// Initial zoom level
			'mapZoom': 12,
			// Initial map control size
			// Options: "large", "small", "none"
			'mapControl': 'small',
			// Initialise type of map control
			'mapEnableType': false,
			// Initialise small map overview
			'mapEnableOverview': false,
			// Enable map dragging when left button held down
			'mapEnableDragging': true,
			// Enable map info windows
			'mapEnableInfoWindows': true,
			// Enable double click zooming
			'mapEnableDoubleClickZoom': false,
			// Enable zooming with scroll wheel
			'mapEnableScrollZoom': false,
			// Enable smooth zoom
			'mapEnableSmoothZoom': false,
			// Enable Google Bar
			'mapEnableGoogleBar': false,
			// Enables scale bar
			'mapEnableScaleControl': false,
			// Enable the Mapifies icon
			'mapShowjMapsIcon': true,
			//Debug Mode
			'debugMode': false
		};
	};
	options = jQuery.extend(defaults(), options);
	
	if (GBrowserIsCompatible()) {
			
		var thisMap = Mapifies.MapObjects.Set(element, options);
		var mapType = Mapifies.GetMapType(options.mapType);
		thisMap.setCenter(new GLatLng(options.mapCenter[0], options.mapCenter[1]), options.mapZoom, mapType);
		
		if (options.mapShowjMapsIcon) {
			Mapifies.AddScreenOverlay(element,
				{
					'imageUrl':'http://hg.digitalspaghetti.me.uk/jmaps/raw-file/3228fade0b3c/docs/images/jmaps-mapicon.png',
					'screenXY':[70,10],
					'overlayXY':[0,0],
					'size':[42,25]
				}
			);
		}
		
		// Attach a controller to the map view
		// Will attach a large or small.  If any other value passed (i.e. "none") it is ignored
		switch (options.mapControl) {
			case "small":
				thisMap.addControl(new GSmallMapControl());
				break;
			case "large":
				thisMap.addControl(new GLargeMapControl());
				break;
		};
		// Type of map Control (Map,Sat,Hyb)
		if (options.mapEnableType) 
			thisMap.addControl(new GMapTypeControl()); // Off by default
		// Show the small overview map
		if (options.mapEnableOverview) 
			thisMap.addControl(new GOverviewMapControl());// Off by default
		// GMap2 Functions (in order of the docs for clarity)
		// Enable a mouse-dragable map
		if (!options.mapEnableDragging) 
			thisMap.disableDragging(); // On by default
		// Enable Info Windows
		if (!options.mapEnableInfoWindows) 
			thisMap.disableInfoWindow(); // On by default
		// Enable double click zoom on the map
		if (options.mapEnableDoubleClickZoom) 
			thisMap.enableDoubleClickZoom(); // On by default
		// Enable scrollwheel on the map
		if (options.mapEnableScrollZoom) 
			thisMap.enableScrollWheelZoom(); //Off by default
		// Enable smooth zooming
		if (options.mapEnableSmoothZoom) 
			thisMap.enableContinuousZoom(); // Off by default
		// Enable Google Bar
		if (options.mapEnableGoogleBar) 
			thisMap.enableGoogleBar(); //Off by default
		// Enables Scale bar
		if (options.mapEnableScaleControl) 
			thisMap.addControl(new GScaleControl());
		
		if (options.debugMode) 
			console.log(Mapifies);
		
		if (typeof callback == 'function') 
			return callback(element, options);
	} else {
		jQuery(element).text('Your browser does not support Google Maps.');
		return false;
	}
	return;
};

/**
 * A function to move a map to a passed position
 * @method
 * @namespace Mapifies
 * @id Mapifies.MoveTo
 * @alias Mapifies.MoveTo
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Object} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the map object and options or true.
 */
Mapifies.MoveTo = function ( element, options, callback ) {
	/**
 	 * Default options for MoveTo
   * @method
   * @namespace Mapifies
   * @id Mapifies.MoveTo
   * @alias Mapifies.MoveTo
   * @param {String} centerMethod The element to initialise the map on.
   * @param {String} mapType The type of map to create.  Options are 'map' (default), 'sat' and 'hybrid'.
   * @param {Object} mapCenter An array that contains the Lat/Lng coordinates of the map center.
   * @param {Number} mapZoom The initial zoom level of the map.
   * @return {Function} callback The callback option with the point object and options or true.
   */	
	function defaults() {
		return {
			'centerMethod': 'normal',
			'mapType': null,
			'mapCenter': [],
			'mapZoom': null
		};
	};
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);	
	if (options.mapType)
		var mapType = Mapifies.GetMapType(options.mapType);
	var point = new GLatLng(options.mapCenter[0], options.mapCenter[1]);
	switch (options.centerMethod) {
		case 'normal':
			thisMap.setCenter(point, options.mapZoom, mapType);
		break;
		case 'pan':
			thisMap.panTo(point);
		break;
	}
	if (typeof callback == 'function') return callback(point, options);
};

/**
 * Save your current position on the map
 * @method
 * @namespace Mapifies
 * @id Mapifies.SavePosition
 * @alias Mapifies.SavePosition
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Object} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the map object and options or true.
 */
Mapifies.SavePosition = function( element, options, callback ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.savePosition();
	if (typeof callback == 'function') return callback(thisMap);
};

/**
 * Goto a previously saved position
 * @method
 * @namespace Mapifies
 * @id Mapifies.GotoSavedPosition
 * @alias Mapifies.GotoSavedPosition
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the map object and options or true.
 */
Mapifies.GotoSavedPosition = function ( element, options, callback) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.returnToSavedPosition();
	if (typeof callback == 'function') return callback(thisMap);
};

/**
 * Create a keyboard handler to handle keyboard navigation
 * @method
 * @namespace Mapifies
 * @id Mapifies.CreateKeyboardHandler
 * @alias Mapifies.CreateKeyboardHandler
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Object} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the keyboard handler.
 */
Mapifies.CreateKeyboardHandler = function( element, options, callback ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	var keyboardHandler = new GKeyboardHandler(thisMap);
	if (typeof callback == 'function') return callback(keyboardHandler);
};

/**
 * An internal function to get the google maptype constant
 * @method
 * @namespace Mapifies
 * @id Mapifies.GetMapType
 * @alias Mapifies.GetMapType
 * @param {String} mapType The string of the map type.
 * @return {String} mapType The Google constant for a maptype.
 */
Mapifies.GetMapType = function ( mapType ) {
	// Lets set our map type based on the options
	switch(mapType) {
		case 'map':	// Normal Map
			mapType = G_NORMAL_MAP;
		break;
		case 'sat':	// Satallite Imagery
			mapType = G_SATELLITE_MAP;
		break;
		case 'hybrid':	//Hybrid Map
			mapType = G_HYBRID_MAP;
		break;
	};
	return mapType;
};

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
 * @id createIcon
 * @alias createIcon
 * @param {Object} options The options to create the icon
 * @return {GIcon} A GIcon object
 */
function createIcon (options) {
	/**
	 * Default options for createIcon
	 * @method
	 * @namespace createIcon
	 * @id createIcon.defaults
	 * @alias createIcon.defaults
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
 * @id getCenter
 * @alias getCenter
 * @param {jQuery} element The element that contains the map.
 * @return {GLatLng} A object containing the center of the map
 */
function getCenter ( element ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	return thisMap.getCenter();
};

/**
 * A helper function to get the bounds of the map
 * @method
 * @id getBounds
 * @alias getBounds
 * @param {jQuery} element The element that contains the map.
 * @return {GSize} The bounds of the map
 */
function getBounds(element){
	var thisMap = Mapifies.MapObjects.Get(element);
	return thisMap.getBounds();
};
