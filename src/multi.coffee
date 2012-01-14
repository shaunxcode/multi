_ = require 'underscore'

root = this

multi = (sigs) ->
    pats = {}
    for sig, func of sigs 
        pats[sig.split(",").map((i) -> i.trim()).join(",")] = func

    ->
        sig = _.toArray(arguments).slice(0).map((v) -> 
            if _.isFunction v then return "func"
            if _.isString v then return "str"
            if _.isArray v then return "arr"
            if _.isNumber v then return "num"
            if _.isBoolean v then return "bool"
            "obj").join(",")

        if pats[sig] then return pats[sig].apply @, arguments
       
        if pats['*'] then return pats['*'].apply @, arguments
 
        throw "Could not match signature " + sig

if typeof exports != 'undefined'
    if typeof module != 'undefined' and module.exports
        exports = module.exports = {multi: multi}
    exports.multi = multi
else
    root.multi = multi
