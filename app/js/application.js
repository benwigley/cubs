var Application;
var Router = require('router');
var View = require('base/view');

module.exports = Application = (function()
{
	function Application() {}

	_.extend(Application.prototype, {

		/*
			Initialize the componenets of the application.

			Creeats a new Router and starts Backbone.history.
		*/
		initialize: function()
		{
			console.log("Initializing application...");

			this.initLayout();

			appRouter = new Router();

			Backbone.history.start({
				pushState: false,
				hashChange: false
			});
		},

		/*
			Initializes generic views.
		*/
		initLayout: function()
		{
			console.log('Initializing application layout');
		}

	});

	return Application;
})();
