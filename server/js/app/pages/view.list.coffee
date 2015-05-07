modules = [
  "backbone"
  "underscore"
]


define modules, (Backbone, _)->
  template = """
  <div class="page"><%= title %></div>
  """

  PagesList = Backbone.View.extend
    initialize: ()->

      # remove the header height to make header + list = 100%
      h = parseInt(@$el.css("height").replace("px", "")) - parseInt($("#pages h2").css("height").replace("px", ""))
      @$el.height(h)

      # add an automatic update on pages list change
      @listenTo(@collection, "add:list", @render)

    render: ()->
      @$el.empty()

      _(@collection.models).each (page)=>
        $div = $(_.template(template)(page.attributes))

        $div.on "click", ()=>
          @collection.trigger("open:page", page.attributes.title)

        @$el.append $div

  return PagesList
