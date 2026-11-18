// Simple mode cards: C#, C++, Go, Rust
(function (G) {
  const CL = (G.CL = G.CL || {});
  CL.simple = CL.simple || {};
  Object.assign(CL.simple, {
    /* ---------- C# ---------- */
    'cs-basics': [
      { e: '🎮', t: 'Meet C#', b: 'C# (say "C sharp") is used for Windows apps, websites, and lots of video games made with the Unity engine.' },
      { e: '📦', t: 'Typed variables', b: 'Like Java, C# wants types. But <code>var</code> lets C# figure the type out for you.', code: 'string name = "Ada";\nint age = 13;\nvar height = 1.6;   // C# knows it’s a double' },
      { e: '🖨️', t: 'Printing with $', b: 'Put <code>$</code> before a string to drop values inside <code>{ }</code>. This is called <b>string interpolation</b>.', code: 'Console.WriteLine($"{name} is {age}");' },
      { e: '🚪', t: 'Where it starts', b: 'C# programs start in a method called <code>Main</code> inside a class.', think: 'In C#, does <code>"abc" == "ab" + "c"</code> compare the letters or the memory location? (It’s different from Java!)' },
    ],
    'cs-control': [
      { e: '🚦', t: 'Familiar if and loops', b: 'C# has <code>if</code>, <code>for</code>, <code>while</code> and <code>foreach</code>, written like Java and JavaScript.', code: 'foreach (var fruit in fruits)\n{\n    Console.WriteLine(fruit);\n}' },
      { e: '➡️', t: 'Short methods with =>', b: 'A method that just returns one thing can use <code>=&gt;</code> instead of braces.', code: 'static int Double(int n) => n * 2;' },
      { e: '🎚️', t: 'Switch expressions', b: 'A <b>switch expression</b> picks a result by matching patterns. <code>_</code> means "anything else".', code: 'string size = n switch\n{\n    < 10 => "small",\n    < 100 => "medium",\n    _ => "large",\n};' },
      { e: '🧩', t: 'Matching two things at once', b: 'You can even match a pair: <code>(n % 3, n % 5)</code> gives you two remainders to check together.', think: 'For FizzBuzz, which pair of remainders means "FizzBuzz"?' },
    ],
    'cs-collections': [
      { e: '📋', t: 'List<T>', b: 'A <code>List</code> grows as you add things. The type goes in angle brackets.', code: 'var names = new List<string> { "Bo", "Ada" };\nnames.Add("Cy");' },
      { e: '📒', t: 'Dictionary', b: 'A <code>Dictionary</code> stores key → value pairs.', code: 'var ages = new Dictionary<string, int>();\nages["Ada"] = 13;' },
      { e: '🛟', t: 'Safe lookups', b: 'Reading a missing key crashes your program. <code>TryGetValue</code> or <code>GetValueOrDefault</code> check safely instead.' },
      { e: '🔤', t: 'Sorted on purpose', b: 'A <code>SortedDictionary</code> keeps keys in order, so word counts print alphabetically.', think: 'Why might <code>counts.GetValueOrDefault(w) + 1</code> be handy when counting words?' },
    ],
    'cs-oop': [
      { e: '🏭', t: 'Classes and properties', b: 'C# classes use <b>properties</b>, fields with built-in get and set rules.', code: 'public class Player\n{\n    public string Name { get; set; }\n    public int Score { get; private set; }\n}' },
      { e: '📜', t: 'Interfaces', b: 'An <b>interface</b> is a promise: "any class that uses me will have these members." Names often start with I, like <code>IShape</code>.' },
      { e: '📦', t: 'Records', b: 'A <b>record</b> is a quick data class. Two records with the same values count as equal.', code: 'public record Point(int X, int Y);\nnew Point(1, 2) == new Point(1, 2)   // true' },
      { e: '💵', t: 'A money tip', b: 'Use <code>decimal</code> for money, not <code>double</code>. Decimals avoid rounding mistakes with cents.', think: 'Why might a game store a player’s Score with <code>private set</code>?' },
    ],
    'cs-linq': [
      { e: '🔎', t: 'Asking questions about lists', b: '<b>LINQ</b> lets you filter, change, and sort lists with short, readable steps.' },
      { e: '🧹', t: 'Where and Select', b: '<code>Where</code> keeps items that pass a test. <code>Select</code> changes each item.', code: 'var result = names\n    .Where(n => n.Length > 3)\n    .Select(n => n.ToUpper());' },
      { e: '🧮', t: 'Quick answers', b: '<code>Sum()</code>, <code>Count()</code>, <code>Max()</code> and <code>OrderBy()</code> do common jobs in one word.' },
      { e: '🔗', t: 'You already know this!', b: '<code>Where</code> is like <code>filter</code>, and <code>Select</code> is like <code>map</code>. It’s the same idea as JavaScript and Python.', think: 'How would you join the results into one string with commas? (Hint: <code>string.Join</code>)' },
    ],

    /* ---------- C++ ---------- */
    'cpp-basics': [
      { e: '🏎️', t: 'Built for speed', b: 'C++ turns straight into machine code, so it’s very fast. Game engines, browsers and robots often use it.' },
      { e: '🚪', t: 'Where programs start', b: 'Every C++ program starts at <code>int main()</code>. <code>#include</code> brings in tools from libraries.', code: '#include <iostream>\n\nint main() {\n    std::cout << "Hello!\\n";\n    return 0;\n}' },
      { e: '🖨️', t: 'Printing with <<', b: '<code>std::cout</code> is the screen. <code>&lt;&lt;</code> pushes things onto it, one after another.', code: 'std::cout << name << " is " << age << "\\n";' },
      { e: '⚠️', t: 'Always give a starting value', b: 'In C++, a variable without a starting value can hold random leftover data. Always initialize: <code>int count = 0;</code>', think: 'What does <code>return 0;</code> at the end of main tell the computer?' },
    ],
    'cpp-control': [
      { e: '🔁', t: 'Loops you know', b: 'C++ has the classic <code>for</code> loop, plus a range-for that walks through every item.', code: 'for (int i = 1; i <= 3; i++) { ... }\nfor (int x : numbers) { ... }' },
      { e: '📄', t: 'Copies by default', b: 'When you pass a value into a function, C++ gives it a <b>copy</b>. Changing the copy doesn’t change the original.' },
      { e: '🔗', t: 'References share the original', b: 'Add <code>&amp;</code> to pass a <b>reference</b>. Now the function works on the real thing.', code: 'void bump(int& n) { n++; }\nint x = 1;\nbump(x);   // x is now 2' },
      { e: '🛡️', t: 'Read-only references', b: '<code>const</code> plus <code>&amp;</code> means "don’t copy it, but don’t change it either". Great for big lists.', think: 'Without the <code>&amp;</code>, what would <code>x</code> be after calling bump?' },
    ],
    'cpp-stl': [
      { e: '🧰', t: 'The STL toolbox', b: 'The <b>Standard Template Library</b> gives you ready-made containers and tools so you don’t build everything yourself.' },
      { e: '📋', t: 'vector: the go-to list', b: 'A <code>vector</code> is a list that grows.', code: 'std::vector<int> v = {3, 1, 4};\nv.push_back(9);' },
      { e: '🗺️', t: 'map: sorted pairs', b: 'A <code>map</code> stores key → value pairs, sorted by key. <code>unordered_map</code> is faster but not sorted.', code: 'std::map<std::string, int> counts;\ncounts["cat"]++;' },
      { e: '⚙️', t: 'Algorithms', b: '<code>std::sort</code>, <code>std::find</code> and friends work on any container, using its <code>begin()</code> and <code>end()</code>.', code: 'std::sort(v.begin(), v.end());', think: 'Why might a sorted map be nicer than an unordered one for printing word counts?' },
    ],
    'cpp-memory': [
      { e: '🏠', t: 'Everything has an address', b: 'Every value lives somewhere in memory, like a house on a street. A <b>pointer</b> stores that address.' },
      { e: '👉', t: 'Pointers: & and *', b: '<code>&amp;x</code> means "the address of x". <code>*p</code> means "the value at that address".', code: 'int x = 10;\nint* p = &x;   // p points at x\n*p = 20;       // now x is 20' },
      { e: '🪪', t: 'References are nicknames', b: 'A reference is another name for the same variable. Unlike a pointer, it can never be empty.' },
      { e: '🧹', t: 'Smart pointers clean up', b: 'Modern C++ uses <code>std::unique_ptr</code>, which frees memory automatically when you’re done. No forgotten cleanup!', think: 'In a swap function, why do you need pointers or references instead of plain copies?' },
    ],
    'cpp-classes': [
      { e: '🏭', t: 'Classes', b: 'A C++ class groups data and functions. <code>public</code> parts can be used from outside; <code>private</code> parts can’t.', code: 'class Rect {\npublic:\n    Rect(double w, double h) : w_(w), h_(h) {}\n    double area() const { return w_ * h_; }\nprivate:\n    double w_, h_;\n};' },
      { e: '🔒', t: 'const methods', b: '<code>const</code> after a method promises it won’t change the object. It’s a safety label.' },
      { e: '➡️', t: 'Lambdas', b: 'A <b>lambda</b> is a tiny function written right where you need it.', code: '[](int a, int b) { return a > b; }' },
      { e: '🔃', t: 'Custom sorting', b: 'Hand a lambda to <code>std::sort</code> to choose the order. <code>a &gt; b</code> sorts biggest first.', think: 'What would <code>return a &lt; b;</code> do instead?' },
    ],

    /* ---------- Go ---------- */
    'go-basics': [
      { e: '🐹', t: 'Meet Go', b: 'Go was made at Google to be <b>simple</b> and <b>fast</b>. Lots of web servers and cloud tools are written in it. Its mascot is a gopher!' },
      { e: '🚪', t: 'Every program’s shape', b: 'Go programs start with <code>package main</code> and run <code>func main()</code>.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello!")\n}' },
      { e: '📦', t: 'The := shortcut', b: '<code>:=</code> makes a new variable and lets Go figure out its type.', code: 'name := "Gopher"\nage := 13' },
      { e: '🧹', t: 'Go is tidy', b: 'Go refuses to run if you create a variable or import something and never use it. It keeps code clean!', think: 'Why is it <code>fmt.Println</code> with a capital P? (Hint: capitals mean "shared outside the package".)' },
    ],
    'go-control': [
      { e: '1️⃣', t: 'Only one loop word', b: 'Go only has <code>for</code>, but it can do every kind of loop.', code: 'for i := 0; i < 3; i++ { }   // counting\nfor n < 100 { n *= 2 }       // like "while"\nfor i, v := range list { }   // each item' },
      { e: '🚦', t: 'if without parentheses', b: 'Go skips the parentheses around conditions, but the curly braces are required.', code: 'if score >= 90 {\n\tfmt.Println("A")\n}' },
      { e: '🎚️', t: 'Clean switches', b: 'A Go <code>switch</code> stops after the first match. You don’t need <code>break</code>.', code: 'switch {\ncase n%15 == 0:\n\tfmt.Println("FizzBuzz")\ncase n%3 == 0:\n\tfmt.Println("Fizz")\n}' },
      { e: '🧩', t: 'Order matters', b: 'Cases are checked from the top down, so put the most specific case first.', think: 'Why must the <code>n%15</code> case come before the <code>n%3</code> case?' },
    ],
    'go-functions': [
      { e: '🧰', t: 'Functions', b: 'Types come <b>after</b> the names in Go.', code: 'func add(a int, b int) int {\n\treturn a + b\n}' },
      { e: '✌️', t: 'Two answers at once', b: 'Go functions can return <b>more than one value</b>.', code: 'func divide(a, b int) (int, error) { ... }' },
      { e: '🚨', t: 'Errors are just values', b: 'Instead of crashing, Go functions return an <code>error</code>. If it’s <code>nil</code> (nothing), everything worked.', code: 'result, err := divide(10, 0)\nif err != nil {\n\tfmt.Println("error:", err)\n}' },
      { e: '🧽', t: 'defer: clean up later', b: '<code>defer</code> schedules something to run when the function ends, like closing a file you opened.', think: 'Why might it be good that Go makes you check errors right away?' },
    ],
    'go-collections': [
      { e: '📋', t: 'Slices', b: 'A <b>slice</b> is Go’s growing list. Add items with <code>append</code>, and always save the result back.', code: 'nums := []int{3, 1}\nnums = append(nums, 4)' },
      { e: '📒', t: 'Maps', b: 'A <b>map</b> stores key → value pairs.', code: 'ages := map[string]int{"ana": 13}\nages["bo"] = 14' },
      { e: '❓', t: 'Is the key there?', b: 'Reading a map can give you two answers: the value, and whether the key existed.', code: 'age, ok := ages["cy"]\nif !ok { fmt.Println("no cy") }' },
      { e: '🎲', t: 'Maps have no order', b: 'Go shuffles map order on purpose! To print in order, collect the keys, sort them, then print.', think: 'Why would Go randomize map order on purpose?' },
    ],
    'go-structs': [
      { e: '🧱', t: 'Structs', b: 'Go has no classes. A <b>struct</b> groups related data together.', code: 'type Point struct {\n\tX, Y int\n}\np := Point{3, -4}' },
      { e: '🔧', t: 'Methods', b: 'You attach a <b>method</b> to a struct by naming it before the function name.', code: 'func (p Point) Manhattan() int {\n\treturn abs(p.X) + abs(p.Y)\n}' },
      { e: '🤝', t: 'Interfaces happen automatically', b: 'If a type has the methods an interface asks for, it fits automatically. You don’t need to say "implements".' },
      { e: '🖨️', t: 'Custom printing', b: 'Give your type a <code>String() string</code> method and <code>fmt.Println</code> will use it.', think: 'What should <code>String()</code> return for <code>Point{3, -4}</code> to print <code>(3,-4)</code>?' },
    ],
    'go-concurrency': [
      { e: '🏃🏃', t: 'Doing many things at once', b: 'A <b>goroutine</b> is a lightweight worker. Put <code>go</code> in front of a function call and it runs alongside your other code.', code: 'go doWork()' },
      { e: '📮', t: 'Channels pass messages', b: 'A <b>channel</b> is like a mail slot between goroutines. <code>ch &lt;- v</code> sends, and <code>&lt;-ch</code> receives.', code: 'results := make(chan int)\ngo func() { results <- 42 }()\nfmt.Println(<-results)   // 42' },
      { e: '⏳', t: 'Receiving waits', b: 'Receiving from a channel <b>waits</b> until something arrives. That keeps goroutines in sync.' },
      { e: '🎲', t: 'Order isn’t guaranteed', b: 'Goroutines finish in whatever order they finish. Add up results so the order doesn’t matter.', think: 'If 3 goroutines each send one number, how many times should you receive?' },
    ],

    /* ---------- Rust ---------- */
    'rust-basics': [
      { e: '🦀', t: 'Meet Rust', b: 'Rust is fast like C++ but catches memory mistakes <b>before</b> your program runs. Its mascot is Ferris the crab!' },
      { e: '🔒', t: 'Locked by default', b: 'Rust variables can’t change unless you say <code>mut</code> (short for mutable).', code: 'let name = "Ferris";   // can’t change\nlet mut level = 1;     // can change\nlevel += 1;' },
      { e: '🖨️', t: 'println! with braces', b: '<code>println!</code> prints. Put variable names in <code>{ }</code> inside the text.', code: 'println!("{name} is level {level}");' },
      { e: '❗', t: 'What’s the ! for?', b: 'The <code>!</code> means it’s a <b>macro</b>, a special tool that writes code for you when your program compiles.', think: 'What happens if you try to change a variable that doesn’t have <code>mut</code>?' },
    ],
    'rust-control': [
      { e: '🚦', t: 'if gives back a value', b: 'In Rust, <code>if</code> can produce a value you store directly.', code: 'let label = if score >= 50 { "pass" } else { "fail" };' },
      { e: '🔁', t: 'Ranges', b: '<code>1..4</code> means 1, 2, 3. <code>1..=4</code> includes the 4.', code: 'for i in 1..=3 {\n    println!("{i}");\n}' },
      { e: '🧩', t: 'match', b: '<code>match</code> compares a value to patterns. Rust makes sure you’ve covered <b>every</b> possibility.', code: 'match (i % 3, i % 5) {\n    (0, 0) => println!("FizzBuzz"),\n    (0, _) => println!("Fizz"),\n    (_, 0) => println!("Buzz"),\n    _ => println!("{i}"),\n}' },
      { e: '🃏', t: 'The underscore', b: '<code>_</code> means "anything". It’s the catch-all at the end of a match.', think: 'Why does Rust insist that a match covers every case?' },
    ],
    'rust-ownership': [
      { e: '🎒', t: 'Every value has one owner', b: 'In Rust, each value belongs to exactly one variable, its <b>owner</b>. When the owner goes away, the value is cleaned up automatically.' },
      { e: '📦', t: 'Handing it over', b: 'Assigning a String to another variable <b>moves</b> it. The old variable can’t use it anymore, just like handing someone your backpack.', code: 'let a = String::from("hi");\nlet b = a;          // a moved to b\n// println!("{a}"); ✗ error!' },
      { e: '👀', t: 'Borrowing with &', b: 'To let someone look without taking it, <b>lend</b> it with <code>&amp;</code>. Use <code>&amp;mut</code> to let them change it.', code: 'fn shout(s: &mut String) { s.push_str("!"); }\nlet mut w = String::from("hey");\nshout(&mut w);   // w is now "hey!"' },
      { e: '📏', t: 'The borrowing rule', b: 'You can have <b>many readers</b> (<code>&amp;</code>) <b>or one writer</b> (<code>&amp;mut</code>) at a time, never both. This stops lots of bugs.', think: 'Why could it be a problem if one part of a program changed a value while another part was reading it?' },
    ],
    'rust-structs': [
      { e: '🧱', t: 'Structs', b: 'A <b>struct</b> groups related data.', code: 'struct Point { x: i32, y: i32 }\nlet p = Point { x: 3, y: -4 };' },
      { e: '🔧', t: 'impl adds methods', b: 'Put methods for a struct inside an <code>impl</code> block. <code>&amp;self</code> means "this object, borrowed".', code: 'impl Point {\n    fn manhattan(&self) -> i32 {\n        self.x.abs() + self.y.abs()\n    }\n}' },
      { e: '🎁', t: 'Option: maybe a value', b: 'Rust has no "null". A value that might be missing is an <code>Option</code>: either <code>Some(value)</code> or <code>None</code>.' },
      { e: '🖨️', t: 'Debug printing', b: 'Add <code>#[derive(Debug)]</code> above a struct and print it with <code>{:?}</code>.', think: 'Why might it be safer to have Option than to allow null everywhere?' },
    ],
    'rust-collections': [
      { e: '📋', t: 'Vec: the growing list', b: '<code>Vec</code> is Rust’s list. <code>vec![]</code> makes one quickly.', code: 'let mut nums = vec![3, 1, 4];\nnums.push(1);' },
      { e: '📒', t: 'Maps', b: '<code>HashMap</code> stores key → value pairs. <code>BTreeMap</code> does the same but keeps keys sorted.' },
      { e: '🧮', t: 'The counting trick', b: '<code>entry(...).or_insert(0)</code> means "find this key, or start it at 0", and then you add 1.', code: '*counts.entry(word).or_insert(0) += 1;' },
      { e: '🌊', t: 'Iterators', b: 'Chain steps like <code>.iter().filter(...).map(...).sum()</code>. Nothing runs until a final step like <code>sum()</code> or <code>collect()</code>.', think: 'Which map type should you use if you want word counts printed in alphabetical order?' },
    ],
    'rust-errors': [
      { e: '📨', t: 'Results instead of crashes', b: 'A function that might fail returns a <code>Result</code>: <code>Ok(value)</code> when it works, or <code>Err(problem)</code> when it doesn’t.' },
      { e: '🧩', t: 'Handle both cases', b: 'Use <code>match</code> to deal with success and failure.', code: 'match safe_divide(10, 2) {\n    Ok(v) => println!("{v}"),\n    Err(e) => println!("error: {e}"),\n}' },
      { e: '❓', t: 'The ? shortcut', b: 'Inside a function that returns Result, <code>?</code> means "if this failed, return the error right now; otherwise keep going".' },
      { e: '💥', t: 'Careful with unwrap', b: '<code>.unwrap()</code> grabs the value but <b>crashes</b> if it’s an error. It’s fine for quick tests; avoid it in real programs.', think: 'What should <code>safe_divide(1, 0)</code> return instead of crashing?' },
    ],
  });
})(typeof window !== 'undefined' ? window : globalThis);
