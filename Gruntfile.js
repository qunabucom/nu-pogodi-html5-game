'use strict';
 
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                files: {
                    'js/nu-pogodi/nu-pogodi.min.js': [
                        'js/nu-pogodi/*.js',
                        'js/nu-pogodi/model/*.js',
                        'js/nu-pogodi/states/*.js',
                        'js/nu-pogodi/utils/*.js'
                    ]
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['sass/{,**/}*.{scss,sass}'],
                tasks: ['compass:dev'],
                options: {
                    livereload: false
                }
            },
            images: {
                files: ['img/**']
            },
            css: {
                files: ['css/{,**/}*.css']
            },
            js: {
                files: ['js/{,**/}*.js', '!js/{,**/}*.min.js']/*,
                tasks: ['jshint', 'uglify:dev']*/
            }

        },
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};


