const gulp 	= require( 'gulp')
const concat 	= require( 'gulp-concat')
const jsmin 	= require( 'gulp-jsmin')
const uglify 	= require( 'gulp-uglify')

const config = require('../config.json')
const fsrc = config.Folders.srcJS
const distJS = config.Folders.distJS
var selectedTasks = [];
var currentTask;

const js = (done) => {
	const resources = config.Tasks;
	for (var JsTask in resources) {
		var filelist = resources[JsTask];
		var extension = '.js'
		var JsFile = filelist.filter(function(file){
			return file.indexOf(extension) !== -1;
		});
		const outputName = `${JsTask}`;
		if(JsFile != ''){
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
	}
    done();
}
exports.js = js

const getTasksByFiles = (varToSearch, jsonData, level = 0) => {
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
				selectedTasks.push(currentTask)			
			}
		}
	}
	return selectedTasks;
}

const WatchJs = (done) => {
	var selTasks;
	gulp.watch([`${fsrc}/**/*.js`, `${fsrc}/**/*.*jsx`]).on('change', (file) => {
		
		selTasks = getTasksByFiles(file, config.Tasks);
		if(selTasks != ''){
			selectedTasks = []
			selTasks.forEach(function(k) {
				let resources = config.Tasks[k]

				let outputName = `${k}`;;
		
				gulp.src(resources, {sourcemaps: true})
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
				
				console.log(`---- \n EXECUTING (S)JS-TASK: \x1b[31m  ${k}JS \x1b[0m with following resources: \x1b[32m \u2714 \x1b[36m ${k}.js \x1b[0m \n -----`);

			});
		}
		else {
			js(done);
		}
	
		
	});
}
exports.JsWatcher = WatchJs;