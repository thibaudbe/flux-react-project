var gulp = require('gulp');
var path = require('path');
var del = require('del');
var es = require('event-stream');
var gutil = require('gulp-util');
var spawn = require('child_process').spawn;
var $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

// set variable via $ gulp --type production
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js')[environment];

var port = process.env.PORT || 1337;
var src = './src/';
var dist = './dist/';
var bower = './bower_components/' ;

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

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
		.pipe(isProduction ? $.header(banner, { pkg : pkg } ) : $.util.noop())
		.pipe(gulp.dest(dist + 'js/'))
		.pipe($.size({ title : 'scripts' }))
		.pipe(isProduction ? gutil.noop() : $.duration('scripts'))
		.pipe(isProduction ? gutil.noop() : $.connect.reload());
});

// ie scripts bundle
gulp.task('ie-scripts', function() {
	return gulp.src([
			bower + 'html5shiv/dist/html5shiv.min.js',
			bower + 'es5-shim/es5-shim.min.js',
			bower + 'es5-shim/es5-sham.min.js',
			// bower + 'console-polyfill/index.js',
		])
		.pipe($.concat('ie-bundle.js'))
		.pipe(isProduction ? $.uglifyjs() : $.util.noop())
		.pipe(isProduction ? $.header(banner, { pkg : pkg } ) : $.util.noop())
		.pipe(gulp.dest(dist + 'js/'))
		.pipe($.size({ title : 'ie scripts' }))
		.pipe(isProduction ? gutil.noop() : $.duration('ie scripts'));
});

// Copy html from src to dist + minify
gulp.task('html', function() {
	return gulp.src(src + 'index.html')
		.pipe(isProduction ? $.minifyHtml({comments: true, spare: true}) : gutil.noop())
		.pipe(gulp.dest(dist))
		.pipe($.size({ title : 'html' }))
		.pipe(isProduction ? gutil.noop() : $.duration('html'))
		.pipe(isProduction ? gutil.noop() : $.connect.reload());
});

// Compile SASS
gulp.task('sass', function() {
	$.rubySass(src +'scss/main.scss', {
		// style: 'compressed',
		sourcemap: false, 
		precision: 2
	})
	.on('error', function(err){
		new gutil.PluginError('style', err, { showStack: true });
	})
	.pipe(gulp.dest(src +'css'))
	.pipe($.size({ title : 'sass' }))
	.pipe(isProduction ? gutil.noop() : $.duration('sass'))
	.pipe(isProduction ? gutil.noop() : $.connect.reload());
});

// Concat styles
gulp.task('styles', function() {
	return es.concat(gulp.src([
			bower + 'fontawesome/css/font-awesome.css',
			bower + 'animate-css/animate.css',
			src + 'css/main.css'
		]))
		.pipe($.concat('main.min.css'))
		.pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
		.pipe(isProduction ? $.combineMediaQueries({
			log: true
		}) : gutil.noop())
		.pipe(isProduction ? $.cssmin() : gutil.noop())
		.pipe(isProduction ? $.header(banner, { pkg : pkg } ) : $.util.noop())
		.pipe(gulp.dest(dist +'css'))
		.pipe($.size({ title : 'styles' }))
		.pipe(isProduction ? gutil.noop() : $.duration('styles'))
		.pipe(isProduction ? gutil.noop() : $.connect.reload());
});

// Add livereload on the given port
gulp.task('serve', function() {
	$.connect.server({
		root: dist,
		port: port,
		livereload: isProduction ? false : true
	});
});

// Copy images
gulp.task('images', function(cb) {
	return gulp.src(src + 'images/**/*.{png,jpg,jpeg,gif,svg}')
		.pipe(gulp.dest(dist + 'images/'))
		.pipe(isProduction ? gutil.noop() : $.size({ title : 'images' }))
		.pipe(isProduction ? gutil.noop() : $.duration('images'));
});

// Copy icons
gulp.task('icons', function() {
	return gulp.src(bower + 'fontawesome/fonts/**.*')
		.pipe(gulp.dest(dist + 'fonts/'));
});

// Copy elements
gulp.task('init', function() { 
	return gulp.src([
			src + 'favicon.ico',
			src + 'apple-touch-icon.png',
			src + 'humans.txt',
			src + 'robots.txt'
		]) 
		.pipe(gulp.dest(dist)); 
});


// Watch sass, html and js file changes
gulp.task('watch', function() {
	gulp.watch(src + 'index.html', ['html']);
	gulp.watch(src + 'scss/**/**/*.scss', ['sass']);
	gulp.watch(src + 'css/*.css', ['styles']);
	gulp.watch(src + 'js/**/*.js', ['scripts']);
	gulp.watch(src + 'js/**/*.jsx', ['scripts']);
});

// Remove bundels
gulp.task('clean', function(cb) {
	del([dist], cb);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', [
	'build', 
	'serve', 
	'watch'
]);

// Waits until clean is finished then builds the project
gulp.task('build', ['clean'], function() {
	gulp.start([
		'init',
		'icons',
		'html',
		'images',
		'sass', 
		'styles',
		'ie-scripts',
		'scripts'
	]);
});

// Auto reload Gulp task in progress
// gulp.task('auto', function() {
// 	var process;

// 	function restart() {
// 		if (process) {
// 			process.kill();
// 		}
// 		process = spawn('gulp', ['default'], {stdio: 'inherit'});
// 	}
// 	gulp.watch('gulpfile.js', restart);
// 	restart();
// });
