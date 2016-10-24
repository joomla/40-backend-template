/**
 * @copyright  Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
document.addEventListener('DOMContentLoaded', function() {
	var i ,l, $ = jQuery, treeselectmenu = document.getElementById('treeselectmenu').innerHTML;

	var items = document.querySelector('.treeselect li');
	for (i = 0, l = items.length; l>i; i++) {
		li = items[i];
		div = li.querySelector('div.treeselect-item:first');

		// Add icons
		var node = document.createElement('span').classList.add('float-xs-left').add('icon-');
		li.insertBefore(node, li.firstChild);

		// Append clearfix
		node = document.creteElement('div').classList.add('clearfix');
		div.appendChild(node);

		if (li.querySelector('ul.treeselect-sub').length) {
			// Add classes to Expand/Collapse icons
			li.querySelector('span.icon-').classList.add('treeselect-toggle').add('icon-minus');

			// Append drop down menu in nodes
			treeselectmenu.appendChild(div.querySelector('label:first'));
			if (!li.querySelector('ul.treeselect-sub ul.treeselect-sub').length) {
				li.removeChild(li.querySelector('div.treeselect-menu-expand'));
			}
		}
	}


	// Takes care of the Expand/Collapse of a node
	$('span.treeselect-toggle').click(function()
	{
		$i = $(this);

		// Take care of parent UL
		if ($i.parent().querySelector('ul.treeselect-sub').is(':visible')) {
			$i.removeClass('icon-minus').addClass('icon-plus');
			$i.parent().querySelector('ul.treeselect-sub').hide();
			$i.parent().querySelector('ul.treeselect-sub i.treeselect-toggle').removeClass('icon-minus').addClass('icon-plus');
		} else {
			$i.removeClass('icon-plus').addClass('icon-minus');
			$i.parent().querySelector('ul.treeselect-sub').show();
			$i.parent().querySelector('ul.treeselect-sub i.treeselect-toggle').removeClass('icon-plus').addClass('icon-minus');
		}
	});

	// Takes care of the filtering
	document.getElementById('treeselectfilter').addEventListener('keyup', function() {
		var text = this.value.toLowerCase();
		var hidden = 0;
		$("#noresultsfound").hide();
		var $list_elements = $('.treeselect li');
		$list_elements.each(function()
		{
			if ($(this).text().toLowerCase().indexOf(text) == -1) {
				$(this).hide();
				hidden++;
			}
			else {
				$(this).show();
			}
		});
		if(hidden == $list_elements.length)
		{
			$("#noresultsfound").show();
		}
	});

	// Checks all checkboxes the tree
	document.getElementById('treeCheckAll').addEventListener('click', function()
	{
		document.querySelector('.treeselect input').setAttribute('checked', 'checked');
	});

	// Unchecks all checkboxes the tree
	document.getElementById('treeUncheckAll').addEventListener('click', function()
	{
		document.querySelector('.treeselect input').removeAttribute('checked');
	});

	// Checks all checkboxes the tree
	document.getElementById('treeExpandAll').addEventListener('click', function()
	{
		$('ul.treeselect ul.treeselect-sub').show();
		document.querySelector('ul.treeselect i.treeselect-toggle').classList.remove('icon-plus').add('icon-minus');
	});

	// Unchecks all checkboxes the tree
	document.getElementById('treeCollapseAll').addEventListener('click', function()
	{
		$('ul.treeselect ul.treeselect-sub').hide();
		document.querySelector('ul.treeselect i.treeselect-toggle').classList.remove('icon-minus').add('icon-plus');
	});
	// Take care of children check/uncheck all
	document.querySelector('a.checkall').addEventListener('click', function()
	{
		$(this).parents().eq(5).find('ul.treeselect-sub input').attr('checked', 'checked');
	});
	document.querySelector('a.uncheckall').click(function()
	{
		$(this).parents().eq(5).find('ul.treeselect-sub input').attr('checked', false);
	});

	// Take care of children toggle all
	document.querySelector('a.expandall').addEventListener('click', function()
	{
		var $parent = $(this).parents().eq(6);
		$parent.querySelector('ul.treeselect-sub').show();
		$parent.querySelector('ul.treeselect-sub i.treeselect-toggle').removeClass('icon-plus').addClass('icon-minus');
	});
	document.querySelector('a.collapseall').addEventListener('click', function()
	{
		var $parent = $(this).parents().eq(6);
		$parent.querySelector('li ul.treeselect-sub').hide();
		$parent.querySelector('li i.treeselect-toggle').removeClass('icon-minus').addClass('icon-plus');
	});
});

function menuHide(val)
{
	if (val == 0 || val == '-')
	{
		$('#menuselect-group').hide();
	}
	else
	{
		$('#menuselect-group').show();
	}
}

jQuery(document).ready(function()
{
	menuHide(document.getElementById('jform_assignment').value);
	jQuery('#jform_assignment').change(function()
	{
		menuHide(jQuery(this).val());
	})
});
