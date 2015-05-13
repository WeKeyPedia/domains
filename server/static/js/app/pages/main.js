var modules,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

modules = ["backbone", "./view.list"];

define(modules, function(Backbone, vl) {
  "use strict";
  var Pages;
  Pages = (function(superClass) {
    extend(Pages, superClass);

    function Pages() {
      return Pages.__super__.constructor.apply(this, arguments);
    }

    Pages.prototype.initialize = function() {
      var pages_list;
      return pages_list = new vl({
        el: "#pages .list",
        collection: this
      });
    };

    Pages.prototype.retrieve = function() {
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
          _this.trigger("add:list");
          return _this.trigger("loaded", p);
        };
      })(this));
    };

    return Pages;

  })(Backbone.Collection);
  return Pages;
});
