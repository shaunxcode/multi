Multi is a simple utility higher order function for generating multi function/methods. Meaning it works in both a function and object method context retaining correct "this". 

Examples:

    test = multi
        "func, obj": (a, b) ->
            console.log "func and obj", a, b

        "func": (f) ->
            console.log "func", f

        "obj": (o) ->
            console.log "Object", o

        "arr": (a) -> console.log "array ", a

        "*": -> console.log "catch all", arguments

    test (-> 'x'), {a: 'b', c: 'd'}

    test -> 'x'

    test {a: 'b'}

    test [1,2,3]

    test "a", "b", "c", "d"

    class Person
        constructor: (@name) ->

        multiTest: multi
            "str": (s) ->
                console.log @name, " string ", s

            "num": (n) ->
                console.log @name, " num ", n

    p = new Person 'peter'

    console.log "\n\n"
    p.multiTest "cat"
    p.multiTest 34


