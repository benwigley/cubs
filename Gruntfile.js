
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/*
			Put vendor Javascript files in: vendor/scripts

			If they need to be loaded in a specific order, put them in: vendor/scripts/before
			and then assign it's order below.

			Put libraries that don't need a specif order in: vendor/scripts/libs
			and they will concatenated in alphabetical order.
		*/
		vendor: {
			scripts: {
				before: [
					'app/vendor/scripts/before/common.js',
					'app/vendor/scripts/before/underscore-min.js',
					'app/vendor/scripts/before/backbone-min.js'
				]
			}
		},

		// Removes (cleans) these folders
		// -------------------------------------
		clean: {
			dev: ['scripts/', 'styles/', 'img/', 'tmp/'],
			prod: ['prod/scripts', 'prod/styles', 'prod/img']
		},

		// Copies assets from app/assets
		// -------------------------------------
		copy: {
			appjs: {
				files: [{
					expand: true,
					cwd: 'app/js',
					src: ['**'],
					dest: 'tmp/js/',
					filter: 'isFile'
				}]
			},
			images: {
				files: [{
					expand: true,
					cwd: 'app/assets/images',
					src: ['**'],
					dest: 'img/',
					filter: 'isFile'
				}]
			},
			css: {
				files: [{
					expand: true,
					cwd: 'app/assets/css',
					src: ['**'],
					dest: 'styles/',
					filter: 'isFile'
				}]
			},
			js: {
				files: [{
					expand: true,
					cwd: 'app/assets/js',
					src: ['**'],
					dest: 'scripts/',
					filter: 'isFile'
				}]
			},
			// Copies the JS and CSS files for production
			prodjs: {
				files: [{
					expand: true,
					cwd: 'scripts/',
					src: ['**'],
					dest: 'prod/scripts',
					filter: 'isFile'
				}]
			},
			prodcss: {
				files: [{
					expand: true,
					cwd: 'styles/',
					src: ['**'],
					dest: 'prod/styles',
					filter: 'isFile'
				}]
			},
			prodimages: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**'],
					dest: 'prod/img',
					filter: 'isFile'
				}]
			}
		},

		// Compile all LESS files.
		// -------------------------------------
		less: {
			prod: {
				options: {
					paths: ["app/css"],
					yuicompress: false
				},
				files: {
					"styles/app.css": "app/css/app.less"
				}
			}
		},

		// Compile all Stylus files.
		// -------------------------------------
		stylus: {
			prod: {
				options: {
					paths: ["app/css"],
					compress: false
				},
				files: {
					"styles/app.css": "app/css/app.styl"
				}
			}
		},

		// Minifies app.css (prod only)
		// -------------------------------------
		mincss: {
			prod: {
				files: [{
					"styles/app.css": "styles/app.css"
				}]
			}
		},

		// Allows the use of require() in 
		// application js files.
		// -------------------------------------
		commonjs: {
			modules: {
				excludeBase: 'tmp/js/',
				src: ['tmp/**/*.js'],
				dest: 'tmp/'
			}
		},

		// Concats js files.
		// Optional prod task for minifying.
		// -------------------------------------
		uglify: {
			options: {
				beautify: true,
				mangle: false
			},
			app: {
				files: {
					'scripts/app.js': ['tmp/js/**/*.js']
				}
			},
			vendor: {
				files: {
					'scripts/vendor.js': [
						'<%= vendor.scripts.before %>'
						// 'app/vendor/scripts/libs/**/*.js'
					]
				}
			},
			minify: {	
				options: {
					beautify: false,
					mangle: true
				},
				files: {
					'scripts/app.js': ['scripts/app.js'],
					'scripts/vendor.js': ['scripts/vendor.js']
				}
			}
		},

		// If you have livereload plugin the
		// browser can refresh on file change.
		// -------------------------------------
		livereload: {
			options: {
				base: '/'
			},
			files: ['styles/app.css', 'scripts/app.js']
		},


		// Run these grunt tasks on file change.
		// -------------------------------------
		watch: {
			css: {
				files: ['app/css/**/*.less'],
				tasks: ['styles'],
				options: {
					debounceDelay: 50
				}
			},
			js: {
				files: ['app/js/**/*.js'],
				tasks: ['scripts'],
				options: {
					debounceDelay: 250
				}
			}
		}

	});


	// Load Grunt modules
	// ------------------------
	grunt.loadNpmTasks('grunt-commonjs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-mincss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-livereload');


	// Create tasks
	// ------------------------

	// Sub-tasks
	grunt.registerTask('styles',	['less']);
	grunt.registerTask('scripts',	['copy:appjs', 'commonjs', 'uglify:app']);
	grunt.registerTask('assets',	['copy:images', 'copy:css', 'copy:js']);

	// Developement tasks
	grunt.registerTask('default',	['clean:dev', 'styles', 'scripts', 'uglify:vendor', 'assets']);
	grunt.registerTask('b',			['default']);
	grunt.registerTask('w',			['b', 'livereload', 'watch']);

	// Production task
	grunt.registerTask('prod',		[
		'b', 'mincss', 'uglify:minify','clean:prod',
		'copy:prodjs', 'copy:prodcss', 'copy:prodimages'
	]);
	grunt.registerTask('p',			['prod']);

};
