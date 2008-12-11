
Mapifies.Copyright = {};


/**
 * Adds additional objects and functions to an existing MapObject (added r75)
 * @method
 * @namespace Mapifies
 * @id Mapifies.AddCopyright
 * @alias Mapifies.AddCopyright
 * @param {jQuery} element The element to initialise the map on.
 * @param {Object} options The object that contains the options.
 * @param {Object} callback The callback function to pass out after initialising the map.
 * @return {Function} callback The callback option with the copyright container and copywrite object.
 */
Mapifies.AddCopyright = function (element, options, callback) {
	/**
 	 * Default options for AddCopyright
   * @method
   * @namespace Mapifies
   * @id Mapifies.AddCopyright
   * @alias Mapifies.AddCopyright
   * @param {String} copyrightCollectionPrefix The prefix of the text for the copyright.
   * @param {Number} copyrightID The index for the map type
   * @param {Object} copyrightBounds An array of the bounds of the maptype
   * @param {Number} copyrightMinZoom The minimum level to show the maptype at
   * @param {String} copyrightText The copyright text for the maptype.
   */
	function defaults() {
		return {
			'copyrightCollectionPrefix': '&copy; ',
			'copyrightID': null,
			'copyrightBounds': null,
			'copyrightMinZoom': null,
			'copyrightText': null
		}
	};
	options = jQuery.extend(defaults(), options);
	
	var boundSW = options.copyrightBounds[0];
	var boundNE = options.copyrightBounds[1];
	
	var copyright = new GCopyright(
		options.copyrightID,
		new GLatLngBounds(new GLatLng(boundSW[0], boundSW[1]), new GLatLng(boundNE[0], boundNE[1])),
		options.copyrightMinZoom,
		options.copyrightText
	);
	var copyrightCollection = new GCopyrightCollection(options.copyrightCollectionPrefix);
	copyrightCollection.addCopyright(copyright);
	if (typeof callback === 'function') return callback(copyrightCollection, copyright, options);
};
