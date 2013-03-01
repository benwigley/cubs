var config;

module.exports = config = {

	// Api
	api_host: window.location.hostname,
	api_path: '/api/v1',
	ajax: {
		options: {
			cache: false,
			dataType: 'json',
			type: 'POST',
			headers: {
				'Accept': 'application/json'
			}
		}
	},

	// Flags
	logging: true,

	// Globals
	email_regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

	// Media query widths
	mq_tablet: 1040,
	mq_phone: 580
};
