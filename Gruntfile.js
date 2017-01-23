(function () {
  'use strict';

  module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: (
            '/*!\n'+
            'Name:     q4.core.js\n' +
            'Version:  <%= pkg.version %>\n' +
            'Compiled: <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n'
        ),

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: 'js/*.js',
                dest: 'dist/js/q4.core.<%= pkg.version %>.min.js'
            },
        },

        //qunit: {
        //  files: ['test/**/*.html']
        //},

        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        // watch: {
        //     files: ['<%= jshint.files %>'],
        //     tasks: ['jshint', 'qunit']
        // },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/css/global.css': 'css/global_master.scss',
                    'dist/css/client.css': 'css/client_master.scss'
                }
            }
        },

        sassdoc: {
            default: {
                src: 'css/*.scss',
                options: {
                    dest: 'docs',
                    display: {
                        access: ['public', 'private'],
                        alias: true,
                        watermark: true,
                    }
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sassdoc');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', [
      'jshint',
      //'qunit',
      //'concat',
      'uglify',
      'sass',
      'sassdoc'
    ]);

  };
}());