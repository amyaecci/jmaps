/**
 * This function allows you to add markers to the map with several options
 * @method
 * @namespace Mapifies
 * @id Mapifies.AddMarker
 * @alias Mapifies.AddMarker
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the marker object and options.
 */
Mapifies.AddMarker = function ( element, options, callback ) {
	/**
	 * Default options for AddGroundOverlay
	 * @method
	 * @namespace Mapifies.AddGroundOverlay
	 * @id Mapifies.AddGroundOverlay.defaults
	 * @alias Mapifies.AddGroundOverlay.defaults
	 * @param {Object} pointLatLng The Lat/Lng coordinates of the marker.
	 * @param {String} pointHTML The HTML to appear in the markers info window.
	 * @param {String} pointOpenHTMLEvent The javascript event type to open the marker info window.  Default is 'click'.
	 * @param {Boolean} pointIsDraggable Defines if the point is draggable by the end user.  Default false.
	 * @param {Boolean} pointIsRemovable Defines if the point can be removed by the user.  Default false.
	 * @param {Boolean} pointRemoveEvent The event type to remove a marker.  Default 'dblclick'.
	 * @param {Number} pointMinZoom The minimum zoom level to display the marker if using a marker manager.
	 * @param {Number} pointMaxZoom The maximum zoom level to display the marker if using a marker manager.
	 * @param {GIcon} pointIcon A GIcon to display instead of the standard marker graphic.
	 * @param {Boolean} centerMap Automatically center the map on the new marker.  Default false.
	 * @param {String} centerMoveMethod The method in which to move to the marker.  Options are 'normal' (default) and 'pan'.  Added r64
	 * @return {Object} The options for AddGroundOverlay
	 */
	function defaults() {
		var values = {
			'pointLatLng': undefined,
			'pointHTML': undefined,
			'pointOpenHTMLEvent': 'click',
			'pointIsDraggable': false,
			'pointIsRemovable': false,
			'pointRemoveEvent': 'dblclick',
			'pointMinZoom': 4,
			'pointMaxZoom': 17,
			'pointIcon': undefined,
			'centerMap': false,
			'centerMoveMethod':'normal'
		};
		return values;
	};
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend({}, defaults(), options);
	
	var markerOptions = {}
	
	if (typeof options.pointIcon == 'object')
		jQuery.extend(markerOptions, {'icon': options.pointIcon});
		
	if (options.pointIsDraggable)
		jQuery.extend(markerOptions, {'draggable': options.pointIsDraggable});
			
	if (options.centerMap) {
		switch (options.centerMoveMethod) {
			case 'normal':
				thisMap.setCenter(new GLatLng(options.pointLatLng[0],options.pointLatLng[1]));
			break;
			case 'pan':
				thisMap.panTo(new GLatLng(options.pointLatLng[0],options.pointLatLng[1]));
			break;
		}
	}
		
		
	// Create marker, optional parameter to make it draggable
	var marker = new GMarker(new GLatLng(options.pointLatLng[0],options.pointLatLng[1]), markerOptions);
		
	// If it has HTML to pass in, add an event listner for a click
	if(options.pointHTML)
		GEvent.addListener(marker, options.pointOpenHTMLEvent, function(){
			marker.openInfoWindowHtml(options.pointHTML, {maxContent: options.pointMaxContent, maxTitle: options.pointMaxTitle});
		});
	// If it is removable, add dblclick event
	if(options.pointIsRemovable)
		GEvent.addListener(marker, options.pointRemoveEvent, function(){
			thisMap.removeOverlay(marker);
		});

	// If the marker manager exists, add it
	if(thisMap.MarkerManager) {
		thisMap.MarkerManager.addMarker(marker, options.pointMinZoom, options.pointMaxZoom);	
	} else {
		// Direct rendering to map
		thisMap.addOverlay(marker);
	}
		
	if (typeof callback == 'function') return callback(marker, options);
	return;
};


/**
 * This function allows you to remove markers from the map
 * @method
 * @namespace Mapifies
 * @id Mapifies.RemoveMarker
 * @alias Mapifies.RemoveMarker
 * @param {jQuery} element The element to initialise the map on.
 * @param {GMarker} options The marker to be removed
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the marker object.
 */
Mapifies.RemoveMarker = function ( element, marker, callback ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(marker);
	if (typeof callback === 'function') return callback(marker);
	return;
};

/**
 * This function allows you to create a marker manager to store and manage any markers created on the map.  Google recommends not using this marker manager and instead using the open source one.
 * @method
 * @deprecated
 * @namespace Mapifies
 * @id Mapifies.CreateMarkerManager
 * @alias Mapifies.CreateMarkerManager
 * @param {jQuery} element The element to initialise the map on.
 * @param {GMarker} options The marker to be removed
 * @param {Function} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the marker object and options.
 */
Mapifies.CreateMarkerManager = function(element, options, callback) {
	/**
	 * Default options for CreateMarkerManager
	 * @method
	 * @namespace Mapifies.CreateMarkerManager
	 * @id Mapifies.CreateMarkerManager.defaults
	 * @alias Mapifies.CreateMarkerManager.defaults
	 * @param {String} markerManager The type of marker manager to use.  Options are 'GMarkerManager' (default) and 'MarkerManager'.  (Added r72)
	 * @param {Number} borderPadding Specifies, in pixels, the extra padding outside the map's current viewport monitored by a manager. Markers that fall within this padding are added to the map, even if they are not fully visible.
	 * @param {Number} maxZoom The maximum zoom level to show markers at
	 * @param {Boolean} trackMarkers Indicates whether or not a marker manager should track markers' movements.
	 * @return {Object} The options for CreateMarkerManager
	 */
	function defaults() {
		return {
			'markerManager': 'GMarkerManager',
			// Border Padding in pixels
			'borderPadding': 100,
			// Max zoom level 
			'maxZoom': 17,
			// Track markers
			'trackMarkers': false
		}
	}
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);
	
	var markerManagerOptions = {
		'borderPadding': options.borderPadding,
		'maxZoom': options.maxZoom,
		'trackMarkers': options.trackMarkers
	}
	
	var markerManager = new window[options.markerManager](thisMap, options);
	Mapifies.MapObjects.Append(element, 'MarkerManager',markerManager);

	// Return the callback
	if (typeof callback == 'function') return callback( markerManager, options );
};
