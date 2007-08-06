/* jQuery Maps (jmaps) - A jQuery plugin for Google Maps API
 * Author: Tane Piper (digitalspaghetti at gmail dot com) 
 * With special thanks Dave Cardwell (who helped on getting the first version of this plugin to work).
 * Website: http://code.google.com/p/jmaps/
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 * This plugin is not affiliated with Google or Yahoo.  
 * For Google Maps API and T&C see http://www.google.com/apis/maps/
 * For Yahoo! Maps API and T&C see http://developer.yahoo.com/maps/
 * 
 * For support, I can usually be found on the #jquery IRC channel on irc.freenode.net
 * ===============================================================================================================
 * ^^^ Changelog ^^^
 * Version 1.3.1 (06/08/2007)
 * Fixed bug with Google Maps API change.  Can now find Google map objects again
 * 
 * Version 1.3 (31/07/2007)
 * Added support for creating Yahoo! Maps, can create Map, Satallite or Hybrid.  Check out available options below
 * Added support for creating points on Yahoo! maps.
 * Added support for creating Polylines on Yahoo! maps.
 * Added support for GeoRSS files on both Yahoo! and Google maps, as well as existing KML support for Google, method
 * name was changed from .addKml to .addRss
 * Moved directions search out of main namespace, now function that is called from within plugin by providing fields
 * Added Yahoo! Geocoding support
 * 
 * Known 1.3 Bugs
 * Event.MouseDoubleClick does not work on Yahoo maps within .addPoint method
 * ===============================================================================================================
 * Version 1.2 (25/07/2007)
 * Moved GClientGeocoder into searchAddress method
 * Fixed bug in searchAddress method regarding getPoint().
 * ===============================================================================================================
 * Version 1.1 (16/07/2007)
 * Changed name to remove Google from main name - namespace now .jmap.
 * Added additional options:
 * 	+ Add map dragging enable/disable.
 *	+ Add scroll wheel zooming.
 *	+ Add smooth continuous zooming (on certain browsers).
 *	+ Added clean unloading of Google objects.
 * Added .addPoly method.  Allows the creation of polylines on the map.
 * Added .addKml support for rendering KML Files.
 * Added .directions Driving Direction support.
 * ===============================================================================================================
 * Version 1.0 (13/07/2007)
 * Initial version.
 * Creates Google Map.
 * Add points to map.
 * Takes address or postcode, Geocodes and centers map.  Also creates a draggable marker.
 * ===============================================================================================================
 */
