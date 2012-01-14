Multi is a simple utility higher order function for generating multi function/methods. Meaning it works in both a function and object method context retaining correct "this". 

The accepted "types" you can declare in an "arity signature" are:

    func: function
    num: number
    str: string
    arr: array
    bool: boolean
    obj: object
    *: catch-all (ignores arity)
    
An arity signature is constructed of one or more of the above (except for * which only makes sense alone) types seperated by comma with optional amounts of space e.g. "func, obj" and "  func  ,  obj " are the same. Class names can also be used in place and with types.  

Examples:

    test = multi
        "func, obj": (a, b) ->
            console.log "func and obj", a, b

        "func": (f) ->
            console.log "func", f

        "num, obj": (n, o) ->
            console.log "Object", n, o

        "arr": (a) -> 
            console.log "array ", a

        "str,str,num": (s, s, n) -> 
            console.log "compound sig test", s, s, n

        "*": -> console.log "catch all", arguments

    test (-> 'x'), {a: 'b', c: 'd'}
    test -> 'x'
    test 5, {a: 'b'}
    test [1,2,3]
    test 'a', 'b', 5
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


    class Dog

    speak = multi
        "Dog": (o) -> "bark"

        "Person": (o) -> "Hey"

        "Dog,Person": (d,p) -> "dog and a person"

        "Person,Dog": (p,d) -> "person and a dog"

        "obj": (o) -> "other obj"

        "arr": (a) -> "array"

        "num": (n) -> "just a num"

    p = new Person
    d = new Dog

    speak p         #hey 
    speak d         #bark
    speak p,d       #person and dog
    speak d,p       #dog and a person
    speak {rand: 3} #other obj
    speak [1,2]     #array
    speak 3         #just a num

Add check at decleration to make sure any types are with in limit of supported types 
