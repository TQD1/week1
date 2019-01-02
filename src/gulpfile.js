var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var url = require("url");
var sass = require("gulp-sass");
var css = require("gulp-clean-css");
var server = require("gulp-webserver");
gulp.task("sass", function() {
    return gulp.src("list/sass/index.scss")
        .pipe(sass())
        .pipe(gulp.dest("list/css/"))
})
gulp.task("watch", function() {
    gulp.watch("list/sass/index.scss", gulp.series("sass"))
})
gulp.task("server", function() {
    gulp.src("list")
        .pipe(server({
            open: true,
            livereload: true,
            port: 8080,
            middleware: function(req, res, next) {
                var parhname = url.parse(req.url).pathname;
                if (pathname === "/api/list") {
                    return res.end()
                } else {
                    pathname = pathname === "/" ? "index.html" : pathname;
                    return res.end(fs.readFileSync(path.join(__dirname, "list", pathname)))
                }
            }
        }))
})