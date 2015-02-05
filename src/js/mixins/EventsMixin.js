'use strict';

var EventEmitter = require('events').EventEmitter;
var EventsMixin = new EventEmitter();


var EventsMixin = {
	
	componentDidMount: function() {
		loadingEvents.on('loadStart', function() {
			this.setState({ loading: true });
		});

		loadingEvents.on('loadEnd', function() {
			this.setState({ loading: false });
		});
	}
}
