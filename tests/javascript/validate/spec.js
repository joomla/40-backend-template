/**
 * @package     Joomla.Tests
 * @subpackage  JavaScript Tests
 *
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 *
 * @since       3.6.3
 * @version     1.0.0
 */

define(['jquery', 'testsRoot/validate/spec-setup', 'jasmineJquery'], function ($) {
	var $element = $('#validatejs');

	describe('Validate', function () {
		beforeAll(function () {
			renderFn = Joomla.renderMessages;
			jtxtFn = Joomla.JText._;

			Joomla.renderMessages = jasmine.createSpy('renderMessages');
			Joomla.JText._ = jasmine.createSpy('JText._');
		});

		afterAll(function () {
			Joomla.renderMessages = renderFn;
			Joomla.JText._ = jtxtFn;
		});

		describe('The input fields in the form', function () {
			it('with class \'required\' should have attributes aria-required = true', function () {
				expect($element.find('#attach-to-form input')).toHaveAttr('aria-required', 'true');
			});

			it('with class \'required\' should have attributes required = required', function () {
				expect($element.find('#attach-to-form input')).toHaveAttr('required', 'required');
			});
		});

		describe('The textarea fields in the form', function () {
			it('with class \'required\' should have attributes aria-required = true', function () {
				expect($element.find('#attach-to-form textarea')).toHaveAttr('aria-required', 'true');
			});

			it('with class \'required\' should have attributes required = required', function () {
				expect($element.find('#attach-to-form textarea')).toHaveAttr('required', 'required');
			});
		});

		describe('The select fields in the form', function () {
			it('with class \'required\' should have attributes aria-required = true', function () {
				expect($element.find('#attach-to-form select')).toHaveAttr('aria-required', 'true');
			});

			it('with class \'required\' should have attributes required = required', function () {
				expect($element.find('#attach-to-form select')).toHaveAttr('required', 'required');
			});
		});

		describe('The fieldset fields in the form', function () {
			it('with class \'required\' should have attributes aria-required = true', function () {
				expect($element.find('#attach-to-form fieldset')).toHaveAttr('aria-required', 'true');
			});

			it('with class \'required\' should have attributes required = required', function () {
				expect($element.find('#attach-to-form fieldset')).toHaveAttr('required', 'required');
			});
		});

		describe('validate method on #validate-disabled', function () {
			var res = document.formvalidator.validate($element.find('#validate-disabled'));

			it('should return true', function () {
				expect(res).toEqual(true);
			});

			it('should remove class invalid from element', function () {
				expect($element.find('#validate-disabled')).not.toHaveClass('invalid');
			});

			it('should have aria-invalid = false in element', function () {
				expect($element.find('#validate-disabled')).toHaveAttr('aria-invalid', 'false');
			});

			it('should remove class invalid from the label for element', function () {
				expect($element.find('#validate-test label[for=validate-disabled]')).not.toHaveClass('invalid');
			});
		});

		describe('validate method on #validate-required-unchecked', function () {
			var res = document.formvalidator.validate($element.find('#validate-required-unchecked'));

			it('should return false', function () {
				expect(res).toEqual(false);
			});

			it('should add class invalid to element', function () {
				expect($element.find('#validate-required-unchecked')).toHaveClass('invalid');
			});

			it('should have aria-invalid = true in element', function () {
				expect($element.find('#validate-required-unchecked')).toHaveAttr('aria-invalid', 'true');
			});
		});

		describe('validate method on #validate-required-checked', function () {
			var res = document.formvalidator.validate($element.find('#validate-required-checked'));

			it('should return true', function () {
				expect(res).toEqual(true);
			});
		});

		describe('validate method on #validate-numeric-number', function () {
			var res = document.formvalidator.validate($element.find('#validate-numeric-number'));

			it('should return true', function () {
				expect(res).toEqual(true);
			});

			it('should remove class invalid from element', function () {
				expect($element.find('#validate-numeric-number')).not.toHaveClass('invalid');
			});

			it('should have aria-invalid = false in element', function () {
				expect($element.find('#validate-numeric-number')).toHaveAttr('aria-invalid', 'false');
			});

			it('should remove class invalid from the label for element', function () {
				expect($element.find('#validate-numeric-number-lbl')).not.toHaveClass('invalid');
			});
		});

		describe('validate method on #validate-numeric-nan', function () {
			var $label = $element.find('#validate-numeric-nan-label');
			$element.find('#validate-numeric-nan').data('label', $label);

			var res = document.formvalidator.validate($element.find('#validate-numeric-nan'));

			it('should return false', function () {
				expect(res).toEqual(false);
			});

			it('should add class invalid to element', function () {
				expect($element.find('#validate-numeric-nan')).toHaveClass('invalid');
			});

			it('should have aria-invalid = true in element', function () {
				expect($element.find('#validate-numeric-nan')).toHaveAttr('aria-invalid', 'true');
			});

			it('should add class invalid to the label for element', function () {
				expect($element.find('#validate-numeric-nan-label')).toHaveClass('invalid');
			});
		});

		describe('validate method on #validate-no-options', function () {
			var res = document.formvalidator.validate($element.find('#validate-no-options'));

			it('should return true', function () {
				expect(res).toEqual(true);
			});

			it('should remove class invalid from element', function () {
				expect($element.find('#validate-no-options')).not.toHaveClass('invalid');
			});

			it('should have aria-invalid = false in element', function () {
				expect($element.find('#validate-no-options')).toHaveAttr('aria-invalid', 'false');
			});
		});

		describe('isValid method on button click', function () {
			beforeAll(function () {
				$('#button').trigger( "click" );
			});

			it('should call Joomla.JText._(\'JLIB_FORM_FIELD_INVALID\')', function () {
				expect(Joomla.JText._).toHaveBeenCalledWith('JLIB_FORM_FIELD_INVALID');
			});

			it('should call Joomla.renderMessages({error: ["undefined"]})', function () {
				expect(Joomla.renderMessages).toHaveBeenCalledWith({error: ["undefined"]});
			});

			it('should add class invalid to element #isvalid-numeric-nan', function () {
				expect($element.find('#isvalid-numeric-nan')).toHaveClass('invalid');
			});

			it('should have aria-invalid = true in element #isvalid-numeric-nan', function () {
				expect($element.find('#isvalid-numeric-nan')).toHaveAttr('aria-invalid', 'true');
			});

			it('should not add class invalid to element #isvalid-novalidate', function () {
				expect($element.find('#isvalid-novalidate')).not.toHaveClass('invalid');
			});

			it('should remove class invalid from element #isvalid-numeric-nan after correcting value', function () {
				$('#isvalid-numeric-nan').val('12345');
				$('#button').trigger( "click" );

				expect($element.find('#isvalid-numeric-nan')).not.toHaveClass('invalid');
			});
		});
	});
});
