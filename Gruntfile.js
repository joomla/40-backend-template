module.exports = function(grunt) {

	var settings      = grunt.file.readYAML('grunt_settings.yaml'),
		path          = require('path'),
		preText       = '{\n "name": "joomla-assets",\n "version": "4.0.0",\n "description": "External assets that Joomla is using",\n "dependencies": {\n  ',
		postText      = '  },\n  "license": "GPL-2.0+"\n}',
		name, tinyXml, codemirrorXml,
		vendorsTxt    = '',
		vendorsArr    = '',
		polyFillsUrls = [],
		xmlVersionStr = /(<version>)(\d+.\d+.\d+)(<\/version>)/;

	// Set some directories for codemirror
	settings.CmAddons = {};
	settings.CmAddons.js = [
		'addon/display/fullscreen.js',
		'addon/display/panel.js',
		'addon/edit/closebrackets.js',
		'addon/edit/closetag.js',
		'addon/edit/matchbrackets.js',
		'addon/edit/matchtags.js',
		'addon/fold/brace-fold.js',
		'addon/fold/foldcode.js',
		'addon/fold/foldgutter.js',
		'addon/fold/xml-fold.js',
		'addon/mode/loadmode.js',
		'addon/mode/multiplex.js',
		'addon/scroll/simplescrollbars.js',
		'addon/selection/active-line.js',
		'keymap/vim.js'
	];
	settings.CmAddons.css = [
		'addon/display/fullscreen.css',
		'addon/fold/foldgutter.css',
		'addon/scroll/simplescrollbars.css'
	];

	// Loop to get some text for the packgage.json
	for (name in settings.vendors) {
		vendorsTxt += '"' + name + '": "' + settings.vendors[name].version + '",';
	}

	// Loop to get some text for the assets.php
	for (name in settings.vendors) {
		vendorsArr += '\'' + name + '\' => array(\'version\' => \'' + settings.vendors[name].version + '\',' + '\'dependencies\' => \'' + settings.vendors[name].dependencies + '\'),\n\t\t\t';
	}

	// Build the array of the polyfills urls for curl
	for (name in settings.polyfills) {
		var filename = settings.polyfills[name].toLowerCase();
		if (filename === 'element.prototype.classlist') filename = 'classlist';
		polyFillsUrls.push({url: 'https://cdn.polyfill.io/v2/polyfill.js?features=' + settings.polyfills[name] + '&flags=always,gated&ua=Mozilla/4.0%20(compatible;%20MSIE%208.0;%20Windows%20NT%206.0;%20Trident/4.0)', localFile: 'polyfill.' + filename + '.js'});
	}

	// Build the package.json and assets.php for all 3rd Party assets
	grunt.file.write('build/assets_tmp/package.json', preText + vendorsTxt.substring(0, vendorsTxt.length - 1) + postText);
	grunt.file.write('build/assets_tmp/assets.php', '<?php\ndefined(\'_JEXEC\') or die;\n\nabstract class ExternalAssets\n{\n\tpublic static function getCoreAssets()\n\t{\n\t\t return array(\n\t\t\t' + vendorsArr + '\n\t\t);\n\t}\n}\n');

	// Update the XML files for tinyMCE and Codemirror
	tinyXml = grunt.file.read('plugins/editors/tinymce/tinymce.xml');
	codemirrorXml = grunt.file.read('plugins/editors/codemirror/codemirror.xml');

	tinyXml = tinyXml.replace(xmlVersionStr, "$1" + settings.vendors.tinymce.version + "$3");
	codemirrorXml = codemirrorXml.replace(xmlVersionStr, "$1" + settings.vendors.codemirror.version + "$3");

	grunt.file.write('plugins/editors/tinymce/tinymce.xml', tinyXml);
	grunt.file.write('plugins/editors/codemirror/codemirror.xml', codemirrorXml);

	// Project configuration.
	grunt.initConfig({
		folder : {
			system        : 'media/system/js',
			fields        : 'media/system/js/fields',
			legacy        : 'media/system/js/legacy',
			puny          : 'media/vendor/punycode/js',
			codemirror    : 'media/vendor/codemirror',
			adminTemplate : 'administrator/templates/atum'
		},

		// Let's clean up the system
		clean: {
			assets: {
				src: [
					'media/vendor/jquery/js/*',
					'media/vendor/bootstrap/**',
					'media/vendor/tether/**',
					'media/vendor/jcrop/**',
					'media/vendor/dragula/**',
					'media/vendor/font-awesome/**',
					'media/vendor/tinymce/plugins/*',
					'media/vendor/tinymce/skins/*',
					'media/vendor/tinymce/themes/*',
					'media/vendor/punycode/*',
					'media/vendor/codemirror/*',
					'media/vendor/mediaelement/*',
					'media/vendor/chosenjs/*',
					'media/vendor/awesomplete/*',
					'libraries/cms/helper/assets.php',
				],
				expand: true,
				options: {
					force: true
				}
			},
			temp: { src: [ 'build/assets_tmp/*', 'build/assets_tmp/tmp', 'build/assets_tmp/package.json', 'build/assets_tmp/assets.php' ], expand: true, options: { force: true } }
		},

		// Update all the packages to the version specified in assets/package.json
		shell: {
			update: {
				command: [
					'cd build/assets_tmp',
					'npm install'
				].join('&&')
			}
		},

		// Fetch the polyfills
		fetchpages: {
			polyfills: {
				options: {
					baseURL: '',
					destinationFolder: 'media/vendor/polyfills/js/',
					urls: polyFillsUrls,
					cleanHTML: false,
					fetchBaseURL: false,
					followLinks: false
				}
			}
		},

		// Concatenate some javascript files
		concat: {
			someFiles: {
				files: [
					{
						src: settings.CmAddons.js.map(function (v) {
							return 'build/assets_tmp/node_modules/codemirror/' + v;
						}),
						dest:'build/assets_tmp/node_modules/codemirror/lib/addons.js'
					},
					{
						src: settings.CmAddons.css.map(function (v) {
							return 'build/assets_tmp/node_modules/codemirror/' + v;
						}),
						dest: 'build/assets_tmp/node_modules/codemirror/lib/addons.css'
					}
				]
			}
		},

		// Transfer all the assets to media/vendor
		copy: {
			fromSource: {
				files: [
					// jQuery js files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/jquery/dist/', src: ['*', '!(core.js)'], dest: 'media/vendor/jquery/js/', filter: 'isFile'},
					// jQuery js migrate files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/jquery-migrate/dist/', src: ['**'], dest: 'media/vendor/jquery/js/', filter: 'isFile'},
					//Bootastrap js files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/bootstrap/dist/js/', src: ['**'], dest: 'media/vendor/bootstrap/js/', filter: 'isFile'},
					//Bootastrap scss files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/bootstrap/scss/', src: ['**'], dest: 'media/vendor/bootstrap/scss/', filter: 'isFile'},
					//Bootastrap css files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/bootstrap/dist/css/', src: ['**'], dest: 'media/vendor/bootstrap/css/', filter: 'isFile'},
					//Teether js files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/tether/dist/js/', src: ['**'], dest: 'media/vendor/tether/js/', filter: 'isFile'},
					// Punycode js files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/punycode/', src: ['punycode.js', 'LICENSE-MIT.txt'], dest: 'media/vendor/punycode/js/', filter: 'isFile'},
					// Cropperjs css files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/cropperjs/dist', src: ['*.css'], dest: 'media/vendor/cropperjs/css/', filter: 'isFile'},
					// Cropperjs js files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/cropperjs/dist', src: ['*.js'], dest: 'media/vendor/cropperjs/js/', filter: 'isFile'},
					//Font Awesome css files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/font-awesome/css/', src: ['**'], dest: 'media/vendor/font-awesome/css/', filter: 'isFile'},
					//Font Awesome scss files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/font-awesome/scss/', src: ['**'], dest: 'media/vendor/font-awesome/scss/', filter: 'isFile'},
					//Font Awesome fonts files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/font-awesome/fonts/', src: ['**'], dest: 'media/vendor/font-awesome/fonts/', filter: 'isFile'},
					// tinyMCE plugins
					{ expand: true, cwd: 'build/assets_tmp/node_modules/tinymce/plugins/', src: ['**'], dest: 'media/vendor/tinymce/plugins/', filter: 'isFile'},
					// tinyMCE skins
					{ expand: true, cwd: 'build/assets_tmp/node_modules/tinymce/skins/', src: ['**'], dest: 'media/vendor/tinymce/skins/', filter: 'isFile'},
					// tinyMCE themes
					{ expand: true, cwd: 'build/assets_tmp/node_modules/tinymce/themes/', src: ['**'], dest: 'media/vendor/tinymce/themes/', filter: 'isFile'},
					// tinyMCE js files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/tinymce/', src: ['tinymce.js','tinymce.min.js','license.txt','changelog.txt'], dest: 'media/vendor/tinymce/', filter: 'isFile'},
					// Code mirror addon files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/codemirror/addon/', src: ['**'], dest: 'media/vendor/codemirror/addon/', filter: 'isFile'},
					// Code mirror keymap files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/codemirror/keymap/', src: ['**'], dest: 'media/vendor/codemirror/keymap/', filter: 'isFile'},
					// Code mirror lib files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/codemirror/lib', src: ['**'], dest: 'media/vendor/codemirror/lib/', filter: 'isFile'},
					// Code mirror mode files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/codemirror/mode', src: ['**'], dest: 'media/vendor/codemirror/mode/', filter: 'isFile'},
					// Code mirror theme files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/codemirror/theme', src: ['**'], dest: 'media/vendor/codemirror/theme/', filter: 'isFile'},
					// Media Element js, swf, xap files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/mediaelement/build', src: ['*.js', '*.swf', '*.xap', '!jquery.js'], dest: 'media/vendor/mediaelement/js/', filter: 'isFile'},
					// Media Element css, png, gif, svg files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/mediaelement/build', src: ['*.css', '*.png', '*.svg', '*.gif'], dest: 'media/vendor/mediaelement/css/', filter: 'isFile'},
					// MiniColors js files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/jquery-minicolors', src: ['*.js'], dest: 'media/vendor/minicolors/js/', filter: 'isFile'},
					// MiniColors css, ong files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/jquery-minicolors', src: ['*.css', '*.png'], dest: 'media/vendor/minicolors/css/', filter: 'isFile'},
					// Awesomplete js files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/awesomplete', src: ['awesomplete.js', 'awesomplete.min.js'], dest: 'media/vendor/awesomplete/js/', filter: 'isFile'},
					// Awesomplete css files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/awesomplete', src: ['awesomplete.css'], dest: 'media/vendor/awesomplete/css/'},
					// Dragula js files
					{ expand: true, cwd: 'build/assets_tmp/node_modules/dragula/dist', src: ['*.js'], dest: 'media/vendor/dragula/js/', filter: 'isFile'},
					// Dragula css files
					{ cwd: 'build/assets_tmp/node_modules/dragula/dist', src: ['*.css'], dest: 'media/vendor/dragula/css/', expand: true, filter: 'isFile'},

					// Licenses
					{ src: ['build/assets_tmp/node_modules/jquery/LICENSE.txt'], dest: 'media/vendor/jquery/LICENSE.txt'},
					{ src: ['build/assets_tmp/tmp/jcop/jcrop-MIT-LICENSE.txt'], dest: 'media/vendor/jcrop/jcrop-MIT-LICENSE.txt'},
					{ src: ['build/assets_tmp/node_modules/bootstrap/LICENSE'], dest: 'media/vendor/bootstrap/LICENSE'},
					{ src: ['build/assets_tmp/node_modules/tether/LICENSE'], dest: 'media/vendor/tether/LICENSE'},
					{ src: ['build/assets_tmp/tmp/codemirror/LICENSE'], dest: 'media/vendor/codemirror/LICENSE'},
					{ src: ['build/assets_tmp/tmp/jcrop/jcrop-MIT-LICENSE.txt'], dest: 'media/vendor/jcrop/jcrop-MIT-LICENSE.txt'},
					{ src: ['build/assets_tmp/node_modules/dragula/license'], dest: 'media/vendor/dragula/license'},
					{ src: ['build/assets_tmp/node_modules/awesomplete/LICENSE'], dest: 'media/vendor/awesomplete/LICENSE'},

					// assets.php
					{ src: ['build/assets_tmp/assets.php'], dest: 'libraries/cms/helper/assets.php'},
				]
			}
		},

		// Compile Sass source files to CSS
		sass: {
			dist: {
				options: {
					precision: '5',
					sourceMap: true // SHOULD BE FALSE FOR DIST
				},
				files: {
					'<%= folder.adminTemplate %>/css/template.css': '<%= folder.adminTemplate %>/scss/template.scss'
				}
			}
		},

		// Validate the SCSS
		scsslint: {
			allFiles: [
				'<%= folder.adminTemplate %>/scss',
			],
			options: {
				config: 'scss-lint.yml',
				reporterOutput: '<%= folder.adminTemplate %>/scss/scss-lint-report.xml'
			}
		},

		// Minimize some javascript files
		uglify: {
			allJs: {
				files: [
					{
						src: [
							'<%= folder.system %>/*.js',
							'!<%= folder.system %>/*.min.js',
							'<%= folder.system %>/fields/*.js',
							'!<%= folder.system %>/fields/*.min.js',
							'!<%= folder.system %>/fields/calendar.js',  // exclude calendar
							'!<%= folder.system %>/fields/calendar-*.js', // exclude calendar
							'<%= folder.system %>/legacy/*.js',
							'!<%= folder.system %>/legacy/*.min.js',
							'<%= folder.codemirror %>/addon/*/*.js',
							'!<%= folder.codemirror %>/addon*/*.min.js',
							'<%= folder.codemirror %>/keymap/*.js',
							'!<%= folder.codemirror %>/keymap/*.min.js',
							'<%= folder.codemirror %>/lib/*.js',
							'!<%= folder.codemirror %>/lib/*.min.js',
							'<%= folder.codemirror %>/mode/*/*.js',
							'!<%= folder.codemirror %>/mode/*/*.min.js',
							'<%= folder.codemirror %>/theme/*/*.js',
							'!<%= folder.codemirror %>/theme/*/*.min.js',
							// '<%= folder.puny %>/*.js',            // Uglifying punicode.js fails!!!
							// '!<%= folder.puny %>/*.min.js',       // Uglifying punicode.js fails!!!
						],
						dest: '',
						expand: true,
						ext: '.min.js'
					}
				]
			},
			templates: {
				files: [
					{
						src: [
							'<%= folder.adminTemplate %>/*.js',
						],
						dest: '',
						expand: true,
						ext: '.min.js'
					}
				]
			}
		},

		// Initiate task after CSS is generated
		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')({browsers: 'last 2 versions'})
				],
			},
			dist: {
				src: '<%= folder.adminTemplate %>/css/template.css'
			}
		},

		// Let's minify some css files
		cssmin: {
			allCss: {
				files: [{
					expand: true,
					matchBase: true,
					ext: '.min.css',
					cwd: 'media/vendor/codemirror',
					src: ['*.css', '!*.min.css', '!theme/*.css'],
					dest: 'media/vendor/codemirror',
				}]
			},
			templates: {
				files: [{
					expand: true,
					matchBase: true,
					ext: '.min.css',
					cwd: '<%= folder.adminTemplate %>/css',
					src: ['*.css', '!*.min.css', '!theme/*.css'],
					dest: '<%= folder.adminTemplate %>/css',
				}]
			}
		},
	});

	// Load required modules
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-scss-lint');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fetch-pages');
	grunt.loadNpmTasks('grunt-postcss');

	grunt.registerTask('default',
		[
			'clean:assets',
			'shell:update',
			'concat:someFiles',
			'copy:fromSource',
			'sass:dist',
			'uglify:allJs',
			'cssmin:allCss',
			'postcss',
			'cssmin:templates',
			'clean:temp'
		]
	);
	
	grunt.registerTask('test-scss', ['scsslint']);

	grunt.registerTask('polyfills', 'Download the polyfills from FT.', function() {
		grunt.task.run([
			'fetchpages:polyfills'
		]);
	});

	grunt.registerTask('scripts', 'Minifies the javascript files.', function() {
		grunt.task.run([
			'uglify:allJs'
		]);
	});

	grunt.registerTask('styles', 'Minifies the stylesheet files.', function() {
		grunt.task.run([
			'cssmin:allCss'
		]);
	});

	grunt.registerTask('compile', 'Compiles the stylesheet files.', function() {
		grunt.task.run([
			'uglify:templates',
			'scsslint',
			'sass:dist',
			'postcss',
			'cssmin:templates'
		]);
	 });

};
