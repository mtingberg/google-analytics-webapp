/*jslint node: true */
module.exports = function (grunt) {
    'use strict';

    // Load tasks from package.json matching "grunt-*"
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            'src': 'src',
            'dest': 'dist',
            'dest_app_dir': '<%= config.dest %>/app',

            'src_common_css_dir': '<%= config.src %>/styles',
            'dest_common_css_dir': '<%= config.dest_app_dir %>/styles',

            'src_app_scripts_dir': '<%= config.src %>/scripts',
            'dest_app_scripts_dir': '<%= config.dest_app_dir %>/scripts'
        },

        // ----------------------------
        // building
        // ----------------------------

        browserify: {
            build: {
                files: {
                    '<%= config.dest_app_scripts_dir %>/bundle.js': ['<%= config.src_app_scripts_dir %>/main.js']
                },
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },

        // our copy options
        copy: {
            build: {
                files: [
                    {
                        expand: 'true',
                        cwd: '<%= config.src %>',
                        src: [
                            './**/*',
                            '!./**/*.js',
                            '!./**/*.less',
                            '!./**/*.css',
                            '!./**/vendor'
                        ],
                        dest: '<%= config.dest_app_dir %>'
                    }
                ]
            }
        },

        less: {
            build: {
                options: {
                    strictMath: true,
                    paths: ['<%= config.src %>/assets']
                },
                files: {
                    '<%= config.dest_common_css_dir %>/main.css': '<%= config.src_common_css_dir %>/main.less'
                }
            }
        },

        uglify: {
            build:{
                src: '<%= config.dest_app_scripts_dir %>/bundle.js',
                dest: '<%= config.dest_app_scripts_dir %>/bundle.js'
            }
        },

        // ----------------------------
        // tidying up
        // ----------------------------

        clean: {
            build: [
                '<%= config.dest %>'
            ]
        },

        // ----------------------------
        // hinting and linting
        // ----------------------------

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', '<%= config.src %>/**/*.js']
        },

        // ----------------------------
        // background build tasks
        // ----------------------------

        watch: {
            options: {
                livereload: true
            },
            build: {
                files: [
                    '<%= config.src %>/**/*',
                    '!<%= config.src %>/**/*.css',
                    '<%= config.src_common_css_dir %>/vendor/**/*.css'
                ],
                tasks: ['build']
            }
        },

        connect: {
            server: {
                options: {
                    port: 8888,
                    livereload: true,
                    base: [
                        '<%= config.dest_app_dir %>'
                    ]
                }
            }
        }
    });

    grunt.registerTask('build', 'All build steps', [
        'clean:build',
        'jshint',
        'less:build',
        'copy:build',
        'browserify:build',
    ]);

    grunt.registerTask('build-production', 'Build and uglify.', [
        'build',
        'uglify:build'
    ]);

    grunt.registerTask('server', 'Minimum number of build steps, live reload and watch', [
        'build',
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('default', 'Default task', ['jshint']);
};
