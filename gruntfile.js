module.exports = function(grunt) {
        grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodemon: {
          dev: {
                script: 'app.js'
            }
        },

        clean: {
          build: {
             src: ['JSHintReport/**','mochawesome-reports/**','reports/**','Minified/**']
            }
      },

    jshint: {
      files: ['app.js','html/*.js','models/*.js','routes/*.js','tests/*.js',
                    'package.json','Gruntfile.js'],
      options : {
      "curly": true,
      "eqeqeq": true,
      "immed": false,
      "newcap": false,
      "sub": false,
      "eqnull": true,
      "node": true,
      "es5": false,
      reporter: require('jshint-html-reporter'),
            reporterOutput: 'JSHintReport/jshint-report.html'
    }
  },

   uglify: {
    my_target: {
      files: {
        'Minified/minifiedCode.js': ['html/*.js','models/*.js','app.js','routes/*.js']
      }
    }
  },

   mochaTest: {
    reportAll: {
        options: {
                reporter: 'mochawesome'
              },
        src: ['tests/mochatest.js']
        }
    },

   mocha_istanbul: {
               coverage: {
                   src: 'tests', // a folder works nicely
                   options: {
                      // mask: '*.spec.js'
                   }
               },
               
               coveralls: {
                   src: ['tests'], // multiple folders also works
                   options: {
                       coverage:true, // this will make the grunt.event.on('coverage') event listener to be triggered
                       check: {
                           lines: 75,
                           statements: 75
                       },
                       root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
                       reportFormats: ['cobertura','lcovonly']
                   }
               }
           },
  
        watch: {
            server: {
    /*No need to include HTML files in watch task*/
                files: ['html/*.js','models/*.js','app.js','routes/*.js'],
                tasks: [/*'jshint',*/ 'nodemon']
            }
        }
    });

        grunt.loadNpmTasks('grunt-nodemon');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-mocha-test');
        grunt.loadNpmTasks('mochawesome');
        grunt.loadNpmTasks('grunt-mocha-istanbul');
        grunt.loadNpmTasks('grunt-contrib-clean');


            grunt.registerTask('analyse', ['clean','jshint','uglify','mochaTest','mocha_istanbul:coverage']);
            grunt.registerTask('default', ['nodemon','watch']);
};
