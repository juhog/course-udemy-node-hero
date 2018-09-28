const gulp = require('gulp');
const jshint = require('gulp-jshint');
const nodemon = require('gulp-nodemon');

const jsFiles = ['*.js', 'src/**/*.js'];

const style = function() {
  return gulp.src(jsFiles)
    .pipe(jshint({ "undef": true }))
    .pipe(jshint.reporter()); // Dump results;
};

gulp.task('style', style);

const inject = function() {
  const wiredep = require('wiredep').stream;
  const inject = require('gulp-inject');

  const injectSrc = gulp.src([
    './public/css/*.css',
    '!./public/css/*.min.css',
    './public/js/*.js',
    '!./public/js/*.min.js'
  ]);

  const injectOptions = {
    ignorePath: '/public'
  };

  const options = {
    bowerJson: require('./bower.json'),
    directory: './bower_components',
    ignorePath: '../../bower_components'
  };

  return gulp.src('./src/views/*.html')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src/views'));
};

gulp.task('style', style);
gulp.task('inject', inject);

// gulp.task('serve', ['style', 'inject'], function(){
gulp.task('serve', gulp.series(gulp.parallel('style', 'inject'),
  function(){

    const options = {
      script: 'app.js',
      delayTime: 1,
      watch: jsFiles
    };

    return nodemon(options)
      .on('restart', function(ev){
        console.log('Restarting server...');
      });
  }
));
