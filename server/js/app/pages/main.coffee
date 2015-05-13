modules = [
  "backbone"
  "./view.list"
]

define modules, (Backbone, vl)->
  "use strict"

  class Pages extends Backbone.Collection
    initialize: ()->
      pages_list = new vl
        el: "#pages .list"
        collection: this

    retrieve: ()->
      $.get "/api/domain/geometry/list", (data)=>
        p = ({ "title": p } for p in data["pages"])

        @add(p)

        # tell everyone the list is added
        @trigger("add:list")
        @trigger("loaded", p)

  return Pages
