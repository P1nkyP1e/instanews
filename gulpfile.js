// Require Gulp first!
const gulp = require("gulp");
const uglifycss = require("gulp-uglifycss");
// const rename = require('gulp-rename');
const browserSync = require("browser-sync").create();
const eslint = require("gulp-eslint");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const prettyerror = require("gulp-prettyerror");

// Task to minify CSS
gulp.task("sass", function(done) {
  return gulp
    .src("./sass/*.scss")
    .pipe(prettyerror())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(uglifycss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./build/css"));
});
//Task to watch for changes to CSS files
gulp.task("watch", function(done) {
  gulp.watch("sass/*.scss", gulp.series("sass"));
  gulp.watch("js/*.js", gulp.series("scripts"));
  done();
});
// Load browersync
gulp.task("browser-sync", function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("build/css/*.css").on("change", browserSync.reload);
  gulp.watch("build/js/*.js").on("change", browserSync.reload);

  done();
});
//Default task
gulp.task("default", gulp.parallel("browser-sync", "watch"));

gulp.task("lint", function() {
  return gulp
    .src("js/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task(
  "scripts",
  gulp.series("lint", function() {
    return gulp
      .src("./js/*.js")
      .pipe(terser())
      .pipe(
        rename({
          extname: ".min.js"
        })
      )
      .pipe(gulp.dest("./build/js"));
  })
);
//lint
