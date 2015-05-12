modules = [
  "jquery"
  "backbone"
  "underscore"
  "handlebars"
  "jquery/scrollspy"
  "text!./view.hbs"
  "text!./info.hbs"
]

define modules, ($, Backbone, _, hbs, scrollspy, template, info)->
  class PageFull extends Backbone.View

    colorizeLinks: ()->
      domain = (x["title"] for x in @model.get "domain")

      @$el.find("a").each (i, e)->
        $e = $(e)
        href = $e.attr("href")

        if href.startsWith("/wiki/")
          target = href.replace("/wiki/", "")
          target = target.replace("_", " ")
          # target = "Circle"

          if target in domain
            $e.attr("href", "#geometry/en/#{target}")
            $e.addClass("link-domain-in")

            switch Math.floor Math.random() * 5
              when 0 then $e.addClass("link-difficulty-easy")
              when 1 then $e.addClass("link-difficulty-normal")
              when 2 then $e.addClass("link-difficulty-hard")
              when 3 then $e.addClass("link-difficulty-expert")
          else
            $e.attr("href", "http://en.wikipedia.com#{href}")
            $e.addClass("link-domain-out")

      return this

    extractTOC: ()->
      $toc = @$el.find "#toc"
      $toc.addClass("nav")

      $toc.find("a").each (i,e)->
        $e = $(e)
        href = $e.attr("href")

        $("#{href}").on 'scrollSpy:enter', ()->
          $e.addClass "active"

        $("#{href}").on 'scrollSpy:exit', ()->
          $e.removeClass "active"

        $("#{href}").scrollSpy()


      $toc.appendTo "#page-info"


      return this

    initialize: ()->
      @listenTo(@model, "change", @render)

    render: ()->
      data =
        title: @model.get "title"
        content: new hbs.SafeString @model.get "content"

      @$el.html hbs.compile(template)(data)

      @$info = $("#page-info")
      @$info.html hbs.compile(info)()

      console.log "render:", @model.get "title"

      @update()

      return this

    update: ()->
      @colorizeLinks()
      @extractTOC()

  return PageFull
