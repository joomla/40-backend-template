/**
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * JavaScript behavior to allow shift select in administrator grids
 */

(function() {
    "use strict";
    Joomla = window.Joomla || {};
    var boxes;
    Joomla.JMultiSelect = function(table) {
        var last,

            initialize = function(table) {
                boxes = table.querySelectorAll('input[type=checkbox]');
                var i = 0, countB = boxes.length;
                for (i; boxes<countB; i++) {
                    boxes[i].addEventListener('click', function (e) {
                        doselect(e)
                    });
                }
            },

            doselect = function(e) {
                var current = e.target, isChecked, lastIndex, currentIndex, swap;
                if (e.shiftKey && last.length) {
                    isChecked = current.hasAttribute(':checked');
                    lastIndex = boxes.index(last);
                    currentIndex = boxes.index(current);
                    if (currentIndex < lastIndex) {
                        // handle selection from bottom up
                        swap = lastIndex;
                        lastIndex = currentIndex;
                        currentIndex = swap;
                    }
                    boxes.slice(lastIndex, currentIndex + 1).setAttribute('checked', isChecked);
                }

                last = current;
            };
        initialize(table);
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    var options = Joomla.getOptions("multiselect", {id: '#adminForm'});
    var element = document.querySelector(options.id);
    if (element) {
        Joomla.JMultiSelect(element);
    }
});