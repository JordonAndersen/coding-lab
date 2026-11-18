// Symbol → official documentation, per language. Powers the in-editor "Docs Lens".
(function (G) {
  const CL = (G.CL = G.CL || {});
  const PY = 'https://docs.python.org/3/';
  const MDN = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/';
  const GO = MDN + 'Global_Objects/';
  const J = 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/';
  const MS = 'https://learn.microsoft.com/en-us/dotnet/';
  const CPP = 'https://en.cppreference.com/w/cpp/';
  const PG = 'https://www.postgresql.org/docs/current/';
  const RD = 'https://react.dev/';

  const py = {};
  ['abs', 'all', 'any', 'enumerate', 'filter', 'float', 'input', 'int', 'isinstance', 'len', 'map', 'max', 'min', 'open', 'print', 'reversed', 'sorted', 'sum', 'zip', 'round', 'type', 'hash', 'iter', 'next', 'ord', 'chr'].forEach((f) => (py[f] = PY + 'library/functions.html#' + f));
  ['dict', 'list', 'set', 'tuple', 'str', 'range'].forEach((f) => (py[f] = PY + 'library/functions.html#func-' + f));
  Object.assign(py, {
    '.append': PY + 'tutorial/datastructures.html#more-on-lists', '.extend': PY + 'tutorial/datastructures.html#more-on-lists',
    '.pop': PY + 'tutorial/datastructures.html#more-on-lists', '.sort': PY + 'library/stdtypes.html#list.sort', '.insert': PY + 'tutorial/datastructures.html#more-on-lists',
    '.join': PY + 'library/stdtypes.html#str.join', '.split': PY + 'library/stdtypes.html#str.split', '.upper': PY + 'library/stdtypes.html#str.upper',
    '.lower': PY + 'library/stdtypes.html#str.lower', '.strip': PY + 'library/stdtypes.html#str.strip', '.replace': PY + 'library/stdtypes.html#str.replace',
    '.get': PY + 'library/stdtypes.html#dict.get', '.items': PY + 'library/stdtypes.html#dict.items', '.keys': PY + 'library/stdtypes.html#dict.keys', '.values': PY + 'library/stdtypes.html#dict.values',
    '.add': PY + 'library/stdtypes.html#frozenset.add', '.popleft': PY + 'library/collections.html#collections.deque.popleft',
    deque: PY + 'library/collections.html#collections.deque', Counter: PY + 'library/collections.html#collections.Counter',
    defaultdict: PY + 'library/collections.html#collections.defaultdict', heapq: PY + 'library/heapq.html', bisect: PY + 'library/bisect.html',
    cache: PY + 'library/functools.html#functools.cache', lru_cache: PY + 'library/functools.html#functools.lru_cache', dataclass: PY + 'library/dataclasses.html',
    json: PY + 'library/json.html', math: PY + 'library/math.html',
    def: PY + 'reference/compound_stmts.html#function-definitions', class: PY + 'reference/compound_stmts.html#class-definitions',
    for: PY + 'reference/compound_stmts.html#the-for-statement', while: PY + 'reference/compound_stmts.html#the-while-statement',
    if: PY + 'reference/compound_stmts.html#the-if-statement', elif: PY + 'reference/compound_stmts.html#the-if-statement',
    try: PY + 'reference/compound_stmts.html#the-try-statement', with: PY + 'reference/compound_stmts.html#the-with-statement',
    lambda: PY + 'reference/expressions.html#lambda', return: PY + 'reference/simple_stmts.html#the-return-statement',
    import: PY + 'reference/simple_stmts.html#the-import-statement', raise: PY + 'reference/simple_stmts.html#the-raise-statement',
    yield: PY + 'reference/expressions.html#yield-expressions', __init__: PY + 'reference/datamodel.html#object.__init__', __str__: PY + 'reference/datamodel.html#object.__str__',
    None: PY + 'library/constants.html#None', ValueError: PY + 'library/exceptions.html#ValueError',
  });

  const js = {
    'console.log': 'https://developer.mozilla.org/en-US/docs/Web/API/console/log_static', setTimeout: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout',
    setInterval: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval',
    Map: GO + 'Map', Set: GO + 'Set', Array: GO + 'Array', Object: GO + 'Object', String: GO + 'String', Number: GO + 'Number', Promise: GO + 'Promise',
    'Promise.all': GO + 'Promise/all', 'Object.keys': GO + 'Object/keys', 'Object.entries': GO + 'Object/entries', 'Object.values': GO + 'Object/values',
    'JSON.stringify': GO + 'JSON/stringify', 'JSON.parse': GO + 'JSON/parse', 'Math.max': GO + 'Math/max', 'Math.min': GO + 'Math/min',
    'Math.floor': GO + 'Math/floor', 'Math.abs': GO + 'Math/abs', 'Math.random': GO + 'Math/random', 'Array.from': GO + 'Array/from', 'Number.isInteger': GO + 'Number/isInteger',
    const: MDN + 'Statements/const', let: MDN + 'Statements/let', var: MDN + 'Statements/var', function: MDN + 'Statements/function', class: MDN + 'Classes',
    async: MDN + 'Statements/async_function', await: MDN + 'Operators/await', for: MDN + 'Statements/for', of: MDN + 'Statements/for...of', while: MDN + 'Statements/while',
    if: MDN + 'Statements/if...else', return: MDN + 'Statements/return', try: MDN + 'Statements/try...catch', new: MDN + 'Operators/new', typeof: MDN + 'Operators/typeof',
    '=>': MDN + 'Functions/Arrow_functions', '??': MDN + 'Operators/Nullish_coalescing', '?.': MDN + 'Operators/Optional_chaining', '...': MDN + 'Operators/Spread_syntax',
    '.toUpperCase': GO + 'String/toUpperCase', '.split': GO + 'String/split', '.trim': GO + 'String/trim', '.length': GO + 'Array/length',
    '.has': GO + 'Map/has', '.get': GO + 'Map/get', '.set': GO + 'Map/set', '.toFixed': GO + 'Number/toFixed',
  };
  ['map', 'filter', 'reduce', 'forEach', 'push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'includes', 'indexOf', 'sort', 'concat', 'find', 'findIndex', 'some', 'every', 'join', 'reverse', 'flat'].forEach((m) => (js['.' + m] = GO + 'Array/' + m));

  const java = {
    'System.out.println': J + 'java/io/PrintStream.html#println(java.lang.String)', 'System.out.printf': J + 'java/io/PrintStream.html',
    'String.valueOf': J + 'java/lang/String.html#valueOf(int)', 'Integer::sum': J + 'java/lang/Integer.html#sum(int,int)',
    '.stream': J + 'java/util/Collection.html#stream()', '.merge': J + 'java/util/Map.html#merge(K,V,java.util.function.BiFunction)',
    '.toCharArray': J + 'java/lang/String.html#toCharArray()', '.split': J + 'java/lang/String.html#split(java.lang.String)', '.equals': J + 'java/lang/Object.html#equals(java.lang.Object)',
    '.containsKey': J + 'java/util/Map.html#containsKey(java.lang.Object)', '.put': J + 'java/util/Map.html#put(K,V)', '.toList': J + 'java/util/stream/Stream.html#toList()',
    record: 'https://docs.oracle.com/en/java/javase/21/language/records.html', switch: 'https://openjdk.org/jeps/361', var: 'https://openjdk.org/jeps/286',
    interface: 'https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html', class: 'https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html',
    static: 'https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html', import: 'https://docs.oracle.com/javase/tutorial/java/package/usepkgs.html',
    public: 'https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html', new: 'https://docs.oracle.com/javase/tutorial/java/javaOO/objectcreation.html',
    return: 'https://docs.oracle.com/javase/tutorial/java/javaOO/returnvalue.html', for: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html',
    while: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/while.html', 'int[]': 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html', '->': 'https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html',
  };
  ['String', 'StringBuilder', 'Math', 'Integer', 'Character', 'Object', 'System'].forEach((c) => (java[c] = J + 'java/lang/' + c + '.html'));
  ['ArrayList', 'HashMap', 'HashSet', 'TreeMap', 'TreeSet', 'ArrayDeque', 'Deque', 'PriorityQueue', 'List', 'Map', 'Set', 'Arrays', 'Collections', 'LinkedList', 'Queue', 'Optional', 'Scanner'].forEach((c) => (java[c] = J + 'java/util/' + c + '.html'));
  java.Stream = J + 'java/util/stream/Stream.html'; java.Collectors = J + 'java/util/stream/Collectors.html';

  const G2 = MS + 'api/system.collections.generic.';
  const cs = {
    'Console.WriteLine': MS + 'api/system.console.writeline', 'Console.Write': MS + 'api/system.console.write', 'string.Join': MS + 'api/system.string.join',
    'Math.Max': MS + 'api/system.math.max', 'Math.Min': MS + 'api/system.math.min', 'Math.Abs': MS + 'api/system.math.abs', 'Array.Sort': MS + 'api/system.array.sort',
    'List': G2 + 'list-1', 'Dictionary': G2 + 'dictionary-2', 'HashSet': G2 + 'hashset-1', 'Queue': G2 + 'queue-1', 'Stack': G2 + 'stack-1',
    'SortedDictionary': G2 + 'sorteddictionary-2', 'PriorityQueue': G2 + 'priorityqueue-2', StringBuilder: MS + 'api/system.text.stringbuilder',
    '.TryGetValue': G2 + 'dictionary-2.trygetvalue', '.GetValueOrDefault': G2 + 'collectionextensions.getvalueordefault', '.ContainsKey': G2 + 'dictionary-2.containskey',
    '.Add': G2 + 'list-1.add', '.Push': G2 + 'stack-1.push', '.Pop': G2 + 'stack-1.pop', '.Split': MS + 'api/system.string.split', '.ToUpper': MS + 'api/system.string.toupper',
    '.ToCharArray': MS + 'api/system.string.tochararray', '.ToString': MS + 'api/system.object.tostring',
    record: MS + 'csharp/language-reference/builtin-types/record', foreach: MS + 'csharp/language-reference/statements/iteration-statements#the-foreach-statement',
    switch: MS + 'csharp/language-reference/operators/switch-expression', var: MS + 'csharp/language-reference/statements/declarations#implicitly-typed-local-variables',
    using: MS + 'csharp/language-reference/keywords/using-directive', class: MS + 'csharp/fundamentals/types/classes', interface: MS + 'csharp/language-reference/keywords/interface',
    async: MS + 'csharp/asynchronous-programming/', await: MS + 'csharp/language-reference/operators/await', '$"': MS + 'csharp/language-reference/tokens/interpolated',
    '=>': MS + 'csharp/language-reference/operators/lambda-operator', public: MS + 'csharp/programming-guide/classes-and-structs/access-modifiers',
    new: MS + 'csharp/language-reference/operators/new-operator', return: MS + 'csharp/language-reference/statements/jump-statements#the-return-statement',
    for: MS + 'csharp/language-reference/statements/iteration-statements#the-for-statement', while: MS + 'csharp/language-reference/statements/iteration-statements#the-while-statement', static: MS + 'csharp/language-reference/keywords/static', out: MS + 'csharp/language-reference/keywords/out',
  };
  ['Where', 'Select', 'OrderBy', 'OrderByDescending', 'ToList', 'ToArray', 'Sum', 'GroupBy', 'Any', 'All', 'First', 'Count', 'Aggregate', 'Distinct', 'Max', 'Min'].forEach((m) => (cs['.' + m] = MS + 'api/system.linq.enumerable.' + m.toLowerCase()));

  const cpp = {
    'std::cout': CPP + 'io/cout', cout: CPP + 'io/cout', cin: CPP + 'io/cin', '#include': CPP + 'preprocessor/include',
    string: CPP + 'string/basic_string', to_string: CPP + 'string/basic_string/to_string', istringstream: CPP + 'io/basic_istringstream',
    sort: CPP + 'algorithm/sort', reverse: CPP + 'algorithm/reverse', max: CPP + 'algorithm/max', min: CPP + 'algorithm/min', swap: CPP + 'utility/swap',
    find: CPP + 'algorithm/find', lower_bound: CPP + 'algorithm/lower_bound', accumulate: CPP + 'numeric/accumulate', pair: CPP + 'utility/pair',
    unique_ptr: CPP + 'memory/unique_ptr', shared_ptr: CPP + 'memory/shared_ptr', make_unique: CPP + 'memory/unique_ptr/make_unique', make_shared: CPP + 'memory/shared_ptr/make_shared',
    '.push_back': CPP + 'container/vector/push_back', '.size': CPP + 'container/vector/size', '.begin': CPP + 'container/vector/begin', '.end': CPP + 'container/vector/end',
    '.empty': CPP + 'container/vector/empty', '.reserve': CPP + 'container/vector/reserve', '.find': CPP + 'container/unordered_map/find', '.count': CPP + 'container/unordered_map/count',
    '.top': CPP + 'container/stack/top', '.push': CPP + 'container/stack/push', '.pop': CPP + 'container/stack/pop',
    auto: CPP + 'language/auto', const: CPP + 'language/cv', class: CPP + 'language/classes', struct: CPP + 'language/class', template: CPP + 'language/templates',
    for: CPP + 'language/range-for', while: CPP + 'language/while', return: CPP + 'language/return', namespace: CPP + 'language/namespace', using: CPP + 'language/namespace#Using-directives',
    nullptr: CPP + 'language/nullptr', size_t: CPP + 'types/size_t',
  };
  ['vector', 'map', 'unordered_map', 'set', 'unordered_set', 'stack', 'queue', 'priority_queue', 'deque', 'array', 'list'].forEach((c) => (cpp[c] = CPP + 'container/' + c));

  const sql = {
    SELECT: PG + 'sql-select.html', FROM: PG + 'sql-select.html#SQL-FROM', WHERE: PG + 'sql-select.html#SQL-WHERE', 'GROUP BY': PG + 'sql-select.html#SQL-GROUPBY',
    HAVING: PG + 'sql-select.html#SQL-HAVING', 'ORDER BY': PG + 'queries-order.html', LIMIT: PG + 'queries-limit.html', DISTINCT: PG + 'sql-select.html#SQL-DISTINCT',
    JOIN: PG + 'queries-table-expressions.html#QUERIES-JOIN', 'LEFT JOIN': PG + 'queries-table-expressions.html#QUERIES-JOIN', 'INNER JOIN': PG + 'queries-table-expressions.html#QUERIES-JOIN',
    COUNT: PG + 'functions-aggregate.html', SUM: PG + 'functions-aggregate.html', AVG: PG + 'functions-aggregate.html', MIN: PG + 'functions-aggregate.html', MAX: PG + 'functions-aggregate.html',
    CASE: PG + 'functions-conditional.html#FUNCTIONS-CASE', COALESCE: PG + 'functions-conditional.html#FUNCTIONS-COALESCE-NVL-IFNULL', LIKE: PG + 'functions-matching.html#FUNCTIONS-LIKE',
    IN: PG + 'functions-subquery.html#FUNCTIONS-SUBQUERY-IN', EXISTS: PG + 'functions-subquery.html#FUNCTIONS-SUBQUERY-EXISTS', BETWEEN: PG + 'functions-comparison.html',
    'IS NULL': PG + 'functions-comparison.html', WITH: PG + 'queries-with.html', UNION: PG + 'queries-union.html', OVER: PG + 'tutorial-window.html',
    'PARTITION BY': PG + 'tutorial-window.html', RANK: PG + 'functions-window.html', ROW_NUMBER: PG + 'functions-window.html', DENSE_RANK: PG + 'functions-window.html',
    LAG: PG + 'functions-window.html', LEAD: PG + 'functions-window.html', INSERT: PG + 'sql-insert.html', UPDATE: PG + 'sql-update.html', DELETE: PG + 'sql-delete.html',
    'CREATE TABLE': PG + 'sql-createtable.html', AS: PG + 'queries-select-lists.html#QUERIES-COLUMN-LABELS',
  };

  const react = Object.assign({}, js, {
    useState: RD + 'reference/react/useState', useEffect: RD + 'reference/react/useEffect', useRef: RD + 'reference/react/useRef', useMemo: RD + 'reference/react/useMemo',
    useCallback: RD + 'reference/react/useCallback', useReducer: RD + 'reference/react/useReducer', useContext: RD + 'reference/react/useContext',
    createContext: RD + 'reference/react/createContext', Fragment: RD + 'reference/react/Fragment', key: RD + 'learn/rendering-lists#keeping-list-items-in-order-with-key',
    onClick: RD + 'learn/responding-to-events', onChange: RD + 'reference/react-dom/components/input', onSubmit: RD + 'reference/react-dom/components/form',
    className: RD + 'reference/react-dom/components/common', props: RD + 'learn/passing-props-to-a-component', preventDefault: 'https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault',
  });


  // ---- TypeScript: everything JavaScript has, plus the type system
  const TSH = 'https://www.typescriptlang.org/docs/handbook/';
  const ts = Object.assign({}, js, {
    interface: TSH + '2/objects.html', type: TSH + '2/everyday-types.html#type-aliases', extends: TSH + '2/generics.html#generic-constraints',
    keyof: TSH + '2/keyof-types.html', typeof: TSH + '2/typeof-types.html', readonly: TSH + '2/objects.html#readonly-properties',
    implements: TSH + '2/classes.html#implements-clauses', private: TSH + '2/classes.html#private', protected: TSH + '2/classes.html#protected', public: TSH + '2/classes.html#public',
    abstract: TSH + '2/classes.html#abstract-classes-and-members', enum: TSH + 'enums.html', as: TSH + '2/everyday-types.html#type-assertions',
    satisfies: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator',
    unknown: TSH + '2/functions.html#unknown', never: TSH + '2/narrowing.html#the-never-type', any: TSH + '2/everyday-types.html#any',
    Partial: TSH + 'utility-types.html#partialtype', Required: TSH + 'utility-types.html#requiredtype', Readonly: TSH + 'utility-types.html#readonlytype',
    Pick: TSH + 'utility-types.html#picktype-keys', Omit: TSH + 'utility-types.html#omittype-keys', Record: TSH + 'utility-types.html#recordkeys-type',
    ReturnType: TSH + 'utility-types.html#returntypetype', number: TSH + '2/everyday-types.html#the-primitives-string-number-and-boolean',
    string: TSH + '2/everyday-types.html#the-primitives-string-number-and-boolean', boolean: TSH + '2/everyday-types.html#the-primitives-string-number-and-boolean',
    get: TSH + '2/classes.html#getters--setters',
  });

  // ---- Go
  const GOP = 'https://pkg.go.dev/';
  const SPEC = 'https://go.dev/ref/spec#';
  const go = {
    'fmt.Println': GOP + 'fmt#Println', 'fmt.Printf': GOP + 'fmt#Printf', 'fmt.Sprintf': GOP + 'fmt#Sprintf', 'fmt.Sprint': GOP + 'fmt#Sprint', 'fmt.Errorf': GOP + 'fmt#Errorf',
    'errors.New': GOP + 'errors#New', 'errors.Is': GOP + 'errors#Is', 'strings.Fields': GOP + 'strings#Fields', 'strings.Split': GOP + 'strings#Split', 'strings.Join': GOP + 'strings#Join',
    'strings.Builder': GOP + 'strings#Builder', 'strconv.Itoa': GOP + 'strconv#Itoa', 'strconv.Atoi': GOP + 'strconv#Atoi', 'sort.Strings': GOP + 'sort#Strings', 'sort.Ints': GOP + 'sort#Ints',
    'sort.Slice': GOP + 'sort#Slice', 'slices.Sort': GOP + 'slices#Sort', 'slices.Sorted': GOP + 'slices#Sorted', 'slices.Contains': GOP + 'slices#Contains', 'maps.Keys': GOP + 'maps#Keys',
    'sync.WaitGroup': GOP + 'sync#WaitGroup', 'sync.Mutex': GOP + 'sync#Mutex', 'math.Pi': GOP + 'math#pkg-constants', 'time.Sleep': GOP + 'time#Sleep',
    append: GOP + 'builtin#append', make: GOP + 'builtin#make', len: GOP + 'builtin#len', cap: GOP + 'builtin#cap', delete: GOP + 'builtin#delete', panic: GOP + 'builtin#panic',
    min: GOP + 'builtin#min', max: GOP + 'builtin#max', error: GOP + 'builtin#error', any: GOP + 'builtin#any', rune: GOP + 'builtin#rune', nil: GOP + 'builtin#nil',
    package: SPEC + 'Package_clause', import: SPEC + 'Import_declarations', func: SPEC + 'Function_declarations', ':=': SPEC + 'Short_variable_declarations',
    var: SPEC + 'Variable_declarations', for: SPEC + 'For_statements', range: SPEC + 'For_range', switch: SPEC + 'Switch_statements', if: SPEC + 'If_statements',
    return: SPEC + 'Return_statements', defer: SPEC + 'Defer_statements', go: SPEC + 'Go_statements', chan: SPEC + 'Channel_types', select: SPEC + 'Select_statements',
    struct: SPEC + 'Struct_types', interface: SPEC + 'Interface_types', map: SPEC + 'Map_types', type: SPEC + 'Type_declarations', '<-': SPEC + 'Receive_operator',
  };

  // ---- Rust
  const RST = 'https://doc.rust-lang.org/std/';
  const rust = {
    'println!': RST + 'macro.println.html', 'print!': RST + 'macro.print.html', 'format!': RST + 'macro.format.html', 'vec!': RST + 'macro.vec.html', 'panic!': RST + 'macro.panic.html',
    'assert_eq!': RST + 'macro.assert_eq.html', String: RST + 'string/struct.String.html', Vec: RST + 'vec/struct.Vec.html', HashMap: RST + 'collections/struct.HashMap.html',
    BTreeMap: RST + 'collections/struct.BTreeMap.html', HashSet: RST + 'collections/struct.HashSet.html', VecDeque: RST + 'collections/struct.VecDeque.html',
    Option: RST + 'option/enum.Option.html', Some: RST + 'option/enum.Option.html#variant.Some', None: RST + 'option/enum.Option.html#variant.None',
    Result: RST + 'result/enum.Result.html', Ok: RST + 'result/enum.Result.html#variant.Ok', Err: RST + 'result/enum.Result.html#variant.Err', Box: RST + 'boxed/struct.Box.html',
    '.push': RST + 'vec/struct.Vec.html#method.push', '.pop': RST + 'vec/struct.Vec.html#method.pop', '.len': RST + 'vec/struct.Vec.html#method.len', '.is_empty': RST + 'vec/struct.Vec.html#method.is_empty',
    '.iter': RST + 'primitive.slice.html#method.iter', '.swap': RST + 'primitive.slice.html#method.swap', '.extend_from_slice': RST + 'vec/struct.Vec.html#method.extend_from_slice',
    '.chars': RST + 'primitive.str.html#method.chars', '.split_whitespace': RST + 'primitive.str.html#method.split_whitespace', '.trim': RST + 'primitive.str.html#method.trim',
    '.parse': RST + 'primitive.str.html#method.parse', '.push_str': RST + 'string/struct.String.html#method.push_str', '.to_string': RST + 'string/trait.ToString.html',
    '.clone': RST + 'clone/trait.Clone.html', '.entry': RST + 'collections/struct.HashMap.html#method.entry', '.or_insert': RST + 'collections/hash_map/enum.Entry.html#method.or_insert',
    '.insert': RST + 'collections/struct.HashMap.html#method.insert', '.get': RST + 'collections/struct.HashMap.html#method.get', '.unwrap': RST + 'option/enum.Option.html#method.unwrap',
    '.map_err': RST + 'result/enum.Result.html#method.map_err', '.abs': RST + 'primitive.i32.html#method.abs', '.max': RST + 'cmp/trait.Ord.html#method.max', '.min': RST + 'cmp/trait.Ord.html#method.min',
    fn: RST + 'keyword.fn.html', let: RST + 'keyword.let.html', mut: RST + 'keyword.mut.html', match: RST + 'keyword.match.html', impl: RST + 'keyword.impl.html',
    struct: RST + 'keyword.struct.html', enum: RST + 'keyword.enum.html', trait: RST + 'keyword.trait.html', use: RST + 'keyword.use.html', for: RST + 'keyword.for.html',
    while: RST + 'keyword.while.html', loop: RST + 'keyword.loop.html', return: RST + 'keyword.return.html', self: RST + 'keyword.self.html', ref: RST + 'keyword.ref.html',
    i32: RST + 'primitive.i32.html', usize: RST + 'primitive.usize.html', f64: RST + 'primitive.f64.html', str: RST + 'primitive.str.html', char: RST + 'primitive.char.html', bool: RST + 'primitive.bool.html',
    '#[derive': 'https://doc.rust-lang.org/reference/attributes/derive.html', '&mut': 'https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html#mutable-references',
  };
  ['map', 'filter', 'collect', 'sum', 'count', 'find', 'copied', 'cloned', 'enumerate', 'zip', 'rev', 'fold', 'any', 'all'].forEach((m) => (rust['.' + m] = RST + 'iter/trait.Iterator.html#method.' + m));

  const label = { typescript: 'TypeScript Handbook', go: 'Go docs', rust: 'Rust std docs', python: 'Python docs', javascript: 'MDN', java: 'Java SE 21 API', csharp: 'Microsoft Learn', cpp: 'cppreference', sql: 'PostgreSQL docs', react: 'react.dev' };
  CL.docsMap = { python: py, javascript: js, typescript: ts, java, csharp: cs, cpp, go, rust, sql, react };
  CL.docsLabel = label;
  // Where to learn more about each language as a whole
  CL.langHome = {
    python: { label: 'Python 3 documentation', url: PY },
    javascript: { label: 'MDN JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    java: { label: 'Java SE 21 API', url: J.replace('java.base/', 'index.html') },
    csharp: { label: 'C# on Microsoft Learn', url: MS + 'csharp/' },
    typescript: { label: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
    go: { label: 'Go documentation', url: 'https://go.dev/doc/' },
    rust: { label: 'The Rust Book', url: 'https://doc.rust-lang.org/book/' },
    cpp: { label: 'cppreference.com', url: 'https://en.cppreference.com/w/cpp' },
    sql: { label: 'PostgreSQL manual', url: PG },
    react: { label: 'react.dev', url: RD },
  };
})(typeof window !== 'undefined' ? window : globalThis);
