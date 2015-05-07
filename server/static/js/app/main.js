var modules,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

modules = ["backbone", "./pages/main", "./page/main"];

define(modules, function(Backbone, pages, page) {
  var App, app;
  App = (function(superClass) {
    extend(App, superClass);

    function App() {
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.routes = {
      "": "default",
      ":domain/:lang/:page_title": "to_page"
    };

    App.prototype["default"] = function() {
      pages.on("add:list", function() {});
      return page.load_content(pages.at(0).get("title"));
    };

    App.prototype.to_page = function(domain, lang, page_title) {
      console.log(page_title);
      return page.load_content(page_title);
    };

    return App;

  })(Backbone.Router);
  app = new App();
  pages.on("open:page", function(title) {
    app.navigate("geometry/en/" + title);
    return page.load_content(title);
  });
  return Backbone.history.start();
});
