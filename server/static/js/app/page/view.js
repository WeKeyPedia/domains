var modules, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

modules = ["backbone", "underscore"];

template = "<div class=\"wikipedia page-view\">\n\n<h1><a href=\"http://en.wikipedia.org/wiki/<%= title %>\"><%= title %></a></h1>\n\n<div class=\"content\">\n  <%= content %>\n</div>\n\n</div>";

define(modules, function(Backbone, _) {
  var PageFull;
  PageFull = (function(superClass) {
    extend(PageFull, superClass);

    function PageFull() {
      return PageFull.__super__.constructor.apply(this, arguments);
    }

    PageFull.prototype.parseContent = function() {
      var domain, x;
      domain = (function() {
        var j, len, ref, results;
        ref = this.model.get("domain");
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          x = ref[j];
          results.push(x["title"]);
        }
        return results;
      }).call(this);
      this.$el.find("a").each(function(i, e) {
        var $e, href, target;
        $e = $(e);
        href = $e.attr("href");
        if (href.startsWith("/wiki/")) {
          target = href.replace("/wiki/", "");
          target = target.replace("_", " ");
          if (indexOf.call(domain, target) >= 0) {
            $e.addClass("link-domain-in");
            switch (Math.floor(Math.random() * 5)) {
              case 0:
                return $e.addClass("link-difficulty-easy");
              case 1:
                return $e.addClass("link-difficulty-normal");
              case 2:
                return $e.addClass("link-difficulty-hard");
              case 3:
                return $e.addClass("link-difficulty-expert");
            }
          } else {
            return $e.addClass("link-domain-out");
          }
        }
      });
      return true;
    };

    PageFull.prototype.initialize = function() {
      return this.listenTo(this.model, "change", this.render);
    };

    PageFull.prototype.render = function() {
      var data;
      data = {
        title: this.model.get("title"),
        content: this.model.get("content")
      };
      this.$el.html(_.template(template)(data));
      return this.update();
    };

    PageFull.prototype.update = function() {
      return this.parseContent();
    };

    return PageFull;

  })(Backbone.View);
  return PageFull;
});
