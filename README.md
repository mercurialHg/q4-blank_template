# Q4 Blank Template

Project Blank

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/q4mobile/q4-blank_template/master/dist/q4-blank_template.min.js
[max]: https://raw.github.com/q4mobile/q4-blank_template/master/dist/q4-blank_template.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/q4-blank_template.min.js"></script>
<script>
jQuery(function($) {
  $.awesome(); // "awesome"
});
</script>
```

## Installing
Please don't edit files in the `dist` subdirectory as they are generated via Grunt. You'll find source code in the `src` subdirectory!

## Modifying the code
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

Test that Grunt's CLI is installed by running `grunt --version`.  If the command isn't found, run `npm install -g grunt-cli`.  For more information about installing Grunt, see the [getting started guide](http://gruntjs.com/getting-started).

1. Fork and clone the repo.
1. Run `npm install` to install all dependencies (including Grunt).
1. Run `grunt` to grunt this project.

Assuming that you don't see any red, you're ready to go. Just be sure to run `grunt` after making any changes, to ensure that nothing is broken.

## Documentation
Update version in q4-blank_template.jquery.json