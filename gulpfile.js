//gulpfile.js
'use strict';
var gulp = require('gulp'),
  compass = require('gulp-compass'),
	sass = require('gulp-sass'),
	minifycss = require('gulp-minify-css'),
	minifyHTML = require('gulp-minify-html'),
	del = require('del'),
   mainBowerFiles = require('main-bower-files'), /** include bower files dynamically */
	/** Include plugins without requiring(needs to install though) */
	plugins = require("gulp-load-plugins")({
		pattern: ['gulp-*', 'gulp.*'],
		replaceString: /\bgulp[\-.]/
	});
/** clean task */
gulp.task('clean', function () {
	del.sync(['dist']);
});
/** JS hint task */
gulp.task('jshint', function() {
	gulp.src('app/**/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'));
});
/** task to start server */
gulp.task('express', function(){
	var express = require('express');
	var app = express();
	app.use(require('connect-livereload')({
		port: 35729
	}));
	app.use(express.static(__dirname + '/dist')); /** Where to serve static content */
  /** call all routes and return the index.html file here */
  app.all('/*',function(req,res,next){
     res.sendFile('index.html', { root: __dirname + '/dist'});
  });
	app.listen(30000, '0.0.0.0');
});
/** auto loading of browser if any changes occurs */
var tinylr;
gulp.task('livereload', function() {
	tinylr = require('tiny-lr')();
	tinylr.listen(35729);
});
/** task to track  size */
function bytediffFormatter(data) {
	var formatPercent = function(num, precision) {
		return (num * 100).toFixed(precision);
	};
	var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
	return data.fileName + ' went from ' + (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
		' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}
/** task to notify changes */
function notifyLiveReload(event) {
	var fileName = require('path').relative(__dirname + '/dist', event.path);
	tinylr.changed({
		body: {
			files: [fileName]
		}
	});
};
gulp.task('sass', function () {
 gulp.src('app/sass/**/*.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('app/css'));
}); 
/** task to minify custom css */
gulp.task('styles', function() {
	gulp.src(['app/css/*'])
	    .pipe(plugins.concat('style.min.css'))
		/** start tracking size */
		.pipe(plugins.bytediff.start())
		.pipe(minifycss())
		/** stop tracking size and output it using bytediffFormatter */
		.pipe(plugins.bytediff.stop(bytediffFormatter))
		.pipe(gulp.dest('dist/css'));
});
/** task to pipe all library js in single file */
gulp.task('vendorjs', function(){
	gulp.src(mainBowerFiles())
		.pipe(plugins.filter('*.js'))
		.pipe(plugins.concat('vendor.main.js'))
		/** start tracking size */
		.pipe(plugins.bytediff.start())
		.pipe(plugins.uglify())
		/** stop tracking size and output it using bytediffFormatter */
		.pipe(plugins.bytediff.stop(bytediffFormatter))
		.pipe(gulp.dest('dist/lib'));
});
gulp.task('vendorcss', function() {
     gulp.src(mainBowerFiles())
		.pipe(plugins.filter('*.css'))		
		.pipe(plugins.concat('vendor.main.css'))
		/** start tracking size */
		.pipe(plugins.bytediff.start())
		.pipe(plugins.minifyCss())
		/** stop tracking size and output it using bytediffFormatter */
		.pipe(plugins.bytediff.stop(bytediffFormatter))
		.pipe(gulp.dest('dist/lib'));
});
gulp.task('vendorimages', function() {
     gulp.src(mainBowerFiles())
		.pipe(plugins.filter([
			'**/*.{png,gif,svg,jpeg,jpg,woff,eot,ttf}',
			'!foundation/**/*',
			'!compass-mixins/**/*'
		]))
		.pipe(gulp.dest('dist/lib'));
});
/** task to pipe all custom js in single file */
gulp.task('jstask', function() {
	var jscustomFiles = ['app/js/**/*'];
	gulp.src(jscustomFiles)
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.order(["appModules.js", "hr.js", "*"]))
		.pipe(plugins.concat('app.min.js'))
		/** start tracking size */
		.pipe(plugins.bytediff.start())
		.pipe(plugins.uglify())
		/** stop tracking size and output it using bytediffFormatter */
		.pipe(plugins.bytediff.stop(bytediffFormatter))
		.pipe(gulp.dest('dist/js'));

});
/** Views task */
gulp.task('views', function() {
	/** Get our index.html */
	gulp.src(['app/index.html','.htaccess'])
	.pipe(minifyHTML())
	/** And put it in the public folder */
	.pipe(gulp.dest('dist/'));
	/** Any other view files from app/views */
	gulp.src('./app/views/**/*.html')
	/** minify html */
	.pipe(minifyHTML())
	/** Will be put in the dist/views folder */
	.pipe(gulp.dest('dist/views/'));
});
/** task to watch changes */
gulp.task('watch', function() {
  gulp.watch('app/sass/*.scss',['sass']);
  gulp.watch('app/css/*.css',['styles']);
  gulp.watch('app/**/*.html',['views']);
  gulp.watch('app/**/*.js',['jshint','jstask']);
  gulp.watch('app/**/*',notifyLiveReload);
  //gulp.watch('dist/**/*',notifyLiveReload); 
});
/** default task to run gulp */
gulp.task('default', ['clean','jshint','sass', 'styles', 'vendorjs', 'vendorcss','vendorimages', 'jstask', 'views', 'express', 'livereload', 'watch']);