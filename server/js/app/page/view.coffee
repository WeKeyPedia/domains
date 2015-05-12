modules = [
  "backbone"
  "underscore"
  "handlebars"
  "text!./view.hbs"
]

define modules, (Backbone, _, hbs, template)->
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
        content: new hbs.SafeString @model.get "content"

      @$el.html hbs.compile(template)(data)
      @update()

    update: ()->
      @parseContent()

  return PageFull
