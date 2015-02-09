'use strict';

var React          = require('react');
var AppActions     = require('../../actions/AppActions');
var AppStore       = require('../../stores/AppStore');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var Loading 			 = require('../partials/Loading.jsx');
var NotFound       = require('../pages/NotFound.jsx');

var ImageLoader    = require('react-imageloader');
var Progress       = require('react-progressbar');
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
			this.updateCompleted();
			this.setState({ data: [] });
		}
	},

	updateCompleted: function() {
		return this.setState({ completed: 100 });
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
								<ImageLoader title={shot.title} src={shot.image_url}>
								  failed
								</ImageLoader>
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
						<div className="container">
							<figure className="img-avatar animated zoomIn">
								<img width="160" height="160" src={player.avatar_url}/>
							</figure>
							<h2 className="animated fadeInLeft">{player.name}</h2>
							<p className="animated fadeInRight"><i className="fa fa-map-marker"></i> {player.location}</p>
							<div className="text-right go-back" onClick={() => this.goBack()}>Back</div>
						</div>
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
			<div className="page player-page">
				<Progress color="#005740" completed={this.state.completed} />
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
