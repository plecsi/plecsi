const {series, parallel, task, src,dest} = require('gulp');
import inject from 'gulp-inject';

const css = require('./gulp/css');
const js = require('./gulp/js');
const cssTask = css.css;
const jsTask = js.js;
const watchTask = parallel(css.CssWatcher, js.JsWatcher);

const Copy = (done) => {
	src('./src/assets/**/*.png')
        .pipe(dest('./public/assets')),
	src('./src/assets/**/*.{ttf,woff,eof,svg,otf}')
        .pipe(dest('./public/assets'))
	done();
}

 
const HtmlCopy = (done) => {
	const timestamp = new Date().getTime();
	return src('./src/index.html')
			//.pipe(inject(sources))
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
						   return '<link href="' + newPath  + '?'+timestamp+'" rel="stylesheet"/>';

						}
					})
				)
			.pipe(dest('./public'));
}

exports.default = series(Copy,cssTask,jsTask,HtmlCopy);
exports.watch= watchTask;