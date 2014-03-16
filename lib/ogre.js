
/* 

ogre.js - MIT Licensed - http://github.com/elucidata/ogre.js 

An object graph manager built with ReactJS in mind.

All cursors are virtual, data operations happen on the root source object.

Meaning, you can create cursors for unpopulated paths and set onChange 
handlers for them, then when/if data is ever set for that path you'll get 
the callback.
 */

(function() {
  var DEBUG, SETTABLE_VALUES, changeEvent, ogre, _,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('./tools');

  DEBUG = process.env.NODE_ENV === 'development' ? true : false;

  SETTABLE_VALUES = 'object array null undefined'.split(' ');

  changeEvent = require('./change-event');

  ogre = function(source, lockEditsToRoot) {
    var cursor, _callbacks, _changeGraph, _fullpath, _lastChangePath, _triggerCallbacks;
    if (lockEditsToRoot == null) {
      lockEditsToRoot = false;
    }
    _callbacks = [];
    _lastChangePath = null;
    _fullpath = function(root, key) {
      return _.compact([root, key]).join('.');
    };
    _triggerCallbacks = function(e) {
      var cb, _i, _len;
      for (_i = 0, _len = _callbacks.length; _i < _len; _i++) {
        cb = _callbacks[_i];
        if (_.startsWith(e.path, cb != null ? cb.basepath : void 0)) {
          cb.exec(e);
        }
      }
      return e;
    };
    _changeGraph = function(fullpath, data, replace, silent) {
      var e;
      if (e = _.setKeyPath(source, fullpath, data, replace)) {
        if (silent) {
          return;
        }
        _lastChangePath = e.path;
        _triggerCallbacks(e);
        _lastChangePath = null;
        return _.warnOnce.clear();
      }
    };
    cursor = function(rootpath, readonly) {
      if (readonly == null) {
        readonly = false;
      }
      if (lockEditsToRoot && rootpath === '') {
        readonly = false;
      }
      return {
        path: rootpath,
        get: function(path, opts) {
          var data, kind;
          if (arguments.length === 1 && _.type(path) === 'object') {
            opts = path;
            path = '';
          }
          data = _.getKeyPath(source, _fullpath(rootpath, path));
          kind = _.type(data);
          if ((kind === 'undefined' || kind === 'null') && ((opts != null ? opts.or : void 0) != null)) {
            return opts.or;
          } else if ((opts != null ? opts.clone : void 0) === false) {
            return data;
          } else {
            return _.clone(data);
          }
        },
        set: function(path, data, replace, silent) {
          var fullpath, kind;
          if (replace == null) {
            replace = false;
          }
          if (silent == null) {
            silent = false;
          }
          if (readonly) {
            console.warn("You're trying to set data on a readonly cursor!");
            return this;
          }
          if ((kind = _.type(path)) !== 'string') {
            if (__indexOf.call(SETTABLE_VALUES, kind) >= 0) {
              silent = replace;
              replace = data;
              data = path;
              path = '';
            } else {
              console.warn("The first parameter to .set() is an invalid _.type:", kind);
              return this;
            }
          }
          fullpath = _fullpath(rootpath, path);
          if (_lastChangePath != null) {
            if (_.startsWith(path, _lastChangePath)) {
              _.warnOnce("You're making changes in the same path (" + path + ") within an onChange handler. This can lead to infinite loops, be careful.");
            }
          }
          _changeGraph(fullpath, data, replace, silent);
          return this;
        },

        /*
         *   Params: 
         *     .map string, callback
         *     .map callback
         *   Callback Format:
         *     callback(value, idx|key, array|object)
         */
        map: function(path, fn) {
          var idx, key, result, value, _i, _len, _results, _results1;
          fn = arguments[arguments.length - 1];
          result = arguments.length > 1 ? this.get(arguments[0]) : this.get();
          fn || (fn = function(x) {
            return x;
          });
          switch (_.type(result)) {
            case 'array':
              _results = [];
              for (idx = _i = 0, _len = result.length; _i < _len; idx = ++_i) {
                value = result[idx];
                _results.push(fn(value, idx, result));
              }
              return _results;
              break;
            case 'object':
              _results1 = [];
              for (key in result) {
                value = result[key];
                _results1.push(fn(value, key, result));
              }
              return _results1;
              break;
            case 'null':
            case 'undefined':
              return [];
            default:
              return [fn(result)];
          }
        },
        hasChanged: function(path) {
          var fullpath;
          if (path == null) {
            path = '';
          }
          if (_lastChangePath == null) {
            return false;
          }
          fullpath = _fullpath(rootpath, path);
          return _.startsWith(_lastChangePath, fullpath);
        },
        exists: function(path) {
          var unlikelyValue;
          if (path == null) {
            path = '';
          }
          unlikelyValue = '*^%^*(*&!';
          return this.get(path, {
            or: unlikelyValue
          }) !== unlikelyValue;
        },
        isEmpty: function(path) {
          var kind;
          if (path == null) {
            path = '';
          }
          kind = _.type(this.get(path));
          return kind === 'null' || kind === 'undefined';
        },
        isNotEmpty: function(path) {
          if (path == null) {
            path = '';
          }
          return !this.isEmpty(path);
        },
        isNull: function(path) {
          if (path == null) {
            path = '';
          }
          return _.type(this.get(path)) === 'null';
        },
        isMissing: function(path) {
          if (path == null) {
            path = '';
          }
          return _.type(this.get(path)) === 'undefined';
        },
        cursor: function(path, readonly) {
          var fullpath;
          fullpath = _fullpath(rootpath, path);
          if (lockEditsToRoot) {
            return cursor(fullpath, true);
          } else {
            return cursor(fullpath, readonly);
          }
        },
        listenerCount: function(reportAll) {
          var cb;
          if (reportAll == null) {
            reportAll = false;
          }
          if (reportAll === true && rootpath === '') {
            return _callbacks.length;
          } else {
            return ((function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = _callbacks.length; _i < _len; _i++) {
                cb = _callbacks[_i];
                if (cb.cursor === this) {
                  _results.push(cb);
                }
              }
              return _results;
            }).call(this)).length;
          }
        },
        _listenerSummary: function() {
          var content, data, info, key, paths, total, _i, _j, _len, _len1, _name, _ref, _ref1;
          paths = {};
          total = 0;
          for (_i = 0, _len = _callbacks.length; _i < _len; _i++) {
            info = _callbacks[_i];
            total += 1;
            data = paths[_name = info.basepath] || (paths[_name] = {
              listeners: 0,
              cursors: []
            });
            data.listeners += 1;
            if (_ref = info.cursor, __indexOf.call(data.cursors, _ref) < 0) {
              data.cursors.push(info.cursor);
            }
          }
          content = ["" + total + " listeners in ogre."];
          _ref1 = _.keys(paths).sort();
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            key = _ref1[_j];
            info = paths[key];
            content.push("  " + (key || '<root>') + ":");
            content.push("    - listeners " + info.listeners);
            content.push("    -   cursors " + info.cursors.length);
          }
          return content.join("\n");
        },
        onChange: function(callback, path) {

          /** path is optional, defaults to path of cursor */
          var fullpath;
          if (process.env.NODE_ENV === 'development') {
            console.log(':cursor: start listening for changes', rootpath || '<root>');
          }
          fullpath = path != null ? _fullpath(rootpath, path) : rootpath;
          _callbacks.push({
            exec: callback,
            basepath: fullpath,
            cursor: this
          });
          return this;
        },
        stopListening: function(clearAll) {
          var callback, i, _i;
          if (clearAll == null) {
            clearAll = false;
          }
          if (clearAll === true && rootpath === '') {
            if (process.env.NODE_ENV === 'development') {
              console.log(':cursor: clearing all callbacks', rootpath || '<root>');
            }
            _callbacks.length = 0;
          } else {
            for (i = _i = _callbacks.length - 1; _i >= 0; i = _i += -1) {
              callback = _callbacks[i];
              if (callback.cursor === this) {
                _callbacks.splice(i, 1);
              }
            }
          }
          return this;
        },
        stopListeningAt: function(path) {
          var callback, i, _i;
          if ((path != null) && !_.isEmpty(path)) {
            _fullpath(rootpath, path);
            for (i = _i = _callbacks.length - 1; _i >= 0; i = _i += -1) {
              callback = _callbacks[i];
              if (_.startsWith(path, callback.basepath)) {
                _callbacks.splice(i, 1);
              }
            }
          } else {
            if (process.env.NODE_ENV === 'development') {
              console.warn("You must specify a path to stop listening to.");
            }
          }
          return this;
        },
        dispose: function() {
          return this.stopListening(rootpath === '');
        }
      };
    };
    return cursor('', lockEditsToRoot);
  };

  module.exports = ogre;

}).call(this);
