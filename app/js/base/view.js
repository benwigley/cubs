var View;

View = Backbone.View.extend({
	attatchMethod: 'append',

	isMobile:	function() { return Modernizr.mq("(max-width: #{config.mq_phone}px)"); },
	isDesktop:	function() { return Modernizr.mq("(min-width: #{config.mq_phone+1}px)"); },
	isTouch:	function() { return Modernizr.touch; },

	initialize: function(options)
	{
		if (options == null)
			this.options = {};
		else
			this.options = options;

		// Initialize options
		if (this.options.template)
		{
			this.template = this.options.template;
			this.template = require("templates/"+this.template);
		}

		if (this.options.attatchMethod)
			this.attatchMethod = this.options.attatchMethod;

		if (this.options.parent)
			this.parent = this.options.parent;

		if (this.options.attributes)
			_.defaults(this.options.attributes, this.attributes);

		// New variables
		this.$parent = $(this.parent);
	},

	render: function()
	{
		// Populate view TODO: Check this works
		if (this.template)
			this.$el.html(_.template(this.template));

		// Append view using this.attatchMethod.
		this.$parent[this.attatchMethod](this.$el);
	},

	/*
		Because elements in the dom usually exist before a view
		gets attached to them, we want to only remove the new code
		that has been created by the view. We also remove events.
	*/
	disposed: false,
	dispose: function()
	{
		if (this.disposed) return;

		// Clear all generated html.
		if (this.template)
			this.$el.html('');

		// Unbind all referenced handlers.
		this.stopListening();

		// Stop this module from listening for events
		this.off();

		this.disposed = true;
	}
});

// Borrow the default Backbone extends method.
View.extends = Backbone.View.extends;

module.exports = View;
