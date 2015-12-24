// Karma configuration
// Generated on Thu Dec 24 2015 11:29:00 GMT+0800 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['systemjs','jasmine'],


    // list of files / patterns to load in the browser
    files: [
//        'test/running-conf-karma.js',
      {pattern: 'app/**/*.js', included: false},
        {pattern: 'node_modules/lodash/**/*.js', included: false},
      'test/**/*.js',
      'test/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
	plugins:[
	  'karma-systemjs','karma-jasmine',
  'karma-chrome-launcher'
	],
	systemjs: {
        config: {
            paths: {
                'traceur': 'node_modules/traceur/bin/traceur.js',
                'systemjs': 'node_modules/systemjs/dist/system.js',
                'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
                'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js',
                'lodash': 'node_modules/lodash/index.js'
            }
        }
    }
    

  });
};
