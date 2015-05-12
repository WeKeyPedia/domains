config=

  baseUrl: 'static/js'
  urlArgs: "bust=" + (new Date()).getTime()

  paths:
    jquery: "lib/jquery"
    text: "lib/text"
    backbone: "lib/backbone"
    underscore: "lib/underscore"
    handlebars: "lib/handlebars"

  shims:
    "backbone":
      deps: ['underscore', 'jquery']
      exports: 'Backbone'
    "underscore":
      exports: '_'
    "handlebars":
      exports: "Handlebars"

require.config(config)

require ["app/main"], (app)->
  # console.log app
  return true
