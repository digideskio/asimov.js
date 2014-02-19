/*

  children template helper class

  iterates over the children of the current
  or defined page, nested or shallow

*/

define([

  '../render/TemplateHelper',
  '../../node_modules/lodash'

], function (TemplateHelper, _) {

  var _super = TemplateHelper.prototype;

  return TemplateHelper.extend({

    'run': function (targetUrl) {

      var self = this;
      var options = self.opts(arguments);
      var children = [];
      var langCode = 'en';
      targetUrl = typeof targetUrl === 'string' && targetUrl || options.url || self.currentUrl;
      var html = '';

      _.each(self.map, function (page, url) {
        if (url.indexOf(targetUrl) === 0 && url !== targetUrl && url.indexOf('.css') < 0 && url.indexOf('.js') < 0 && url.indexOf('404') < 0) {
          children.push(url);
        }
      });

      _.each(children, function (url) {

        var child = self.map[url];

        if (!child || !child.position) {
          return;
        }

        var meta = child.meta;
        var data = meta && meta[langCode] && meta[langCode].meta || {};

        data.url = url;

        var urlPieces = self.currentUrl.split('/');
        var childPieces = url.split('/');

        data.isDirectChild = urlPieces.length === childPieces.length - 1;
        html += options.fn(data);
      });

      return html;
    }
  });
});