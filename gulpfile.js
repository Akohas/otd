	var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade'),
	connect = require('gulp-connect'),
	watch = require('gulp-watch'),
	watchify = require('watchify'),
	fs = require('fs'),
	browserify = require('browserify'),
  svgSprite = require('gulp-svg-sprite'),
  svgmin = require('gulp-svgmin');

gulp.task('jade', function(){
	gulp.src('./views/jade/**/*.jade')
	.pipe(jade())
	.pipe(gulp.dest('./views/html'))
	.pipe(connect.reload());
});
gulp.task('sass', function(){
    gulp.src('./static/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./static/dist'))
    .pipe(connect.reload());
  });

 gulp.task('watch', function(){
    gulp.watch(['static/**/*.scss'], ['sass']);
    gulp.watch(['views/jade/**/*.jade'], ['jade']);
  });

gulp.task('connect', function(){
    connect.server({
      root: './',
      livereload: true,
      port: 8000
    });
  });

 gulp.task('watchify', function(){
    var source = './js/main.js',
      dist =  './js/dist/common.js';

    var b = browserify({
      entries: [source],
      cache: {},
      packageCache: {},
      plugin: [watchify]
    });

    b.on('update', bundle);
    bundle();

    function bundle() {
      b.bundle().pipe(fs.createWriteStream(dist));
    }
  });
 

 config = {
  mode: {
      symbol: true
  }
};

 

 gulp.task('svg-sprites', function(){
  gulp.src('./icons/*.svg')
    .pipe(svgmin())
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./sprites'));
 });

gulp.task('default',['watchify', 'jade', 'connect', 'watch', 'sass', 'svg-sprites']);
