(function() {
  var changeEvent, _;

  changeEvent = require('./change-event');

  module.exports = _ = {
    extend: require('lodash-node/compat/objects/assign'),
    clone: require('lodash-node/compat/objects/clone'),
    compact: require('lodash-node/compat/arrays/compact'),
    isPlainObject: require('lodash-node/compat/objects/isPlainObject'),
    isEqual: require('lodash-node/compat/objects/isEqual'),
    keys: require('lodash-node/compat/objects/keys'),
    startsWith: function(str, starts) {
      if (starts === '') {
        return true;
      }
      if (str === null || starts === null) {
        return false;
      }
      str = String(str);
      starts = String(starts);
      return str.length >= starts.length && str.slice(0, starts.length) === starts;
    },
    type: (function() {
      var classToType, elemParser, name, _i, _len, _ref, _toString;
      _toString = Object.prototype.toString;
      elemParser = /\[object HTML(.*)\]/;
      classToType = {};
      _ref = "Array Boolean Date Function NodeList Null Number RegExp String Undefined ".split(" ");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        classToType["[object " + name + "]"] = name.toLowerCase();
      }
      return function(obj) {
        var found, strType;
        strType = _toString.call(obj);
        if (found = classToType[strType]) {
          return found;
        } else if (found = strType.match(elemParser)) {
          return found[1].toLowerCase();
        } else {
          return "object";
        }
      };
    })(),
    warnOnce: (function() {
      var api, count;
      count = 0;
      api = function(msg) {
        if (count === 0) {
          console.warn(msg);
        }
        return count += 1;
      };
      api.clear = function() {
        return count = 0;
      };
      return api;
    })(),
    getKeyParts: function(keypath) {
      return _.compact(keypath.split('.'));
    },
    getKeyPath: function(source, keypath, create) {
      var key, obj, parts;
      if (keypath == null) {
        keypath = '';
      }
      if (create == null) {
        create = false;
      }
      parts = _.getKeyParts(keypath);
      obj = source;
      while ((obj != null) && parts.length) {
        key = parts.shift();
        if (!obj[key]) {
          if (create === true) {
            obj[key] = {};
          }
        }
        obj = obj[key];
      }
      return obj;
    },
    setKeyPath: function(source, keypath, data, replace) {
      var container, current, key, merged, parts;
      if (keypath == null) {
        keypath = '';
      }
      parts = _.getKeyParts(keypath);
      key = parts.pop();
      container = parts.length ? _.getKeyPath(source, parts.join('.'), true) : source;
      current = container[key];
      if (replace === true || !_.isPlainObject(data)) {
        if (_.isEqual(container[key], data)) {
          return false;
        }
        container[key] = data;
      } else {
        merged = _.extend(_.clone(current || {}), data);
        if (_.isEqual(current, merged)) {
          return false;
        }
        container[key] = merged;
        data = merged;
      }
      return changeEvent(keypath, data, current);
    }
  };

}).call(this);
