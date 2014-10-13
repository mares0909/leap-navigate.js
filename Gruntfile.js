module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Create watch task to watch Sass and JS directories during Dev
		watch: {
			options: {
		      livereload: true,
		      files: ['*'],
		    },
			css: {
				files: ['source/scss/*.scss', 'source/scss/**/*.scss'],
				tasks: ['compass:development'],
			},
			js: {
				files: ['source/js/**'],
				tasks: ['concat:javascript'],
			}
		},

		// Empty out CSS and JS directories so they are clean for Grunt to compile correct files
		clean: {
			preBuild: ['assets/css', 'assets/js/*.js']
		},

		// Compass task to compile Sass using the Compass mixin library
		// Compass settings are stored in source/config.rb
		compass: {
			development: {
				options: {
					environment: 'development',
					config: 'source/compass.rb'
				}
			},
			production: {
				options: {
					environment: 'production',
					config: 'source/compass.rb'
				}
			}
		},

		// Concatinate all the JavaScript files to reduce amount of requests
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			javascript: {
				// the files to concatenate
				src: ['source/js/plugin/*.js', 'source/js/componenets/*.js', 'source/js/objects/*.js', 'source/js/*.js'],
				// the location of the resulting JS file
				dest: 'assets/js/application.js'
			}
		},
		// Minify JavaScript files to reduce page weight
		// Only used for production environment
		uglify: {
			options: {

			},
			javascript: {
				files: {
					'assets/js/application.min.js': ['<%= concat.javascript.dest %>']
				}
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compass');

	// Default task(s).
	grunt.registerTask('default', ['watch']);

	grunt.registerTask('development', [
		'clean:preBuild',
		'compass:development',
		'concat:javascript'
	]);

	grunt.registerTask('build', [
		'clean:preBuild',
		'compass:production',
		'concat:javascript',
		'uglify:javascript'
	]);
};