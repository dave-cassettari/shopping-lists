module.exports = function (grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style        : 'compressed',
                    cacheLocation: 'css/.sass-cache',
                },
                files  : {
                    'css/style.css': 'css/style.scss'
                }
            }
        },

        emberTemplates: {
            compile: {
                options: {
                    templateBasePath: /js\/app\/templates\//
                },
                files  : {
                    'js/dist/templates.js': 'js/app/templates/**/*.hbs'
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
                    'js/vendor/ember-localadapter.js',
                    'js/vendor/moment.js',
//                    'js/vendor/createUsersInLocalStorage.js',
                ],
                dest: 'js/dist/vendor.js'
            },
            app : {
                src : 'js/app/**/*.js',
                dest: 'js/dist/app.js'
            }
        },

        uglify: {
            libs: {
                files: {
                    'js/app.min.js': ['js/dist/vendor.js', 'js/dist/templates.js', 'js/dist/app.js']
                }
            }
        },

        watch: {
            emberTemplates: {
                files: 'js/app/templates/**/*.hbs',
                tasks: ['emberTemplates']
            },
            concat        : {
                files: ['js/**/*.js', '!js/vendor/**/*.js', '!js/dist/*.js'],
                tasks: ['concat']
            },
            sass          : {
                files: ['css/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.registerTask('default', ['concat', 'emberTemplates']);
    grunt.registerTask('build', ['default', 'uglify']);
};
