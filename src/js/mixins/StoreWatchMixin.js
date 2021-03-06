'use strict';

var React          = require('react');
var AppStore 			 = require('../stores/AppStore');
var AppActions     = require('../actions/AppActions');
var loadingEvents  = require('../mixins/LoadEvents'); 


var StoreWatchMixin = {

	/**
	 * Validate props
	 */
	propTypes: {
		id: React.PropTypes.string.isRequired
	},
	
	/**
	 * Before the component is mounted
	 */
	getInitialState: function() {
		return AppStore.getState();
	},

	/**
	 * Immediately before the initial rendering occurs
	 */
	componentWillMount: function() {},

	componentWillReceiveProps: function(nextProps) {
		this.getData(nextProps);
	},

	// componentWillUpdate: function() {},

	/**
	 * Immediately before rendering 
	 * when new props or state being receive
	 */
	// componentDidUpdate: function() {},

	/**
	 * Immediately after the initial rendering occurs
	 */
	componentDidMount: function() {
		AppStore.addChangeListener(this._onStoreChange);

		// loadingEvents.on('loadStart', function() {
		// 	this.updateLoading(true);
		// });

		// loadingEvents.on('loadEnd', function() {
		// 	this.updateLoading(false);
		// });

		// console.log('Page : state', this.state);
		// console.log('Page : props', this.props);
		// console.log('Page : DOM', this.getDOMNode());
		// console.log('Page : Version', React.version);
		
		this.getData(this.props.id);
		this.updateCompleted();
	},

	/**
	 * Immediately before a component is unmounted
	 */
	componentWillUnmount: function(){
		AppStore.removeChangeListener(this._onStoreChange);
	}

};

module.exports = StoreWatchMixin;
