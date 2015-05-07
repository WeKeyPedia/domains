config=
  baseUrl: 'static/js'
  urlArgs: "bust=" + (new Date()).getTime()
  # paths:
  #   app: "app/main"
  shims:
    "backbone":
      deps: ['underscore', 'jquery']
      exports: 'Backbone'
    "underscore":
      exports: '_'

require.config(config)

require ["app/main"], (app)->
  # console.log app
  return true
