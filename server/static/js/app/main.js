var modules;

modules = ["backbone", "./pages/main", "./page/main"];

define(modules, function(Backbone, pages, page) {
  var App, app;
  App = Backbone.Router.extend({
    routes: {
      "": "default",
      ":domain/:lang/:page_title": "to_page"
    },
    "default": function() {
      pages.on("add:list", function() {});
      return page.load_content(pages.at(0).get("title"));
    },
    to_page: function(domain, lang, page_title) {
      console.log(page_title);
      return page.load_content(page_title);
    }
  });
  app = new App();
  pages.on("open:page", function(title) {
    app.navigate("geometry/en/" + title);
    return page.load_content(title);
  });
  return Backbone.history.start();
});
