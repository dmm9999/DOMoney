var DOMNodeCollection = require("./dom_node_collection");

var domReady = function(callback) {
    (document.readyState === "interactive" ||
    document.readyState === "complete") ?
    callback() : document.addEventListener("DOMContentLoaded", callback);
};

var _callbackQueue = [], _pageLoaded = false;

do$ = function (arg) {

  if (typeof arg === "string") {
    var nodelist = document.querySelectorAll(arg);
    return new DOMNodeCollection([].slice.call(nodelist));
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (arg instanceof Function ) {
    _add(arg);
  }
};

_add = function (callback) {
  if (_pageLoaded) {
    callback();
  } else {
    _callbackQueue.push(callback);
  }
};

do$.extend = function () {
  var args = [].slice.call(arguments);
  var merged = {};
  args.forEach(function(object) {
    Object.keys(object).forEach(function (key) {
      merged.key = object.key;
    });
  });

  return merged;
};

do$.ajax = function (options) {
  var defaultOptions = {
    method: "GET",
    url: "",
    success: function (data) {},
    error: function () {},
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  var ajaxOptions = do$.extend(defaultOptions, options);
  var xhr = new XMLHttpRequest();
  xhr.open(ajaxOptions.method, ajaxOptions.url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      ajaxOptions.success(xhr.response);
    } else {
      ajaxOptions.error(xhr.response);
    }
    xhr.send(JSON.stringify(ajaxOptions.data));
  };
};

document.addEventListener("DOMContentLoaded", function() {
  _pageLoaded = true;
  _callbackQueue.forEach(function (callback) {
    callback();
  });
});
