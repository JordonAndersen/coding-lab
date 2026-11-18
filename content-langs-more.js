(function (G) {
  const CL = (G.CL = G.CL || {});
  const L = (CL.langLessons = CL.langLessons || {});
  const TSH = 'https://www.typescriptlang.org/docs/handbook/';
  const GO = 'https://go.dev/';
  const RB = 'https://doc.rust-lang.org/book/';
  const RS = 'https://doc.rust-lang.org/std/';

  /* ======================= TYPESCRIPT ======================= */
  L.typescript = [
    { id: 'ts-basics', title: 'Types & Inference', minutes: 12,
      concept: `<p>TypeScript is JavaScript plus a <strong>static type checker</strong>. Types are checked before the code runs, then erased: the output is plain JavaScript. Annotate with <code>: type</code>, but let inference do most of the work.</p>
<pre class="snippet">let title: string = "TypeScript";
let year = 2012;            // inferred: number
const tags = ["web", "js"]; // inferred: string[]
let maybe: string | null = null;

year = "soon";   // ✗ error: Type 'string' is not assignable to type 'number'</pre>
<p>In CodeLab, TypeScript code is type-checked in <code>strict</code> mode, exactly like <code>tsc --strict</code>. An exercise only passes with <strong>zero type errors</strong>.</p>`,
      keyPoints: ['Types are erased at runtime; they only exist for the checker.', 'Prefer inference; annotate function parameters and public APIs.', 'strict mode turns on null checks and no implicit any.'],
      docs: [{ label: 'TypeScript for JS programmers', url: 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html' }, { label: 'Everyday types', url: TSH + '2/everyday-types.html' }, { label: 'strict compiler option', url: 'https://www.typescriptlang.org/tsconfig/#strict' }],
      quiz: [{ q: 'What happens to TypeScript type annotations when the code runs?', options: ['They are erased: the output is plain JavaScript', 'They are checked again at runtime', 'They slow the program down', 'They become comments'], answer: 0, why: 'TypeScript checks at compile time, then emits JavaScript with the types removed.' }, { q: 'What type does TypeScript infer for: const tags = ["a", "b"]?', options: ['string[]', 'any[]', '["a", "b"]', 'object'], answer: 0, why: 'Array literals of strings infer string[] (use "as const" for a readonly tuple of literals).' }],
      exercise: { prompt: 'This code has a <strong>type error</strong>. Fix it (without using <code>any</code>) so it type-checks and prints <code>TypeScript was released in 2012</code>.', starter: 'const lang: string = "TypeScript";\nconst year: number = "2012";\n\nconsole.log(`${lang} was released in ${year}`);\n', expected: 'TypeScript was released in 2012', solution: 'const lang: string = "TypeScript";\nconst year: number = 2012;\n\nconsole.log(`${lang} was released in ${year}`);\n' } },
    { id: 'ts-objects', title: 'Interfaces & Type Aliases', minutes: 14,
      concept: `<p>Describe the <strong>shape</strong> of objects with an <code>interface</code> or a <code>type</code> alias. TypeScript is <em>structurally</em> typed: any object with the right properties fits, no matter how it was created.</p>
<pre class="snippet">interface User {
  id: number;
  name: string;
  email?: string;          // optional
  readonly createdAt: Date;
}

type Point = { x: number; y: number };

function greet(u: User): string {
  return \`Hi \${u.name}\${u.email ? " (" + u.email + ")" : ""}\`;
}</pre>`,
      keyPoints: ['? marks optional properties.', 'readonly prevents reassignment.', 'Structural typing: shape matters, not the name.'],
      docs: [{ label: 'Object types', url: TSH + '2/objects.html' }, { label: 'Interfaces vs type aliases', url: TSH + '2/everyday-types.html#differences-between-type-aliases-and-interfaces' }, { label: 'Type compatibility (structural typing)', url: TSH + 'type-compatibility.html' }],
      quiz: [{ q: 'Given interface P { x: number }, is { x: 1, y: 2 } stored in a variable assignable to P?', options: ['Yes: it has every property P needs', 'No: it has an extra property', 'Only with a cast', 'Only if declared with class P'], answer: 0, why: 'Structural typing accepts extra properties (only fresh object literals trigger the excess-property check).' }],
      exercise: { prompt: 'Define an <code>interface Course</code> with <code>title: string</code>, <code>lessons: number</code> and optional <code>done?: boolean</code>. Then print each course as <code>Title: N lessons</code>, adding <code> ✓</code> when done is true.', starter: '// define the Course interface here\n\nconst courses: Course[] = [\n  { title: "Go", lessons: 6, done: true },\n  { title: "Rust", lessons: 6 },\n];\n\nfor (const c of courses) {\n  // print each line\n}\n', expected: 'Go: 6 lessons ✓\nRust: 6 lessons', solution: 'interface Course {\n  title: string;\n  lessons: number;\n  done?: boolean;\n}\n\nconst courses: Course[] = [\n  { title: "Go", lessons: 6, done: true },\n  { title: "Rust", lessons: 6 },\n];\n\nfor (const c of courses) {\n  console.log(`${c.title}: ${c.lessons} lessons${c.done ? " ✓" : ""}`);\n}\n' } },
    { id: 'ts-functions', title: 'Functions & Generics', minutes: 15,
      concept: `<p>Type function parameters and (optionally) return values. <strong>Generics</strong> let one function work over many types while keeping them connected: the type you put in is the type you get out.</p>
<pre class="snippet">function first&lt;T&gt;(items: T[]): T | undefined {
  return items[0];
}
const n = first([1, 2, 3]);       // n: number | undefined
const s = first(["a", "b"]);      // s: string | undefined

function longest&lt;T extends { length: number }&gt;(a: T, b: T): T {
  return a.length >= b.length ? a : b;   // constraint: T must have .length
}</pre>`,
      keyPoints: ['<T> declares a type parameter.', 'extends adds a constraint.', 'Generics preserve type information; any throws it away.'],
      docs: [{ label: 'More on functions', url: TSH + '2/functions.html' }, { label: 'Generics', url: TSH + '2/generics.html' }],
      quiz: [{ q: 'Why prefer function id<T>(x: T): T over function id(x: any): any?', options: ['The caller keeps the exact type of what they passed in', 'It runs faster', 'any is not allowed in strict mode', 'They are identical'], answer: 0, why: 'With any, the result type is lost; generics connect input and output types.' }],
      exercise: { prompt: 'Write a generic <code>function lastItem&lt;T&gt;(items: T[]): T | undefined</code>. Print <code>lastItem([3, 5, 8])</code> and <code>lastItem(["go", "rust"])</code>, then print <code>none</code> when <code>lastItem([])</code> is undefined (use <code>??</code>).', starter: 'function lastItem<T>(items: T[]): T | undefined {\n  return undefined;\n}\n\nconsole.log(lastItem([3, 5, 8]));\nconsole.log(lastItem(["go", "rust"]));\nconsole.log(lastItem([]) ?? "none");\n', expected: '8\nrust\nnone', solution: 'function lastItem<T>(items: T[]): T | undefined {\n  return items[items.length - 1];\n}\n\nconsole.log(lastItem([3, 5, 8]));\nconsole.log(lastItem(["go", "rust"]));\nconsole.log(lastItem([]) ?? "none");\n' } },
    { id: 'ts-unions', title: 'Unions & Narrowing', minutes: 15,
      concept: `<p>A <strong>union</strong> <code>A | B</code> means "either type". Before using it, you <strong>narrow</strong> it with checks the compiler understands: <code>typeof</code>, <code>in</code>, equality, or a shared literal field (a <em>discriminated union</em>).</p>
<pre class="snippet">type Shape =
  | { kind: "circle"; r: number }
  | { kind: "rect"; w: number; h: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.r ** 2;   // s is the circle here
    case "rect":   return s.w * s.h;             // s is the rect here
  }
}</pre>
<p>If you add a new <code>kind</code> and forget a case, strict mode flags the missing return.</p>`,
      keyPoints: ['Narrow before use: typeof, in, ===, or a kind field.', 'Discriminated unions model "one of these states" safely.', 'string | null forces you to handle null.'],
      docs: [{ label: 'Narrowing', url: TSH + '2/narrowing.html' }, { label: 'Discriminated unions', url: TSH + '2/narrowing.html#discriminated-unions' }, { label: 'Union types', url: TSH + '2/everyday-types.html#union-types' }],
      quiz: [{ q: 'Inside if (typeof x === "string") { … } where x: string | number, what is x?', options: ['string', 'number', 'string | number', 'unknown'], answer: 0, why: 'typeof checks narrow the union inside the branch.' }],
      exercise: { prompt: 'Complete <code>describe(r: Result)</code> using the <code>status</code> field to narrow. Print <code>ok: 42</code> for success and <code>error: timeout</code> for failure.', starter: 'type Result =\n  | { status: "ok"; value: number }\n  | { status: "error"; message: string };\n\nfunction describe(r: Result): string {\n  return "";\n}\n\nconsole.log(describe({ status: "ok", value: 42 }));\nconsole.log(describe({ status: "error", message: "timeout" }));\n', expected: 'ok: 42\nerror: timeout', solution: 'type Result =\n  | { status: "ok"; value: number }\n  | { status: "error"; message: string };\n\nfunction describe(r: Result): string {\n  if (r.status === "ok") return `ok: ${r.value}`;\n  return `error: ${r.message}`;\n}\n\nconsole.log(describe({ status: "ok", value: 42 }));\nconsole.log(describe({ status: "error", message: "timeout" }));\n' } },
    { id: 'ts-classes', title: 'Classes & Utility Types', minutes: 15,
      concept: `<p>TypeScript classes add access modifiers (<code>private</code>, <code>protected</code>, <code>readonly</code>) and can <code>implement</code> interfaces. <strong>Utility types</strong> transform existing types instead of rewriting them.</p>
<pre class="snippet">interface Todo { id: number; title: string; done: boolean }

type TodoDraft = Omit&lt;Todo, "id"&gt;;        // { title; done }
type TodoPatch = Partial&lt;Todo&gt;;           // every field optional
type Index = Record&lt;number, Todo&gt;;

class Store {
  private items: Todo[] = [];
  add(d: TodoDraft): Todo {
    const t = { id: this.items.length + 1, ...d };
    this.items.push(t);
    return t;
  }
}</pre>`,
      keyPoints: ['private is enforced by the checker (# fields are private at runtime too).', 'Partial, Pick, Omit, Record and Readonly reshape types.', 'A class can implement several interfaces.'],
      docs: [{ label: 'Classes', url: TSH + '2/classes.html' }, { label: 'Utility types', url: TSH + 'utility-types.html' }],
      quiz: [{ q: 'What is Partial<{ a: number; b: string }>?', options: ['{ a?: number; b?: string }', '{ a: number }', '{ a: number | undefined; b: string }', 'An error'], answer: 0, why: 'Partial makes every property optional.' }],
      exercise: { prompt: 'Finish the <code>Counter</code> class: a <code>private count</code> starting at 0, <code>increment(): void</code>, and <code>get value(): number</code>. Increment 3 times, then print the value.', starter: 'class Counter {\n  // add a private count field, increment(), and a value getter\n}\n\nconst c = new Counter();\nc.increment();\nc.increment();\nc.increment();\nconsole.log(c.value);\n', expected: '3', solution: 'class Counter {\n  private count = 0;\n\n  increment(): void {\n    this.count++;\n  }\n\n  get value(): number {\n    return this.count;\n  }\n}\n\nconst c = new Counter();\nc.increment();\nc.increment();\nc.increment();\nconsole.log(c.value);\n' } },
  ];

  /* ======================= GO ======================= */
  L.go = [
    { id: 'go-basics', title: 'Packages, Variables & Types', minutes: 12,
      concept: `<p>Go is a small, fast, compiled language built for simple, reliable software. Every program is a <code>package main</code> with a <code>func main()</code>. Declare variables with <code>var</code> or the short form <code>:=</code>.</p>
<pre class="snippet">package main

import "fmt"

func main() {
	name := "Gopher"         // type inferred: string
	var age int = 13
	pi := 3.14               // float64
	fmt.Println(name, age)
	fmt.Printf("%s is %d (pi=%.2f)\\n", name, age, pi)
}</pre>
<p>Unused variables and unused imports are <strong>compile errors</strong>, not warnings. Run <code>gofmt</code> and never argue about formatting again.</p>`,
      keyPoints: [':= declares and assigns (only inside functions).', 'Unused variables/imports do not compile.', 'Exported names start with a capital letter: fmt.Println.'],
      docs: [{ label: 'A Tour of Go', url: GO + 'tour/' }, { label: 'Package fmt', url: 'https://pkg.go.dev/fmt' }, { label: 'Go spec: Variable declarations', url: GO + 'ref/spec#Variable_declarations' }],
      quiz: [{ q: 'What happens if you declare a local variable in Go and never use it?', options: ['Compile error', 'A warning', 'It is silently removed', 'A runtime panic'], answer: 0, why: 'Go treats unused local variables (and imports) as errors.' }, { q: 'Why is it fmt.Println and not fmt.println?', options: ['Capitalized names are exported from a package', 'Go is case-insensitive', 'println is reserved', 'Style preference only'], answer: 0, why: 'Only identifiers starting with an uppercase letter are visible outside their package.' }],
      exercise: { prompt: 'Print exactly <code>Go was released in 2009</code> using variables <code>lang</code> and <code>year</code> declared with <code>:=</code>.', starter: 'package main\n\nimport "fmt"\n\nfunc main() {\n\t// declare lang and year with :=, then print\n\tfmt.Println()\n}\n', expected: 'Go was released in 2009', solution: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tlang := "Go"\n\tyear := 2009\n\tfmt.Printf("%s was released in %d\\n", lang, year)\n}\n' } },
    { id: 'go-control', title: 'Control Flow', minutes: 12,
      concept: `<p>Go has one loop keyword: <code>for</code>. It covers C-style loops, while-loops, infinite loops and <code>range</code> iteration. <code>if</code> and <code>switch</code> can start with a short statement, and switch cases don't fall through.</p>
<pre class="snippet">for i := 0; i < 3; i++ { }        // classic
for n < 100 { n *= 2 }              // "while"
for i, v := range []string{"a", "b"} { fmt.Println(i, v) }

if err := doThing(); err != nil {   // scoped to the if
	return err
}

switch {
case score >= 90: grade = "A"
case score >= 80: grade = "B"
default:          grade = "C"
}</pre>`,
      keyPoints: ['for is the only loop.', 'No parentheses around conditions; braces are required.', 'switch cases break automatically.'],
      docs: [{ label: 'Tour: Flow control', url: GO + 'tour/flowcontrol/1' }, { label: 'Go spec: For statements', url: GO + 'ref/spec#For_statements' }, { label: 'Go spec: Switch statements', url: GO + 'ref/spec#Switch_statements' }],
      quiz: [{ q: 'How do you write a while-loop in Go?', options: ['for cond { }', 'while cond { }', 'loop while cond { }', 'do { } while cond'], answer: 0, why: 'A for with only a condition behaves like while.' }],
      exercise: { prompt: 'FizzBuzz 1–15: one value per line, <code>Fizz</code> for multiples of 3, <code>Buzz</code> for 5, <code>FizzBuzz</code> for both. Try a tagless <code>switch</code>.', starter: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfor i := 1; i <= 15; i++ {\n\t\tfmt.Println(i)\n\t}\n}\n', expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', solution: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfor i := 1; i <= 15; i++ {\n\t\tswitch {\n\t\tcase i%15 == 0:\n\t\t\tfmt.Println("FizzBuzz")\n\t\tcase i%3 == 0:\n\t\t\tfmt.Println("Fizz")\n\t\tcase i%5 == 0:\n\t\t\tfmt.Println("Buzz")\n\t\tdefault:\n\t\t\tfmt.Println(i)\n\t\t}\n\t}\n}\n' } },
    { id: 'go-functions', title: 'Functions & Errors', minutes: 15,
      concept: `<p>Go functions can return <strong>multiple values</strong>. Instead of exceptions, functions that can fail return an <code>error</code> as their last value, and the caller checks it immediately.</p>
<pre class="snippet">import ("errors"; "fmt")

func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}

result, err := divide(10, 0)
if err != nil {
	fmt.Println("error:", err)
	return
}</pre>
<p><code>defer</code> schedules a call to run when the function returns: perfect for closing files.</p>`,
      keyPoints: ['Return (value, error); check err != nil right away.', 'nil error means success.', 'defer runs cleanup on return, in LIFO order.'],
      docs: [{ label: 'Effective Go: Errors', url: GO + 'doc/effective_go#errors' }, { label: 'Package errors', url: 'https://pkg.go.dev/errors' }, { label: 'Go blog: Defer, panic, recover', url: GO + 'blog/defer-panic-and-recover' }],
      quiz: [{ q: 'What is the idiomatic way to signal failure from a Go function?', options: ['Return an error as the last value', 'throw an exception', 'Return -1', 'Call panic()'], answer: 0, why: 'panic is for truly unrecoverable situations; ordinary failures are values.' }],
      exercise: { prompt: 'Write <code>safeDivide(a, b int) (int, error)</code> that returns an error <code>"cannot divide by zero"</code> when b is 0. Print the result of 10/2, then the error message for 1/0, as <code>error: cannot divide by zero</code>.', starter: 'package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\nfunc safeDivide(a, b int) (int, error) {\n\treturn 0, errors.New("todo")\n}\n\nfunc main() {\n\tif r, err := safeDivide(10, 2); err == nil {\n\t\tfmt.Println(r)\n\t}\n\tif _, err := safeDivide(1, 0); err != nil {\n\t\tfmt.Println("error:", err)\n\t}\n}\n', expected: '5\nerror: cannot divide by zero', solution: 'package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\nfunc safeDivide(a, b int) (int, error) {\n\tif b == 0 {\n\t\treturn 0, errors.New("cannot divide by zero")\n\t}\n\treturn a / b, nil\n}\n\nfunc main() {\n\tif r, err := safeDivide(10, 2); err == nil {\n\t\tfmt.Println(r)\n\t}\n\tif _, err := safeDivide(1, 0); err != nil {\n\t\tfmt.Println("error:", err)\n\t}\n}\n' } },
    { id: 'go-collections', title: 'Slices & Maps', minutes: 15,
      concept: `<p>A <strong>slice</strong> is a growable view over an array: <code>append</code> adds, <code>s[a:b]</code> re-slices. A <strong>map</strong> is a hash table. Map iteration order is <em>deliberately random</em>, so sort the keys when order matters.</p>
<pre class="snippet">nums := []int{3, 1, 4}
nums = append(nums, 1, 5)          // always reassign!
sort.Ints(nums)

ages := map[string]int{"ada": 36}
ages["bo"] = 25
if age, ok := ages["cy"]; !ok {     // comma-ok: does the key exist?
	fmt.Println("no cy")
}
keys := slices.Sorted(maps.Keys(ages))   // Go 1.23+</pre>`,
      keyPoints: ['Always write s = append(s, …).', 'value, ok := m[key] distinguishes missing from zero.', 'Never rely on map iteration order.'],
      docs: [{ label: 'Go blog: Slices intro', url: GO + 'blog/slices-intro' }, { label: 'Go blog: Maps in action', url: GO + 'blog/maps' }, { label: 'Package slices', url: 'https://pkg.go.dev/slices' }],
      quiz: [{ q: 'Why might ranging over a map print keys in a different order each run?', options: ['Go randomizes map iteration order on purpose', 'Maps are sorted by value', 'It is a bug', 'Only in the playground'], answer: 0, why: 'Randomization stops programs from depending on an unspecified order.' }],
      exercise: { prompt: 'Count words in <code>"the cat and the hat"</code> with a <code>map[string]int</code>, then print <code>word=count</code> lines in <strong>sorted key order</strong>.', starter: 'package main\n\nimport (\n\t"fmt"\n\t"sort"\n\t"strings"\n)\n\nfunc main() {\n\tcounts := map[string]int{}\n\tfor _, w := range strings.Fields("the cat and the hat") {\n\t\t_ = w // count it\n\t}\n\t_ = counts\n\tkeys := []string{}\n\t// collect keys, sort them, then print\n\tsort.Strings(keys)\n\tfmt.Println(keys)\n}\n', expected: 'and=1\ncat=1\nhat=1\nthe=2', solution: 'package main\n\nimport (\n\t"fmt"\n\t"sort"\n\t"strings"\n)\n\nfunc main() {\n\tcounts := map[string]int{}\n\tfor _, w := range strings.Fields("the cat and the hat") {\n\t\tcounts[w]++\n\t}\n\tkeys := make([]string, 0, len(counts))\n\tfor k := range counts {\n\t\tkeys = append(keys, k)\n\t}\n\tsort.Strings(keys)\n\tfor _, k := range keys {\n\t\tfmt.Printf("%s=%d\\n", k, counts[k])\n\t}\n}\n' } },
    { id: 'go-structs', title: 'Structs, Methods & Interfaces', minutes: 18,
      concept: `<p>Go has no classes. You define <strong>structs</strong> and attach <strong>methods</strong> to them. <strong>Interfaces</strong> are satisfied <em>implicitly</em>: if a type has the methods, it implements the interface, with no <code>implements</code> keyword.</p>
<pre class="snippet">type Shape interface { Area() float64 }

type Rect struct{ W, H float64 }
func (r Rect) Area() float64 { return r.W * r.H }

type Circle struct{ R float64 }
func (c Circle) Area() float64 { return math.Pi * c.R * c.R }

for _, s := range []Shape{Rect{2, 3}, Circle{1}} {
	fmt.Printf("%.2f\\n", s.Area())
}</pre>
<p>Use a <em>pointer receiver</em> <code>func (c *Counter) Inc()</code> when a method must modify the struct.</p>`,
      keyPoints: ['Interfaces are satisfied implicitly.', 'Pointer receivers can mutate; value receivers get a copy.', 'Implementing String() string controls how fmt prints a value.'],
      docs: [{ label: 'Tour: Methods and interfaces', url: GO + 'tour/methods/1' }, { label: 'Effective Go: Interfaces', url: GO + 'doc/effective_go#interfaces' }, { label: 'fmt.Stringer', url: 'https://pkg.go.dev/fmt#Stringer' }],
      quiz: [{ q: 'func (c Counter) Inc() { c.n++ } does not change the caller\'s counter. Why?', options: ['Value receivers operate on a copy', 'n is private', 'Methods cannot change fields', 'You must call it with go'], answer: 0, why: 'Use a pointer receiver (c *Counter) to modify the original.' }],
      exercise: { prompt: 'Give <code>Point</code> a method <code>Manhattan() int</code> (|X|+|Y|) and a <code>String() string</code> method returning <code>(3,-4)</code> style text. Print the point, then its Manhattan distance.', starter: 'package main\n\nimport "fmt"\n\ntype Point struct{ X, Y int }\n\n// add Manhattan() and String() methods\n\nfunc main() {\n\tp := Point{3, -4}\n\tfmt.Println(p)\n}\n', expected: '(3,-4)\n7', solution: 'package main\n\nimport "fmt"\n\ntype Point struct{ X, Y int }\n\nfunc abs(n int) int {\n\tif n < 0 {\n\t\treturn -n\n\t}\n\treturn n\n}\n\nfunc (p Point) Manhattan() int { return abs(p.X) + abs(p.Y) }\n\nfunc (p Point) String() string { return fmt.Sprintf("(%d,%d)", p.X, p.Y) }\n\nfunc main() {\n\tp := Point{3, -4}\n\tfmt.Println(p)\n\tfmt.Println(p.Manhattan())\n}\n' } },
    { id: 'go-concurrency', title: 'Goroutines & Channels', minutes: 20,
      concept: `<p>A <strong>goroutine</strong> is a lightweight thread: put <code>go</code> before a call. <strong>Channels</strong> pass values between goroutines safely. Go's motto: <em>don't communicate by sharing memory; share memory by communicating.</em></p>
<pre class="snippet">results := make(chan int)
for _, n := range []int{1, 2, 3} {
	go func(n int) { results <- n * n }(n)   // send
}
sum := 0
for range 3 {
	sum += <-results                            // receive (blocks until ready)
}

var wg sync.WaitGroup                         // wait for many goroutines
wg.Add(1); go func() { defer wg.Done(); work() }(); wg.Wait()</pre>`,
      keyPoints: ['go f() starts a goroutine.', 'Unbuffered channel send/receive both block until the other side is ready.', 'Goroutine completion order is not guaranteed.'],
      docs: [{ label: 'Tour: Concurrency', url: GO + 'tour/concurrency/1' }, { label: 'Effective Go: Concurrency', url: GO + 'doc/effective_go#concurrency' }, { label: 'sync.WaitGroup', url: 'https://pkg.go.dev/sync#WaitGroup' }],
      quiz: [{ q: 'Three goroutines each send one value on a channel. In what order are values received?', options: ['Not guaranteed', 'Always the order the goroutines were started', 'Reverse order', 'Sorted'], answer: 0, why: 'The scheduler decides; design code that does not depend on order (or sort afterwards).' }],
      exercise: { prompt: 'Start one goroutine per word that sends <code>len(word)</code> on a channel. Receive all results and print the total: <code>total letters: 18</code>.', starter: 'package main\n\nimport "fmt"\n\nfunc main() {\n\twords := []string{"goroutines", "and", "chans"}\n\tlengths := make(chan int)\n\t// start a goroutine per word, then receive len(words) values\n\ttotal := 0\n\t_, _ = words, lengths\n\tfmt.Println("total letters:", total)\n}\n', expected: 'total letters: 18', solution: 'package main\n\nimport "fmt"\n\nfunc main() {\n\twords := []string{"goroutines", "and", "chans"}\n\tlengths := make(chan int)\n\tfor _, w := range words {\n\t\tgo func(w string) { lengths <- len(w) }(w)\n\t}\n\ttotal := 0\n\tfor range words {\n\t\ttotal += <-lengths\n\t}\n\tfmt.Println("total letters:", total)\n}\n' } },
  ];

  /* ======================= RUST ======================= */
  L.rust = [
    { id: 'rust-basics', title: 'Variables, Mutability & Types', minutes: 12,
      concept: `<p>Rust gives you C-level speed with <strong>memory safety checked at compile time</strong>. Variables are <strong>immutable by default</strong>; add <code>mut</code> to change them. <code>println!</code> is a macro (note the <code>!</code>).</p>
<pre class="snippet">fn main() {
    let name = "Ferris";          // &str, immutable
    let mut level = 1;            // i32, mutable
    level += 1;
    let pi: f64 = 3.14159;
    println!("{name} is level {level}, pi ≈ {pi:.2}");
    let level = level * 10;       // shadowing: a new binding
}</pre>`,
      keyPoints: ['let is immutable; let mut is mutable.', 'Integer types say their size: i32, u64, usize…', 'Shadowing (let x = x + 1) creates a new variable.'],
      docs: [{ label: 'The Rust Book: Variables and mutability', url: RB + 'ch03-01-variables-and-mutability.html' }, { label: 'The Rust Book: Data types', url: RB + 'ch03-02-data-types.html' }, { label: 'std::fmt (format strings)', url: RS + 'fmt/index.html' }],
      quiz: [{ q: 'let x = 5; x = 6; What happens?', options: ['Compile error: cannot assign twice to an immutable variable', 'x becomes 6', 'A runtime panic', 'A warning only'], answer: 0, why: 'Bindings are immutable unless declared with mut.' }, { q: 'Why does println! have an exclamation mark?', options: ['It is a macro, not a function', 'It panics on error', 'It prints in bold', 'It is unsafe'], answer: 0, why: 'Macros expand at compile time and can take a variable number of arguments.' }],
      exercise: { prompt: 'Print exactly <code>Rust was released in 2015</code> using variables <code>lang</code> and <code>year</code> and an inline format string.', starter: 'fn main() {\n    // declare lang and year, then println!\n}\n', expected: 'Rust was released in 2015', solution: 'fn main() {\n    let lang = "Rust";\n    let year = 2015;\n    println!("{lang} was released in {year}");\n}\n' } },
    { id: 'rust-control', title: 'Control Flow & match', minutes: 14,
      concept: `<p>In Rust, <code>if</code> and <code>match</code> are <strong>expressions</strong>: they produce values. <code>match</code> must be <strong>exhaustive</strong>: the compiler makes you handle every case.</p>
<pre class="snippet">let label = if score >= 50 { "pass" } else { "fail" };

for i in 1..=3 { println!("{i}"); }       // 1, 2, 3 (inclusive range)

let grade = match score {
    90..=100 => 'A',
    80..=89 => 'B',
    _ => 'C',                              // _ catches everything else
};</pre>`,
      keyPoints: ['if/match return values; no ternary operator needed.', 'a..b excludes b; a..=b includes it.', 'match must cover every possibility.'],
      docs: [{ label: 'The Rust Book: Control flow', url: RB + 'ch03-05-control-flow.html' }, { label: 'The Rust Book: match', url: RB + 'ch06-02-match.html' }, { label: 'Rust by Example: Ranges in for', url: 'https://doc.rust-lang.org/rust-by-example/flow_control/for.html' }],
      quiz: [{ q: 'What does a match without a case for some possible value do?', options: ['Fails to compile (non-exhaustive patterns)', 'Returns 0', 'Panics at runtime', 'Skips silently'], answer: 0, why: 'Exhaustiveness is checked at compile time.' }],
      exercise: { prompt: 'FizzBuzz 1–15, one per line. Try matching on the tuple <code>(i % 3, i % 5)</code>.', starter: 'fn main() {\n    for i in 1..=15 {\n        println!("{i}");\n    }\n}\n', expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', solution: 'fn main() {\n    for i in 1..=15 {\n        match (i % 3, i % 5) {\n            (0, 0) => println!("FizzBuzz"),\n            (0, _) => println!("Fizz"),\n            (_, 0) => println!("Buzz"),\n            _ => println!("{i}"),\n        }\n    }\n}\n' } },
    { id: 'rust-ownership', title: 'Ownership & Borrowing', minutes: 22,
      concept: `<p>Rust's big idea. Every value has exactly <strong>one owner</strong>; when the owner goes out of scope, the value is freed. Assigning a heap value <em>moves</em> it. To use a value without taking it, <strong>borrow</strong> it with a reference.</p>
<pre class="snippet">let a = String::from("hi");
let b = a;              // ownership MOVES to b
// println!("{a}");     // ✗ error: borrow of moved value: \`a\`

fn len(s: &String) -> usize { s.len() }   // borrows, doesn't own
fn shout(s: &mut String) { s.push('!'); }  // mutable borrow

let mut c = String::from("hey");
println!("{}", len(&c));
shout(&mut c);</pre>
<p>The rules: any number of <code>&amp;</code> shared borrows <em>or</em> exactly one <code>&amp;mut</code> borrow, never both at once. This is what prevents data races at compile time.</p>`,
      keyPoints: ['One owner per value; it is dropped when the owner goes out of scope.', 'Moves transfer ownership; .clone() makes a deep copy.', 'Many & OR one &mut, never both at the same time.'],
      docs: [{ label: 'The Rust Book: What is ownership?', url: RB + 'ch04-01-what-is-ownership.html' }, { label: 'The Rust Book: References and borrowing', url: RB + 'ch04-02-references-and-borrowing.html' }, { label: 'The Rust Book: Slices', url: RB + 'ch04-03-slices.html' }],
      quiz: [{ q: 'let a = String::from("x"); let b = a; Which is now usable?', options: ['Only b', 'Only a', 'Both', 'Neither'], answer: 0, why: 'String is moved; a is no longer valid. Use a.clone() to keep both.' }, { q: 'Can you hold a &mut borrow and a & borrow of the same value at the same time?', options: ['No', 'Yes', 'Only inside unsafe code', 'Only for integers'], answer: 0, why: 'The borrow checker allows many readers or one writer.' }],
      exercise: { prompt: 'Complete <code>add_exclaim(s: &amp;mut String)</code> to append <code>"!"</code>, and <code>count_chars(s: &amp;String) -> usize</code>. The program should print <code>hello!</code> then <code>6</code>.', starter: 'fn add_exclaim(s: &mut String) {\n    // append "!"\n}\n\nfn count_chars(s: &String) -> usize {\n    0\n}\n\nfn main() {\n    let mut word = String::from("hello");\n    add_exclaim(&mut word);\n    println!("{word}");\n    println!("{}", count_chars(&word));\n}\n', expected: 'hello!\n6', solution: 'fn add_exclaim(s: &mut String) {\n    s.push_str("!");\n}\n\nfn count_chars(s: &String) -> usize {\n    s.chars().count()\n}\n\nfn main() {\n    let mut word = String::from("hello");\n    add_exclaim(&mut word);\n    println!("{word}");\n    println!("{}", count_chars(&word));\n}\n' } },
    { id: 'rust-structs', title: 'Structs, Enums & Option', minutes: 18,
      concept: `<p><code>struct</code> groups data; <code>impl</code> adds methods. <code>enum</code> variants can carry data, and <code>match</code> takes them apart. Rust has no null: a value that might be missing is an <code>Option&lt;T&gt;</code> (<code>Some(x)</code> or <code>None</code>).</p>
<pre class="snippet">#[derive(Debug)]
struct Point { x: i32, y: i32 }

impl Point {
    fn manhattan(&self) -> i32 { self.x.abs() + self.y.abs() }
}

enum Shape { Circle(f64), Rect { w: f64, h: f64 } }

fn find_even(v: &[i32]) -> Option<i32> {
    v.iter().copied().find(|n| n % 2 == 0)
}
match find_even(&[1, 3, 4]) {
    Some(n) => println!("found {n}"),
    None => println!("none"),
}</pre>`,
      keyPoints: ['&self methods borrow; &mut self can modify.', 'Option forces you to handle "no value".', '#[derive(Debug)] lets you print with {:?}.'],
      docs: [{ label: 'The Rust Book: Structs', url: RB + 'ch05-00-structs.html' }, { label: 'The Rust Book: Enums & Option', url: RB + 'ch06-01-defining-an-enum.html' }, { label: 'std::option::Option', url: RS + 'option/enum.Option.html' }],
      quiz: [{ q: 'How does Rust represent "maybe there is no value"?', options: ['Option<T>: Some(value) or None', 'null', 'undefined', '-1 by convention'], answer: 0, why: 'There is no null in safe Rust; Option makes absence explicit in the type.' }],
      exercise: { prompt: 'Add a method <code>manhattan(&amp;self) -> i32</code> to <code>Point</code>. Print the point with <code>{:?}</code>, then its distance.', starter: '#[derive(Debug)]\nstruct Point {\n    x: i32,\n    y: i32,\n}\n\n// add an impl block with manhattan()\n\nfn main() {\n    let p = Point { x: 3, y: -4 };\n    println!("{:?}", p);\n}\n', expected: 'Point { x: 3, y: -4 }\n7', solution: '#[derive(Debug)]\nstruct Point {\n    x: i32,\n    y: i32,\n}\n\nimpl Point {\n    fn manhattan(&self) -> i32 {\n        self.x.abs() + self.y.abs()\n    }\n}\n\nfn main() {\n    let p = Point { x: 3, y: -4 };\n    println!("{:?}", p);\n    println!("{}", p.manhattan());\n}\n' } },
    { id: 'rust-collections', title: 'Vec, HashMap & Iterators', minutes: 18,
      concept: `<p><code>Vec&lt;T&gt;</code> is the growable array; <code>HashMap</code> is the hash table (<code>BTreeMap</code> keeps keys sorted). <strong>Iterators</strong> chain lazily like JavaScript's map/filter, and compile down to plain loops.</p>
<pre class="snippet">let nums = vec![3, 1, 4, 1, 5];
let evens: Vec&lt;i32&gt; = nums.iter().filter(|&&n| n % 2 == 0).copied().collect();
let total: i32 = nums.iter().sum();

use std::collections::BTreeMap;
let mut counts = BTreeMap::new();
for w in "a b a".split_whitespace() {
    *counts.entry(w).or_insert(0) += 1;   // the entry API
}</pre>`,
      keyPoints: ['Iterators are lazy until collect(), sum(), count()…', 'entry().or_insert() is the counting idiom.', 'HashMap order is random; BTreeMap is sorted.'],
      docs: [{ label: 'The Rust Book: Vectors', url: RB + 'ch08-01-vectors.html' }, { label: 'The Rust Book: Hash maps', url: RB + 'ch08-03-hash-maps.html' }, { label: 'std::iter::Iterator', url: RS + 'iter/trait.Iterator.html' }],
      quiz: [{ q: 'What does nums.iter().map(|x| x * 2) do on its own, without collect() or a loop?', options: ['Nothing yet: iterators are lazy', 'Doubles nums in place', 'Returns a new Vec', 'Panics'], answer: 0, why: 'Adapters build an iterator; a consumer like collect() drives it.' }],
      exercise: { prompt: 'Count words in <code>"the cat and the hat"</code> using a <code>BTreeMap</code> and print <code>word=count</code> lines (sorted automatically).', starter: 'use std::collections::BTreeMap;\n\nfn main() {\n    let mut counts: BTreeMap<&str, i32> = BTreeMap::new();\n    for w in "the cat and the hat".split_whitespace() {\n        // count w\n    }\n    // print each word=count\n}\n', expected: 'and=1\ncat=1\nhat=1\nthe=2', solution: 'use std::collections::BTreeMap;\n\nfn main() {\n    let mut counts: BTreeMap<&str, i32> = BTreeMap::new();\n    for w in "the cat and the hat".split_whitespace() {\n        *counts.entry(w).or_insert(0) += 1;\n    }\n    for (w, n) in &counts {\n        println!("{w}={n}");\n    }\n}\n' } },
    { id: 'rust-errors', title: 'Error Handling with Result', minutes: 18,
      concept: `<p>Recoverable errors are values of type <code>Result&lt;T, E&gt;</code>: <code>Ok(value)</code> or <code>Err(error)</code>. The <code>?</code> operator returns the error early if there is one, which keeps happy-path code flat.</p>
<pre class="snippet">fn parse_age(s: &str) -> Result<u8, String> {
    let n: u8 = s.trim().parse().map_err(|_| format!("'{s}' is not a number"))?;
    if n > 150 { return Err("too old".to_string()); }
    Ok(n)
}

match parse_age("42") {
    Ok(age) => println!("age {age}"),
    Err(e) => println!("error: {e}"),
}</pre>
<p><code>.unwrap()</code> panics on <code>Err</code>/<code>None</code>: fine in quick experiments, avoid in real code.</p>`,
      keyPoints: ['Result<T, E> = Ok(T) | Err(E).', '? propagates errors to the caller.', 'unwrap() crashes on error. Prefer match, ?, or unwrap_or.'],
      docs: [{ label: 'The Rust Book: Recoverable errors with Result', url: RB + 'ch09-02-recoverable-errors-with-result.html' }, { label: 'std::result::Result', url: RS + 'result/enum.Result.html' }, { label: 'The ? operator', url: RB + 'ch09-02-recoverable-errors-with-result.html#a-shortcut-for-propagating-errors-the--operator' }],
      quiz: [{ q: 'Inside a function returning Result, what does expr? do when expr is Err(e)?', options: ['Returns Err(e) from the function immediately', 'Panics', 'Ignores the error', 'Converts it to None'], answer: 0, why: '? is shorthand for "return the error if there is one, otherwise unwrap the Ok value".' }],
      exercise: { prompt: 'Complete <code>safe_divide(a: i32, b: i32) -> Result&lt;i32, String&gt;</code>. Print <code>5</code> for 10/2 and <code>error: cannot divide by zero</code> for 1/0.', starter: 'fn safe_divide(a: i32, b: i32) -> Result<i32, String> {\n    Err("todo".to_string())\n}\n\nfn main() {\n    for (a, b) in [(10, 2), (1, 0)] {\n        match safe_divide(a, b) {\n            Ok(v) => println!("{v}"),\n            Err(e) => println!("error: {e}"),\n        }\n    }\n}\n', expected: '5\nerror: cannot divide by zero', solution: 'fn safe_divide(a: i32, b: i32) -> Result<i32, String> {\n    if b == 0 {\n        return Err("cannot divide by zero".to_string());\n    }\n    Ok(a / b)\n}\n\nfn main() {\n    for (a, b) in [(10, 2), (1, 0)] {\n        match safe_divide(a, b) {\n            Ok(v) => println!("{v}"),\n            Err(e) => println!("error: {e}"),\n        }\n    }\n}\n' } },
  ];
})(typeof window !== 'undefined' ? window : globalThis);
