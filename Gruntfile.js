module.exports = function(grunt){

  grunt.initConfig({
    connect: {
      app: {
        options: {
          port: 9595,
          hostname: '*',
          livereload: true
        }
      }
    },
    watch: {
      app: {
        files: ['app.js', 'index.html'],
        options: {
          livereload: true
        }
      }
    }
  });

  // app
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['connect', 'watch']);

};
