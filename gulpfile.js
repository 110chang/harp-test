var gulp = require('gulp');
var harp = require('harp');

gulp.task('server', function() {
  harp.server(__dirname + '/public', {
    port: 3000
  }, function() {
    //
  });
})

gulp.task('default', ['server']);

