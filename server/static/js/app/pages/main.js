var modules;

modules = ["backbone", "./view.list"];

define(modules, function(Backbone, vl) {
  var Pages, pages, pages_list;
  Pages = Backbone.Collection.extend({
    retrieve: function() {
      return $.get("/api/domain/geometry/list", (function(_this) {
        return function(data) {
          var p;
          p = (function() {
            var i, len, ref, results;
            ref = data["pages"];
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              p = ref[i];
              results.push({
                "title": p
              });
            }
            return results;
          })();
          _this.add(p);
          return _this.trigger("add:list");
        };
      })(this));
    }
  });
  pages = new Pages();
  pages_list = new vl({
    el: "#pages .list",
    collection: pages
  });
  pages.retrieve();
  return pages;
});
