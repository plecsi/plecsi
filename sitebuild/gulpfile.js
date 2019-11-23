const {src, series, dest, watch} = require('gulp');
const scss = require('gulp-sass');
const source     = require('vinyl-source-stream');
const browserify = require('browserify');
const jsTask = require('./jsTask')

const style = (done) =>{
	return src('./src/scss/**/*.scss')
			.pipe(scss().on('error', scss.logError))
			.pipe(dest('./public/css'))
			done();
}


const watcher = (done) =>{
	watch('./src/scss/**/*.scss', (done)=>{
		series(style)(done);
	})
}

const Copy = (done) => {
	src('./src/assets/**/*.png')
        .pipe(dest('./public/assets')),
	src('./src/assets/**/*.{ttf,woff,eof,svg,otf}')
        .pipe(dest('./public/assets'))
	done();
}

exports.watch = watcher;
exports.js = jsTask.js;

exports.default = series(style,Copy, jsTask.js)