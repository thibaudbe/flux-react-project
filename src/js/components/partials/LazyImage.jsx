'use strict';

var React 				 = require('react');


var LazyImage = React.createClass({

	getDefaultProps: function() {
		return {
			loader: '../images/loading.gif',
			showImage: false
		};
	},

	componentDidUpdate: function(prevProps) {
		if (! this.props.showImages && prevProps.viewport) {
			this.updatePosition();
		}
	},

	updatePosition: function() {
		var el = this.getDOMNode();
		this.props.updateImagePosition(el.offsetTop, el.offsetHeight);
	},

	/**
	 * @return {object}
	 */
	render: function() {
		var img = this.props.showImage ? this.props.src : this.props.loader;
		var cl = this.props.showImage ? 'animated fadeIn' : null;

		return (
			<img className={cl} src={img} alt={this.props.alt} />
		);
	}

});

module.exports = LazyImage;
