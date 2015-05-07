modules = [
  "backbone"
  "./pages/main"
  "./page/main"
]

define modules, (Backbone, pages, page)->
  pages.on "add:list", ()->
    page.load_content(pages.at(0).get("title"))

  pages.on "open:page", (title)->
    page.load_content(title)
