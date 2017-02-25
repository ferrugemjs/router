var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');

var tsConfig = require("../tsconfig.json").compilerOptions;

gulp.task('compile',function(){
    return gulp.src(["./src/**/*.ts"])
        .pipe(ts(tsConfig))
        //.pipe(uglify())
        .pipe(gulp.dest(tsConfig.outDir));   
});

gulp.task('build',function(){
    return gulp.src(["./src/**/*.ts"])
        .pipe(ts(tsConfig))
        .pipe(uglify())
        .pipe(gulp.dest(tsConfig.outDir));   
});

