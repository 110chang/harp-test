
var harp = require('harp');
var gulp = require('gulp');
var yaml = require('gulp-yaml');
var browsersync = require('browser-sync');
var exec = require('child_process').exec;

gulp.task('server', function() {
  harp.server(__dirname + '/public', {
    port: 3000
  }, function() {});

  browsersync.init({
    proxy: 'http://localhost:3000/',
    port: 3333,
    open: false,
    //logLevel: 'debug'
  });
});

gulp.task('data', function() {
  gulp.src('./public/**/*.yml')
    .pipe(yaml({ schema: 'DEFAULT_SAFE_SCHEMA' }))
    .pipe(gulp.dest('./public/'))
    .pipe(browsersync.stream());
});

gulp.task('default', ['server'], function() {
  gulp.watch('./public/**/*', function() {
    browsersync.reload();
  });
  gulp.watch('./public/**/*.yml', ['data']);
});

gulp.task('compile', function() {
  exec('harp compile ./public ./build', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    //cb(err);
  });
});

