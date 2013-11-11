module.exports = function (grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

//        sass: {
//            dist: {
//                options: {
//                    style: 'compressed'
//                },
//                files  : {
//                    'css/style.css': 'css/style.scss'
//                }
//            }
//        },

        emberTemplates: {
            compile: {
                options: {
                    templateBasePath: /js\/app\/templates\//
                },
                files  : {
                    'js/templates.js': 'js/app/templates/**/*.hbs'
                }
            }
        },

        concat: {
            libs: {
                src : [
                    'js/vendor/jquery-2.0.3.js',
                    'js/vendor/handlebars-1.0.0.js',
                    'js/vendor/ember-1.1.2.js',
                    'js/vendor/ember-data-1.0.0.js',
                    'js/vendor/moment.js',
//                    'js/vendor/localstorage_adapter.js',
//                    'js/vendor/createUsersInLocalStorage.js',
                ],
                dest: 'js/vendor.js'
            },
            app : {
                src : 'js/app/**/*.js',
                dest: 'js/app.js'
            }
        },

        uglify: {
            libs: {
                files: {
                    'js/app.min.js': ['js/vendor.js', 'js/app.js']
                }
            }
        },

        watch: {
            emberTemplates: {
                files: 'js/app/templates/**/*.hbs',
                tasks: ['emberTemplates']
            },
            concat        : {
                files: ['js/**/*.js', '!js/vendor/**/*.js', '!js/app.js', '!js/vendor.js', '!js/templates.js'],
                tasks: ['concat']
            }
//            sass          : {
//                files: ['css/*.scss'],
//                tasks: ['sass']
//            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.registerTask('default', ['concat', 'emberTemplates']);
    grunt.registerTask('build', ['default', 'uglify']);
};
