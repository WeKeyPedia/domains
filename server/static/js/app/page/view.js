var modules, template;

modules = ["backbone", "underscore"];

template = "<div class=\"wikipedia page-view\">\n\n<h2><a href=\"http://en.wikipedia.org/wiki/<%= title %>\"><%= title %></a></h2>\n\n<div class=\"content\">\n  <%= content %>\n</div>\n\n</div>";

define(modules, function(Backbone, _) {
  var PageFull;
  PageFull = Backbone.View.extend({
    initialize: function() {
      return this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      return this.$el.html(_.template(template)(this.model.attributes));
    }
  });
  return PageFull;
});
