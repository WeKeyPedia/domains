modules = [
  "backbone"
  "./view"
]

define modules, (Backbone, v)->
  Page = Backbone.Model.extend

    defaults:
      title: null
      content: null

    load_content: (title)->
      $.get "/api/page/en/#{title}", (page)=>
         @set(page)

  page = new Page()

  # loading view
  page_view = new v
    el: "#page"
    model: page

  return page
