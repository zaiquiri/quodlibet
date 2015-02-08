module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
        jUnit: {
          report: true,
          savePath : "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
        }
      },
      all: ['specs/']
    },
    watch: {
      test: {
        files: ['src/*.js', 'specs/*-spec.js'],
        tasks: ['jasmine_node']
      }
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jasmine_node']);

};
