(function() {
  require('basics');
  global.same = function(thi, that) {
    return expect(thi).toEqual(that);
  };
  global.equalsDouble = function(x, y) {
    return expect(Math.abs(x - y)).toBeLessThan(0.01);
  };
  global.dummyMethod = function() {
    return null;
  };
  global.mock = function(name, methodList) {
    var _dummyName, _i, _len, m, newClass;
    newClass = (function() {
      _dummyName = (function() {
        function _dummyName() {};
        return _dummyName;
      })();
      return _dummyName;
    })();
    global[name] = newClass;
    if (!(methodList != null)) {
      return newClass;
    }
    for (_i = 0, _len = methodList.length; _i < _len; _i++) {
      m = methodList[_i];
      define(newClass, m, dummyMethod);
    }
    return newClass;
  };
}).call(this);
