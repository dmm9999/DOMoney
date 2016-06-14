function DOMNodeCollection (htmlEls) {
  this.htmlEls = htmlEls;
}

DOMNodeCollection.prototype.forEach = function (callback) {
  this.htmlEls.forEach(callback);
};

DOMNodeCollection.prototype.map = function (callback) {
  this.htmlEls.map(callback);
};

DOMNodeCollection.prototype.html = function (string) {
  if (string === undefined) {
    return this.htmlEls[0].innerHTML;
  } else {
    this.htmlEls = this.map(function(el) {
      el.innerHTML = string;
    });
  }
};

DOMNodeCollection.prototype.empty = function () {
  this.html("");
};

DOMNodeCollection.prototype.append = function (argument) {
  if (typeof argument === "string") {
    this.htmlEls = this.forEach( function(domEl) {
        domEl.innerHTML += argument;
      });
  } else if (argument instanceof HTMLElement) {
    this.htmlEls = this.forEach( function(domEl) {
      domEl.innerHTML += argument.outerHTML;
    });
  } else if (argument instanceof DOMNodeCollection) {
    this.htmlEls = this.forEach( function(domEl) {
      argument.forEach( function(argEl) {
        domEl.innerHTML += argEl.outerHTML;
      });
    });
  } else {
    throw "Argument error: Non-appendable element";
  }
};

DOMNodeCollection.prototype.attr = function (name, value) {
  if (value === undefined) {
    return this.htmlEls[0].getAttribute(name);
  } else {
    this.forEach( function (domEl) {
      domEl.setAttribute(name, value);
    });
  }
};

DOMNodeCollection.prototype.addClass = function () {
  var args = [].slice.call(arguments);

  this.forEach(function(domEl) {
    args.forEach(function(className) {
      domEl.classList.add(className);
    });
  });
};

DOMNodeCollection.prototype.removeClass = function (name) {
  this.forEach(function(domEl) {
    domEl.classList.remove(name);
  });
};

DOMNodeCollection.prototype.children = function () {
  var children = [];
  this.forEach(function(parent) {
    children = children.concat(parent.children);
  });

  return new DOMNodeCollection(children);
};

DOMNodeCollection.prototype.parent = function () {
  var parents = [];
  this.forEach(function(child) {
    if (parents.indexOf(child.parentNode) === -1) {
      parents.push(child.parentNode);
    }
  });

  return new DOMNodeCollection(parents);
};

DOMNodeCollection.prototype.find = function (selector) {
  var results = [];
  this.forEach(function(domEl) {
    queryResults = [].slice.call(domEl.querySelectorAll(selector));
    results = results.concat(queryResults);
  });

  return new DOMNodeCollection(results);
};

DOMNodeCollection.prototype.remove = function () {
  this.html("");
};

DOMNodeCollection.prototype.on = function (event, callback) {
  this.forEach(function(domEl) {
    domEl.addEventListener(event, callback);
  });
};

DOMNodeCollection.prototype.off = function (event, callback) {
  this.forEach(function(domEl) {
    domEl.removeEventListener(event, callback);
  });
};

module.exports = DOMNodeCollection;
