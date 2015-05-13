var modules,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

modules = ["backbone", "./view"];

define(modules, function(Backbone, v) {
  "use strict";
  var Page;
  Page = (function(superClass) {
    extend(Page, superClass);

    function Page() {
      return Page.__super__.constructor.apply(this, arguments);
    }

    Page.prototype.defaults = {
      title: null,
      content: null,
      domain: []
    };

    Page.prototype.initialize = function() {
      var page_view;
      page_view = new v({
        el: "#page",
        model: this
      });
      return this.on("change:domain", function() {
        return page_view.update();
      });
    };

    Page.prototype.load_content = function(title) {
      return $.get("/api/page/en/" + title, (function(_this) {
        return function(page) {
          return _this.set(page);
        };
      })(this));
    };

    return Page;

  })(Backbone.Model);
  return Page;
});
