var modules, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

modules = ["backbone", "underscore"];

template = "<div class=\"wikipedia page-view\">\n\n<h1><a href=\"http://en.wikipedia.org/wiki/<%= title %>\"><%= title %></a></h1>\n\n<div class=\"content\">\n  <%= content %>\n</div>\n\n</div>";

define(modules, function(Backbone, _) {
  var PageFull;
  PageFull = (function(superClass) {
    extend(PageFull, superClass);

    function PageFull() {
      return PageFull.__super__.constructor.apply(this, arguments);
    }

    PageFull.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
    };

    PageFull.prototype.render = function() {
      return this.$el.html(_.template(template)(this.model.attributes));
    };

    return PageFull;

  })(Backbone.View);
  return PageFull;
});
