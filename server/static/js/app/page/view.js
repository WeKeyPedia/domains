var modules, template;

modules = ["backbone", "underscore"];

template = "<div class=\"wikipedia page-view\">\n\n<h2><%= title %></h2>\n\n<div class=\"content\">\n  <%= content %>\n</div>\n\n</div>";

define(modules, function(Backbone, _) {
  var PageFull;
  PageFull = Backbone.View.extend({
    initialize: function() {
      return this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      var content;
      content = this.model.get("content");
      return this.$el.html(_.template(template)(this.model.attributes));
    }
  });
  return PageFull;
});
