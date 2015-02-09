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
		// .pipe($.header(banner, { pkg : pkg } ))
		.pipe(gulp.dest(dist + 'js/'))
		.pipe($.size({ title : 'scripts' }))
		.pipe($.duration('scripts'))
		.pipe($.connect.reload());
});

// Copy html from src to dist + minify
gulp.task('html', function() {
	return gulp.src(src + 'index.html')
		.pipe($.minifyHtml({
			comments: true,
			spare: true
		}))
		.pipe(gulp.dest(dist))
		.pipe($.size({ title : 'html' }))
		.pipe($.duration('html'))
		.pipe($.connect.reload());
});

// Compile styles using Bourbon & Neat
gulp.task('styles', function() {

	// var sassFiles = gulp.src(src +'scss/main.scss')
	var sassFiles = $.rubySass(src +'scss/main.scss', {
			style: 'compressed',
			sourcemap: false, 
			precision: 2
		})
		.on('error', function(err){
			new gutil.PluginError('style', err, { showStack: true });
		});

	return es.concat(gulp.src([
		bower + 'fontawesome/css/font-awesome.min.css',
		bower + 'animate-css/animate.min.css'
	]), sassFiles)
		.pipe($.concat('main.min.css'))
		.pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
		.pipe(isProduction ? $.combineMediaQueries({
			log: true
		}) : gutil.noop())
		.pipe(isProduction ? $.cssmin() : gutil.noop())
		// .pipe($.header(banner, { pkg : pkg } ))
		.pipe(gulp.dest(dist +'css'))
		.pipe($.size({ title : 'styles' }))
		.pipe($.duration('styles'))
		.pipe($.connect.reload());
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
		.pipe($.size({ title : 'images' }))
		.pipe($.duration('images'))
		.pipe(gulp.dest(dist + 'images/'));
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
	gulp.watch(src + 'scss/**/**/*.scss', ['styles']);
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
		'styles',
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
