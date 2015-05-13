var modules,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

modules = ["jquery", "backbone", "underscore", "handlebars", "jquery/scrollspy", "text!./view.hbs", "text!./info.hbs"];

define(modules, function($, Backbone, _, hbs, scrollspy, template, info) {
  "use strict";
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
      var data;
      data = {
        title: this.model.get("title"),
        content: new hbs.SafeString(this.model.get("content"))
      };
      this.$el.html(hbs.compile(template)(data));
      this.$info = $("#page-info");
      this.$info.html(hbs.compile(info)());
      console.log("render:", this.model.get("title"));
      this.beautify();
      this.update();
      return this;
    };

    PageFull.prototype.beautify = function() {
      this.notes();
      this.prettyMath();
      this.extractTOC();
      return this;
    };

    PageFull.prototype.update = function() {
      this.colorizeLinks();
      return this;
    };

    PageFull.prototype.colorizeLinks = function() {
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
            $e.attr("href", "#geometry/en/" + target);
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
            $e.attr("href", "http://en.wikipedia.com" + href);
            return $e.addClass("link-domain-out");
          }
        }
      });
      return this;
    };

    PageFull.prototype.extractTOC = function() {
      var $toc;
      $toc = this.$el.find("#toc");
      $toc.addClass("nav");
      $toc.find("a").each(function(i, e) {
        var $e, href;
        $e = $(e);
        href = $e.attr("href");
        $("" + href).on('scrollSpy:enter', function() {
          return $e.addClass("active");
        });
        $("" + href).on('scrollSpy:exit', function() {
          return $e.removeClass("active");
        });
        return $("" + href).scrollSpy();
      });
      $toc.appendTo("#page-info");
      return this;
    };

    PageFull.prototype.notes = function() {
      this.$el.find(".hatnote").each(function(i, e) {
        var $e;
        $e = $(e);
        return $e.addClass("alert alert-info");
      });
      return this;
    };

    PageFull.prototype.prettyMath = function() {
      this.$el.find(".tex").each((function(_this) {
        return function(i, e) {
          var $e, tex;
          $e = $(e);
          tex = $e.attr("alt");
          $e.before("$$" + tex + "$$");
          return $e.hide();
        };
      })(this));
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, "page"]);
      return this;
    };

    return PageFull;

  })(Backbone.View);
  return PageFull;
});
