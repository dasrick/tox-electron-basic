module.exports = function (grunt) {
  'use strict';
  grunt.util.linefeed = '\n';
  // load all grunt tasks
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  // setup all grunt tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: 'app/css'
    },
    watch: {
      less: {
        files: ['src/less/*.less'],
        tasks: 'buildcss'
      }
    },
    less: {
      options: {
        paths: ['src/less'],
        compress: false
      },
      files: {
        expand: true,
        flatten: false,
        cwd: 'src/less/',
        src: ['**/*.less', '!**/_*.less'],
        dest: 'app/css/',
        ext: '.css'
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      app: {
        src: ['app/css/*.css', '!app/css/*.min.css']
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'app/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'app/css/',
        ext: '.min.css'
      }
    },
    copy: {
      'bootstrap-font': {
        expand: true,
        cwd: 'node_modules/tox-bootstrap-electron/dist/fonts/',
        src: '*',
        dest: 'app/fonts/',
        flatten: false,
        filter: 'isFile'
      }
    }
  });
  // register and combine all grunt tasks
  grunt.registerTask('default', ['clean', 'copy', 'buildcss']);
  grunt.registerTask('buildcss', ['less', 'autoprefixer', 'cssmin']);
};