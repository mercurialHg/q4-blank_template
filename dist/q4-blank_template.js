/*
 * q4-blank_template
 * https://github.com/q4mobile/q4-blank_template
 *
 * Copyright (c) 2017 Sustoid
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.q4_blank_template = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.q4_blank_template = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.q4_blank_template.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.q4_blank_template.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].q4_blank_template = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
