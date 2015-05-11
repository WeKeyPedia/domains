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
    parseContent: ()->
      domain = (x["title"] for x in @model.get "domain")

      @$el.find("a").each (i, e)->
        $e = $(e)
        href = $e.attr("href")

        if href.startsWith("/wiki/")
          target = href.replace("/wiki/", "")
          target = target.replace("_", " ")
          # target = "Circle"

          if target in domain
            $e.addClass("link-domain-in")

            switch Math.floor Math.random() * 5
              when 0 then $e.addClass("link-difficulty-easy")
              when 1 then $e.addClass("link-difficulty-normal")
              when 2 then $e.addClass("link-difficulty-hard")
              when 3 then $e.addClass("link-difficulty-expert")
          else
            $e.addClass("link-domain-out")

      return true

    initialize: ()->
      @listenTo(@model, "change", @render)

    render: ()->
      data =
        title: @model.get "title"
        content: @model.get "content"

      @$el.html _.template(template)(data)
      @update()

    update: ()->
      @parseContent()

  return PageFull
