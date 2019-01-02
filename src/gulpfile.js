var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var url = require("url");
var sass = require("gulp-sass");
var css = require("gulp-clean-css");
var server = require("gulp-webserver");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify")
    //编译sass
gulp.task("sass", function() {
        return gulp.src("list/sass/index.scss")
            .pipe(sass())
            .pipe(gulp.dest("list/css/"))
    })
    //监视
gulp.task("watch", function() {
        gulp.watch("list/sass/index.scss", gulp.series("sass"))
    })
    //服务
gulp.task("server", function() {
        gulp.src("list")
            .pipe(server({
                open: true,
                livereload: true,
                port: 8080,
                middleware: function(req, res, next) {
                    var pathname = url.parse(req.url).pathname;
                    if (pathname === "/favicon.ico") {
                        return res.end();
                    }
                    if (pathname === "/api/list") {
                        return res.end()
                    } else {
                        pathname = pathname === "/" ? "index.html" : pathname;
                        return res.end(fs.readFileSync(path.join(__dirname, "list", pathname)))
                    }
                }
            }))
    })
    //默认
gulp.task("default", gulp.parallel("sass", "server", "watch"))

//压缩css
gulp.task("css", function() {
    return gulp.src("list/css/index.css")
        .pipe(css())
        .pipe(gulp.dest("dist/css"))
})

//压缩js
gulp.task("js", function() {
        return gulp.src("list/js/index.js")
            .pipe(babel({
                presets: ['@babel/env']
            })).pipe(uglify())
            .pipe(gulp.dest("dist/js"))
    })
    //打包任务
gulp.task("build", gulp.parallel("css", "js"))