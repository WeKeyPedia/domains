var config;

config = {
  baseUrl: 'static/js',
  urlArgs: "bust=" + (new Date()).getTime(),
  shims: {
    "backbone": {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    "underscore": {
      exports: '_'
    }
  }
};

require.config(config);

require(["app/main"], function(app) {
  return true;
});
