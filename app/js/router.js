var Router;

module.exports = Router = Backbone.Router.extend({

  routes: {
    ""			: "home",
    "search"	: "search"
  },

  home: function() {
    console.log("Routed to Homepage");
  },

  search: function(argument) {
  	console.log("Routed to search");
  }

});
