require 'specHelper'
require 'testableSpellCheck'

# For disabled tests
xit = ->

describe "Flatten", ->
    it "can flatten an empty array", ->
        same [].flat(), []

    it "can flatten an array with one array", ->
        same [['a']].flat(), ['a']

    it "can flatten an array with one array and more than one element", ->
        same [['a', 'b']].flat(), ['a', 'b']

    it "can flatten an array with many arrays and elements", ->
        same [['a', 'b'], ['c', 'd', 'e'], ['f']].flat(), ['a', 'b', 'c', 'd', 'e', 'f']

    it "ignores empty subarrays", ->
        same [['a', 'b'], [], ['c', 'd', 'e'], [], ['f']].flat(),
        ['a', 'b', 'c', 'd', 'e', 'f']

    it "will arrays of arrays of arrays will become arrays of arrays (not recursive)", ->
        same [[['a', 'b']], ['c']].flat(), [['a', 'b'], 'c']

describe "Spellcheck", ->
    it 'can split string into words just fine', ->
        same words("a test"), ["a", "test"]
        same words("one two three one"), ["one", "two", "three", "one"]

    it "can train a dictionary based on words", ->
        same train(words("one two three one")), { one: 3, two: 2, three: 2}



    it "can get edits1 correct", ->
        same edits1('a'), ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'ba',
        'ca', 'da', 'ea', 'fa', 'ga', 'ha', 'ia', 'ja', 'ka', 'la', 'ma', 'na', 'oa',
        'pa', 'qa', 'ra', 'sa', 'ta', 'ua', 'va', 'wa', 'xa', 'ya', 'za', 'aa', 'ab',
        'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj', 'ak', 'al', 'am', 'an', 'ao',
        'ap', 'aq', 'ar', 'as', 'at', 'au', 'av', 'aw', 'ax', 'ay', 'az']

    it "can get edits1 correct for the empty string", ->
        same edits1(''), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    it "can get edits1 correct for a 3 letter word", ->
        same edits1('law'), ['aw', 'lw', 'la', 'alw', 'lwa', 'aaw', 'baw', 'caw', 'daw',
        'eaw', 'faw', 'gaw', 'haw', 'iaw', 'jaw', 'kaw', 'law', 'maw', 'naw', 'oaw',
        'paw', 'qaw', 'raw', 'saw', 'taw', 'uaw', 'vaw', 'waw', 'xaw', 'yaw', 'zaw',
        'law', 'lbw', 'lcw', 'ldw', 'lew', 'lfw', 'lgw', 'lhw', 'liw', 'ljw', 'lkw',
        'llw', 'lmw', 'lnw', 'low', 'lpw', 'lqw', 'lrw', 'lsw', 'ltw', 'luw', 'lvw',
        'lww', 'lxw', 'lyw', 'lzw', 'laa', 'lab', 'lac', 'lad', 'lae', 'laf', 'lag',
        'lah', 'lai', 'laj', 'lak', 'lal', 'lam', 'lan', 'lao', 'lap', 'laq', 'lar',
        'las', 'lat', 'lau', 'lav', 'law', 'lax', 'lay', 'laz', 'alaw', 'blaw', 'claw',
        'dlaw', 'elaw', 'flaw', 'glaw', 'hlaw', 'ilaw', 'jlaw', 'klaw', 'llaw', 'mlaw',
        'nlaw', 'olaw', 'plaw', 'qlaw', 'rlaw', 'slaw', 'tlaw', 'ulaw', 'vlaw', 'wlaw',
        'xlaw', 'ylaw', 'zlaw', 'laaw', 'lbaw', 'lcaw', 'ldaw', 'leaw', 'lfaw', 'lgaw',
        'lhaw', 'liaw', 'ljaw', 'lkaw', 'llaw', 'lmaw', 'lnaw', 'loaw', 'lpaw', 'lqaw',
        'lraw', 'lsaw', 'ltaw', 'luaw', 'lvaw', 'lwaw', 'lxaw', 'lyaw', 'lzaw', 'laaw',
        'labw', 'lacw', 'ladw', 'laew', 'lafw', 'lagw', 'lahw', 'laiw', 'lajw', 'lakw',
        'lalw', 'lamw', 'lanw', 'laow', 'lapw', 'laqw', 'larw', 'lasw', 'latw', 'lauw',
        'lavw', 'laww', 'laxw', 'layw', 'lazw', 'lawa', 'lawb', 'lawc', 'lawd', 'lawe',
        'lawf', 'lawg', 'lawh', 'lawi', 'lawj', 'lawk', 'lawl', 'lawm', 'lawn', 'lawo',
        'lawp', 'lawq', 'lawr', 'laws', 'lawt', 'lawu', 'lawv', 'laww', 'lawx', 'lawy',
        'lawz']