
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/*
			Project Files
		
			Put your Javascript files in: vendor/scripts
		
			If they need to be loaded in a specific order, put them in: vendor/scripts/before
			and then assign it's order below.
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
		// ------------------------------
		clean: {
			prod: ['scripts/', 'styles/', 'img/', 'tmp/']
		},

		// Copies assets from app/assets
		// ------------------------------
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
			}
		},

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

		// Minifies app.css (prod only)
		// ------------------------------
		mincss: {
			prod: {
				files: [{
					"styles/app.css": "styles/app.css"
				}]
			}
		},

		commonjs: {
			modules: {
				excludeBase: 'tmp/js/',
				src: ['tmp/**/*.js'],
				dest: 'tmp/'
			}
		},

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

		livereload: {
			options: {
				base: '/'
			},
			files: ['styles/app.css', 'scripts/app.js']
		},

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
	grunt.loadNpmTasks('grunt-contrib-mincss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-livereload');


	// Create tasks
	// ------------------------
	grunt.registerTask('styles', ['less']);
	grunt.registerTask('scripts', ['copy:appjs', 'commonjs', 'uglify:app']);
	grunt.registerTask('assets', ['copy:images', 'copy:css', 'copy:js']);

	grunt.registerTask('default', ['clean', 'styles', 'scripts', 'uglify:vendor', 'assets']);
	grunt.registerTask('b', ['default']);

	grunt.registerTask('prod', ['b', 'mincss', 'uglify:minify']);
	grunt.registerTask('p', ['prod']);

	grunt.registerTask('w', ['b', 'livereload', 'watch']);

};
