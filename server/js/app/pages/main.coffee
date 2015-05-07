modules = [
  "backbone"
  "./view.list"
]

define modules, (Backbone, vl)->
  class Pages extends Backbone.Collection

    retrieve: ()->
      $.get "/api/domain/geometry/list", (data)=>
        p = ({ "title": p } for p in data["pages"])

        @add(p)

        # tell everyone the list is added
        @trigger("add:list")

  pages = new Pages()

  pages_list = new vl({ el: "#pages .list", collection: pages })

  pages.retrieve()

  return pages
