require 'basics'
global.same = (thi, that) ->
    expect(thi).toEqual(that)

global.equalsDouble = (x, y) ->
    expect(Math.abs(x - y)).toBeLessThan 0.01

global.dummyMethod = -> return null
global.mock = (name, methodList) ->
    newClass = class _dummyName
    global[name] = newClass
    return newClass unless methodList?
    for m in methodList
        define newClass, m, dummyMethod
    return newClass
