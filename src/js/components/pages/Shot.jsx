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
var ImageLoader    = require('react-imageloader');

var Progress       = require('react-progressbar');
var DocumentTitle	 = require('react-document-title');
var Router         = require('react-router');
var RouteHandler   = Router.RouteHandler;
var Link           = Router.Link;
var Navigation     = Router.Navigation;


var Item = React.createClass({

	mixins: [StoreWatchMixin, Navigation],

	getData: function(props) {
		var props = props.id || props;
		var meta = AppStore.getState();

		if (props && props !== meta.id) {
			console.log('=> View => Actions :', props);
			AppActions.getShot(props);
			this.setState({ data: [] });
		}
	},

	renderPlayer: function() {
		if (typeof(this.state.data.player) !== 'undefined') {
			var player = this.state.data.player;
			var data = this.state.data;
			var date = data.created_at;
			//  | {date.getFullYear()}

			return (
				<div className="container animated fadeInDown">
					<div className="col-9">
						<figure className="img-avatar">
							<Link to="player" params={{id: player.username}}>
								<img width="160" height="160" src={player.avatar_url}/>
							</Link>
						</figure>
						<div className="info">
							<h1 className="">{data.title}</h1>
							<p className="">by <Link to="player" params={{id: player.username}}><strong>{player.name}</strong></Link></p>
						</div>
					</div>
					<div className="col-3">
						<div className="text-right go-back" onClick={() => this.goBack()}>Back</div>
					</div>
				</div>
			);
		}
	},

	render: function() {
		var data = this.state.data;
		var id = this.props.id;
		var self = this;

		var loading = data.length === 0 ? <Loading /> : '';

		if (id == 'error') 
			return <NotFound/>

		return (
			<div className="shot-page page">
				<Progress color="#005740" completed={this.state.completed} />
				<Navbar />
				<Header title="shot" />
				{loading}
				<div className="player">
					{this.renderPlayer()}
				</div>
				<div className="container">
					<div className="col-7">
						<div className="shot">
							<div className="shot__image">
								<ImageLoader title={data.title} src={data.image_url}>
								  failed
								</ImageLoader>
							</div>
						</div>
					</div>
					<div className="col-5">
						<div className="stats">
							<ul>
								<li>{data.likes_count}<span><i className="fa fa-heart"></i></span></li>
								<li>{data.views_count}<span><i className="fa fa-eye"></i></span></li>
								<li>{data.comments_count}<span><i className="fa fa-comment"></i></span></li>
								<li>{data.rebounds_count}<span><i className="fa fa-reply"></i></span></li>
							</ul>
						</div>
						<div>
							<p>{data.description}</p>
						</div>
					</div>
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

module.exports = Item;
