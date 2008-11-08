
/**
 * Create an adsense ads manager for the map.  The Adsense manager will parse your page and show adverts on the map that relate to this.  Requires your adsense publisher id and channel
 * @method
 * @namespace Mapifies
 * @id Mapifies.CreateAdsManager
 * @param {jQuery} element The jQuery object containing the map element.
 * @param {Object} options An object of options
 * @param {Function} callback The callback function that returns the result
 * @return {Function} Returns a passed callback function or true if no callback specified
 */

Mapifies.CreateAdsManager = function( element, options, callback) {
	/**
	 * Default options for CreateAdsManager
	 * @method
	 * @namespace Mapifies.CreateAdsManager
	 * @id Mapifies.CreateAdsManager.defaults
	 * @alias Mapifies.CreateAdsManager.defaults
	 * @param {String} publisherId Your Adsense publisher ID
	 * @param {Number} maxAdsOnMap The maximum number of ads to show on the map at one time
	 * @param {Number} channel The AdSense channel this belongs to
	 * @param {Number} minZoomLevel The minimum zoom level to begin showing ads at
	 * @return {Object} The options for CreateAdsManager
	 */
	function defaults() {
		return {
			'publisherId':'',
			'maxAdsOnMap':3,
			'channel':0,
			'minZoomLevel':6
		}
	};
	var thisMap = Mapifies.MapObjects.Get(element);
	options = jQuery.extend(defaults(), options);
	
	var adsOptions = {
		'maxAdsOnMap':options.maxAdsOnMap,
		'channel':options.channel,
		'minZoomLevel':options.minZoomLevel
	}
	
	if (typeof thisMap.AdsManager == 'undefined') {
  	Mapifies.MapObjects.Append(element, 'AdsManager', new GAdsManager(thisMap, options.publisherId, adsOptions));
  }	
	
	if (typeof callback == 'function') return callback(thisMap.AdsManager, options);
};
