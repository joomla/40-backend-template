/**
 * @package         Joomla.JavaScript
 * @copyright       Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license         GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * Creates a dynamically generated list
 *
 * @param selectParams string The parameters to insert into the <select> tag
 * @param source array  A javascript array of list options in the form [key,value,text]
 * @param key string The key to display for the initial state of the list
 * @param orig_val string The original item value that was selected
 * @param element string The elem where the list will be written
 **/
window.writeDynaList = function(selectParams, source, key, orig_val, element) {
	"use strict";

	var node, selectNode = document.createElement('select');
	selectNode.name = selectParams.name;
	selectNode.id = selectParams.id;
	selectNode.classList.add(selectParams.itemClass);

	if (element) {
		element.innerHTML = '';
		element.appendChild(selectNode);
	}

	var hasSelection = key,
		i = 0,
		selected, x, item;

	for ( x in source ) {
		if (!source.hasOwnProperty(x)) { continue; }

		item = source[ x ];

		node = document.createElement('option');
		node.value = item[1];
		node.innerHTML = item[ 2 ];

		if ( ( hasSelection && orig_val == item[ 1 ] ) || ( !hasSelection && i === 0 ) ) {
			node.setAttribute('selected', 'selected');
		}

		selectNode.appendChild(node);

		i++;
	}
};

/**
 * Ajax rebuild of the module order
 */
(function() {

	"use strict";

	document.addEventListener('DOMContentLoaded', function() {

		var field = document.querySelector('.module-ajax-ordering'),
			linkedField = field.getAttribute('data-linked-field') ? field.getAttribute('data-linked-field') : 'jform_position',
			linkedFieldEl = document.getElementById(linkedField),
			originalPos = (jQuery().chosen && field.classList.contains('advansedSelect')) ? jQuery(linkedFieldEl).chosen().val() : linkedFieldEl.value,

		getNewOrder = function(field, originalPos) {
			var url = field.getAttribute('data-url'),
				clientId = field.getAttribute('data-client-id'),
				element = document.getElementById(field.getAttribute('data-element')),
				originalOrder = field.getAttribute('data-ordering'),
				name = field.getAttribute('data-name'),
				attr = 'custom-select', //field.getAttribute('data-client-attr') ? field.getAttribute('data-client-attr') : 'custom-select',
				id = field.getAttribute('id') + '_1',
				orders = new Array();

				Joomla.request(
				{
					url: url,
					method: 'GET',
					data: {
						"client_id": clientId,
						"position" : originalPos
					},
					perform: true,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					onSuccess: function(response, xhr)
					{
						if (response)
						{
							response = JSON.parse(response);

							/** Check if everything is OK **/
							if (response.data.length > 0)
							{
								for (var i = 0; i < response.data.length; ++i) {
									orders[i] = response.data[i].split(',');
								}

								writeDynaList(
									{
										name: name,
										id: id,
										itemClass: attr
									},
									orders,
									originalPos,
									originalOrder,
									element
								);

								/** Add chosen to the element **/
								var el = document.getElementById(id);
								if (el && jQuery().chosen && field.classList.contains('advansedSelect')) {
									el.chosen('destroy');
									el.chosen();
								}
							}
						}

						/** Render messages, if any. There are only message in case of errors. **/
						if (typeof response.messages == 'object' && response.messages !== null)
						{
							Joomla.renderMessages(response.messages);
							window.scrollTo(0, 0);
						}
					}
				}
			);
		};

		/** Initialize the field on document ready **/
		getNewOrder(field, originalPos);

		/** Event listener for the linked field **/
		if (jQuery().chosen && field.classList.contains('advansedSelect')) { /** Chosen styled **/
			 linkedFieldEl.chosen().change( function() {
				originalPos = jQuery('#' + linkedField).chosen().val();
				getNewOrder(field, originalPos);
			});
		} else { /** Default select TAG **/
			linkedFieldEl.addEventListener('change', function () {
				originalPos = document.getElementById(linkedField).value;
				getNewOrder(field, originalPos);
			});
		}
	});
})();
