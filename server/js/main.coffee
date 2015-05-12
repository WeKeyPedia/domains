config=

  baseUrl: 'static/js'
  urlArgs: "bust=" + (new Date()).getTime()

  paths:
    text: "lib/text"
    jquery: "lib/jquery"
    backbone: "lib/backbone"
    underscore: "lib/underscore"
    handlebars: "lib/handlebars"
    bootstrap: "lib/bootstrap"

  shims:
    "backbone":
      deps: ['underscore', 'jquery']
      exports: 'Backbone'
    "underscore":
      exports: '_'
    "handlebars":
      exports: "Handlebars"
    'jquery/scrollspy':
      deps: ['jquery']
      # exports: '$.fn.scrollspy'

require.config(config)

require ["app/main"], (app)->
  # console.log app
  return true
