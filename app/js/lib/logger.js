/*
	Logger mixin
	---------------------------------
	Examples

	log 'My log message',
		thingy: data
		anotherthingy: 'stringy'

	log data1, data2, data3

	warn 'User is asleep', data1, msg: 'hello'

	error 'Shit hit the fan.'
*/

var logger;
var __slice = [].slice;

var indent = 8;
var startTime = new Date().getTime();
var showLogs = false;

var getOffset = function(label) {
	if (label == null) label = '';

	var length = indent - label.length + 1;

	if (length < 0) length = 0;

	// Output 'length' amount of spaces
	return (new Array(length)).join(' ');
};

module.exports = logger = {

	log: function() {
		var msg = arguments[0],
			level = arguments[1],
			data = 3 <= arguments.length ? __slice.call(arguments, 2) : [];

		if (level == null) {
			level = 'log';
		}
		if (!showLogs) {
			return;
		}
		if (level !== 'log' && level !== 'warn' && level !== 'error') {
			data.unshift(level);
			level = 'log';
		}
		if (typeof msg !== 'string') {
			data.unshift(msg);
			msg = '';
		}

		var time = new Date().getTime();
		var timeDiff = (time - startTime) + 'ms';

		console[level](getOffset(timeDiff), timeDiff + ' ■', msg);

		return _(data).each(function(debug) {
			if (typeof debug === 'object') {
				return _(debug).each(function(value, key) {
					return console[level](getOffset(key), key, value);
				});
			}
		});
	},

	warn: function() {
		var data, msg;
		msg = arguments[0], data = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
		return logger.log.apply(logger, [msg, 'warn'].concat(__slice.call(data)));
	},

	error: function() {
		var data, msg;
		msg = arguments[0], data = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
		return logger.log.apply(logger, [msg, 'error'].concat(__slice.call(data)));
	},

	/*
			Sets the visiblity state of logs.
	*/
	set: function(state) {
		if (state == null) {
			state = false;
		}
		if (state === true) {
			showLogs = true;
			return showLogs;
		}
	}
};
