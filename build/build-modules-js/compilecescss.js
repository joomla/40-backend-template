const autoprefixer = require('autoprefixer');
const Chalk = require('chalk');
const fs = require('fs');
const fsExtra = require('fs-extra');
const Path = require('path');
const postcss = require('postcss');
const Promise = require('bluebird');
const Sass = require('node-sass');
const UglyCss = require('uglifycss');

// Various variables
const rootPath = __dirname.replace('/build/build-modules-js', '').replace('\\build\\build-modules-js', '');

compileSass = (options) => {
	const files = options.settings.elements;

	// Make sure that the dist paths exist
	if (!fs.existsSync(rootPath + '/media/system/webcomponents')) {
		fsExtra.mkdirSync(rootPath + '/media/system/webcomponents');
	}
	if (!fs.existsSync(rootPath + '/media/system/webcomponents/js')) {
		fsExtra.mkdirSync(rootPath + '/media/system/webcomponents/js');
	}
	if (!fs.existsSync(Path.join(rootPath, '/build/webcomponents/css'))) {
		fs.mkdirSync(Path.join(rootPath, '/build/webcomponents/css'));
	}

	// Loop to get some text for the packgage.json
	files.forEach((name) => {
		if (!fs.existsSync(rootPath + '/build/webcomponents/scss/' + name + '/' + name + '.scss')) {
			return;
		}

		Sass.render({
			file: rootPath + '/build/webcomponents/scss/' + name + '/' + name + '.scss',
		}, function (error, result) {
			if (error) {
				console.log(error.column);
				console.log(error.message);
				console.log(error.line);
			}
			else {
				// Auto prefixing
				const cleaner  = postcss([autoprefixer({add: false, browsers: options.settings.browsers})]);
				const prefixer = postcss([autoprefixer]);

				if (typeof result === 'object' && result.css) {
					cleaner.process(result.css.toString())

						.then(function (cleaned) {
							if (typeof cleaned === 'object' && cleaned.css) {
								return prefixer.process(cleaned.css)
							}
							return '';
						})

						.then((result) => {
							if (typeof result === 'object' && result.css) {
								fs.writeFileSync(rootPath + '/build/webcomponents/css/' + name + '.css', UglyCss.processString(result.css.toString()), {encoding: 'UTF-8'});
							}
						})

						// Handle errors
						.catch((err) => {
							console.error(Chalk.red(err));
							process.exit(-1);
						});

					console.log(Chalk.yellow('joomla-' + name + ' was updated.'));
				}
			}
		});
	});
};

compileCEscss = (options, path) => {
	Promise.resolve()
		.then(() => compileSass(options, path))

		// Handle errors
		.catch((err) => {
			console.error(Chalk.red(err));
			process.exit(-1);
		});
};

module.exports.compileCEscss = compileCEscss;
