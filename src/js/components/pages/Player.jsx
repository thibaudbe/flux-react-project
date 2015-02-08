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
// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var DocumentTitle	 = require('react-document-title');
var Router         = require('react-router');
var RouteHandler   = Router.RouteHandler;
var Link           = Router.Link;
var Navigation     = Router.Navigation;


var Player = React.createClass({

	mixins: [StoreWatchMixin, Navigation],

	getData: function(props) {
		var props = props.id || props;
		var meta = AppStore.getState();

		if (props && props !== meta.id) {
			console.log('=> View => Actions :', props);
			AppActions.getPlayer(props);
			this.setState({ data: [] });
		}
	},

	renderShots: function() {
		if (typeof(this.state.data.shots) !== 'undefined') {
			var shots = this.state.data.shots;
			var shotsNode = shots.map(function(shot, i) {
				return (
					<div key={i} className="col-3">
						<div className="shot animated zoomIn">
							<Link className="shot__link" to="shot" params={{id: shot.id}}>
								<img width="400" height="300" src={shot.image_url}/>
							</Link>
							<p>
								<span><i className="fa fa-heart"></i></span>{shot.likes_count}
								<span><i className="fa fa-eye"></i></span>{shot.views_count}
								<span><i className="fa fa-comment"></i></span>{shot.comments_count}
							</p>
						</div>
					</div>
				);
			});
			return shotsNode;
		}
	},

	renderPlayer: function() {
		if (typeof(this.state.data.shots) !== 'undefined') {
			var player = this.state.data.shots[0].player;
			return (
				<div className="player__card page">
					<div className="player__banner animated moveDown"></div>
					<div className="player__info">
						<figure className="img-avatar animated zoomIn">
							<img width="160" height="160" src={player.avatar_url}/>
						</figure>
						<h2 className="animated fadeInLeft">{player.name}</h2>
						<p className="animated fadeInRight"><i className="fa fa-map-marker"></i> {player.location}</p>
					</div>
				</div>
			);
		}
	},

	render: function() {
		var data = this.state.data;
		var id = this.props.id;

		var loading = data.length === 0 ? <Loading /> : '';

		if (id == 'error') 
			return <NotFound/>

		return (
			<div className="player-page">
				<Navbar />
				<Header title="player" />
				{loading}
				<div className="player">
					{this.renderPlayer()}
				</div>
				<div className="container">
					<hr/>
				</div>
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

module.exports = Player;
