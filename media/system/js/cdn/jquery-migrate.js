/**
 * @copyright  Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

(function() {
	"use strict";
	if (typeof window.Joomla !== "undefined"){
		var options  = Joomla.getOptions('cdn-jquery-migrate');

		if (typeof jQuery.migrateVersion !== "string") {
			document.write('<script src="' + options.path +'/media/vendor/jquery/js/jquery-migrate' + options.minified + '.js">\x3C/script>');
		}
	}

})();
