modules = [
  "backbone"
  "./view"
]

define modules, (Backbone, v)->
  "use strict"

  class Page extends Backbone.Model

    defaults:
      title: null
      content: null
      domain: []

    initialize: ()->
      page_view = new v
        el: "#page"
        model: this

      @on "change:domain", ()->
        page_view.update()

    load_content: (title)->
      $.get "/api/page/en/#{title}", (page)=>
         @set(page)

  return Page
