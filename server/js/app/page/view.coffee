modules = [
  "backbone"
  "underscore"
]

template = """
<div class="wikipedia page-view">

<h1><a href="http://en.wikipedia.org/wiki/<%= title %>"><%= title %></a></h1>

<div class="content">
  <%= content %>
</div>

</div>
"""

define modules, (Backbone, _)->
  class PageFull extends Backbone.View

    initialize: ()->
      @listenTo(@model, "change", @render)

    render: ()->
      @$el.html _.template(template)(@model.attributes)

      # @$el.find('*[style]').removeAttr('style')

  return PageFull
