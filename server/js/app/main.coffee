modules = [
  "backbone"
  "./pages/main"
  "./page/main"
]

define modules, (Backbone, pages, Page)->
  class App extends Backbone.Router
    routes:
      "": "default"
      ":domain/:lang/:page_title": "to_page"

    default: ()->
      pages.on "add:list", ()->
      page.load_content(pages.at(0).get("title"))

    to_page: (domain, lang, page_title)->
      page.load_content(page_title)

  app = new App()

  page = new Page()

  pages.on "loaded", (pagesList)->
    page.set("domain", pagesList)

  pages.on "open:page", (title)->
    app.navigate("geometry/en/#{title}")
    page.load_content(title)

  Backbone.history.start()
