// Karma configuration
// Generated on Tue Nov 22 2016 12:43:20 GMT+0530 (IST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        {pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: true},
        {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true},
        {pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: true},
        {pattern: 'node_modules/angular2/bundles/angular2.dev.js', included: true, watched: true},
        {pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: true},
        {pattern: 'karma-test-shim.js', included: true, watched: true},
        'app/login/login.spec.ts'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/login/login.spec.js':  ['coverage']
    },
      coverageReporter: {
          reporters:[
              {type: 'json', subdir: './FE_unitTest_Coverage', file: 'coverage-final.json'}
          ]
      },
    // Karma plugins loaded
    plugins: [
        'karma-jasmine',
        'karma-coverage',
        'karma-chrome-launcher'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','dots', 'coverage'],


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

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
