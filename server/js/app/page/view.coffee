modules = [
  "backbone"
  "underscore"
]

template = """
<div class="wikipedia page-view">

<h2><a href="http://en.wikipedia.org/wiki/<%= title %>"><%= title %></a></h2>

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
      @$el.html _.template(template)(@model.attributes)

      # @$el.find('*[style]').removeAttr('style')

  return PageFull
