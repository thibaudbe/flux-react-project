'use strict';

var React 				 = require('react');
var AppStore       = require('../../stores/AppStore');
var Footer         = require('../partials/Footer.jsx');

var DocumentTitle  = require('react-document-title');
var Router         = require('react-router');
var RouteHandler   = Router.RouteHandler;
var Link           = Router.Link;


var Index = React.createClass({

	// getInitialState: function() {
	// 	return AppStore.getState();
	// },

	// componentDidMount: function() {
	// 	AppStore.addChangeListener(this._onStoreChange);
	// },

	// componentWillUnmount: function() {
	// 	AppStore.removeChangeListener(this._onStoreChange);
	// },
	
	// componentWillMount: function() {
	// 	// AppStore.getState();
	// 	console.log('test');
	// 	this.setState({ menu: this.state.menu });
	// },

	/**
	 * @return {object}
	 */
	render: function() {
		var year = new Date().getFullYear();

		return (
			<DocumentTitle title="RRReact">
				<div className="home-page">
					<div className="logo">
						<h1>R</h1>
					</div>
					<ul className="home__title">
						<li><Link to="list" params={{id: 'popular'}}><span>Popular</span></Link></li>
						<li><Link to="list" params={{id: 'everyone'}}><span>Everyone</span></Link></li>
						<li><Link to="list" params={{id: 'debuts'}}><span>Debuts</span></Link></li>
					</ul>
					<Footer />
				</div>
			</DocumentTitle>
		);
	},

					// <footer className="home__footer">
					// 	<div className="container">
					// 		<div className="col-6">
					// 			<p>© RRReact {year}. MIT licensed.</p>
					// 		</div>
					// 		<div className="col-6">
					// 			<p className="text-right"><a href>More details</a> about that project by <a href="http://thibaudb.com" target="_blank">Thibaud B.</a></p>
					// 		</div>
					// 	</div>
					// </footer>
					
	/**
	 * Update component when Store change
	 */
	_onStoreChange: function() {
		this.setState(AppStore.getState());
	}

});

module.exports = Index;