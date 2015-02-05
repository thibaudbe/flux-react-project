var entry = './src/js/app.js';

var output = {
	path: __dirname,
		filename: 'bundle.js'
  };

module.exports.development = {
	debug : true,
	devtool : 'eval',
	entry: entry,
	output: output,
	module : {
		loaders : [
			{ test: /\.jsx?$/, loader: 'jsx-loader?harmony' }
		]
	}
};

module.exports.production = {
	debug: false,
	entry: entry,
	output: output,
	module : {
		loaders : [
			{ test: /\.jsx?$/, loader: 'jsx-loader?harmony' }
		]
	}
};