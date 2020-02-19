const {series, parallel, task, src,dest, watch} = require('gulp');
const inject = require('gulp-inject');
const css = require('./gulp/css');
const js = require('./gulp/js');
const cssTask = css.css;
const jsTask = js.js;


const Copy = (done) => {
	src('./src/assets/**/*.png')
        .pipe(dest('./public/assets')),
	src('./src/assets/**/*.{ttf,woff,eof,svg,otf}')
		.pipe(dest('./public/assets')),
	src('./src/**/*.html')
		.pipe(dest('./public'));
	done();
}

 
const HtmlCopy = (done) => {
	const timestamp = new Date().getTime();
	src('./src/**/*.html')
			.pipe(inject(src(['./public/js/*.js'], {read: false }),
				{
					transform: function (filePath, file, i, length) {
						var newPath = filePath.replace('/public/', './');
					   return '<script type="text/javascript" src="'+ newPath  + '?'+timestamp+'"></script>';

					}
				})
			)
			.pipe(inject(
					src(['./public/css/*.css'], {read: false }),
					{
						transform: function (filePath, file, i, length) {
							var newPath = filePath.replace('/public/', './');
						   return '<link href="' + newPath  + '" rel="stylesheet"/>';

						}
					})
				)
			.pipe(dest('./public'));
	done();
}

HtmlWatcher = (done) => {
	watch('src/**/*.html', HtmlCopy);
}

const watchTask = parallel(css.CssWatcher, js.JsWatcher, HtmlWatcher);

exports.default = series(Copy,cssTask,jsTask,HtmlCopy);
exports.watch= watchTask;