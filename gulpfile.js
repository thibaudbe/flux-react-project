var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var del = require('del');
var sass = require('gulp-ruby-sass');
// set variable via $ gulp --type production
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js')[environment];

var port = $.util.env.port || 1337;
var src = './src/';
var dist = './dist/';
var bower = './bower_components' 

// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [                 
	'ie >= 9',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 6',
	'opera >= 23',
	'ios >= 6',
	'android >= 4.4',
	'bb >= 10'
];

gulp.task('scripts', function() {
	return gulp.src(webpackConfig.entry)
		.pipe($.webpack(webpackConfig))
		.pipe($.jshint())
		.pipe(isProduction ? $.uglifyjs() : $.util.noop())
		.pipe(gulp.dest(dist + 'js/'))
		.pipe($.size({ title : 'scripts' }))
		.pipe($.duration('scripts'))
		.pipe($.connect.reload());
});

// copy html from src to dist
gulp.task('html', function() {
	return gulp.src(src + 'index.html')
		.pipe(gulp.dest(dist))
		.pipe($.size({ title : 'html' }))
		.pipe($.duration('html'))
		.pipe($.connect.reload());
});

// Compile Sass using Bourbon
gulp.task('styles', function () {
	return sass(src +'scss/main.scss', {
			loadPath: [
				bower + '/fontawesome/scss/',
				bower + '/normalize.sass/',
				bower + '/bourbon/app/assets/stylesheets/',
				bower + '/neat/app/assets/stylesheets/',
			],
			style: 'compressed'
		}) 
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
		.pipe(gulp.dest(dist +'css'))
		.pipe($.size({ title : 'styles' }))
		.pipe($.duration('styles'))
		.pipe($.connect.reload());
});

// add livereload on the given port
gulp.task('serve', function() {
	$.connect.server({
		root: dist,
		port: port,
		livereload: {
			port: 35729
		}
	});
});

// copy images
gulp.task('images', function(cb) {
	return gulp.src(src + 'images/**/*.{png,jpg,jpeg,gif}')
		.pipe($.size({ title : 'images' }))
		.pipe($.duration('images'))
		.pipe(gulp.dest(dist + 'images/'));
});

// A task to copy icons, really ? yes.
gulp.task('icons', function() { 
	return gulp.src(bower + '/fontawesome/fonts/**.*') 
		.pipe(gulp.dest(dist + 'fonts/')); 
});

// watch sass, html and js file changes
gulp.task('watch', function() {
	gulp.watch(src + 'index.html', ['html']);
	gulp.watch(src + 'scss/**/**/*.scss', ['styles']);
	gulp.watch(src + 'js/**/*.js', ['scripts']);
	gulp.watch(src + 'js/**/*.jsx', ['scripts']);
});

// remove bundels
gulp.task('clean', function(cb) {
	del([dist], cb);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function(){
	gulp.start([
		'images', 
		'html',
		'styles',
		'scripts',
		'icons'
	]);
});


