Model = Backbone.Model.extend({

	/*
		Used for cleaning an object before it
		is sent via an api call.

		@params
			Object		data
	*/
	cleanFormData: function(data) {
		var key, val;
		for (key in data)
		{
			val = data[key];
			data.key = $.trim(val);
		}

		return data;
	}
});

// Borrow the default Backbone extends method.
Model.extends = Backbone.Model.extends;

module.exports = Model;
