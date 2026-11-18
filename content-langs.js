(function (G) {
  const CL = (G.CL = G.CL || {});
  const L = (CL.langLessons = {});

  /* ======================= PYTHON ======================= */
  L.python = [
    { id: 'py-basics', title: 'Variables, Types & Printing', minutes: 10,
      concept: `<p>Python is dynamically typed: a variable is a name bound to a value, and the value carries its type. Indentation (4 spaces) defines blocks instead of braces.</p>
<pre class="snippet">name = "Ada"          # str
age = 36              # int
height = 1.65         # float
is_admin = False      # bool
print(f"{name} is {age}")   # f-string formatting
print(type(age))            # &lt;class 'int'&gt;</pre>`,
      keyPoints: ['f-strings: f"{value}" interpolate expressions.', 'Integers have unlimited size in Python.', 'Use snake_case for names (PEP 8).'],
      docs: [{ label: 'Python tutorial: An informal introduction', url: 'https://docs.python.org/3/tutorial/introduction.html' }, { label: 'f-strings (formatted string literals)', url: 'https://docs.python.org/3/reference/lexical_analysis.html#f-strings' }, { label: 'Built-in types', url: 'https://docs.python.org/3/library/stdtypes.html' }],
      quiz: [{ q: 'What does print(7 // 2, 7 / 2) output?', options: ['3 3.5', '3.5 3.5', '3 3', '4 3.5'], answer: 0, why: '// is floor division; / always returns a float.' }, { q: 'What determines a block in Python?', options: ['Indentation', 'Curly braces', 'BEGIN/END', 'Semicolons'], answer: 0, why: 'Consistent indentation marks a block.' }],
      exercise: { prompt: 'Create variables <code>language = "Python"</code> and <code>year = 1991</code>, then print exactly: <code>Python was released in 1991</code>', starter: '# Create the two variables, then print the sentence with an f-string\n', expected: 'Python was released in 1991', solution: 'language = "Python"\nyear = 1991\nprint(f"{language} was released in {year}")\n' } },
    { id: 'py-control', title: 'Conditionals & Loops', minutes: 12,
      concept: `<p><code>if / elif / else</code> branch; <code>for</code> iterates over any iterable; <code>while</code> loops on a condition. <code>range(start, stop, step)</code> produces numbers up to but <em>not including</em> stop.</p>
<pre class="snippet">for i in range(1, 6):
    if i % 2 == 0:
        print(i, "even")
    else:
        print(i, "odd")

for index, fruit in enumerate(["apple", "kiwi"]):
    print(index, fruit)</pre>`,
      keyPoints: ['range stop is exclusive.', 'enumerate() gives index and value together.', 'and / or / not are words, not symbols.'],
      docs: [{ label: 'Control flow tools', url: 'https://docs.python.org/3/tutorial/controlflow.html' }, { label: 'range()', url: 'https://docs.python.org/3/library/stdtypes.html#range' }, { label: 'enumerate()', url: 'https://docs.python.org/3/library/functions.html#enumerate' }],
      quiz: [{ q: 'What does list(range(2, 10, 3)) produce?', options: ['[2, 5, 8]', '[2, 5, 8, 11]', '[3, 6, 9]', '[2, 4, 6, 8]'], answer: 0, why: 'Start 2, step 3, stop before 10.' }],
      exercise: { prompt: 'FizzBuzz 1–15: print each number, but print <code>Fizz</code> for multiples of 3, <code>Buzz</code> for multiples of 5, and <code>FizzBuzz</code> for multiples of both. One value per line.', starter: 'for i in range(1, 16):\n    # your logic here\n    pass\n', expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', solution: 'for i in range(1, 16):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)\n' } },
    { id: 'py-functions', title: 'Functions', minutes: 12,
      concept: `<p>Define functions with <code>def</code>. Parameters can have default values, and callers can pass arguments by name. Type hints document intent (they are not enforced at runtime).</p>
<pre class="snippet">def greet(name: str, greeting: str = "Hello") -> str:
    """Return a greeting."""   # docstring
    return f"{greeting}, {name}!"

print(greet("Grace"))                  # Hello, Grace!
print(greet("Linus", greeting="Hi"))   # keyword argument
square = lambda x: x * x               # small anonymous function</pre>`,
      keyPoints: ['A function without return returns None.', 'Never use a mutable default like def f(x=[]).', 'Docstrings document what a function does.'],
      docs: [{ label: 'Defining functions', url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions' }, { label: 'Type hints (typing)', url: 'https://docs.python.org/3/library/typing.html' }, { label: 'Lambda expressions', url: 'https://docs.python.org/3/tutorial/controlflow.html#lambda-expressions' }],
      quiz: [{ q: 'What does a Python function return if it has no return statement?', options: ['None', '0', 'An empty string', 'It raises an error'], answer: 0, why: 'Falling off the end of a function returns None.' }],
      exercise: { prompt: 'Write <code>area(width, height=1)</code> that returns width × height. Then print <code>area(3, 4)</code> and <code>area(5)</code> on separate lines.', starter: 'def area(width, height=1):\n    pass\n\nprint(area(3, 4))\nprint(area(5))\n', expected: '12\n5', solution: 'def area(width, height=1):\n    return width * height\n\nprint(area(3, 4))\nprint(area(5))\n' } },
    { id: 'py-collections', title: 'Lists, Dicts & Comprehensions', minutes: 15,
      concept: `<p>Core collections: <code>list</code> (ordered, mutable), <code>tuple</code> (ordered, immutable), <code>dict</code> (key → value), <code>set</code> (unique items). <strong>Comprehensions</strong> build them in one readable line.</p>
<pre class="snippet">nums = [3, 1, 4, 1, 5]
squares = [n * n for n in nums]              # [9, 1, 16, 1, 25]
evens = [n for n in nums if n % 2 == 0]      # [4]
ages = {"ana": 31, "bo": 25}
ages["cy"] = 40
by_len = {w: len(w) for w in ["hi", "hello"]}
unique = set(nums)                            # {1, 3, 4, 5}</pre>`,
      keyPoints: ['Comprehension: [expr for item in iterable if cond].', 'dict.get(key, default) avoids KeyError.', 'Sets give O(1) membership tests.'],
      docs: [{ label: 'Data structures tutorial', url: 'https://docs.python.org/3/tutorial/datastructures.html' }, { label: 'List comprehensions', url: 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions' }, { label: 'dict methods', url: 'https://docs.python.org/3/library/stdtypes.html#mapping-types-dict' }],
      quiz: [{ q: 'What is {x % 3 for x in range(6)}?', options: ['{0, 1, 2}', '[0, 1, 2, 0, 1, 2]', '{0, 1, 2, 0, 1, 2}', '(0, 1, 2)'], answer: 0, why: 'Braces without a colon make a set, which drops duplicates.' }],
      exercise: { prompt: 'Given <code>words = ["apple", "fig", "banana", "kiwi"]</code>, use a list comprehension to print a list of words longer than 3 characters, uppercased: <code>[\'APPLE\', \'BANANA\', \'KIWI\']</code>', starter: 'words = ["apple", "fig", "banana", "kiwi"]\nresult = []  # replace with a comprehension\nprint(result)\n', expected: "['APPLE', 'BANANA', 'KIWI']", solution: 'words = ["apple", "fig", "banana", "kiwi"]\nresult = [w.upper() for w in words if len(w) > 3]\nprint(result)\n' } },
    { id: 'py-classes', title: 'Classes & Objects', minutes: 15,
      concept: `<p>A <code>class</code> bundles data (attributes) and behavior (methods). <code>__init__</code> runs when you create an instance; <code>self</code> is the instance. <code>@dataclass</code> generates the boilerplate for simple data holders.</p>
<pre class="snippet">class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("amount must be positive")
        self.balance += amount

    def __str__(self):
        return f"{self.owner}: \${self.balance}"

acct = Account("Ada")
acct.deposit(50)
print(acct)   # Ada: $50</pre>`,
      keyPoints: ['self is passed automatically on method calls.', '__str__ controls print() output.', 'Inheritance: class Savings(Account).'],
      docs: [{ label: 'Classes tutorial', url: 'https://docs.python.org/3/tutorial/classes.html' }, { label: 'dataclasses', url: 'https://docs.python.org/3/library/dataclasses.html' }, { label: 'Errors and exceptions', url: 'https://docs.python.org/3/tutorial/errors.html' }],
      quiz: [{ q: 'Which method runs when you write Account("Ada")?', options: ['__init__', '__str__', '__new_instance__', 'constructor'], answer: 0, why: '__init__ initializes the newly created object.' }],
      exercise: { prompt: 'Write a class <code>Counter</code> with a <code>count</code> attribute starting at 0 and a method <code>increment()</code>. Create one, call increment 3 times, and print <code>count</code>.', starter: 'class Counter:\n    pass\n\nc = Counter()\n# call increment three times, then print c.count\n', expected: '3', solution: 'class Counter:\n    def __init__(self):\n        self.count = 0\n\n    def increment(self):\n        self.count += 1\n\nc = Counter()\nfor _ in range(3):\n    c.increment()\nprint(c.count)\n' } },
  ];

  /* ======================= JAVASCRIPT ======================= */
  L.javascript = [
    { id: 'js-basics', title: 'Variables, Types & Console', minutes: 10,
      concept: `<p>Declare with <code>const</code> (can't be reassigned) by default and <code>let</code> when the value changes. Avoid <code>var</code>. Template literals use backticks.</p>
<pre class="snippet">const name = "Ada";
let score = 10;
score += 5;
console.log(\`\${name} scored \${score}\`);
console.log(typeof score);       // "number"
console.log(0.1 + 0.2 === 0.3);  // false: floating point!
console.log("5" == 5, "5" === 5); // true false</pre>`,
      keyPoints: ['Prefer const, then let; never var.', 'Always use === (strict equality).', 'All numbers are 64-bit floats (use BigInt for huge integers).'],
      docs: [{ label: 'JavaScript Guide: Grammar and types (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types' }, { label: 'Template literals (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals' }, { label: 'Equality comparisons (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness' }],
      quiz: [{ q: 'What does "5" + 3 evaluate to?', options: ['"53"', '8', 'NaN', 'TypeError'], answer: 0, why: '+ with a string concatenates.' }, { q: 'Which declaration prevents reassignment?', options: ['const', 'let', 'var', 'static'], answer: 0, why: 'const bindings cannot be reassigned (objects they point to can still be mutated).' }],
      exercise: { prompt: 'Declare <code>const lang = "JavaScript"</code> and <code>const year = 1995</code>, then log exactly: <code>JavaScript was released in 1995</code> using a template literal.', starter: '// declare the constants, then console.log a template literal\n', expected: 'JavaScript was released in 1995', solution: 'const lang = "JavaScript";\nconst year = 1995;\nconsole.log(`${lang} was released in ${year}`);\n' } },
    { id: 'js-control', title: 'Conditionals & Loops', minutes: 12,
      concept: `<p>JavaScript has C-style <code>for</code>, plus <code>for...of</code> for values of an iterable and <code>for...in</code> for object keys. Watch for <em>truthy/falsy</em> values: <code>0, "", null, undefined, NaN, false</code> are falsy.</p>
<pre class="snippet">for (let i = 1; i <= 3; i++) console.log(i);
for (const fruit of ["apple", "kiwi"]) console.log(fruit);
const label = score >= 50 ? "pass" : "fail";   // ternary
const user = null;
console.log(user?.name ?? "guest");           // optional chaining + nullish coalescing</pre>`,
      keyPoints: ['for...of → values; for...in → keys.', '?. safely reads nested properties.', '?? falls back only on null/undefined.'],
      docs: [{ label: 'Loops and iteration (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration' }, { label: 'for...of (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of' }, { label: 'Nullish coalescing ?? (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing' }],
      quiz: [{ q: 'What does 0 || "default" return? And 0 ?? "default"?', options: ['"default" and 0', '0 and "default"', '"default" and "default"', '0 and 0'], answer: 0, why: '|| treats 0 as falsy; ?? only replaces null/undefined.' }],
      exercise: { prompt: 'FizzBuzz 1–15 with console.log: multiples of 3 → <code>Fizz</code>, of 5 → <code>Buzz</code>, of both → <code>FizzBuzz</code>, otherwise the number.', starter: 'for (let i = 1; i <= 15; i++) {\n  // your logic here\n}\n', expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', solution: 'for (let i = 1; i <= 15; i++) {\n  if (i % 15 === 0) console.log("FizzBuzz");\n  else if (i % 3 === 0) console.log("Fizz");\n  else if (i % 5 === 0) console.log("Buzz");\n  else console.log(i);\n}\n' } },
    { id: 'js-functions', title: 'Functions & Closures', minutes: 15,
      concept: `<p>Functions are values: you can store them, pass them, and return them. Arrow functions are concise and don't have their own <code>this</code>. A <strong>closure</strong> is a function that remembers variables from where it was created.</p>
<pre class="snippet">function add(a, b = 0) { return a + b; }
const double = (x) => x * 2;

function makeCounter() {
  let count = 0;                 // captured by the closure
  return () => ++count;
}
const next = makeCounter();
next(); next();
console.log(next());             // 3</pre>`,
      keyPoints: ['Arrow functions: (args) => expression.', 'Closures keep private state alive.', 'Default params: function f(x = 1).'],
      docs: [{ label: 'Functions guide (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions' }, { label: 'Arrow functions (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions' }, { label: 'Closures (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closure' }],
      quiz: [{ q: 'Why does makeCounter()\'s count survive after makeCounter returns?', options: ['The returned function closes over it', 'It is a global variable', 'let variables never get freed', 'JavaScript copies it into the function'], answer: 0, why: 'Closures keep a reference to their outer scope.' }],
      exercise: { prompt: 'Write <code>makeMultiplier(n)</code> that returns a function multiplying its argument by n. Log <code>triple(5)</code> and <code>makeMultiplier(10)(4)</code>, one per line.', starter: 'function makeMultiplier(n) {\n  // return a function\n}\n\nconst triple = makeMultiplier(3);\nconsole.log(triple(5));\nconsole.log(makeMultiplier(10)(4));\n', expected: '15\n40', solution: 'function makeMultiplier(n) {\n  return (x) => x * n;\n}\n\nconst triple = makeMultiplier(3);\nconsole.log(triple(5));\nconsole.log(makeMultiplier(10)(4));\n' } },
    { id: 'js-arrays', title: 'Arrays & Objects', minutes: 15,
      concept: `<p>Arrays have powerful methods that take callbacks: <code>map</code> transforms, <code>filter</code> keeps matches, <code>reduce</code> folds into one value. Objects hold named properties; destructuring and spread make them easy to work with.</p>
<pre class="snippet">const nums = [3, 1, 4, 1, 5];
const squares = nums.map(n => n * n);
const evens = nums.filter(n => n % 2 === 0);
const total = nums.reduce((sum, n) => sum + n, 0);

const user = { name: "Ada", role: "admin" };
const { name, role } = user;                 // destructuring
const updated = { ...user, role: "owner" };  // spread copy</pre>`,
      keyPoints: ['map/filter return NEW arrays.', 'Give reduce an initial value.', 'Spread {...obj} makes a shallow copy.'],
      docs: [{ label: 'Array.prototype.map (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map' }, { label: 'Array.prototype.reduce (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce' }, { label: 'Destructuring (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment' }],
      quiz: [{ q: '[1, 2, 3].map(x => x * 2).filter(x => x > 2) returns…', options: ['[4, 6]', '[2, 4, 6]', '[3]', '[6]'], answer: 0, why: 'map gives [2, 4, 6], then filter keeps values above 2.' }],
      exercise: { prompt: 'Given the <code>orders</code> array, log the total of orders with status <code>"paid"</code> using filter + reduce. Expected: <code>175</code>', starter: 'const orders = [\n  { id: 1, amount: 100, status: "paid" },\n  { id: 2, amount: 40, status: "refunded" },\n  { id: 3, amount: 75, status: "paid" },\n];\n\n// log the paid total\n', expected: '175', solution: 'const orders = [\n  { id: 1, amount: 100, status: "paid" },\n  { id: 2, amount: 40, status: "refunded" },\n  { id: 3, amount: 75, status: "paid" },\n];\n\nconst total = orders\n  .filter(o => o.status === "paid")\n  .reduce((sum, o) => sum + o.amount, 0);\nconsole.log(total);\n' } },
    { id: 'js-async', title: 'Promises & async/await', minutes: 18,
      concept: `<p>JavaScript runs on one thread with an <strong>event loop</strong>. Slow work (network, timers) returns a <code>Promise</code>, a placeholder for a future value. <code>async/await</code> lets you write asynchronous code that reads top-to-bottom.</p>
<pre class="snippet">const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function load() {
  try {
    await wait(100);
    const [a, b] = await Promise.all([getA(), getB()]); // run in parallel
    return a + b;
  } catch (err) {
    console.error("failed:", err);
  }
}</pre>`,
      keyPoints: ['await pauses only the async function, not the page.', 'Promise.all runs tasks concurrently.', 'Wrap awaits in try/catch to handle rejections.'],
      docs: [{ label: 'Using promises (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises' }, { label: 'async function (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function' }, { label: 'Event loop (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop' }],
      quiz: [{ q: 'In what order are these logged? console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C");', options: ['A C B', 'A B C', 'B A C', 'C A B'], answer: 0, why: 'setTimeout callbacks run after the current synchronous code finishes.' }],
      exercise: { prompt: 'Complete <code>main()</code> so it awaits <code>fetchScore("ada")</code> and <code>fetchScore("bo")</code> <em>in parallel</em> with Promise.all, then logs their sum. Expected: <code>19</code>', starter: 'const fetchScore = (name) =>\n  new Promise(resolve => setTimeout(() => resolve(name.length * 3 + 2), 50));\n\nasync function main() {\n  // await both with Promise.all, then log the sum\n}\n\nmain();\n', expected: '19', solution: 'const fetchScore = (name) =>\n  new Promise(resolve => setTimeout(() => resolve(name.length * 3 + 2), 50));\n\nasync function main() {\n  const [a, b] = await Promise.all([fetchScore("ada"), fetchScore("bo")]);\n  console.log(a + b);\n}\n\nmain();\n' } },
  ];

  /* ======================= JAVA ======================= */
  const JDOC = 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/';
  L.java = [
    { id: 'java-basics', title: 'Program Structure & Types', minutes: 12,
      concept: `<p>Java is statically typed and compiled to bytecode that runs on the JVM. Every program starts at <code>public static void main(String[] args)</code> inside a class. Primitives (<code>int, double, boolean, char</code>) hold values; everything else is an object reference.</p>
<pre class="snippet">public class Main {
    public static void main(String[] args) {
        String name = "Ada";
        int age = 36;
        var height = 1.65;            // type inferred (Java 10+)
        System.out.println(name + " is " + age);
        System.out.printf("%.1f m%n", height);
    }
}</pre>`,
      keyPoints: ['File name must match the public class name.', 'Compare strings with .equals(), not ==.', 'var infers local types but stays statically typed.'],
      docs: [{ label: 'Java Tutorials: Language Basics', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/index.html' }, { label: 'java.lang.String', url: JDOC + 'java/lang/String.html' }, { label: 'java.io.PrintStream (println/printf)', url: JDOC + 'java/io/PrintStream.html' }],
      quiz: [{ q: 'Why can "a" == new String("a") be false in Java?', options: ['== compares references, not contents', 'Strings are mutable', 'Java has no == for objects', 'Because of autoboxing'], answer: 0, why: 'Use .equals() to compare string contents.' }, { q: 'What does 7 / 2 evaluate to with int operands?', options: ['3', '3.5', '4', 'Compile error'], answer: 0, why: 'Integer division truncates toward zero.' }],
      exercise: { prompt: 'Complete <code>main</code> to print exactly: <code>Java was released in 1995</code> using variables <code>lang</code> and <code>year</code>.', starter: 'public class Main {\n    public static void main(String[] args) {\n        // declare lang and year, then print the sentence\n    }\n}\n', expected: 'Java was released in 1995', solution: 'public class Main {\n    public static void main(String[] args) {\n        String lang = "Java";\n        int year = 1995;\n        System.out.println(lang + " was released in " + year);\n    }\n}\n' } },
    { id: 'java-control', title: 'Control Flow & Methods', minutes: 12,
      concept: `<p>Java's <code>if/else</code>, <code>for</code>, <code>while</code> and enhanced <code>for</code> (for-each) look like C. Modern Java adds <strong>switch expressions</strong>. Static methods belong to the class and are called without an instance.</p>
<pre class="snippet">static String grade(int score) {
    return switch (score / 10) {
        case 10, 9 -> "A";
        case 8 -> "B";
        default -> "C or below";
    };
}

for (int n : new int[]{1, 2, 3}) {
    System.out.println(n + " -> " + grade(n * 30));
}</pre>`,
      keyPoints: ['Methods declare parameter and return types.', 'switch expressions use -> and need no break.', 'for-each works on arrays and any Iterable.'],
      docs: [{ label: 'Control flow statements', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html' }, { label: 'Switch expressions (JEP 361)', url: 'https://openjdk.org/jeps/361' }, { label: 'Defining methods', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html' }],
      quiz: [{ q: 'A method declared static…', options: ['Can be called without creating an instance', 'Cannot return a value', 'Cannot take parameters', 'Runs automatically at startup'], answer: 0, why: 'static methods belong to the class itself.' }],
      exercise: { prompt: 'Write a static method <code>fizz(int n)</code> returning "Fizz"/"Buzz"/"FizzBuzz" or the number as a String, then print 1–15, one per line.', starter: 'public class Main {\n    static String fizz(int n) {\n        return "";\n    }\n\n    public static void main(String[] args) {\n        for (int i = 1; i <= 15; i++) {\n            System.out.println(fizz(i));\n        }\n    }\n}\n', expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', solution: 'public class Main {\n    static String fizz(int n) {\n        if (n % 15 == 0) return "FizzBuzz";\n        if (n % 3 == 0) return "Fizz";\n        if (n % 5 == 0) return "Buzz";\n        return String.valueOf(n);\n    }\n\n    public static void main(String[] args) {\n        for (int i = 1; i <= 15; i++) {\n            System.out.println(fizz(i));\n        }\n    }\n}\n' } },
    { id: 'java-collections', title: 'Collections & Generics', minutes: 15,
      concept: `<p>The Collections Framework provides interfaces (<code>List, Set, Map</code>) and implementations (<code>ArrayList, HashSet, HashMap</code>). <strong>Generics</strong> (<code>List&lt;String&gt;</code>) give compile-time type safety. Program to the interface type.</p>
<pre class="snippet">import java.util.*;

List&lt;String&gt; names = new ArrayList&lt;&gt;(List.of("Bo", "Ada"));
names.add("Cy");
Collections.sort(names);                     // [Ada, Bo, Cy]

Map&lt;String, Integer&gt; ages = new HashMap&lt;&gt;();
ages.put("Ada", 36);
ages.merge("Ada", 1, Integer::sum);           // 37
for (Map.Entry&lt;String, Integer&gt; e : ages.entrySet())
    System.out.println(e.getKey() + "=" + e.getValue());</pre>`,
      keyPoints: ['Generics only take object types: List<Integer>, not List<int>.', 'List.of(...) creates an immutable list.', 'HashMap has no ordering; TreeMap is sorted.'],
      docs: [{ label: 'Collections Framework overview', url: 'https://docs.oracle.com/en/java/javase/21/core/java-collections-framework.html' }, { label: 'java.util.ArrayList', url: JDOC + 'java/util/ArrayList.html' }, { label: 'java.util.HashMap', url: JDOC + 'java/util/HashMap.html' }],
      quiz: [{ q: 'Which is valid Java?', options: ['List<Integer> xs = new ArrayList<>();', 'List<int> xs = new ArrayList<>();', 'ArrayList xs<int> = new ArrayList();', 'List xs = int[];'], answer: 0, why: 'Generic type arguments must be reference types like Integer.' }],
      exercise: { prompt: 'Count word frequencies in <code>"the cat and the hat"</code> with a <code>TreeMap&lt;String,Integer&gt;</code> (sorted keys) and print the map. Expected: <code>{and=1, cat=1, hat=1, the=2}</code>', starter: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        String text = "the cat and the hat";\n        Map<String, Integer> counts = new TreeMap<>();\n        // fill counts\n        System.out.println(counts);\n    }\n}\n', expected: '{and=1, cat=1, hat=1, the=2}', solution: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        String text = "the cat and the hat";\n        Map<String, Integer> counts = new TreeMap<>();\n        for (String w : text.split(" ")) {\n            counts.merge(w, 1, Integer::sum);\n        }\n        System.out.println(counts);\n    }\n}\n' } },
    { id: 'java-oop', title: 'Classes, Interfaces & Records', minutes: 18,
      concept: `<p>Java is built around classes. <strong>Encapsulation</strong>: keep fields <code>private</code> and expose methods. <strong>Interfaces</strong> define contracts that many classes can implement. <strong>Records</strong> (Java 16+) are concise immutable data classes.</p>
<pre class="snippet">interface Shape { double area(); }

record Circle(double r) implements Shape {
    public double area() { return Math.PI * r * r; }
}
record Rect(double w, double h) implements Shape {
    public double area() { return w * h; }
}

List&lt;Shape&gt; shapes = List.of(new Circle(1), new Rect(2, 3));
for (Shape s : shapes) System.out.println(s + " " + s.area());</pre>`,
      keyPoints: ['Polymorphism: call area() without knowing the concrete type.', 'Records auto-generate constructor, getters, equals, hashCode, toString.', 'A class extends one class but can implement many interfaces.'],
      docs: [{ label: 'Interfaces and inheritance', url: 'https://docs.oracle.com/javase/tutorial/java/IandI/index.html' }, { label: 'Record classes', url: 'https://docs.oracle.com/en/java/javase/21/language/records.html' }, { label: 'java.lang.Math', url: JDOC + 'java/lang/Math.html' }],
      quiz: [{ q: 'What does a record NOT generate automatically?', options: ['Setters', 'A canonical constructor', 'equals() and hashCode()', 'toString()'], answer: 0, why: 'Record fields are final, so there are no setters.' }],
      exercise: { prompt: 'Create <code>record Point(int x, int y)</code> with a method <code>int manhattan()</code> returning |x| + |y|. Print <code>new Point(3, -4)</code> then its manhattan distance.', starter: 'public class Main {\n    // declare the record here\n\n    public static void main(String[] args) {\n        // create Point(3, -4), print it, then print manhattan()\n    }\n}\n', expected: 'Point[x=3, y=-4]\n7', solution: 'public class Main {\n    record Point(int x, int y) {\n        int manhattan() { return Math.abs(x) + Math.abs(y); }\n    }\n\n    public static void main(String[] args) {\n        Point p = new Point(3, -4);\n        System.out.println(p);\n        System.out.println(p.manhattan());\n    }\n}\n' } },
    { id: 'java-streams', title: 'Lambdas & Streams', minutes: 15,
      concept: `<p>Lambdas are short functions: <code>x -&gt; x * 2</code>. The <strong>Stream API</strong> chains operations over collections declaratively, similar to JavaScript's map/filter/reduce.</p>
<pre class="snippet">List&lt;Integer&gt; nums = List.of(3, 1, 4, 1, 5, 9);
int sumOfEvenSquares = nums.stream()
    .filter(n -> n % 2 == 0)
    .mapToInt(n -> n * n)
    .sum();                                      // 16

List&lt;String&gt; words = List.of("kiwi", "apple", "fig");
List&lt;String&gt; sorted = words.stream().sorted().toList();</pre>`,
      keyPoints: ['Streams are lazy until a terminal op (sum, toList, collect).', 'A stream can be consumed only once.', 'Method references: String::length.'],
      docs: [{ label: 'Lambda expressions', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html' }, { label: 'java.util.stream.Stream', url: JDOC + 'java/util/stream/Stream.html' }, { label: 'java.util.stream.Collectors', url: JDOC + 'java/util/stream/Collectors.html' }],
      quiz: [{ q: 'Which is a terminal stream operation?', options: ['collect', 'filter', 'map', 'sorted'], answer: 0, why: 'filter/map/sorted are intermediate; collect produces a result.' }],
      exercise: { prompt: 'Using a stream, print the names longer than 3 letters, uppercased, as a list. Expected: <code>[ALICE, CAROL]</code>', starter: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = List.of("alice", "bob", "carol", "dan");\n        // stream, filter, map, toList, then print\n    }\n}\n', expected: '[ALICE, CAROL]', solution: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = List.of("alice", "bob", "carol", "dan");\n        List<String> result = names.stream()\n            .filter(n -> n.length() > 3)\n            .map(String::toUpperCase)\n            .toList();\n        System.out.println(result);\n    }\n}\n' } },
  ];

  /* ======================= C# ======================= */
  const MS = 'https://learn.microsoft.com/en-us/dotnet/';
  L.csharp = [
    { id: 'cs-basics', title: 'Program Structure & Types', minutes: 12,
      concept: `<p>C# is a statically typed language on .NET. A console app starts at <code>static void Main()</code> (or uses top-level statements in modern templates). Value types (<code>int, double, bool, struct</code>) live inline; reference types (<code>string, class</code>) are objects.</p>
<pre class="snippet">using System;

public class Program
{
    public static void Main()
    {
        string name = "Ada";
        int age = 36;
        var height = 1.65;                     // inferred double
        Console.WriteLine($"{name} is {age}"); // string interpolation
        Console.WriteLine($"{height:F1} m");
    }
}</pre>`,
      keyPoints: ['$"..." interpolates values.', 'string == compares contents in C# (unlike Java).', 'Nullable reference types flag possible nulls at compile time.'],
      docs: [{ label: 'C# tour', url: MS + 'csharp/tour-of-csharp/' }, { label: 'String interpolation ($)', url: MS + 'csharp/language-reference/tokens/interpolated' }, { label: 'Console.WriteLine', url: MS + 'api/system.console.writeline' }],
      quiz: [{ q: 'In C#, "abc" == "ab" + "c" is…', options: ['true: string == compares contents', 'false: it compares references', 'A compile error', 'Undefined'], answer: 0, why: 'C# overloads == for strings to compare values.' }],
      exercise: { prompt: 'Print exactly <code>C# was released in 2000</code> using variables <code>lang</code> and <code>year</code> and string interpolation.', starter: 'using System;\n\npublic class Program\n{\n    public static void Main()\n    {\n        // declare lang and year, then Console.WriteLine an interpolated string\n    }\n}\n', expected: 'C# was released in 2000', solution: 'using System;\n\npublic class Program\n{\n    public static void Main()\n    {\n        string lang = "C#";\n        int year = 2000;\n        Console.WriteLine($"{lang} was released in {year}");\n    }\n}\n' } },
    { id: 'cs-control', title: 'Control Flow & Methods', minutes: 12,
      concept: `<p>Familiar <code>if/for/while/foreach</code>, plus <strong>switch expressions</strong> and <strong>pattern matching</strong>. Methods can have optional and named parameters.</p>
<pre class="snippet">static string Classify(int n) => n switch
{
    < 0 => "negative",
    0 => "zero",
    > 0 and < 10 => "small",
    _ => "large",
};

static int Area(int w, int h = 1) => w * h;
Console.WriteLine(Area(h: 4, w: 3));   // named arguments</pre>`,
      keyPoints: ['=> defines expression-bodied members.', '_ is the discard / default pattern.', 'foreach iterates any IEnumerable.'],
      docs: [{ label: 'Selection statements (if, switch)', url: MS + 'csharp/language-reference/statements/selection-statements' }, { label: 'switch expression', url: MS + 'csharp/language-reference/operators/switch-expression' }, { label: 'Iteration statements (for, foreach)', url: MS + 'csharp/language-reference/statements/iteration-statements' }],
      quiz: [{ q: 'In a switch expression, what does _ match?', options: ['Anything not matched above', 'Only null', 'Only zero', 'Nothing; it is a syntax error'], answer: 0, why: '_ is the discard pattern, the catch-all case.' }],
      exercise: { prompt: 'Write <code>static string Fizz(int n)</code> using a switch expression, then print 1–15 one per line (FizzBuzz rules).', starter: 'using System;\n\npublic class Program\n{\n    static string Fizz(int n) => n.ToString();\n\n    public static void Main()\n    {\n        for (int i = 1; i <= 15; i++) Console.WriteLine(Fizz(i));\n    }\n}\n', expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', solution: 'using System;\n\npublic class Program\n{\n    static string Fizz(int n) => (n % 3, n % 5) switch\n    {\n        (0, 0) => "FizzBuzz",\n        (0, _) => "Fizz",\n        (_, 0) => "Buzz",\n        _ => n.ToString(),\n    };\n\n    public static void Main()\n    {\n        for (int i = 1; i <= 15; i++) Console.WriteLine(Fizz(i));\n    }\n}\n' } },
    { id: 'cs-collections', title: 'Collections & Generics', minutes: 15,
      concept: `<p>The <code>System.Collections.Generic</code> namespace provides <code>List&lt;T&gt;</code>, <code>Dictionary&lt;TKey,TValue&gt;</code>, <code>HashSet&lt;T&gt;</code>, <code>Queue&lt;T&gt;</code>, <code>Stack&lt;T&gt;</code>. Unlike Java, generics work with value types like <code>int</code> directly.</p>
<pre class="snippet">var names = new List&lt;string&gt; { "Bo", "Ada" };
names.Add("Cy");
names.Sort();

var ages = new Dictionary&lt;string, int&gt;();
ages["Ada"] = 36;
if (ages.TryGetValue("Bo", out int bo)) Console.WriteLine(bo);
foreach (var (key, value) in ages) Console.WriteLine($"{key}={value}");</pre>`,
      keyPoints: ['TryGetValue avoids KeyNotFoundException.', 'Collection initializers: new List<int> { 1, 2 }.', 'SortedDictionary keeps keys ordered.'],
      docs: [{ label: 'Collections overview', url: MS + 'standard/collections/' }, { label: 'List<T>', url: MS + 'api/system.collections.generic.list-1' }, { label: 'Dictionary<TKey,TValue>', url: MS + 'api/system.collections.generic.dictionary-2' }],
      quiz: [{ q: 'What happens when you read dict["missing"] for a key that does not exist?', options: ['KeyNotFoundException', 'It returns null', 'It returns default(T)', 'It adds the key'], answer: 0, why: 'Use TryGetValue or GetValueOrDefault to avoid the exception.' }],
      exercise: { prompt: 'Count word frequencies in <code>"the cat and the hat"</code> with a <code>SortedDictionary&lt;string,int&gt;</code> and print each as <code>word=count</code>, one per line.', starter: 'using System;\nusing System.Collections.Generic;\n\npublic class Program\n{\n    public static void Main()\n    {\n        var counts = new SortedDictionary<string, int>();\n        // fill counts, then print each pair\n    }\n}\n', expected: 'and=1\ncat=1\nhat=1\nthe=2', solution: 'using System;\nusing System.Collections.Generic;\n\npublic class Program\n{\n    public static void Main()\n    {\n        var counts = new SortedDictionary<string, int>();\n        foreach (var w in "the cat and the hat".Split(\' \'))\n            counts[w] = counts.GetValueOrDefault(w) + 1;\n        foreach (var (word, n) in counts)\n            Console.WriteLine($"{word}={n}");\n    }\n}\n' } },
    { id: 'cs-oop', title: 'Classes, Interfaces & Records', minutes: 18,
      concept: `<p>C# classes use <strong>properties</strong> (<code>get; set;</code>) instead of getter/setter methods. Interfaces define contracts. <strong>Records</strong> give value-based equality and concise immutable types.</p>
<pre class="snippet">public interface IShape { double Area { get; } }

public record Circle(double R) : IShape
{
    public double Area => Math.PI * R * R;
}

public class Account
{
    public string Owner { get; }
    public decimal Balance { get; private set; }
    public Account(string owner) => Owner = owner;
    public void Deposit(decimal amt) => Balance += amt;
}</pre>`,
      keyPoints: ['Properties wrap fields with get/set accessors.', 'Records compare by value: new P(1) == new P(1).', 'Use decimal for money.'],
      docs: [{ label: 'Classes and objects', url: MS + 'csharp/fundamentals/types/classes' }, { label: 'Records', url: MS + 'csharp/language-reference/builtin-types/record' }, { label: 'Interfaces', url: MS + 'csharp/fundamentals/types/interfaces' }],
      quiz: [{ q: 'For record P(int X), what is new P(1) == new P(1)?', options: ['true', 'false', 'Compile error', 'Depends on GetHashCode'], answer: 0, why: 'Records have value-based equality.' }],
      exercise: { prompt: 'Declare <code>record Point(int X, int Y)</code> with a property <code>Manhattan</code> = |X| + |Y|. Print <code>new Point(3, -4)</code> then its Manhattan value.', starter: 'using System;\n\n// declare the record here\n\npublic class Program\n{\n    public static void Main()\n    {\n        // create the point, print it, then print Manhattan\n    }\n}\n', expected: 'Point { X = 3, Y = -4 }\n7', solution: 'using System;\n\npublic record Point(int X, int Y)\n{\n    public int Manhattan => Math.Abs(X) + Math.Abs(Y);\n}\n\npublic class Program\n{\n    public static void Main()\n    {\n        var p = new Point(3, -4);\n        Console.WriteLine(p);\n        Console.WriteLine(p.Manhattan);\n    }\n}\n' } },
    { id: 'cs-linq', title: 'LINQ', minutes: 15,
      concept: `<p><strong>Language-Integrated Query</strong> lets you filter, project, sort and group any collection with method chains (or SQL-like query syntax). LINQ is lazy: queries run when you enumerate them or call <code>ToList()</code>.</p>
<pre class="snippet">using System.Linq;

int[] nums = { 3, 1, 4, 1, 5, 9 };
var evenSquares = nums.Where(n => n % 2 == 0).Select(n => n * n).ToList();
int total = nums.Sum();
var byParity = nums.GroupBy(n => n % 2 == 0 ? "even" : "odd");

// query syntax
var q = from n in nums where n > 2 orderby n descending select n;</pre>`,
      keyPoints: ['Where = filter, Select = map, Aggregate = reduce.', 'Call ToList()/ToArray() to materialize.', 'Same mental model as SQL and JS array methods.'],
      docs: [{ label: 'LINQ overview', url: MS + 'csharp/linq/' }, { label: 'Enumerable.Where', url: MS + 'api/system.linq.enumerable.where' }, { label: 'Enumerable.Select', url: MS + 'api/system.linq.enumerable.select' }],
      quiz: [{ q: 'Which LINQ method corresponds to JavaScript\'s map()?', options: ['Select', 'Where', 'Aggregate', 'SelectMany'], answer: 0, why: 'Select projects each element to a new value.' }],
      exercise: { prompt: 'Using LINQ, print names longer than 3 letters, uppercased, joined with <code>", "</code>. Expected: <code>ALICE, CAROL</code>', starter: 'using System;\nusing System.Linq;\n\npublic class Program\n{\n    public static void Main()\n    {\n        string[] names = { "alice", "bob", "carol", "dan" };\n        // Where, Select, then string.Join\n    }\n}\n', expected: 'ALICE, CAROL', solution: 'using System;\nusing System.Linq;\n\npublic class Program\n{\n    public static void Main()\n    {\n        string[] names = { "alice", "bob", "carol", "dan" };\n        var result = names.Where(n => n.Length > 3).Select(n => n.ToUpper());\n        Console.WriteLine(string.Join(", ", result));\n    }\n}\n' } },
  ];

  /* ======================= C++ ======================= */
  const CPP = 'https://en.cppreference.com/w/cpp/';
  L.cpp = [
    { id: 'cpp-basics', title: 'Program Structure & Types', minutes: 12,
      concept: `<p>C++ compiles straight to machine code. Execution starts at <code>int main()</code>. <code>#include</code> pulls in headers; the standard library lives in namespace <code>std</code>.</p>
<pre class="snippet">#include &lt;iostream&gt;
#include &lt;string&gt;

int main() {
    std::string name = "Ada";
    int age = 36;
    auto height = 1.65;                  // deduced as double
    std::cout &lt;&lt; name &lt;&lt; " is " &lt;&lt; age &lt;&lt; "\\n";
    return 0;
}</pre>
<p>Compile and run: <code>g++ -std=c++20 -Wall main.cpp -o main && ./main</code></p>`,
      keyPoints: ['Uninitialized local variables hold garbage. Always initialize.', 'Prefer "\\n" over std::endl (endl flushes).', 'Compile with -Wall to see warnings.'],
      docs: [{ label: 'cppreference: Basic concepts', url: CPP + 'language/basic_concepts' }, { label: 'std::cout', url: CPP + 'io/cout' }, { label: 'auto type deduction', url: CPP + 'language/auto' }],
      quiz: [{ q: 'What does main\'s return value 0 conventionally mean?', options: ['Success', 'Failure', 'Nothing', 'Restart'], answer: 0, why: 'Zero exit status signals success to the OS.' }],
      exercise: { prompt: 'Print exactly <code>C++ was released in 1985</code> using variables <code>lang</code> (std::string) and <code>year</code> (int).', starter: '#include <iostream>\n#include <string>\n\nint main() {\n    // declare lang and year, then print with std::cout\n    return 0;\n}\n', expected: 'C++ was released in 1985', solution: '#include <iostream>\n#include <string>\n\nint main() {\n    std::string lang = "C++";\n    int year = 1985;\n    std::cout << lang << " was released in " << year << "\\n";\n    return 0;\n}\n' } },
    { id: 'cpp-control', title: 'Control Flow & Functions', minutes: 12,
      concept: `<p>C-style control flow plus range-based <code>for</code>. Functions must be declared before use. Parameters are passed <strong>by value</strong> (copied) unless you use references.</p>
<pre class="snippet">#include &lt;vector&gt;

int sum(const std::vector&lt;int&gt;& xs) {   // const ref: no copy, no modification
    int total = 0;
    for (int x : xs) total += x;          // range-based for
    return total;
}

void bump(int& n) { n++; }               // reference: modifies caller's variable</pre>`,
      keyPoints: ['Pass large objects by const reference.', 'Use & to let a function modify the caller\'s variable.', 'Range-for: for (auto& x : container).'],
      docs: [{ label: 'Range-based for loop', url: CPP + 'language/range-for' }, { label: 'Function declaration', url: CPP + 'language/function' }, { label: 'References', url: CPP + 'language/reference' }],
      quiz: [{ q: 'void f(int n) { n = 5; } int x = 1; f(x); What is x?', options: ['1', '5', 'Undefined', 'Compile error'], answer: 0, why: 'n is a copy; use int& n to change x.' }],
      exercise: { prompt: 'Write <code>std::string fizz(int n)</code> and print FizzBuzz for 1–15, one per line.', starter: '#include <iostream>\n#include <string>\n\nstd::string fizz(int n) {\n    return std::to_string(n);\n}\n\nint main() {\n    for (int i = 1; i <= 15; i++) std::cout << fizz(i) << "\\n";\n    return 0;\n}\n', expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', solution: '#include <iostream>\n#include <string>\n\nstd::string fizz(int n) {\n    if (n % 15 == 0) return "FizzBuzz";\n    if (n % 3 == 0) return "Fizz";\n    if (n % 5 == 0) return "Buzz";\n    return std::to_string(n);\n}\n\nint main() {\n    for (int i = 1; i <= 15; i++) std::cout << fizz(i) << "\\n";\n    return 0;\n}\n' } },
    { id: 'cpp-stl', title: 'STL Containers & Algorithms', minutes: 18,
      concept: `<p>The Standard Template Library gives you containers (<code>vector, map, unordered_map, set</code>) and generic algorithms (<code>sort, find, accumulate</code>) that work through <strong>iterators</strong>.</p>
<pre class="snippet">#include &lt;vector&gt;
#include &lt;map&gt;
#include &lt;algorithm&gt;
#include &lt;numeric&gt;

std::vector&lt;int&gt; v = {3, 1, 4, 1, 5};
v.push_back(9);
std::sort(v.begin(), v.end());
int total = std::accumulate(v.begin(), v.end(), 0);

std::map&lt;std::string, int&gt; ages;   // ordered by key
ages["Ada"] = 36;
for (const auto& [name, age] : ages) { /* structured bindings */ }</pre>`,
      keyPoints: ['vector is the default container choice.', 'map is ordered (tree); unordered_map is hashed.', 'Algorithms take [begin, end) iterator ranges.'],
      docs: [{ label: 'std::vector', url: CPP + 'container/vector' }, { label: 'std::map', url: CPP + 'container/map' }, { label: 'Algorithms library', url: CPP + 'algorithm' }],
      quiz: [{ q: 'std::map vs std::unordered_map lookup complexity?', options: ['O(log n) vs average O(1)', 'O(1) vs O(log n)', 'Both O(n)', 'Both O(1)'], answer: 0, why: 'map is a balanced tree; unordered_map is a hash table.' }],
      exercise: { prompt: 'Count words in <code>"the cat and the hat"</code> with a <code>std::map&lt;std::string,int&gt;</code> and print <code>word=count</code> lines (sorted by key).', starter: '#include <iostream>\n#include <map>\n#include <sstream>\n#include <string>\n\nint main() {\n    std::istringstream in("the cat and the hat");\n    std::map<std::string, int> counts;\n    // read words with in >> word, count, then print\n    return 0;\n}\n', expected: 'and=1\ncat=1\nhat=1\nthe=2', solution: '#include <iostream>\n#include <map>\n#include <sstream>\n#include <string>\n\nint main() {\n    std::istringstream in("the cat and the hat");\n    std::map<std::string, int> counts;\n    std::string word;\n    while (in >> word) counts[word]++;\n    for (const auto& [w, n] : counts) std::cout << w << "=" << n << "\\n";\n    return 0;\n}\n' } },
    { id: 'cpp-memory', title: 'Pointers, References & Smart Pointers', minutes: 20,
      concept: `<p>A <strong>pointer</strong> stores a memory address; <code>*p</code> dereferences it. A <strong>reference</strong> is an alias that can't be null or reseated. Modern C++ avoids raw <code>new/delete</code>: use <strong>RAII</strong> and smart pointers so memory frees itself.</p>
<pre class="snippet">int x = 10;
int* p = &x;      // p holds x's address
*p = 20;          // x is now 20
int& r = x;       // r is another name for x

#include &lt;memory&gt;
auto node = std::make_unique&lt;Node&gt;();     // sole owner, auto-deleted
auto shared = std::make_shared&lt;Node&gt;();   // ref-counted owner</pre>`,
      keyPoints: ['Prefer references for "must exist"; pointers for "may be null".', 'unique_ptr for single ownership (most cases).', 'Dangling pointers and leaks are the classic C++ bugs.'],
      docs: [{ label: 'Pointer declaration', url: CPP + 'language/pointer' }, { label: 'std::unique_ptr', url: CPP + 'memory/unique_ptr' }, { label: 'RAII', url: CPP + 'language/raii' }],
      quiz: [{ q: 'When is the object owned by a std::unique_ptr destroyed?', options: ['When the unique_ptr goes out of scope', 'Only when you call delete', 'When the program exits', 'Never'], answer: 0, why: 'RAII: the destructor of unique_ptr deletes the owned object.' }],
      exercise: { prompt: 'Write <code>void swapVals(int* a, int* b)</code> that swaps through pointers. With x=3, y=7, call it and print <code>x=7 y=3</code>.', starter: '#include <iostream>\n\nvoid swapVals(int* a, int* b) {\n    // swap the values a and b point to\n}\n\nint main() {\n    int x = 3, y = 7;\n    swapVals(&x, &y);\n    std::cout << "x=" << x << " y=" << y << "\\n";\n    return 0;\n}\n', expected: 'x=7 y=3', solution: '#include <iostream>\n\nvoid swapVals(int* a, int* b) {\n    int tmp = *a;\n    *a = *b;\n    *b = tmp;\n}\n\nint main() {\n    int x = 3, y = 7;\n    swapVals(&x, &y);\n    std::cout << "x=" << x << " y=" << y << "\\n";\n    return 0;\n}\n' } },
    { id: 'cpp-classes', title: 'Classes & Lambdas', minutes: 18,
      concept: `<p>C++ classes have constructors, destructors, and access specifiers. Mark methods that don't modify state <code>const</code>. Lambdas (<code>[capture](params) { body }</code>) make algorithms concise.</p>
<pre class="snippet">class Rect {
public:
    Rect(double w, double h) : w_(w), h_(h) {}   // member initializer list
    double area() const { return w_ * h_; }
private:
    double w_, h_;
};

std::vector&lt;Rect&gt; rs = {{2, 3}, {1, 1}};
std::sort(rs.begin(), rs.end(),
          [](const Rect& a, const Rect& b) { return a.area() < b.area(); });</pre>`,
      keyPoints: ['struct = class with public default access.', 'Use initializer lists in constructors.', 'Lambda capture: [=] by value, [&] by reference.'],
      docs: [{ label: 'Classes', url: CPP + 'language/classes' }, { label: 'Lambda expressions', url: CPP + 'language/lambda' }, { label: 'std::sort', url: CPP + 'algorithm/sort' }],
      quiz: [{ q: 'What does const after a method signature mean, as in double area() const?', options: ['The method will not modify the object', 'It returns a constant', 'It is a static method', 'It cannot be overridden'], answer: 0, why: 'const member functions promise not to change member data.' }],
      exercise: { prompt: 'Sort <code>{5, 2, 8, 1}</code> in <strong>descending</strong> order with std::sort and a lambda, then print the values space-separated: <code>8 5 2 1</code>', starter: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {5, 2, 8, 1};\n    // sort descending with a lambda\n    for (size_t i = 0; i < v.size(); i++) std::cout << (i ? " " : "") << v[i];\n    std::cout << "\\n";\n    return 0;\n}\n', expected: '8 5 2 1', solution: '#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {5, 2, 8, 1};\n    std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });\n    for (size_t i = 0; i < v.size(); i++) std::cout << (i ? " " : "") << v[i];\n    std::cout << "\\n";\n    return 0;\n}\n' } },
  ];
})(typeof window !== 'undefined' ? window : globalThis);
