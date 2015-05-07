var modules;

modules = ["backbone", "underscore"];

define(modules, function(Backbone, _) {
  var PagesList, template;
  template = "<div class=\"page\"><%= title %></div>";
  PagesList = Backbone.View.extend({
    initialize: function() {
      var h;
      h = parseInt(this.$el.css("height").replace("px", "")) - parseInt($("#pages h2").css("height").replace("px", ""));
      this.$el.height(h);
      return this.listenTo(this.collection, "add:list", this.render);
    },
    render: function() {
      this.$el.empty();
      return _(this.collection.models).each((function(_this) {
        return function(page) {
          var $div;
          $div = $(_.template(template)(page.attributes));
          $div.on("click", function() {
            return _this.collection.trigger("open:page", page.attributes.title);
          });
          return _this.$el.append($div);
        };
      })(this));
    }
  });
  return PagesList;
});
