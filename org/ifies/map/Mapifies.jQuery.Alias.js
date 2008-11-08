var Mapifies;

if (!Mapifies) Mapifies = {};

(function($){
	$.fn.jmap = function(method, options, callback) {
		return this.each(function(){
			if (method == 'init' && typeof options == 'undefined') {
				new Mapifies.Initialise(this, {}, null);
			} else if (method == 'init' && typeof options == 'object') {
				new Mapifies.Initialise(this, options, callback);
			} else if (method == 'init' && typeof options == 'function') {
				new Mapifies.Initialise(this, {}, options);
			} else if (typeof method == 'object' || method == null) {
				new Mapifies.Initialise(this, method, options);
			} else {
				try {
					new Mapifies[method](this, options, callback);
				} catch(err) {
					throw Error('Mapifies Function Does Not Exist');
				}
			}
		});
	}
})(jQuery);
