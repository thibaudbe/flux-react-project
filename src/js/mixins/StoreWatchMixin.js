'use strict';

var React          = require('react');
var AppStore 			 = require('../stores/AppStore');
var AppActions     = require('../actions/AppActions');


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

		window.addEventListener('scroll', this.updateViewport, false);
		window.addEventListener('resize', this.updateViewport, false);
		this.updateViewport();

		// console.log('Page : state', this.state);
		// console.log('Page : props', this.props);
		// console.log('Page : DOM', this.getDOMNode());
		// console.log('Page : Version', React.version);
		
		this.getData(this.props.id);
	},

	/**
	 * Immediately before a component is unmounted
	 */
	componentWillUnmount: function(){
		AppStore.removeChangeListener(this._onStoreChange);

		window.removeEventListener('scroll', this.updateViewport);
		window.removeEventListener('resize', this.updateViewport);
	}

};

module.exports = StoreWatchMixin;
