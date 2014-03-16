(function() {
  var changeEvent;

  module.exports = changeEvent = function(path, value, oldValue) {
    return {
      path: path,
      value: value,
      oldValue: oldValue
    };
  };

}).call(this);
