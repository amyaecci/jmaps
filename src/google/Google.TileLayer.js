
Mapifies.AddMapType = function (element, options, callback) {
	function defaults(){
  	return {
  		'layerCopyright': undefined,
  		'minResolution': null,
  		'maxResolution': null,
  		'urlFunction': undefined,
			'mercatorProjection': null,
			'isPng': false,
			'opacity': 1.0,
			'mapName': null,
			'mapTypeOptions' : {
				'shortName': this.mapName,
				'urlArg': null,
				'maxResolution': this.maxResolution,
				'minResolution': this.minResolution,
				'tileSize': 256,
				'textColor': "black",
				'linkColor': "#7777cc",
				'errorMessage': '',
				'alt': '',
				'radius': 6378137
			}
  	}
  };s
	options = jQuery.extend(defaults(), options);
		
	var tileLayer = [new GTileLayer(options.layerCopyright, options.minZoom, options.maxZoom)];
	tileLayer[0].getTileUrl = options.urlFunction;
	tileLayer[0].isPng = options.isPng;
	tileLayer[0].getOpacity = options.opacity;
	var mapType = new GMapType(tileLayer, new GMercatorProjection(options.mercatorProjection), options.mapName, options.mapTypeOptions);
}
