/**
 * This function allows you to add markers to the map with several options
 * @method
 * @namespace Mapifies
 * @id Mapifies.AddMarker
 * @alias Mapifies.AddMarker
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Object} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the marker object and options.
 */
Mapifies.AddMarker = function ( element, options, callback ) {
	
	function defaults() {
		var values = {
			// Point lat & lng
			pointLatLng: [],
			// Point HTML for infoWindow
			pointHTML: null,
			// Event to open infoWindow (click, dblclick, mouseover, etc)
			pointOpenHTMLEvent: "click",
			// Point is draggable?
			pointIsDraggable: false,
			// Point is removable?
			pointIsRemovable: false,
			// Event to remove on (click, dblclick, mouseover, etc)
			pointRemoveEvent: "dblclick",
			// These two are only required if adding to the marker manager
			pointMinZoom: 4,
			pointMaxZoom: 17,
			// Optional Icon to pass in (not yet implemented)
			pointIcon: null,
			// For maximizing infoWindows (not yet implemented)
			pointMaxContent: null,
			pointMaxTitle: null,
			centerMap: false
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
			
	if (options.centerMap)
		thisMap.setCenter(new GLatLng(options.pointLatLng[0],options.pointLatLng[1]));
		
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
 * Removes the specificed marker on the passed map
 * @param {Object} element
 * @param {Object} marker
 * @return {Boolean}
 */
Mapifies.RemoveMarker = function (element, marker ) {
	var thisMap = Mapifies.MapObjects.Get(element);
	thisMap.removeOverlay(marker);
	return;
};

Mapifies.CreateMarkerManager = function(element, options, callback) {
	
	function defaults() {
		return {
			// Border Padding in pixels
			borderPadding: 100,
			// Max zoom level 
			maxZoom: 17,
			// Track markers
			trackMarkers: false
		}
	}
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);
	var markerManager = new GMarkerManager(thisMap, options);
	Mapifies.MapObjects.Append(element, 'MarkerManager',markerManager);

	// Return the callback
	if (typeof callback == 'function') return callback( options );
};
