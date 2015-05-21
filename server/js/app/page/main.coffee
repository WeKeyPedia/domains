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

         @get_clickstream()

    get_clickstream: ()->
      title = @get("title")

      $.get "http://127.0.0.1:5100/#{title}/in-geometry/clickstream", (r)=>
        console.log r
        console.log r["data"]
        @set("clickstream", r["data"])

  return Page
