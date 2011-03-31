(function() {
  var alphabet, known, known_edits2;
  global.words = function(text) {
    var _i, _len, _ref, _result, t;
    _result = [];
    for (_i = 0, _len = (_ref = text.toLowerCase().split(/[^a-z]+/)).length; _i < _len; _i++) {
      t = _ref[_i];
      if (t.length > 0) {
        _result.push(t);
      }
    }
    return _result;
  };
  Array.prototype.or = function(arrayFunc) {
    return this.length > 0 ? this : arrayFunc();
  };
  Array.prototype.flat = function() {
    return this.length === 0 ? this : this[0].concat(this.slice(1).flat());
  };
  global.train = function(features) {
    var _i, _len, f, model;
    model = {};
    for (_i = 0, _len = features.length; _i < _len; _i++) {
      f = features[_i];
      (model[f] = model[f] ? model[f] + 1 : 2);
    }
    return model;
  };
  global.NWORDS = train(['law']);
  alphabet = 'abcdefghijklmnopqrstuvwxyz'.split("");
  global.edits1 = function(word) {
    var _i, _j, _len, _len2, _ref, _ref2, _result, _result2, a, b, c, deletes, i, inserts, replaces, s, transposes;
    s = (function() {
      _result = [];
      for (i = 0, _ref = word.length; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        _result.push([word.substring(0, i), word.substring(i)]);
      }
      return _result;
    })();
    deletes = (function() {
      _result = [];
      for (_i = 0, _len = s.length; _i < _len; _i++) {
        _ref = s[_i], a = _ref[0], b = _ref[1];
        if (b.length > 0) {
          _result.push(a.concat(b.slice(1)));
        }
      }
      return _result;
    })();
    transposes = (function() {
      _result = [];
      for (_i = 0, _len = s.length; _i < _len; _i++) {
        _ref = s[_i], a = _ref[0], b = _ref[1];
        if (b.length > 1) {
          _result.push(a + b[1] + b[0] + b.substring(2));
        }
      }
      return _result;
    })();
    replaces = (function() {
      _result = [];
      for (_i = 0, _len = s.length; _i < _len; _i++) {
        _ref = s[_i], a = _ref[0], b = _ref[1];
        if (b.length > 0) {
          _result.push((function() {
            _result2 = [];
            for (_j = 0, _len2 = (_ref2 = alphabet).length; _j < _len2; _j++) {
              c = _ref2[_j];
              _result2.push(a + c + b.substring(1));
            }
            return _result2;
          })());
        }
      }
      return _result;
    })();
    inserts = (function() {
      _result = [];
      for (_i = 0, _len = s.length; _i < _len; _i++) {
        _ref = s[_i], a = _ref[0], b = _ref[1];
        _result.push((function() {
          _result2 = [];
          for (_j = 0, _len2 = (_ref2 = alphabet).length; _j < _len2; _j++) {
            c = _ref2[_j];
            _result2.push(a + c + b);
          }
          return _result2;
        })());
      }
      return _result;
    })();
    return deletes.concat(transposes.concat(replaces.flat().concat(inserts.flat())));
  };
  known_edits2 = function(word) {
    var _i, _j, _len, _len2, _ref, _ref2, _result, _result2, e1, e2;
    return (function() {
      _result = [];
      for (_i = 0, _len = (_ref = edits1(word)).length; _i < _len; _i++) {
        e1 = _ref[_i];
        _result.push((function() {
          _result2 = [];
          for (_j = 0, _len2 = (_ref2 = edits1(e1)).length; _j < _len2; _j++) {
            e2 = _ref2[_j];
            if (NWORDS[e2] != null) {
              _result2.push(e2);
            }
          }
          return _result2;
        })());
      }
      return _result;
    })().flat();
  };
  known = function(words) {
    var _i, _len, _result, w;
    _result = [];
    for (_i = 0, _len = words.length; _i < _len; _i++) {
      w = words[_i];
      if (NWORDS[w]) {
        _result.push(w);
      }
    }
    return _result;
  };
  global.correct = function(word) {
    var _i, _len, _result, candidates, w;
    candidates = known([word]).or(function() {
      return known(edits1(word)).or(function() {
        return known_edits2(word).or(function() {
          return [word];
        });
      });
    });
    return (function() {
      _result = [];
      for (_i = 0, _len = candidates.length; _i < _len; _i++) {
        w = candidates[_i];
        _result.push({
          k: w,
          v: NWORDS[w] || 1
        });
      }
      return _result;
    })().sort(function(a, b) {
      return b.v - a.v;
    })[0].k;
  };
}).call(this);
