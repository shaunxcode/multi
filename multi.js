(function() {
  var exports, multi, root, _;

  _ = require('underscore');

  root = this;

  multi = function(sigs) {
    var func, pats, sig;
    pats = {};
    for (sig in sigs) {
      func = sigs[sig];
      pats[sig.split(",").map(function(i) {
        return i.trim();
      }).join(",")] = func;
    }
    return function() {
      sig = _.toArray(arguments).slice(0).map(function(v) {
        if (_.isFunction(v)) return "func";
        if (_.isString(v)) return "str";
        if (_.isArray(v)) return "arr";
        if (_.isNumber(v)) return "num";
        if (_.isBoolean(v)) return "bool";
        return "obj";
      }).join(",");
      if (pats[sig]) return pats[sig].apply(this, arguments);
      if (pats['*']) return pats['*'].apply(this, arguments);
      throw "Could not match signature " + sig;
    };
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = {
        multi: multi
      };
    }
    exports.multi = multi;
  } else {
    root.multi = multi;
  }

}).call(this);
