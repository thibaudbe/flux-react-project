'use strict';

var React 				 = require('react');
var LazyImage 		 = require('../partials/LazyImage.jsx');


var Image = React.createClass({

	getInitialState: function() {
		return {
			showImage: false
		};
	},

	getDefaultProps: function() {
		return {
			showImage: false
		};
	},

	componentWillMount: function() {
		// allow image display override
		if (this.props.showImage) {
			setShowImage(true);
		}
	},

	updateImagePosition: function(top, height) {
		// image is already displayed, no need to check anything
		if (this.state.showImage) {
			return;
		}

		// update showImage state if component element is in the viewport
		var min = this.props.viewport.top;
		var max = this.props.viewport.top + this.props.viewport.height;

		if ((min <= (top + height) && top <= (max - 300))) {
			this.setShowImage(true);
		}
	},

	setShowImage: function(show) {
		this.setState({
			showImage: !!(show)
		});
	},

	render: function() {
		return (
			<LazyImage 
				src={this.props.image} 
				alt={this.props.title} 
				viewport={this.props.viewport} 
				showImage={this.state.showImage}
				updateImagePosition={this.updateImagePosition} />
		);
	}

});

module.exports = Image;
