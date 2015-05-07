modules = [
  "backbone"
  "./pages/main"
  "./page/main"
]

define modules, (Backbone, pages, page)->
  class App extends Backbone.Router
    routes:
      "": "default"
      ":domain/:lang/:page_title": "to_page"

    default: ()->
      pages.on "add:list", ()->
      page.load_content(pages.at(0).get("title"))

    to_page: (domain, lang, page_title)->
      console.log page_title
      page.load_content(page_title)

  app = new App()

  pages.on "open:page", (title)->
    app.navigate("geometry/en/#{title}")
    page.load_content(title)

  Backbone.history.start()
