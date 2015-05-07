modules = [
  "backbone"
  "underscore"
]

template = """
<div class="wikipedia page-view">

<h2><%= title %></h2>

<div class="content">
  <%= content %>
</div>

</div>
"""

define modules, (Backbone, _)->
  PageFull = Backbone.View.extend

    initialize: ()->
      @listenTo(@model, "change", @render)

    render: ()->
      content = @model.get("content")
      # console.log content
      @$el.html _.template(template)(@model.attributes)

  return PageFull
