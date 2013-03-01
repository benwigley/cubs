var api;
var config	= require('lib/config');
var logger	= require('lib/logger');

module.exports = api = function(options) {
	var request		= new $.Deferred();
	var startTime	= new Date();

	// Extends custom AJAX params
	// Note: You can still supply success and error handlers.
	// They will be called by the Handler functions below.
	var params = _.extend({}, config.ajax.options, options, {
		dataType: $('html').hasClass('lt-ie10') ? 'jsonp' : 'json',
		url: ("//" + (config.api_host()) + config.api_path) + options.url,
		success: null,
		error: null
	});

	var responseHandler = function(res, textStatus, jqxhr) {
		logger.log('API: Response received', {
			time: new Date() - startTime,
			server_time: res.delta_ms
		});

		// Api call success
		if (res.status === 'success')
		{
			logger.log("API Success: " + options.url, {
				params: params,
				res: res
			});
			if ($.isFunction(options.success))
				options.success.apply(options, arguments);

			request.resolve.apply(request, arguments);
			return;
		}

		// Api call error
		logger.warn('API Error', {
			res: res,
			status: textStatus,
			xhr: jqxhr
		});

		if (_.isFunction(options.error))
			options.error.apply(options, arguments);

		return request.reject.apply(request, arguments);
	};

	var errorHandler = function(xhr, textStatus, errorThrown)
	{
		logger.error("API Error: " + options.url, {
			headers: xhr.getAllResponseHeaders(),
			status: textStatus,
			error: errorThrown
		});
		if (_.isFunction(options.error)) {
			options.error.apply(options, arguments);
		}
		return request.reject.apply(request, arguments);
	};

	var makeRequest = function() {
		logger.log("API: Requesting " + options.url, {
			params: params,
			options: options
		});
		return $.ajax(params).fail(errorHandler).done(responseHandler);
	};

	makeRequest();

	return request;
};
