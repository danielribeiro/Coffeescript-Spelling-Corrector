global.words = (text) -> (t for t in text.toLowerCase().split(/[^a-z]+/) when t.length > 0)

Array::or = (arrayFunc) -> if @length > 0 then @ else arrayFunc()

Array::flat = -> if @length == 0 then @ else @[0].concat(@[1..].flat())

global.train = (features) ->
    model = {}
    (model[f] = if model[f] then model[f] +1 else 2) for f in features
    return model

# global.NWORDS = train(words(require('fs').readFileSync('./lib/big.txt', 'utf8')))
 global.NWORDS = train(['law'])

alphabet = 'abcdefghijklmnopqrstuvwxyz'.split ""

global.edits1 = (word) ->
    s = ([word.substring(0, i), word.substring(i)] for i in [0..word.length])
    deletes = (a.concat b[1..] for [a, b] in s when b.length > 0)
    transposes = (a + b[1] + b[0] + b.substring(2) for [a, b] in s when b.length > 1)
    replaces = (a + c + b.substring(1) for c in alphabet for [a, b] in s when b.length > 0)
    inserts = (a + c + b for c in alphabet for [a, b] in s)
    return deletes.concat transposes.concat replaces.flat().concat inserts.flat()

known_edits2 = (word) -> ((e2 for e2 in edits1(e1) when NWORDS[e2]? for e1 in edits1(word)).flat())

known = (words) -> (w for w in words when NWORDS[w])

global.correct = (word) ->
    candidates = known([word]).or -> known(edits1(word)).or -> known_edits2(word).or -> [word]
    ({k: w, v: NWORDS[w] or 1} for w in candidates).sort((a, b)-> b.v  - a.v)[0].k
