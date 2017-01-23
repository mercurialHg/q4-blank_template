'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('q4-blank_template.jquery.json'),
    banner: (
      '/*!\n'+
      'Name:     q4.core.js\n' +
      'Version:  <%= pkg.version %>\n' +
      'Compiled: <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n'
    ),
    // Task configuration.
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'js/*.js',
        dest: 'dist/q4.core.<%= pkg.version %>.min.js'
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['uglify']);

};
