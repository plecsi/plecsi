import gulp 	from 'gulp'
import concat 	from 'gulp-concat'
import jsmin 	from 'gulp-jsmin'
import babel 	from 'gulp-babel'
import uglify 	from 'gulp-uglify'
import inject from 'gulp-inject';

const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');

const config = require('../config.json')
const fsrc = config.Folders.srcJS
const distJS = config.Folders.distJS
var selectedTasks = [];
var currentTask;

const jsx = (done) => {
	const resources = config.Tasks;
	
	for (var JsTask in resources) {
		let useBabelPreset = false;
		var filelist = resources[JsTask];
		var extension = '.js';

		var JsFile = filelist.filter(function(file){
			return file.indexOf(extension) !== -1;
		});
	
		const outputName = `${JsTask}`;
		if(JsFile == '.js'){
		gulp.src(JsFile, {sourcemaps: true})
				.on('error', function (err) {
						console.error('\x1b[31mError in your js!\x1b[0m')
						console.log('Message:')
						console.log(err.message)
						console.log('Stack:')
						console.log(err.stack)
						console.log('\n\n')
					})
					.pipe(concat(`${outputName}.js`))
					.pipe(jsmin({showLog: true}))
					.pipe(uglify())
					.pipe(gulp.dest(`${distJS}`))
		}
		else{
			console.log('\x1b[32m TRUE \x1b[0m');
			useBabelPreset = true;
			const bundler = browserify(JsFile)
							.transform('babelify', {
								presets : [ '@babel/env', '@babel/react' ]
							});
			bundler.bundle().on('error', function(err) {
				console.error('[browserify error]', err.message);
			})
			.pipe(source(`${outputName}.js`))
			.pipe(gulp.dest(`${distJS}`));
		}

	}
    done();
}
exports.js = jsx

var getTasksByFiles = function(varToSearch, jsonData, level = 0) {
	var val;
	for (var key in jsonData) {
		if ( level == 0 ) {
			currentTask = key;
		}
		if(typeof(jsonData[key]) === 'object') {
			getTasksByFiles(varToSearch, jsonData[key], level+1);
		} else {
			val = jsonData[key].replace('./','');
			if (varToSearch.endsWith(val) && val !== '') {
				console.log('itt', currentTask)
				selectedTasks.push(currentTask)			
			}
		}
	}
	return selectedTasks;
}

const WatchJs = (done) => {
	var selTasks;
	gulp.watch([`${fsrc}/**/*.js`, `${fsrc}/**/*.*jsx`]).on('change', (file) => {
		let useBabelPreset = false;
		selTasks = getTasksByFiles(file, config.Tasks);
		if(selTasks != ''){
			selectedTasks = []
			console.log('bejön?', selectedTasks)
			selTasks.forEach(function(k) {
				let resources = config.Tasks[k]
				var filelist = resources;
				var extension = '.js';
				var JsFile = filelist.filter(function(files){
					return files.indexOf(extension) !== -1;
				});
				
				console.log('output',JsFile)
				let outputName = `${k}`;;
			
				console.log(`--------- \n EXECUTING (S)CSS-TASK: \x1b[31m  ${k}CSS \x1b[0m with following resources: \x1b[32m \u2714 \x1b[36m ${k}.js \x1b[0m \n ---------`);

				if(JsFile == '.js'){
				gulp.src(JsFile, {sourcemaps: true})
						.on('error', function (err) {
								console.error('\x1b[31mError in your js!\x1b[0m')
								console.log('Message:')
								console.log(err.message)
								console.log('Stack:')
								console.log(err.stack)
								console.log('\n\n')
							})
							.pipe(concat(`${outputName}.js`))
							//.pipe(jsmin({showLog: true}))
							//.pipe(uglify())
							.pipe(gulp.dest(`${distJS}`))
				}
				else{
					console.log('\x1b[32m TRUE \x1b[0m');
							useBabelPreset = true;
							const bundler = browserify(JsFile)
											.transform('babelify', {
												presets : [ '@babel/env', '@babel/react' ]
											});
							bundler.bundle().on('error', function(err) {
								console.error('[browserify error]', err.message);
							})
							.pipe(source(`${outputName}.js`))
							.pipe(gulp.dest(`${distJS}`));
				}
			});
		}
		else {
			jsx(done);
		}
	
		
	});
}
exports.JsWatcher = WatchJs;