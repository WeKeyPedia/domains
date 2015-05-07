var modules;

modules = ["backbone", "./pages/main", "./page/main"];

define(modules, function(Backbone, pages, page) {
  pages.on("add:list", function() {
    return page.load_content(pages.at(0).get("title"));
  });
  return pages.on("open:page", function(title) {
    return page.load_content(title);
  });
});
