var config;

config = {
  baseUrl: 'static/js',
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
    text: "lib/text",
    jquery: "lib/jquery",
    backbone: "lib/backbone",
    underscore: "lib/underscore",
    handlebars: "lib/handlebars",
    bootstrap: "lib/bootstrap"
  },
  shims: {
    "backbone": {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    "underscore": {
      exports: '_'
    },
    "handlebars": {
      exports: "Handlebars"
    },
    'jquery/scrollspy': {
      deps: ['jquery']
    }
  }
};

require.config(config);

require(["app/main"], function(app) {
  "use strict";
  return true;
});
