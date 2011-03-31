(function() {
  var NWORDS, alphabet, correct, edits1, eq, expected, feedback, inOut, input, known, known_edits2, result, train, words;
  var __hasProp = Object.prototype.hasOwnProperty;
  words = function(text) {
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
  train = function(features) {
    var _i, _len, f, model;
    model = {};
    for (_i = 0, _len = features.length; _i < _len; _i++) {
      f = features[_i];
      (model[f] = model[f] ? model[f] + 1 : 2);
    }
    return model;
  };
  NWORDS = train(words(require('fs').readFileSync('./lib/big.txt', 'utf8')));
  alphabet = 'abcdefghijklmnopqrstuvwxyz'.split("");
  edits1 = function(word) {
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
  correct = function(word) {
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
  inOut = {
    'usefull': 'useful',
    'concider': 'consider',
    'triangulaur': 'triangular',
    'hierchy': 'hierarchy',
    'occurence': 'occurrence',
    'occurence': 'occurrence',
    'valubale': 'valuable',
    'valuble': 'valuable',
    'unexpcted': 'unexpected',
    'unexpeted': 'unexpected',
    'unexspected': 'unexpected',
    'comittee': 'committee',
    'scisors': 'scissors',
    'sissors': 'scissors',
    'managment': 'management',
    'singulaur': 'singular',
    'extreamly': 'extremely',
    'intial': 'initial',
    'cemetary': 'cemetery',
    'supercede': 'supersede',
    'reafreshment': 'refreshment',
    'refreshmant': 'refreshment',
    'refresment': 'refreshment',
    'refressmunt': 'refreshment',
    'galery': 'gallery',
    'gallary': 'gallery',
    'gallerry': 'gallery',
    'gallrey': 'gallery',
    'pronounciation': 'pronunciation',
    'inconvienient': 'inconvenient',
    'inconvient': 'inconvenient',
    'inconvinient': 'inconvenient',
    'cuaritains': 'curtains',
    'curtans': 'curtains',
    'curtians': 'curtains',
    'somone': 'someone',
    'familes': 'families',
    'febuary': 'february',
    'extented': 'extended',
    'ofen': 'often',
    'offen': 'often',
    'offten': 'often',
    'ofton': 'often',
    'undersand': 'understand',
    'undistand': 'understand',
    'basicaly': 'basically',
    'descide': 'decide',
    'particulaur': 'particular',
    'afful': 'awful',
    'neccesary': 'necessary',
    'necesary': 'necessary',
    'neccesary': 'necessary',
    'necassary': 'necessary',
    'necassery': 'necessary',
    'neccasary': 'necessary',
    'uneque': 'unique',
    'conciderable': 'considerable',
    'remeber': 'remember',
    'rememmer': 'remember',
    'rermember': 'remember',
    'articals': 'articles',
    'aranged': 'arranged',
    'arrainged': 'arranged',
    'unfortunatly': 'unfortunately',
    'varable': 'variable',
    'wether': 'whether',
    'leval': 'level',
    'transfred': 'transferred',
    'astablishing': 'establishing',
    'establising': 'establishing',
    'recieve': 'receive',
    'benifit': 'benefit',
    'remine': 'remind',
    'fisited': 'visited',
    'viseted': 'visited',
    'vistied': 'visited',
    'problam': 'problem',
    'proble': 'problem',
    'promblem': 'problem',
    'biscits': 'biscuits',
    'biscuts': 'biscuits',
    'bisquits': 'biscuits',
    'buiscits': 'biscuits',
    'buiscuts': 'biscuits',
    'wote': 'wrote',
    'pertend': 'pretend',
    'protend': 'pretend',
    'prtend': 'pretend',
    'pritend': 'pretend',
    'bicycal': 'bicycle',
    'bycicle': 'bicycle',
    'bycycle': 'bicycle',
    'lagh': 'laugh',
    'lugh': 'laugh',
    'cirtain': 'certain',
    'recipt': 'receipt',
    'magnificnet': 'magnificent',
    'magificent': 'magnificent',
    'magnifcent': 'magnificent',
    'magnifecent': 'magnificent',
    'magnifiscant': 'magnificent',
    'magnifisent': 'magnificent',
    'magnificant': 'magnificent',
    'litriture': 'literature',
    'chalenges': 'challenges',
    'chalenges': 'challenges',
    'exstacy': 'ecstasy',
    'ecstacy': 'ecstasy',
    'descided': 'decided',
    'stomac': 'stomach',
    'stomache': 'stomach',
    'stumache': 'stomach',
    'questionaire': 'questionnaire',
    'speaical': 'special',
    'specail': 'special',
    'specal': 'special',
    'speical': 'special',
    'realy': 'really',
    'relley': 'really',
    'relly': 'really',
    'diffrent': 'different',
    'clearical': 'clerical',
    'monitering': 'monitoring',
    'biult': 'built',
    'possition': 'position',
    'perhapse': 'perhaps',
    'personnell': 'personnel',
    'seperate': 'separate',
    'poertry': 'poetry',
    'poetre': 'poetry',
    'poety': 'poetry',
    'powetry': 'poetry',
    'arragment': 'arrangement',
    'acess': 'access',
    'vairious': 'various',
    'beetween': 'between',
    'avaible': 'available',
    'independant': 'independent',
    'independant': 'independent',
    'discription': 'description',
    'opisite': 'opposite',
    'oppasite': 'opposite',
    'oppesite': 'opposite',
    'oppisit': 'opposite',
    'oppisite': 'opposite',
    'opposit': 'opposite',
    'oppossite': 'opposite',
    'oppossitte': 'opposite',
    'vairiant': 'variant',
    'poims': 'poems',
    'southen': 'southern',
    'possable': 'possible',
    'dirven': 'driven',
    'vistors': 'visitors',
    'completly': 'completely',
    'levals': 'levels',
    'experances': 'experiences',
    'wantid': 'wanted',
    'begining': 'beginning',
    'accomodation': 'accommodation',
    'acommodation': 'accommodation',
    'acomodation': 'accommodation',
    'volantry': 'voluntary',
    'chaper': 'chapter',
    'chaphter': 'chapter',
    'chaptur': 'chapter',
    'defenition': 'definition',
    'scarcly': 'scarcely',
    'scarecly': 'scarcely',
    'scarely': 'scarcely',
    'scarsely': 'scarcely',
    'voteing': 'voting',
    'benifits': 'benefits',
    'carrer': 'career',
    'spledid': 'splendid',
    'splended': 'splendid',
    'splended': 'splendid',
    'contenpted': 'contented',
    'contentid': 'contented',
    'experance': 'experience',
    'experiance': 'experience',
    'poarple': 'purple',
    'liaision': 'liaison',
    'liason': 'liaison',
    'definately': 'definitely',
    'difinately': 'definitely',
    'anut': 'aunt',
    'arnt': 'aunt',
    'defenitions': 'definitions',
    'paralel': 'parallel',
    'paralell': 'parallel',
    'parrallel': 'parallel',
    'parralell': 'parallel',
    'parrallell': 'parallel',
    'latets': 'latest',
    'latiest': 'latest',
    'latist': 'latest',
    'inetials': 'initials',
    'inistals': 'initials',
    'initails': 'initials',
    'initals': 'initials',
    'intials': 'initials'
  };
  eq = function(x, y) {
    return x == y;
  };
  for (input in inOut) {
    if (!__hasProp.call(inOut, input)) continue;
    expected = inOut[input];
    result = correct(input);
    feedback = eq(result, expected) ? "ok" : ("FAIL! (should be " + expected + ")");
    console.log("" + input + " -> " + result + " " + feedback);
  }
}).call(this);
