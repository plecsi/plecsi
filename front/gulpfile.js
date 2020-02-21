const { series, parallel, task, src, dest, watch } = require('gulp');
const inject = require('gulp-inject');
const css = require('./gulp/css');
const js = require('./gulp/js');
const cssTask = css.css;
const jsTask = js.js;


const Copy = (done) => {
	src('./src/assets/**/*.png')
		.pipe(dest('./public/assets')),
		src('./src/assets/**/*.{ttf,woff,eof,svg,otf}')
			.pipe(dest('./public/assets'))
			.on('end', function () {
				HtmlCopy();
			});
	done();
}

const HtmlCopy = () => {
	src('./src/**/*.html')
		.pipe(dest('./public'))
		.on('end', function () {
			HtmlInject();
		});
}

const HtmlInject = () => {
	const timestamp = new Date().getTime();
	src('./src/**/*.html')
		.pipe(inject(src(['./public/js/*.js'], { read: false }),
			{
				transform: function (filePath, file, i, length) {
					var newPath = filePath.replace('/public/', './');
					return '<script type="text/javascript" src="' + newPath + '?' + timestamp + '"></script>';
				}
			})
		)
		.pipe(inject(
			src(['./public/css/*.css'], { read: false }),
			{
				transform: function (filePath, file, i, length) {
					var newPath = filePath.replace('/public/', './');
					return '<link href="' + newPath + '?' + timestamp + '" rel="stylesheet"/>';
				}
			})
		)
		.pipe(dest('./public'))
}

HtmlWatcher = () => {
	watch('./src/**/*.html').on('change', () => HtmlCopy());
}

const watchTask = parallel(css.CssWatcher, js.JsWatcher, HtmlWatcher);

exports.default = series(cssTask, jsTask, Copy);
exports.watch = watchTask;