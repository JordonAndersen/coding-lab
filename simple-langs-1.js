// Simple mode cards: Python, JavaScript, TypeScript, Java
(function (G) {
  const CL = (G.CL = G.CL || {});
  CL.simple = CL.simple || {};
  Object.assign(CL.simple, {
    /* ---------- Python ---------- */
    'py-basics': [
      { e: '📦', t: 'Variables are labeled boxes', b: 'A <b>variable</b> is a name that holds a value. You make one with a name, an <code>=</code> sign, and the value.', code: 'name = "Ada"\nage = 13' },
      { e: '🔤', t: 'Kinds of values', b: 'Text in quotes is a <b>string</b> (<code>"hi"</code>). Whole numbers are <b>ints</b> (<code>42</code>). Decimals are <b>floats</b> (<code>3.5</code>). <code>True</code> and <code>False</code> are <b>booleans</b>.' },
      { e: '🖨️', t: 'Show it with print', b: '<code>print()</code> shows things on the screen. An <b>f-string</b> (a string starting with <code>f</code>) lets you drop variables right into the text using <code>{ }</code>.', code: 'print(f"{name} is {age} years old")\n# Ada is 13 years old' },
      { e: '↔️', t: 'Spaces matter in Python', b: 'Python uses <b>indentation</b> (spaces at the start of a line) to group code together. Most languages use <code>{ }</code> for that, but Python uses spaces.', think: 'What do you think <code>print(7 // 2)</code> shows? (Hint: <code>//</code> divides and drops the decimal.)' },
    ],
    'py-control': [
      { e: '🚦', t: 'Making decisions', b: '<code>if</code> runs code only when something is true. <code>elif</code> means "else if", and <code>else</code> catches everything else.', code: 'if score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("Keep going!")' },
      { e: '🔁', t: 'Repeating with for', b: 'A <code>for</code> loop runs once for each item. <code>range(1, 6)</code> gives 1, 2, 3, 4, 5. It stops <b>before</b> 6!', code: 'for i in range(1, 6):\n    print(i)' },
      { e: '➗', t: 'The remainder trick', b: '<code>%</code> gives the <b>remainder</b> after dividing. If <code>n % 3 == 0</code>, then n divides evenly by 3. Super useful for FizzBuzz!' },
      { e: '⏳', t: 'Repeating with while', b: 'A <code>while</code> loop keeps going as long as something stays true. Make sure it eventually becomes false, or it runs forever!', think: 'Is 15 a multiple of 3, of 5, or both? What should FizzBuzz print for it?' },
    ],
    'py-functions': [
      { e: '🧰', t: 'Functions are reusable recipes', b: 'A <b>function</b> is a named set of steps you can use again and again. Make one with <code>def</code>.' },
      { e: '📥', t: 'Inputs and outputs', b: 'The values inside the parentheses are <b>parameters</b> (inputs). <code>return</code> sends a result back out.', code: 'def area(width, height):\n    return width * height\n\nprint(area(3, 4))   # 12' },
      { e: '⭐', t: 'Default values', b: 'You can give a parameter a <b>default</b>. If the caller skips it, the default is used.', code: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\ngreet("Sam")          # Hello, Sam!\ngreet("Sam", "Hi")    # Hi, Sam!' },
      { e: '🕳️', t: 'Forgot to return?', b: 'If a function has no <code>return</code>, it gives back <code>None</code>, which means "nothing".', think: 'What’s the difference between printing a value inside a function and returning it?' },
    ],
    'py-collections': [
      { e: '📋', t: 'Lists', b: 'A <b>list</b> holds many values in order. Positions (called <b>indexes</b>) start at 0, not 1!', code: 'fruits = ["apple", "kiwi", "fig"]\nprint(fruits[0])        # apple\nfruits.append("mango")' },
      { e: '📒', t: 'Dictionaries', b: 'A <b>dict</b> stores pairs: a key and a value, like a contact list of name and phone number.', code: 'ages = {"ana": 13, "bo": 14}\nprint(ages["bo"])     # 14\nages["cy"] = 12' },
      { e: '🎯', t: 'Sets', b: 'A <b>set</b> keeps only <b>unique</b> values. Duplicates disappear: <code>set([1, 1, 2])</code> becomes <code>{1, 2}</code>.' },
      { e: '⚡', t: 'One-line lists', b: 'A <b>list comprehension</b> builds a new list in one line: "give me X for each item, if it passes a test".', code: 'nums = [1, 2, 3, 4]\ndoubled = [n * 2 for n in nums]          # [2, 4, 6, 8]\nevens   = [n for n in nums if n % 2 == 0]  # [2, 4]', think: 'How would you write a comprehension that makes every word UPPERCASE?' },
    ],
    'py-classes': [
      { e: '🏭', t: 'Classes are blueprints', b: 'A <b>class</b> is a blueprint for making objects. "Dog" is the class; your actual dog Rex is an <b>object</b> made from it.' },
      { e: '🧱', t: 'Setting up with __init__', b: '<code>__init__</code> runs when you create an object. <code>self</code> means "this particular object".', code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\nrex = Dog("Rex")\nprint(rex.name)   # Rex' },
      { e: '🐕', t: 'Methods are actions', b: 'Functions inside a class are called <b>methods</b>. They can read and change the object’s data.', code: 'class Counter:\n    def __init__(self):\n        self.count = 0\n    def increment(self):\n        self.count += 1' },
      { e: '🌳', t: 'Why bother?', b: 'Classes keep related data and actions together, so big programs stay organized. Each object keeps track of its own data.', think: 'If you made two Counter objects and incremented one, would the other one change?' },
    ],

    /* ---------- JavaScript ---------- */
    'js-basics': [
      { e: '🌐', t: 'The language of the web', b: 'JavaScript makes websites interactive. Every web browser runs it, including the one you’re using right now!' },
      { e: '📦', t: 'const and let', b: 'Use <code>const</code> for values that won’t be replaced, and <code>let</code> for values that will change. (Skip the old <code>var</code>.)', code: 'const name = "Ada";\nlet score = 10;\nscore = score + 5;' },
      { e: '🖨️', t: 'Showing output', b: '<code>console.log()</code> prints things. A <b>template literal</b> uses backticks and <code>${ }</code> to put values inside text.', code: 'console.log(`${name} scored ${score}`);' },
      { e: '⚠️', t: 'Use three equals signs', b: '<code>==</code> tries to convert types first, which causes weird surprises. <code>===</code> checks that the value <b>and</b> the type match. Always use <code>===</code>.', think: 'What do you think <code>"5" + 3</code> gives in JavaScript? Try it in the editor!' },
    ],
    'js-control': [
      { e: '🚦', t: 'if / else', b: 'JavaScript wraps conditions in parentheses and code blocks in curly braces.', code: 'if (score >= 50) {\n  console.log("pass");\n} else {\n  console.log("try again");\n}' },
      { e: '🔁', t: 'Two kinds of loops', b: 'The classic <code>for</code> loop counts. <code>for...of</code> walks through each item in a list.', code: 'for (let i = 1; i <= 3; i++) console.log(i);\nfor (const fruit of ["apple", "kiwi"]) console.log(fruit);' },
      { e: '❓', t: 'The quick if', b: 'The <b>ternary</b> operator is a one-line if/else: <code>condition ? ifTrue : ifFalse</code>.', code: 'const label = score >= 50 ? "pass" : "fail";' },
      { e: '🤷', t: 'Truthy and falsy', b: 'Some values count as "false" in an if: <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, and <code>NaN</code>. Almost everything else counts as true.', think: 'Would <code>if ("0")</code> run its code? (Careful: it’s a string!)' },
    ],
    'js-functions': [
      { e: '🧰', t: 'Writing a function', b: 'Functions package up steps you can reuse.', code: 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));   // 5' },
      { e: '➡️', t: 'Arrow functions', b: 'An <b>arrow function</b> is a shorter way to write a function. You’ll see these everywhere in modern JavaScript.', code: 'const double = (x) => x * 2;\ndouble(4);   // 8' },
      { e: '🎒', t: 'Functions that remember', b: 'A function created inside another function <b>remembers</b> the variables around it, even later. This is called a <b>closure</b>.', code: 'function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst next = makeCounter();\nnext(); next();   // 1, then 2' },
      { e: '🏭', t: 'Functions that make functions', b: 'A function can <b>return</b> a new function. <code>makeMultiplier(3)</code> could give back a function that triples numbers.', think: 'Where does the returned function get the number 3 from when you call it later?' },
    ],
    'js-arrays': [
      { e: '📋', t: 'Arrays', b: 'An <b>array</b> is a list in JavaScript. Like Python, positions start at 0.', code: 'const nums = [3, 1, 4];\nnums.push(1);         // add to the end\nconsole.log(nums.length);  // 4' },
      { e: '🪄', t: 'map: change every item', b: '<code>map</code> makes a <b>new</b> array by running a function on every item.', code: '[1, 2, 3].map(n => n * 10)   // [10, 20, 30]' },
      { e: '🧹', t: 'filter: keep some', b: '<code>filter</code> keeps only the items that pass a test.', code: '[1, 2, 3, 4].filter(n => n % 2 === 0)   // [2, 4]' },
      { e: '➕', t: 'reduce: combine into one', b: '<code>reduce</code> squashes a whole array into a single value, like a total.', code: '[5, 10, 20].reduce((sum, n) => sum + n, 0)   // 35' },
      { e: '🗂️', t: 'Objects', b: 'An <b>object</b> groups named values together. Read them with a dot.', code: 'const order = { id: 1, amount: 100, status: "paid" };\nconsole.log(order.amount);   // 100', think: 'How could you combine <code>filter</code> and <code>reduce</code> to add up only the paid orders?' },
    ],
    'js-async': [
      { e: '⏰', t: 'Waiting without freezing', b: 'Some things take time, like loading data from the internet. JavaScript doesn’t freeze while it waits. It keeps going and comes back when the answer arrives.' },
      { e: '🎟️', t: 'Promises', b: 'A <b>Promise</b> is like a ticket at a restaurant: "your food isn’t ready yet, but it will be." It holds a value that will arrive later.' },
      { e: '⏸️', t: 'async and await', b: 'Inside an <code>async</code> function, <code>await</code> pauses until a Promise is ready, so your code reads top to bottom.', code: 'async function main() {\n  const score = await fetchScore("ada");\n  console.log(score);\n}' },
      { e: '🏎️', t: 'Do two things at once', b: '<code>Promise.all</code> starts several tasks together and waits for all of them. That’s faster than waiting for each one in turn.', code: 'const [a, b] = await Promise.all([fetchScore("ada"), fetchScore("bo")]);', think: 'If each fetch takes 1 second, about how long does <code>Promise.all</code> take for two of them?' },
    ],

    /* ---------- TypeScript ---------- */
    'ts-basics': [
      { e: '🛡️', t: 'JavaScript with a safety net', b: '<b>TypeScript</b> is JavaScript plus <b>types</b>. A checker reads your code <i>before</i> it runs and warns you about mistakes.' },
      { e: '🏷️', t: 'Adding a type label', b: 'Put <code>: type</code> after a name to say what kind of value it holds.', code: 'let title: string = "TypeScript";\nlet year: number = 2012;\nyear = "soon";   // ✗ error: a string is not a number' },
      { e: '🔮', t: 'TypeScript can guess', b: 'Often you don’t need labels. TypeScript <b>infers</b> types: <code>let n = 5</code> is already known to be a number.' },
      { e: '🧽', t: 'Types disappear when it runs', b: 'Types are only for checking. When the code runs, they’re erased and it’s plain JavaScript. In CodeLab, an exercise only passes with <b>zero type errors</b>.', think: 'The exercise has a bug the checker catches. Can you spot it before you press Run?' },
    ],
    'ts-objects': [
      { e: '📐', t: 'Describing a shape', b: 'An <code>interface</code> describes what an object must look like: which properties it has, and their types.', code: 'interface User {\n  name: string;\n  age: number;\n}' },
      { e: '❔', t: 'Optional properties', b: 'Add <code>?</code> to make a property optional. The object can have it or leave it out.', code: 'interface Course {\n  title: string;\n  done?: boolean;   // optional\n}' },
      { e: '🔒', t: 'readonly', b: '<code>readonly</code> means a property can be set once and never changed after that.' },
      { e: '🦆', t: 'If it fits, it works', b: 'TypeScript checks the <b>shape</b>, not the name. Any object with the right properties fits the interface.', think: 'If an object has a name, an age, and an extra email property, does it still fit <code>User</code>?' },
    ],
    'ts-functions': [
      { e: '🏷️', t: 'Typing a function', b: 'Label the inputs, and optionally the output.', code: 'function add(a: number, b: number): number {\n  return a + b;\n}' },
      { e: '🧪', t: 'Generics: a type placeholder', b: 'A <b>generic</b> <code>&lt;T&gt;</code> is a blank that gets filled in later. One function can work with numbers, strings, or anything else.', code: 'function first<T>(items: T[]): T | undefined {\n  return items[0];\n}\nfirst([1, 2]);      // number\nfirst(["a", "b"]);  // string' },
      { e: '🔗', t: 'Why not just use any?', b: '<code>any</code> turns the checker off. Generics keep the connection: what goes in is what comes out.' },
      { e: '🪂', t: 'Backup values with ??', b: '<code>??</code> means "use this backup if the value is missing (null or undefined)".', code: 'lastItem([]) ?? "none"   // "none"', think: 'Why does <code>first</code> say it might return <code>undefined</code>?' },
    ],
    'ts-unions': [
      { e: '🔀', t: 'This OR that', b: 'A <b>union</b> type means a value can be one of several types. <code>string | number</code> means "a string or a number".' },
      { e: '🔍', t: 'Narrowing it down', b: 'Before you use a union, check which one it is. TypeScript notices your check and narrows the type.', code: 'function show(x: string | number) {\n  if (typeof x === "string") {\n    return x.toUpperCase();   // x is a string here\n  }\n  return x.toFixed(2);        // x is a number here\n}' },
      { e: '🏷️', t: 'Using a tag field', b: 'Give each option a shared field like <code>status</code>. Checking it tells TypeScript exactly which option you have.', code: 'type Result =\n  | { status: "ok"; value: number }\n  | { status: "error"; message: string };' },
      { e: '🧯', t: 'Fewer surprise crashes', b: 'Unions make you handle every case, like "what if it’s null?", before your code runs.', think: 'In the <code>Result</code> type, which field can you only read after checking that <code>status</code> is "error"?' },
    ],
    'ts-classes': [
      { e: '🏭', t: 'Classes in TypeScript', b: 'TypeScript classes work like JavaScript classes, with types added to fields and methods.' },
      { e: '🔐', t: 'private', b: '<code>private</code> means only code inside the class can touch that field. That protects it from accidental changes.', code: 'class Counter {\n  private count = 0;\n  increment(): void { this.count++; }\n  get value(): number { return this.count; }\n}' },
      { e: '👀', t: 'Getters', b: 'A <code>get</code> method looks like a normal property from outside: <code>c.value</code>, with no parentheses.' },
      { e: '🧰', t: 'Handy built-in helpers', b: 'TypeScript has <b>utility types</b> that reshape other types. <code>Partial&lt;T&gt;</code> makes every field optional. <code>Omit&lt;T, "id"&gt;</code> removes one field.', think: 'Why might you want a type that is "a Todo, but without the id"?' },
    ],

    /* ---------- Java ---------- */
    'java-basics': [
      { e: '☕', t: 'Java is strict, in a good way', b: 'In Java you must say each variable’s <b>type</b>. The compiler checks everything before your program runs.', code: 'String name = "Ada";\nint age = 13;\ndouble height = 1.6;' },
      { e: '🚪', t: 'Where programs start', b: 'Every Java program begins in <code>main</code>, inside a class. It looks like a lot, but it’s the same every time.', code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello!");\n    }\n}' },
      { e: '🖨️', t: 'Printing', b: '<code>System.out.println()</code> prints a line. Use <code>+</code> to join text and values together.', code: 'System.out.println(name + " is " + age);' },
      { e: '⚖️', t: 'Comparing text', b: 'To check if two strings match, use <code>.equals()</code>, not <code>==</code>. <code>==</code> checks whether they’re the exact same object in memory.', think: 'What does <code>7 / 2</code> give in Java when both are ints? (Hint: no decimals!)' },
    ],
    'java-control': [
      { e: '🚦', t: 'if / else', b: 'Java’s if/else looks just like JavaScript’s, with parentheses and curly braces.', code: 'if (score >= 90) {\n    System.out.println("A");\n} else {\n    System.out.println("Keep going!");\n}' },
      { e: '🔁', t: 'Loops', b: 'The <code>for</code> loop counts. The "for-each" loop walks through every item.', code: 'for (int i = 1; i <= 3; i++) { ... }\nfor (int n : numbers) { ... }' },
      { e: '🧰', t: 'Methods', b: 'Java calls functions <b>methods</b>. You list the return type first, then the inputs with their types.', code: 'static String fizz(int n) {\n    if (n % 3 == 0) return "Fizz";\n    return String.valueOf(n);\n}' },
      { e: '🎚️', t: 'Modern switch', b: 'New Java versions have a short <code>switch</code> that gives back a value using <code>-&gt;</code>.', think: 'Why must a method that says it returns <code>String</code> always return something?' },
    ],
    'java-collections': [
      { e: '📋', t: 'ArrayList: a growing list', b: 'Arrays in Java have a fixed size. An <code>ArrayList</code> can grow. The type goes in angle brackets.', code: 'List<String> names = new ArrayList<>();\nnames.add("Ada");\nnames.add("Bo");' },
      { e: '📒', t: 'HashMap: key → value', b: 'A <code>HashMap</code> stores pairs, like Python’s dict.', code: 'Map<String, Integer> ages = new HashMap<>();\nages.put("Ada", 13);\nages.get("Ada");   // 13' },
      { e: '🔢', t: 'Integer, not int', b: 'These collections need <b>object</b> types, so write <code>Integer</code> instead of <code>int</code> in the angle brackets.' },
      { e: '🔤', t: 'TreeMap keeps things sorted', b: 'A <code>TreeMap</code> is a map that keeps its keys in alphabetical order. That’s handy for printing word counts neatly.', think: 'How would you count how many times each word appears in a sentence?' },
    ],
    'java-oop': [
      { e: '🏭', t: 'Everything lives in classes', b: 'Java is built around <b>classes</b>: blueprints that hold data (fields) and actions (methods).' },
      { e: '📜', t: 'Interfaces are promises', b: 'An <b>interface</b> lists methods a class promises to have. Different shapes can all promise an <code>area()</code> method.', code: 'interface Shape { double area(); }' },
      { e: '📦', t: 'Records: quick data classes', b: 'A <b>record</b> is a short way to make a class that just holds data. Java writes the boring parts for you.', code: 'record Point(int x, int y) { }\nnew Point(3, -4);   // prints as Point[x=3, y=-4]' },
      { e: '🎭', t: 'Same call, different behavior', b: 'If circles and rectangles both have <code>area()</code>, you can loop over a list of shapes and call <code>area()</code> on each one. That’s called <b>polymorphism</b>.', think: 'How would you find the "Manhattan distance" (|x| + |y|) of a point?' },
    ],
    'java-streams': [
      { e: '➡️', t: 'Lambdas: tiny functions', b: 'A <b>lambda</b> is a short function you can pass around. <code>n -&gt; n * 2</code> means "take n, give back n times 2".' },
      { e: '🌊', t: 'Streams: an assembly line', b: 'A <b>stream</b> sends items through steps one after another: filter some out, change the rest, then collect the results.', code: 'names.stream()\n     .filter(n -> n.length() > 3)\n     .map(String::toUpperCase)\n     .toList();' },
      { e: '🏁', t: 'Nothing happens until the end', b: 'Streams are lazy. The work only starts when you finish with a step like <code>toList()</code> or <code>sum()</code>.' },
      { e: '🔗', t: 'Same idea everywhere', b: 'This is just like <code>filter</code> and <code>map</code> in JavaScript and list comprehensions in Python. Once you know the idea, you know it in every language.', think: '<code>String::toUpperCase</code> is a short way of writing which lambda?' },
    ],
  });
})(typeof window !== 'undefined' ? window : globalThis);
