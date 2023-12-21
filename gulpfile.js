// Load Gulp...of course
import gulp from "gulp";
const { src, dest, task, watch, series, parallel } = gulp;

// CSS related plugins
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import autoprefixer from "gulp-autoprefixer";

// JS related plugins
import uglify from "gulp-uglify";
import babelify from "babelify";
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import stripDebug from "gulp-strip-debug";

// Utility plugins
import rename from "gulp-rename";
import sourcemaps from "gulp-sourcemaps";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import options from "gulp-options";
import gulpif from "gulp-if";

// Browsers related plugins
import browserSync from "browser-sync";

// Project related variables
const styleSRC = ["./assets/src/scss/main.scss"];
const styleURL = "./assets/dist/css/";
const mapURL = "./";

const jsSRC = "./assets/src/js/";
const jsFiles = [];
const jsURL = "./assets/dist/js/";

const imgSRC = "./assets/src/images/**/*";
const imgURL = "./assets/dist/images/";

const fontsSRC = "./assets/src/fonts/**/*";
const fontsURL = "./assets/dist/fonts/";

const styleWatch = "./assets/src/scss/**/*.scss";
const jsWatch = "./assets/src/js/**/*.js";
const imgWatch = "./assets/src/images/**/*.*";
const fontsWatch = "./assets/src/fonts/**/*.*";

// Tasks
function reload(done) {
    browserSync.reload();
    done();
}

function css(done) {
    src(styleSRC)
        .pipe(
            plumber({
                errorHandler(err) {
                    notify.onError({
                        title: `Gulp error in ${err.plugin}`,
                        message: err.toString(),
                    })(err);
                },
            })
        )
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                errLogToConsole: true,
                outputStyle: "compressed",
            })
        )
        .on("error", console.error.bind(console))
        .pipe(autoprefixer())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write(mapURL))
        .pipe(dest(styleURL))
        .pipe(browserSync.stream());
    done();
}

function js(done) {
    jsFiles.forEach(entry => {
        browserify({
            entries: [jsSRC + entry],
        })
            .transform(babelify, { presets: ["@babel/preset-env"] })
            .bundle()
            .on("error", err => {
                notify.onError({
                    title: `Gulp error in ${err.plugin}`,
                    message: err.toString(),
                })(err);
                console.error(err.toString());
                done();
            })
            .pipe(source(entry))
            .pipe(
                rename({
                    extname: ".min.js",
                })
            )
            .pipe(buffer())
            .pipe(gulpif(options.has("production"), stripDebug()))
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write("."))
            .pipe(dest(jsURL))
            .pipe(browserSync.stream());
    });
    done();
}

function triggerPlumber(src_file, dest_file) {
    return src(src_file).pipe(plumber()).pipe(dest(dest_file));
}

function images() {
    return triggerPlumber(imgSRC, imgURL);
}

function fonts() {
    return triggerPlumber(fontsSRC, fontsURL);
}

function watch_files() {
    watch(styleWatch, series(css, reload));
    watch(jsWatch, series(js, reload));
    watch(imgWatch, series(images, reload));
    watch(fontsWatch, series(fonts, reload));
    src(jsURL + "main.min.js", { allowEmpty: true }).pipe(notify({ message: "Gulp is Watching, Happy Coding!" }));
}

task("css", css);
task("js", js);
task("images", images);
task("fonts", fonts);
task("default", parallel(css, js, images, fonts));
task("watch", series(watch_files));
