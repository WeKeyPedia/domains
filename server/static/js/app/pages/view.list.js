var modules,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

modules = ["backbone", "underscore"];

define(modules, function(Backbone, _) {
  var PagesList, template;
  template = "<div class=\"page\"><%= title %></div>";
  PagesList = (function(superClass) {
    extend(PagesList, superClass);

    function PagesList() {
      return PagesList.__super__.constructor.apply(this, arguments);
    }

    PagesList.prototype.initialize = function() {
      var h;
      h = parseInt(this.$el.css("height").replace("px", "")) - parseInt($("#pages h2").css("height").replace("px", ""));
      this.$el.height(h);
      return this.listenTo(this.collection, "add:list", this.render);
    };

    PagesList.prototype.render = function() {
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
    };

    return PagesList;

  })(Backbone.View);
  return PagesList;
});