(function($) {
	/* function searchAddress(jmap, address, settings)
	 * This function is an internal plugin method that returns a GLatLng that can be passed
	 * to a Google map.
	 */
	function searchAddress(jmap, address, settings) {
		// Yahoo Maps
		if (jmap._mapType) {
			jmap.geoCodeAddress(address);
			YEvent.Capture(jmap, EventsList.onEndGeoCode, function(e){
				if(e.success == 0) {
					alert(address + " not found");
				} else {
					point = new YGeoPoint(e.GeoPoint.Lat,e.GeoPoint.Lon);
					jmap.drawZoomAndCenter(point, settings.zoom);
					var marker = new YMarker(point);	// Create the Yahoo marker type
					marker.openSmartWindow("Latitude: " + point.Lat + "<br />Longitude: " + point.Lon);
					jmap.addOverlay(marker);	// Add marker to map
				}
			});
			//Google Maps
		} else if (jmap.b.jMap) {
			GGeocoder = new GClientGeocoder();
			GGeocoder.getLatLng(address, function(point){
				if (!point) {
					alert(address + " not found");
				} else {
					jmap.setCenter(point,settings.zoom);
					var marker = new GMarker(point, {draggable: true});
					jmap.addOverlay(marker);
					pointlocation = marker.getPoint();
					marker.openInfoWindowHtml("Latitude: " + pointlocation.lat() + "<br />Longitude: " + pointlocation.lng());
					GEvent.addListener(marker, "dragend", function(){
						mylocation = marker.getPoint();
						marker.openInfoWindowHtml("Latitude: " + pointlocation.lat() + "<br />Longitude: " + pointlocation.lng());			
					});
				}
			});
		} else {
			alert('Map Object Not Found!');
		}	
	}
	
	/* directions: function(map,query, panel)
	 * Takes a Direction query and returns directions for map.  Optional panel for text information
	 */
	function searchDirections(jmap,query,panel) {
		// Yahoo Maps
		if (jmap._mapType) {
			alert('Yahoo Maps Do Not Support Directions');
		} else if (jmap.b.jMap) { //Google Maps
			var dirpanel = document.getElementById(panel);
			directions = new GDirections(jmap, dirpanel);
			directions.load(query);
		}
	}

	$.fn.extend({
	/* jmap: function(settings)
	 * The constructor method
	 * Example: $().jmap();
	 */
	jmap: function(settings) {
		var version = "1.3";
		/* Default Settings*/	
		var settings = jQuery.extend({
			provider: "google",		// can be "google" or "yahoo"
			maptype: "hybrid",		// can be "map", "sat" or "hybrid"
			center: [55.958858,-3.162302],	// G + Y
			zoom: 12,				// G + Y
			controlsize: "small",	// G + Y
			showtype: true,			// G + Y
			showzoom: true,			// Y
			showpan: true,			// Y
			showoverview: true,		// G
			showscale: true,		// Y
			dragging: true,			// G + Y
			scrollzoom: false,		// G + Y
			smoothzoom: true,		// G
			searchfield: "#Address",
			searchbutton: "#findaddress",
			directionsto: "#to",
			directionsfrom: "#from",
			directionsfind: "#getDirections",
			directionspanel: "myDirections"
		},settings);
		
		return this.each(function(){
			switch(settings.provider)
			{
				case "yahoo":
					var jmap = this.jMap = new YMap(this);
					switch(settings.maptype) {
						case "map":
							var loadmap = YAHOO_MAP_REG;
							break;
						case "sat":
							var loadmap = YAHOO_MAP_SAT;
							break;
						default:
							var loadmap = YAHOO_MAP_HYB;
							break;
					}
					jmap.setMapType(loadmap);
					jmap.drawZoomAndCenter(new YGeoPoint(settings.center[0],settings.center[1]), settings.zoom);
					if (settings.showtype == true){
						jmap.addTypeControl();	// Type of map Control
					}
					if (settings.showzoom == true && settings.controlsize == "small" ){
						jmap.addZoomShort();	// Small zoom control
					}
					if (settings.showzoom == true && settings.controlsize == "large" ){
						jmap.addZoomLong();		// Large zoom control
					}
					if (settings.showpan == true) {
						jmap.addPanControl();	// Pan control
					}
					if (settings.showscale == false) {
						/* On by default */
						jmap.removeZoomScale();	// Show scale bars
					}
					if (settings.dragging == false) {
						/* On by default */
						jmap.disableDragMap();	// Is map draggable?
					}
					if (settings.scrollzoom == false) {
						/* On by default */
						jmap.disableKeyControls(); // Mousewheel and Keyboard control
					}
					break;
					
				case "mslive":
					alert('Microsoft Live Maps are currently not supported but planned for version 1.4')
					break;
					
				default:	
					var jmap = this.jMap = new GMap2(this);
					switch(settings.maptype) {
						case "map":
							var loadmap = G_NORMAL_MAP;
							break;
						case "sat":
							var loadmap = G_SATELLITE_MAP;
							break;
						default:
							var loadmap = G_HYBRID_MAP;
							break;
					}
					jmap.setCenter(new GLatLng(settings.center[0],settings.center[1]),settings.zoom,loadmap);
					switch(settings.controlsize)
					{
						case "small":
							jmap.addControl(new GSmallMapControl());
							break;
						case "large":
							jmap.addControl(new GLargeMapControl());
							break;
						case "none":
							break;
						default:
							jmap.addControl(new GSmallMapControl());
					}
					if (settings.showtype == true){
						jmap.addControl(new GMapTypeControl());// Type of map Control
					}
					if (settings.showoverview == true){
						jmap.addControl(new GOverviewMapControl());//Overview Map
					}
					if (settings.scrollzoom == true) {
						/* Off by default */
						jmap.enableScrollWheelZoom();
					}
					if (settings.smoothzoom == true) {
						/* Off by default*/
						jmap.enableContinuousZoom();
					}
					if (settings.dragging == false) {
						/* On by default */
						jmap.disableDragging();
					}
			}	
			/* Seach for the lat & lng of our address*/
			jQuery(settings.searchbutton).bind('click', function(){
				searchAddress(jmap, jQuery(settings.searchfield).attr('value'), settings);
			});
			/* Search for Directions */
			jQuery(settings.directionsfind).bind("click", function(){
				var from = $(settings.directionsfrom).attr('value');
				var to = $(settings.directionsto).attr('value');
				searchDirections(jmap, "from: " + from + " to: " + to, settings.directionspanel);	
				$(settings.directionsfrom).attr('value', to);
				$(settings.directionsto).attr('value', '');
				return false;
			});
			/* On document unload, clean unload Google API*/
			jQuery(document).unload(function(){ GUnload(); });
		});
		},
	/* myMap: function()
	 * Returns a map object from the API, so it's available to the user
	 * Example: $().myMap().setCenter(...) for Google;
	 * Example: $().myMap().drawZoomAndCenter(...) for Yahoo;
	 */
	myMap: function() {
		return this[0].jMap;	
	},
	/* addPoint: function()
	 * Returns a marker to be overlayed on the Google map
	 * Example: $().addPoint(...);
	 */
	addPoint: function(pointlat, pointlng, pointhtml, isdraggable, removable) {
		var jmap = this[0].jMap;
		// Yahoo Maps
		if (jmap._mapType) {			
			var marker = new YMarker(new YGeoPoint(pointlat, pointlng));	// Create the Yahoo marker type
			YEvent.Capture(marker, EventsList.MouseClick, function(){		// Add mouseclick to open HTML
				marker.openSmartWindow(pointhtml);
			});
			// Below code does not work at this time
			if (removable == true) {
				YEvent.Capture(marker, EventsList.MouseDoubleClick, function(e){
					jmap.removeOverlay(marker);
				});
			}
			jmap.addOverlay(marker);	// Add marker to map
		} else if (jmap.b.jMap) { // Google Maps
			var marker = new GMarker(new GLatLng(pointlat,pointlng), { draggable: isdraggable } );
			GEvent.addListener(marker, "click", function(){
				marker.openInfoWindowHtml(pointhtml);
			});
			if (removable == true) {
				GEvent.addListener(marker, "dblclick", function(){
					return jmap.removeOverlay(marker);
				});
			}
			return jmap.addOverlay(marker);
		}
	},
	/* addPoly: function(poly)
	 * Takes an array of GLatLng points, converts it to a vector Polyline to display on the map
	 * Example: $().addPoly(...);
	 */
	addPoly: function (poly, colour, width, alpha) {
		var jmap = this[0].jMap;
		// Yahoo Maps
		if (jmap._mapType) {
			return	jmap.addOverlay(poly, colour, width, alpha);
		} else if (jmap.b.jMap) { // Google Maps	
			return jmap.addOverlay(poly);
		}
	},
	/* addRss: function()
	 * Takes a KML file and renders it to the map.
	 * Example: $().addPoint(...);
	 */
	addRss: function (rssfile) {
		var jmap = this[0].jMap;
		// Yahoo Maps
		if (jmap._mapType) {
			var geoXml = new YGeoRSS(rssfile);
			return jmap.addOverlay(geoXml);
		} else if (jmap.b.jMap) {  // Google Maps	
			var geoXml = new GGeoXml(rssfile);
			return jmap.addOverlay(geoXml);
		}
		
	}
});
})(jQuery);