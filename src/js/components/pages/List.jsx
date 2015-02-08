'use strict';

var React          = require('react');
var AppActions     = require('../../actions/AppActions');
var AppStore       = require('../../stores/AppStore');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var Loading 			 = require('../partials/Loading.jsx');
var NotFound       = require('../pages/NotFound.jsx');
var Navbar         = require('../partials/Navbar.jsx');
var Header         = require('../partials/Header.jsx');
var Footer         = require('../partials/Footer.jsx');
var Image          = require('../partials/Image.jsx');

var DocumentTitle	 = require('react-document-title');
var Router         = require('react-router');
var RouteHandler   = Router.RouteHandler;
var Link           = Router.Link;

var EventEmitter = require('events').EventEmitter;
var loadingEvents = new EventEmitter();


var List = React.createClass({

	mixins: [StoreWatchMixin],

	getData: function(props) {
		var props = props.id || props;
		var meta = AppStore.getState();

		if (props && props !== meta.id) {
			console.log('=> View => Actions :', props);
			AppActions.getList(props);
			this.setState({ data: [] });
		}
	},

	updateViewport: function() {
		this.setState({
			viewport: {
				top: window.pageYOffset,
				height: window.innerHeight
			}
		});
	},

	renderShots: function() {
		if (typeof(this.state.data.shots) !== 'undefined') {
			var self = this;
			var shots = this.state.data.shots;
			var shotsNode = shots.map(function(shot, i) {
				return (
					<div key={i} className="col-3">
						<div className="shot">
							<Link className="shot__link" to="shot" params={{id: shot.id}}>
								<Image title={shot.title} image={shot.image_url} viewport={self.state.viewport} />
							</Link>
							<div className="shot__player">
								<figure className="img-avatar">
									<Link to="player" params={{id: shot.player.username}}>
										<img width="160" height="160" src={shot.player.avatar_url}/>
									</Link>
								</figure>
								<span className="shot__player-name">by <strong>{shot.player.name}</strong></span>
							</div>
						</div>
					</div>
				);
			});
			return shotsNode;
		}
	},

	render: function() {
		var data = this.state.data;
		var id = this.state.id;

		var loading = data.length === 0 ? <Loading /> : '';

		if (id == 'error') 
			return <NotFound/>

		return (
			<div className="list-page page">
				<Navbar />
				<Header title={this.props.id} />
				{loading}
				<div className="container">
					{this.renderShots()}
				</div>
				<Footer />
			</div>
		);
	},

	/**
	 * Update component when Store change
	 */
	_onStoreChange: function() {
		this.setState(AppStore.getState());
	}

});

module.exports = List;