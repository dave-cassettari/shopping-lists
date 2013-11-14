module.exports = function (grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style        : 'compressed',
                    cacheLocation: 'css/.sass-cache'
                },
                files  : {
                    'css/style.css': 'css/style.scss'
                }
            }
        },

        ngtemplates: {
            app: {
                src    : [ 'app/**/*.htm' ],
                dest   : 'dist/templates.js',
                options: {
                    prefix : '/',
                    htmlmin: {
                        collapseBooleanAttributes    : true,
                        collapseWhitespace           : true,
                        removeAttributeQuotes        : true,
                        removeComments               : true,
                        removeEmptyAttributes        : true,
                        removeRedundantAttributes    : true,
                        removeScriptTypeAttributes   : true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },

        concat: {
            libs: {
                src : [
                    'js/vendor/angular.js',
                    'js/vendor/angular-resource.js',
                    'js/vendor/angular-ui-router.min.js',
                    'js/vendor/jquery-2.0.3.js',
                    'js/vendor/moment.js',
                ],
                dest: 'dist/vendor.js'
            },
            app : {
                src : 'app/**/*.js',
                dest: 'dist/app.js'
            }
        },

        uglify: {
            libs: {
                files: {
                    'js/app.min.js': ['dist/vendor.js', 'dist/templates.js', 'dist/app.js']
                }
            }
        },

        watch: {
            concat     : {
                files: ['app/**/*.js'],
                tasks: ['concat']
            },
            ngtemplates: {
                files: ['app/**/*.htm'],
                tasks: ['ngtemplates']
            },
            sass       : {
                files: ['css/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.registerTask('default', ['ngtemplates', 'concat', 'sass']);
    grunt.registerTask('build', ['default', 'uglify']);
};
