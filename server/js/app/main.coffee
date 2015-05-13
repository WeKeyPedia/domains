modules = [
  "backbone"
  "./pages/main"
  "./page/main"
]

define modules, (Backbone, Pages, Page)->
  "use strict"

  class App extends Backbone.Router
    routes:
      "": "default"
      ":domain/:lang/:page_title": "to_page"

    default: ()->
      pages.on "add:list", ()->
        page.load_content(pages.at(0).get("title"))

      pages.retrieve()

    to_page: (domain, lang, page_title)->
      page.load_content(page_title)
      pages.retrieve()

  app = new App()
  page = new Page()
  pages = new Pages()

  pages.on "loaded", (pagesList)->
    page.set("domain", pagesList)

  pages.on "open:page", (title)->
    app.navigate("geometry/en/#{title}")
    page.load_content(title)

  # pages.retrieve()
  Backbone.history.start()
