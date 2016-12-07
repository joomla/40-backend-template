/**
 * @copyright  Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

(function() {
	"use strict";
	if (typeof window.Joomla !== "undefined"){
		var options  = Joomla.getOptions('cdn-bootstrap');

		if (typeof jQuery.fn.popover !== "function") {
			document.write('<script src="' + options.path +'/media/vendor/bootstrap/js/bootstrap' + options.minified + '.js?' + options.version +'">\x3C/script>');
		}
	}

})();
