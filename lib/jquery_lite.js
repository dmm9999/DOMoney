var DOMNodeCollection = require("./dom_node_collection");

var domReady = function(callback) {
    (document.readyState === "interactive" ||
    document.readyState === "complete") ?
    callback() : document.addEventListener("DOMContentLoaded", callback);
};

window.$l = function (arg) {

  if (typeof arg === "string") {
    var nodelist = document.querySelectorAll(arg);
    return new DOMNodeCollection([].slice.call(nodelist));
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (arg instanceof Function ) {
    domReady(arg);
  }
};

window.$l.extend = function () {
  var args = [].slice.call(arguments);
  var merged = {};
  args.forEach(function(object) {
    Object.keys(object).forEach(function (key) {
      merged.key = object.key;
    });
  });
  
  return merged;
};
