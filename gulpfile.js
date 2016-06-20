'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sync = require('gulp-sync')(gulp);
var del = require('del');
var browserify = require('gulp-browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var useref = require('gulp-useref');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var browserify = require('gulp-browserify');
var jsmin = require('gulp-jsmin');
var uglify = require('gulp-uglify');
// var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');
var modifyCssUrls = require('gulp-modify-css-urls');
var REPORTAL_FS_URL = '/isa/NIOTGYHQBXPHORIRPBCOPMCRIMPTIMPF/p47195548_medical_benchmarkingN/';


//IMPORTANT: folders variable should contain all the view names.
var folders = ['global', 'login'];

var bundler = {
  w: null,
  init: function() {
    this.w = watchify(browserify({
      entries: ['./app/global/scripts/app.js'],
      insertGlobals: true,
      cache: {},
      packageCache: {}
    }));
  },
  bundle: function() {
    return this.w && this.w.bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('dist/global/scripts'));
  },
  stop: function() {
    this.w && this.w.close();
  }
};

gulp.task('folderStyles', function() {
  return folders.slice(1).map(function(folder) {
    gulp.src('app/' + folder + '/styles/' + folder + '.scss') // entry point will be folderName.scss
      .pipe(sass())
      .pipe($.autoprefixer('last 1 version'))
      .pipe(gulp.dest('dist/' + folder + '/styles'));
  });
});
gulp.task('styles', function() {
  return gulp.src(['app/global/styles/global.scss', '!app/**/_variable.scss', 'app/global/**/*.scss'])
    .pipe(concat('global.scss'))
    .pipe(sass())
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('dist/global/styles'));
});

gulp.task('scripts', function() {
  return folders.map(function(folder) {
    gulp.src('app/' + folder + '/scripts/' + folder + '-index.js') // entry point will be index.js
      .pipe(eslint())
      .pipe(browserify())
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('dist/' + folder + '/scripts'));
  });
});

gulp.task('vscripts', function() {
  return gulp.src('app/global/vendor/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/global/vendor'));
});

gulp.task('html', function() {
  return folders.map(function(element) {
    gulp.src('app/**/*.html')
      .pipe(useref())
      .pipe(gulp.dest('dist'));
  });
});

gulp.task('images', function() {
  return gulp.src('app/global/images/**/*')
    // .pipe($.imagemin({
    //   optimizationLevel: 3,
    //   progressive: true,
    //   interlaced: true
    // }))
    .pipe(gulp.dest('dist/global/images'));
});

gulp.task('serve', function() {
  gulp.src('dist')
    .pipe($.webserver({
      livereload: true,
      port: 9000
    }));
});

gulp.task('clean', del.bind(null, 'dist'));

gulp.task('bundle', ['html', 'styles', 'folderStyles', 'scripts', 'vscripts']);

gulp.task('clean-bundle', sync.sync(['clean', 'bundle']));

gulp.task('replace-src-js', function() {
  return folders.map(function(folder) {
    gulp.src('dist/' + folder + '/**/*.js')
      .pipe(replace('../global/images/', REPORTAL_FS_URL))
      .pipe(gulp.dest('dist/' + folder + '/scripts/'));
  });
});

gulp.task('replace-src-css', function() {
  return gulp.src('dist/**/styles/*.css')
    .pipe(modifyCssUrls({
      modify: function(url) {
        return url.replace(/^(..\/..\/|..\/)global\/images\//, REPORTAL_FS_URL);
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('replace-src-html', function() {
  return folders.map(function(folder) {
    gulp.src('dist/' + folder + '/*.html')
      .pipe(replace('../global/images/', REPORTAL_FS_URL))
      // .pipe(replace('vendor/', REPORTAL_FS_URL))
      .pipe(gulp.dest('dist/' + folder));
  });
});

gulp.task('set-production-js', function() { //uglify and minify js files
  return gulp.src('dist/**/*js')
    .pipe(jsmin())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('replace-url', ['replace-src-js', 'replace-src-html', 'replace-src-css']);

gulp.task('build', sync.sync(['clean-bundle', 'replace-url', 'set-production-js', 'images']), function() {
  bundler.stop.bind(bundler);
  // gulp.run('replace-url');
});


gulp.task('default', ['build']);

gulp.task('watch', sync.sync(['clean-bundle', 'serve', 'images']), function() {
  //bundler.watch();
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/**/styles/**/*.scss', ['styles', 'folderStyles']);
  gulp.watch('app/**/images/**/*', ['images']);
  gulp.watch('app/**/fonts/**/*', ['fonts']);
  gulp.watch('app/**/*.js', ['scripts', 'vscripts']);
});
