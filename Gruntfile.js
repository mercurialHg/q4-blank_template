(function () {
  'use strict';

  module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: (
            '<% var subtask = uglify[grunt.task.current.target]; %>' +
            '/*!\n'+
            'Project:  <%= pkg.name %>\n' +
            'Name:     <%= subtask.name %>\n' +
            'Version:  <%= pkg.version %>\n' +
            'Compiled: <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n'
        ),

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'js/core/required/*.js',
                    'js/core/add-ons/*.js',
                ],
                dest: 'js/q4.core.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            core: {
                name: 'q4.core.js',
                files: [{
                    src: 'js/q4.core.js',
                    dest: 'dist/js/q4.core.<%= pkg.version %>.min.js'
                }]
            },
            app: {
                name: 'q4.app.js',
                files: [{
                    src: 'js/q4.app.js',
                    dest: 'dist/js/q4.app.<%= pkg.version %>.min.js'
                }]
            }
        },

        //qunit: {
        //  files: ['test/**/*.html']
        //},

        jshint: {
            files: ['Gruntfile.js', 'js/q4.app.js'],
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
                    'dist/css/client.css': 'css/client_master.scss',
                    'dist/css/news-details.css': 'css/news-details_master.scss'
                }
            }
        },

        sassdoc: {
            default: {
                src: 'css/*.scss',
                options: {
                    dest: 'docs/css',
                    display: {
                        access: ['public', 'private'],
                        alias: true,
                        watermark: true,
                    }
                },
            },
        },

        jsdoc : {
            dist : {
                src: ['js/q4.app.js'],
                options: {
                    destination: 'docs/js',
                    template: "node_modules/minami"
                    //configure : "node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
         }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sassdoc');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-jsdoc');

    //grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', [
      'jshint',
      //'qunit',
      'concat',
      'uglify',
      'sass',
      'sassdoc',
      'jsdoc'
    ]);

  };
}());