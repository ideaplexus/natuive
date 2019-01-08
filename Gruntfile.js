module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-closure-compiler');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.initConfig({
		'sass': {
			core: { 
					options: {
						sourcemap: false
					},
    				files: {
					'src/css/natuive-core.css': 'src/css/natuive-core.scss'
					}
				},
			components: {
				options: {
					sourcemap: false
				},
				files: [{
					expand: true,
						cwd: "src/components",
						src: ["**/*.scss"],
						dest: "src/components",
						ext: ".css"
					}]
				},
			WordPress: {
				options: {
					sourcemap: false
				},
				files: {
					'src/css/natuive-wordpress.css': 'src/css/natuive-wordpress.scss'
					}
				}
		},
		'concat': {
		  JS: {
			options: {
				separator: ';',
				banner: 'let nui = (() => {', // let us skirt non-ES6 browsers like IE11
				footer: 'initComponents(); return { initComponents: initComponents, animate: animate, copyButton: copyButton, componentNotify: componentNotify, addComponent: addComponent }; })();'
		    },
		    src: ['src/script/natuive-core.js', 'src/components/**/*.js'],
		    dest: 'src/script/natuive.js'
		  },
		  CSS: {
		    src: ['src/css/natuive-core.css', 'src/components/**/*.css'],
		    dest: 'src/css/natuive.css'
		  },
		  JS_lite: {
			options: {
				separator: ';',
				banner: 'let nui = (() => {',
				footer: 'initComponents(); return { initComponents: initComponents, animate: animate, copyButton: copyButton, componentNotify: componentNotify, addComponent: addComponent }; })();'
		    },
		    src: ['src/script/natuive-core.js', 'src/components/form/*.js', 'src/components/nav/*.js', 'src/components/table/*.js', 'src/components/tooltip/*.js'],
		    dest: 'src/script/natuive-lite.js'
		  },
		  CSS_lite: {
		    src: ['src/css/natuive-core.css', 'src/components/button/*.css', 'src/components/form/*.css', 'src/components/grid/*.css', 'src/components/list/*.css', 'src/components/nav/*.css', 'src/components/table/*.css', 'src/components/tooltip/*.css', 'src/components/typography/*.css'],
		    dest: 'src/css/natuive-lite.css'
		  },
		  WordPress: {
		    src: ['src/css/natuive.css', 'src/css/natuive-wordpress.css'],
		    dest: 'src/css/natuive-wordpress-bundle.css'
		  }
		},
		'cssmin': {
			  options: {
			    shorthandCompacting: false,
			    roundingPrecision: -1
			  },
			  target: {
			    files: {
			      'dist/natuive.min.css': ['src/css/natuive.css'],
			      'dist/natuive-lite.min.css': ['src/css/natuive-lite.css'],
			      'natuive-wordpress/natuive-wordpress.min.css': ['src/css/natuive-wordpress-bundle.css']
			    }
			  }
		},
		'closure-compiler': {
			dist: {
			  closurePath: './node_modules/closure-compiler',
			  js: 'src/script/natuive.js',
			  jsOutputFile: 'dist/natuive.min.js',
			  maxBuffer: 500,
			  noreport: true,
			  options: {
			    compilation_level: 'SIMPLE_OPTIMIZATIONS',
			    language_in: 'ECMASCRIPT6_STRICT',
			  }
			},
			lite: {
			  closurePath: './node_modules/closure-compiler',
			  js: 'src/script/natuive-lite.js',
			  jsOutputFile: 'dist/natuive-lite.min.js',
			  maxBuffer: 500,
			  noreport: true,
			  options: {
			    compilation_level: 'SIMPLE_OPTIMIZATIONS',
			    language_in: 'ECMASCRIPT6_STRICT',
			    jscomp_off: 'checkVars'
			  }
			}
		},
		'copy': {
		  WP: {
		    expand: true,
		    cwd: 'dist',
		    src: ['natuive.min.js', 'ie.css', 'ie-fallback.js'],
		    dest: 'natuive-wordpress/',
		  }
		}  
	});

	grunt.registerTask('default', ['sass', 'concat', 'cssmin', 'closure-compiler', 'copy']);
	grunt.registerTask('dev', ['sass', 'concat', 'cssmin', 'copy']);

};
