const gulp = require('gulp');
const sass = require( 'gulp-sass');
const autoprefixer = require( 'gulp-autoprefixer');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');

const config = require('../config.json');
const distCSS = config.Folders.distCSS;
const fsrc = config.Folders.srcSCSS;
var selectedTasks = [];
var currentTask

const css = (done) => {
	const resources = config.Tasks;
	
	for (var cssTask in resources) {
		var filelist = resources[cssTask];
		var extension = '.scss';

		var ScssFile = filelist.filter(function(file){
			return file.indexOf(extension) !== -1;
		});
		
		
		const outputName = `${cssTask}`;
		if(ScssFile != ''){
		gulp.src(ScssFile, {sourcemaps: true})
				.pipe(sass())
				.pipe(autoprefixer())
				.pipe(cssmin({showLog: true}))
				.pipe(concat(`${outputName}.css`))
				.pipe(gulp.dest(`${distCSS}`))
			console.log(`--------- \n EXECUTING TASK: \x1b[31m ${cssTask}CSS \x1b[0m with following resources: \x1b[32m \u2714 \x1b[36m ${ScssFile} \x1b[0m`);
			console.log(`OUTPUT File: \x1b[32m \u2714 \x1b[36m ${distCSS}/${outputName}.css \x1b[0m \n ---------`);
		}

	}
    done();
}
exports.css = css;

var getTasksByFiles = (varToSearch, jsonData, level = 0) => {
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

const WatchCss = (done) => {
	var selTasks;
	gulp.watch([`${fsrc}/**/*.css`, `${fsrc}/**/*.*css`]).on('change', (file) => {
		//console.log('file', file)
		selTasks = getTasksByFiles(file, config.Tasks);
		if(selTasks != ''){
			selectedTasks = []
			selTasks.forEach(function(k) {
				let resources = config.Tasks[k]
				var filelist = resources;
				var extension = '.scss';
				var ScssFile = filelist.filter(function(files){
					return files.indexOf(extension) !== -1;
				});
				let outputName = `${k}`;;
			
				console.log(`--------- \n EXECUTING (S)CSS-TASK: \x1b[31m  ${k}CSS \x1b[0m with following resources: \x1b[32m \u2714 \x1b[36m ${k}.css \x1b[0m \n ---------`);

				gulp.src(ScssFile)
					.pipe(sass().on('error', sass.logError))
					.pipe(autoprefixer())
					.pipe(concat(`${outputName}.css`))
					.pipe(gulp.dest(`${distCSS}`))
			});
		}
		else {
			css(done);
		}
	
		
	});
}
exports.CssWatcher = WatchCss;