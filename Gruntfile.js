var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      dist: {
        options: {
            banner: '(function() {\n\n"use strict";\n\n',
            footer: '\n}());'
        },
        files: {
          'public/js/app.pre.js': [
            'public/js/app.js',
            'public/js/controllers/*.js',
            'public/js/services/*.js'
          ]
        }
      }
    },

    uglify: {
      dist: {
        src: 'public/js/app.pre.js',
        dest: 'public/js/app.min.js'
      }
    }
  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Register task(s).
  grunt.registerTask('default', ['concat', 'uglify']);

};