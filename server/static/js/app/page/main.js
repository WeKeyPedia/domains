var modules;

modules = ["backbone", "./view"];

define(modules, function(Backbone, v) {
  var Page, page, page_view;
  Page = Backbone.Model.extend({
    defaults: {
      title: null,
      content: null
    },
    load_content: function(title) {
      return $.get("/api/page/en/" + title, (function(_this) {
        return function(page) {
          return _this.set(page);
        };
      })(this));
    }
  });
  page = new Page();
  page_view = new v({
    el: "#page",
    model: page
  });
  return page;
});
