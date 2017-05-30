var gulp = require('gulp');
var rename = require('gulp-rename');
var ferrugemjs = require('gulp-ferrugemjs');
var tsConfig = require("../tsconfig.json").compilerOptions;

gulp.task('template',function(){
    return gulp.src([
        "./src/**/*.html"
    ])
    .pipe(ferrugemjs({formatCode:true}))
    .pipe(rename({
        extname: ".html.js"
    }))
    .pipe(gulp.dest(tsConfig.outDir));
});
