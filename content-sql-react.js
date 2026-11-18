(function (G) {
  const CL = (G.CL = G.CL || {});
  const PG = 'https://www.postgresql.org/docs/current/';

  CL.sqlSchema = `
CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT, location TEXT);
CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER REFERENCES departments(id), title TEXT, salary INTEGER, hire_date TEXT, manager_id INTEGER REFERENCES employees(id));
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, city TEXT, signup_date TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers(id), order_date TEXT, amount REAL, status TEXT);
INSERT INTO departments VALUES (1,'Engineering','Portland'),(2,'Sales','Boise'),(3,'Support','Portland'),(4,'Research','Seattle');
INSERT INTO employees VALUES
 (1,'Ada Lovelace',1,'Engineering Manager',145000,'2018-03-12',NULL),
 (2,'Alan Turing',1,'Senior Engineer',132000,'2019-07-01',1),
 (3,'Grace Hopper',1,'Engineer',118000,'2021-01-18',1),
 (4,'Linus Torvalds',1,'Engineer',121000,'2022-05-09',1),
 (5,'Margaret Hamilton',2,'Sales Director',128000,'2017-11-20',NULL),
 (6,'Dennis Ritchie',2,'Account Executive',84000,'2020-02-03',5),
 (7,'Barbara Liskov',2,'Account Executive',88000,'2023-04-17',5),
 (8,'Ken Thompson',3,'Support Lead',76000,'2019-09-30',NULL),
 (9,'Radia Perlman',3,'Support Specialist',61000,'2022-08-22',8),
 (10,'Katherine Johnson',3,'Support Specialist',63000,'2024-01-08',8);
INSERT INTO customers VALUES
 (1,'Acme Corp','Portland','2022-01-05'),(2,'Globex','Boise','2022-03-14'),(3,'Initech','Seattle','2022-06-30'),
 (4,'Umbrella','Portland','2023-02-11'),(5,'Hooli','Boise','2023-07-19'),(6,'Stark Industries','Seattle','2024-03-02');
INSERT INTO orders VALUES
 (1,1,'2024-01-10',1200,'paid'),(2,1,'2024-02-15',450,'paid'),(3,2,'2024-02-20',980,'refunded'),
 (4,2,'2024-03-05',2300,'paid'),(5,3,'2024-03-18',150,'paid'),(6,4,'2024-04-01',3100,'paid'),
 (7,4,'2024-04-22',620,'pending'),(8,5,'2024-05-09',75,'paid'),(9,1,'2024-05-30',1800,'paid'),
 (10,3,'2024-06-12',940,'pending'),(11,5,'2024-06-25',410,'paid'),(12,2,'2024-07-03',1500,'paid');
`;

  CL.sqlTables = [
    { name: 'departments', cols: 'id, name, location' },
    { name: 'employees', cols: 'id, name, dept_id → departments.id, title, salary, hire_date, manager_id → employees.id' },
    { name: 'customers', cols: 'id, name, city, signup_date' },
    { name: 'orders', cols: 'id, customer_id → customers.id, order_date, amount, status' },
  ];

  CL.sqlLessons = [
    { id: 'sql-select', title: 'SELECT Basics', minutes: 10,
      concept: `<p>SQL is <strong>declarative</strong>: you describe the result you want, and the database works out how to get it. <code>SELECT</code> picks columns, <code>FROM</code> names the table, and <code>AS</code> renames output columns.</p>
<pre class="snippet">SELECT name, title FROM employees;
SELECT name AS employee, salary / 12 AS monthly FROM employees;
SELECT DISTINCT location FROM departments;</pre>`,
      keyPoints: ['SELECT * is fine for exploring, but name columns in real queries.', 'DISTINCT removes duplicate rows.', 'SQL keywords are case-insensitive by convention UPPERCASE.'],
      docs: [{ label: 'PostgreSQL: SELECT', url: PG + 'sql-select.html' }, { label: 'PostgreSQL: Select lists & DISTINCT', url: PG + 'queries-select-lists.html' }],
      quiz: [{ q: 'Which clause is evaluated FIRST logically?', options: ['FROM', 'SELECT', 'ORDER BY', 'LIMIT'], answer: 0, why: 'Logical order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.' }],
      exercise: { prompt: 'List each department\'s <code>name</code> and <code>location</code>.', solution: 'SELECT name, location FROM departments', ordered: false } },
    { id: 'sql-where', title: 'Filtering with WHERE', minutes: 12,
      concept: `<p><code>WHERE</code> keeps rows where the condition is true. Combine with <code>AND</code>/<code>OR</code>, match patterns with <code>LIKE</code> (<code>%</code> = any characters), and test ranges and lists with <code>BETWEEN</code> and <code>IN</code>.</p>
<pre class="snippet">SELECT name, salary FROM employees
WHERE dept_id = 1 AND salary > 120000;

SELECT name FROM customers WHERE city IN ('Boise', 'Seattle');
SELECT name FROM employees WHERE title LIKE '%Engineer%';
SELECT * FROM employees WHERE manager_id IS NULL;  -- never "= NULL"</pre>`,
      keyPoints: ['NULL is unknown: use IS NULL / IS NOT NULL.', 'AND binds tighter than OR: add parentheses.', 'Strings use single quotes.'],
      docs: [{ label: 'PostgreSQL: WHERE clause', url: PG + 'queries-table-expressions.html#QUERIES-WHERE' }, { label: 'PostgreSQL: LIKE pattern matching', url: PG + 'functions-matching.html#FUNCTIONS-LIKE' }, { label: 'PostgreSQL: Comparison operators (BETWEEN, IS NULL)', url: PG + 'functions-comparison.html' }],
      quiz: [{ q: 'What does WHERE manager_id = NULL return?', options: ['No rows', 'Rows with no manager', 'All rows', 'An error in every database'], answer: 0, why: 'Any comparison with NULL is unknown, never true. Use IS NULL.' }],
      exercise: { prompt: 'Find the <code>name</code> and <code>salary</code> of employees in department 1 earning more than 120000.', solution: 'SELECT name, salary FROM employees WHERE dept_id = 1 AND salary > 120000', ordered: false } },
    { id: 'sql-order', title: 'ORDER BY & LIMIT', minutes: 8,
      concept: `<p>Rows have <strong>no guaranteed order</strong> unless you ask for one. <code>ORDER BY</code> sorts (<code>ASC</code> default, <code>DESC</code> for descending) and <code>LIMIT</code> keeps the first N rows: the "top N" pattern.</p>
<pre class="snippet">SELECT name, salary FROM employees
ORDER BY salary DESC
LIMIT 3;

SELECT name, hire_date FROM employees ORDER BY dept_id, hire_date;</pre>`,
      keyPoints: ['Without ORDER BY, row order is not guaranteed.', 'Sort by several columns, left to right.', 'SQL Server uses TOP instead of LIMIT.'],
      docs: [{ label: 'PostgreSQL: Sorting rows (ORDER BY)', url: PG + 'queries-order.html' }, { label: 'PostgreSQL: LIMIT and OFFSET', url: PG + 'queries-limit.html' }],
      quiz: [{ q: 'Is LIMIT 5 without ORDER BY guaranteed to return the same rows every time?', options: ['No', 'Yes', 'Only in PostgreSQL', 'Only on indexed tables'], answer: 0, why: 'Without ORDER BY the database may return any 5 rows.' }],
      exercise: { prompt: 'Return the <code>id</code> and <code>amount</code> of the 3 largest orders, biggest first.', solution: 'SELECT id, amount FROM orders ORDER BY amount DESC LIMIT 3', ordered: true } },
    { id: 'sql-aggregate', title: 'Aggregates & GROUP BY', minutes: 15,
      concept: `<p>Aggregate functions collapse many rows into one: <code>COUNT, SUM, AVG, MIN, MAX</code>. <code>GROUP BY</code> makes one output row <em>per group</em>.</p>
<pre class="snippet">SELECT COUNT(*) AS headcount, AVG(salary) AS avg_salary FROM employees;

SELECT dept_id, COUNT(*) AS headcount, MAX(salary) AS top_salary
FROM employees
GROUP BY dept_id;</pre>
<p>Rule: every column in SELECT must either be in GROUP BY or inside an aggregate.</p>`,
      keyPoints: ['COUNT(*) counts rows; COUNT(col) skips NULLs.', 'Non-aggregated SELECT columns must be grouped.', 'Aggregates ignore NULLs.'],
      docs: [{ label: 'PostgreSQL: Aggregate functions', url: PG + 'functions-aggregate.html' }, { label: 'PostgreSQL: GROUP BY and HAVING', url: PG + 'queries-table-expressions.html#QUERIES-GROUP' }],
      quiz: [{ q: 'COUNT(manager_id) on employees returns…', options: ['The number of employees who HAVE a manager', 'The total number of employees', 'The number of distinct managers', 'An error'], answer: 0, why: 'COUNT(column) skips NULL values.' }],
      exercise: { prompt: 'For each <code>status</code>, show the number of orders as <code>n</code> and total <code>amount</code> as <code>total</code>.', solution: 'SELECT status, COUNT(*) AS n, SUM(amount) AS total FROM orders GROUP BY status', ordered: false } },
    { id: 'sql-having', title: 'HAVING', minutes: 10,
      concept: `<p><code>WHERE</code> filters rows <em>before</em> grouping; <code>HAVING</code> filters groups <em>after</em> aggregation.</p>
<pre class="snippet">SELECT customer_id, SUM(amount) AS spent
FROM orders
WHERE status = 'paid'        -- row filter
GROUP BY customer_id
HAVING SUM(amount) > 2000;    -- group filter</pre>`,
      keyPoints: ['WHERE cannot use aggregates; HAVING can.', 'Filter early with WHERE when you can (it is cheaper).'],
      docs: [{ label: 'PostgreSQL: HAVING clause', url: PG + 'sql-select.html#SQL-HAVING' }],
      quiz: [{ q: 'Which clause can reference SUM(amount)?', options: ['HAVING', 'WHERE', 'FROM', 'ON'], answer: 0, why: 'Aggregates only exist after grouping, so only HAVING (and SELECT/ORDER BY) can use them.' }],
      exercise: { prompt: 'Show each <code>customer_id</code> whose <strong>paid</strong> orders total more than 2000, with the total as <code>spent</code>.', solution: "SELECT customer_id, SUM(amount) AS spent FROM orders WHERE status = 'paid' GROUP BY customer_id HAVING SUM(amount) > 2000", ordered: false } },
    { id: 'sql-join', title: 'INNER JOIN', minutes: 15,
      concept: `<p>A <strong>JOIN</strong> combines rows from two tables using a matching condition, usually a foreign key. <code>INNER JOIN</code> keeps only rows that match on both sides. Table aliases keep queries short.</p>
<pre class="snippet">SELECT e.name, d.name AS department
FROM employees e
JOIN departments d ON d.id = e.dept_id;

-- self join: employees with their manager's name
SELECT e.name, m.name AS manager
FROM employees e JOIN employees m ON m.id = e.manager_id;</pre>`,
      keyPoints: ['JOIN means INNER JOIN.', 'Always qualify ambiguous columns (e.name vs d.name).', 'A self-join joins a table to itself.'],
      docs: [{ label: 'PostgreSQL: Joins between tables (tutorial)', url: PG + 'tutorial-join.html' }, { label: 'PostgreSQL: Joined tables', url: PG + 'queries-table-expressions.html#QUERIES-JOIN' }],
      quiz: [{ q: 'An INNER JOIN between employees and departments will NOT include…', options: ['Departments with no employees', 'Employees in Engineering', 'Departments in Portland', 'Managers'], answer: 0, why: 'INNER JOIN drops rows without a match. Research has no employees.' }],
      exercise: { prompt: 'List each order <code>id</code> with the customer\'s <code>name</code> and the order <code>amount</code>, for orders over 1000.', solution: 'SELECT o.id, c.name, o.amount FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.amount > 1000', ordered: false } },
    { id: 'sql-left-join', title: 'LEFT JOIN & Missing Data', minutes: 12,
      concept: `<p><code>LEFT JOIN</code> keeps <em>every</em> row from the left table. Where there is no match, the right side's columns are <code>NULL</code>. That makes it the tool for "find things with no related rows".</p>
<pre class="snippet">SELECT d.name, COUNT(e.id) AS headcount
FROM departments d
LEFT JOIN employees e ON e.dept_id = d.id
GROUP BY d.name;

-- anti-join: customers who never ordered
SELECT c.name FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;</pre>`,
      keyPoints: ['LEFT JOIN keeps unmatched left rows.', 'COUNT(right.id) gives 0 for no matches; COUNT(*) would give 1.', 'LEFT JOIN + IS NULL finds missing relationships.'],
      docs: [{ label: 'PostgreSQL: Outer joins', url: PG + 'tutorial-join.html' }, { label: 'PostgreSQL: Joined table types', url: PG + 'queries-table-expressions.html#QUERIES-JOIN' }],
      quiz: [{ q: 'Why use COUNT(e.id) rather than COUNT(*) after a LEFT JOIN?', options: ['COUNT(*) counts the NULL-filled row as 1', 'COUNT(*) is slower', 'COUNT(e.id) includes NULLs', 'They are always the same'], answer: 0, why: 'An unmatched department still produces one row, which COUNT(*) counts.' }],
      exercise: { prompt: 'Find the <code>name</code> of every customer who has <strong>no</strong> orders.', solution: 'SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL', ordered: false } },
    { id: 'sql-subquery', title: 'Subqueries', minutes: 15,
      concept: `<p>A <strong>subquery</strong> is a query inside another. Use it as a value (<em>scalar</em>), as a list for <code>IN</code>, or with <code>EXISTS</code>.</p>
<pre class="snippet">-- earn more than the company average
SELECT name, salary FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- customers in cities where we have a department
SELECT name FROM customers
WHERE city IN (SELECT location FROM departments);</pre>`,
      keyPoints: ['Scalar subqueries must return one value.', 'IN (subquery) tests membership.', 'Many subqueries can be rewritten as joins.'],
      docs: [{ label: 'PostgreSQL: Subquery expressions (IN, EXISTS)', url: PG + 'functions-subquery.html' }, { label: 'PostgreSQL: Scalar subqueries', url: PG + 'sql-expressions.html#SQL-SYNTAX-SCALAR-SUBQUERIES' }],
      quiz: [{ q: 'A scalar subquery that returns two rows will…', options: ['Raise an error', 'Use the first row', 'Use the average', 'Return NULL'], answer: 0, why: 'A scalar subquery must produce at most one row and one column.' }],
      exercise: { prompt: 'List the <code>name</code> and <code>salary</code> of employees who earn more than the average salary.', solution: 'SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees)', ordered: false } },
    { id: 'sql-case', title: 'CASE Expressions', minutes: 10,
      concept: `<p><code>CASE</code> is SQL's if/else. Use it to label or bucket values, or inside aggregates for conditional counts.</p>
<pre class="snippet">SELECT name, salary,
  CASE
    WHEN salary >= 120000 THEN 'senior band'
    WHEN salary >= 80000  THEN 'mid band'
    ELSE 'entry band'
  END AS band
FROM employees;

SELECT SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid_orders FROM orders;</pre>`,
      keyPoints: ['WHEN branches are checked in order.', 'Missing ELSE yields NULL.', 'CASE inside SUM = conditional count.'],
      docs: [{ label: 'PostgreSQL: CASE', url: PG + 'functions-conditional.html#FUNCTIONS-CASE' }],
      quiz: [{ q: 'If no WHEN matches and there is no ELSE, CASE returns…', options: ['NULL', '0', 'An empty string', 'An error'], answer: 0, why: 'The default ELSE is NULL.' }],
      exercise: { prompt: 'Show each order <code>id</code>, <code>amount</code>, and a <code>size</code> column: <code>\'large\'</code> if amount ≥ 1000, <code>\'medium\'</code> if ≥ 400, else <code>\'small\'</code>.', solution: "SELECT id, amount, CASE WHEN amount >= 1000 THEN 'large' WHEN amount >= 400 THEN 'medium' ELSE 'small' END AS size FROM orders", ordered: false } },
    { id: 'sql-cte', title: 'CTEs (WITH)', minutes: 12,
      concept: `<p>A <strong>Common Table Expression</strong> names a subquery so you can read a complex query top-to-bottom, like variables in code.</p>
<pre class="snippet">WITH paid AS (
  SELECT customer_id, SUM(amount) AS spent
  FROM orders WHERE status = 'paid'
  GROUP BY customer_id
)
SELECT c.name, p.spent
FROM paid p JOIN customers c ON c.id = p.customer_id
ORDER BY p.spent DESC;</pre>`,
      keyPoints: ['WITH name AS (...) defines a temporary named result.', 'Chain several CTEs with commas.', 'Recursive CTEs can walk trees like org charts.'],
      docs: [{ label: 'PostgreSQL: WITH queries (CTEs)', url: PG + 'queries-with.html' }, { label: 'SQLite: WITH clause', url: 'https://www.sqlite.org/lang_with.html' }],
      quiz: [{ q: 'What is the main benefit of a CTE over a nested subquery?', options: ['Readability: named, top-to-bottom steps', 'It is always faster', 'It stores data permanently', 'It replaces indexes'], answer: 0, why: 'CTEs make multi-step logic readable; performance is usually similar.' }],
      exercise: { prompt: 'Using a CTE named <code>dept_pay</code> that computes each <code>dept_id</code>\'s average salary as <code>avg_salary</code>, return the department <code>name</code> and <code>avg_salary</code> for departments averaging over 90000.', solution: 'WITH dept_pay AS (SELECT dept_id, AVG(salary) AS avg_salary FROM employees GROUP BY dept_id) SELECT d.name, p.avg_salary FROM dept_pay p JOIN departments d ON d.id = p.dept_id WHERE p.avg_salary > 90000', ordered: false } },
    { id: 'sql-window', title: 'Window Functions', minutes: 18,
      concept: `<p><strong>Window functions</strong> compute across related rows <em>without collapsing them</em> (unlike GROUP BY). <code>OVER (PARTITION BY … ORDER BY …)</code> defines the window.</p>
<pre class="snippet">SELECT name, dept_id, salary,
  RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank,
  AVG(salary) OVER (PARTITION BY dept_id) AS dept_avg
FROM employees;

-- running total
SELECT order_date, amount,
  SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;</pre>`,
      keyPoints: ['ROW_NUMBER, RANK, DENSE_RANK number rows.', 'PARTITION BY = groups; rows are kept.', 'LAG/LEAD read the previous/next row.'],
      docs: [{ label: 'PostgreSQL: Window functions tutorial', url: PG + 'tutorial-window.html' }, { label: 'PostgreSQL: Window function list', url: PG + 'functions-window.html' }, { label: 'SQLite: Window functions', url: 'https://www.sqlite.org/windowfunctions.html' }],
      quiz: [{ q: 'How does SUM(salary) OVER (PARTITION BY dept_id) differ from GROUP BY dept_id?', options: ['It keeps every row and adds the department total to each', 'It returns one row per department', 'It only works on numbers', 'There is no difference'], answer: 0, why: 'Window functions do not collapse rows.' }],
      exercise: { prompt: 'For each employee show <code>name</code>, <code>dept_id</code>, <code>salary</code> and <code>dept_rank</code>: their salary rank within their department (highest = 1), using <code>RANK()</code>.', solution: 'SELECT name, dept_id, salary, RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank FROM employees', ordered: false } },
  ];

  /* ======================= REACT ======================= */
  const RD = 'https://react.dev/';
  const H = 'const { useState, useEffect } = React;\n\n';
  CL.reactLessons = [
    { id: 'react-jsx', title: 'Components & JSX', minutes: 12,
      concept: `<p>A React <strong>component</strong> is a function that returns UI. <strong>JSX</strong> looks like HTML but is JavaScript: use <code>className</code> instead of <code>class</code>, and put any expression in <code>{ }</code>. Component names start with a capital letter.</p>
<pre class="snippet">function Badge() {
  const level = 3;
  return &lt;span className="badge"&gt;Level {level}&lt;/span&gt;;
}

function App() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Welcome&lt;/h1&gt;
      &lt;Badge /&gt;
    &lt;/div&gt;
  );
}</pre>`,
      keyPoints: ['Return one root element (or a Fragment <>…</>).', 'Close every tag: <img />.', '{expression} embeds JavaScript.'],
      docs: [{ label: 'Your first component', url: RD + 'learn/your-first-component' }, { label: 'Writing markup with JSX', url: RD + 'learn/writing-markup-with-jsx' }, { label: 'JavaScript in JSX with curly braces', url: RD + 'learn/javascript-in-jsx-with-curly-braces' }],
      quiz: [{ q: 'Why must component names be capitalized?', options: ['Lowercase tags are treated as HTML elements', 'It is just a style rule', 'JavaScript requires it', 'For performance'], answer: 0, why: '<card /> would be treated as an unknown HTML tag.' }],
      exercise: { prompt: 'Make <code>App</code> render an <code>&lt;h1&gt;</code> with the text <code>Hello, React</code> and a <code>&lt;p&gt;</code> that shows <code>2 + 3</code> computed in JSX (it should display <code>5</code>).', starter: H + 'function App() {\n  return (\n    <div>\n      {/* your markup here */}\n    </div>\n  );\n}\n',
        solution: H + 'function App() {\n  return (\n    <div>\n      <h1>Hello, React</h1>\n      <p>{2 + 3}</p>\n    </div>\n  );\n}\n',
        tests: [
          { name: 'Renders an h1 saying "Hello, React"', fn: async (root, { click, type, sleep }) => { const h=root.querySelector("h1"); return !!h && h.textContent.trim()==="Hello, React"; } },
          { name: 'A <p> shows 5', fn: async (root, { click, type, sleep }) => { const p=root.querySelector("p"); return !!p && p.textContent.trim()==="5"; } },
        ] } },
    { id: 'react-props', title: 'Props', minutes: 12,
      concept: `<p><strong>Props</strong> are a component's inputs, passed like HTML attributes. They are read-only. Destructure them in the parameter list and give defaults when useful.</p>
<pre class="snippet">function Greeting({ name, excited = false }) {
  return &lt;p&gt;Hello, {name}{excited ? "!" : "."}&lt;/p&gt;;
}

function App() {
  return &lt;&gt;
    &lt;Greeting name="Ada" excited /&gt;
    &lt;Greeting name="Linus" /&gt;
  &lt;/&gt;;
}</pre>`,
      keyPoints: ['Data flows down, parent → child.', 'Never mutate props.', 'children is a special prop for nested content.'],
      docs: [{ label: 'Passing props to a component', url: RD + 'learn/passing-props-to-a-component' }, { label: 'Fragment <>…</>', url: RD + 'reference/react/Fragment' }],
      quiz: [{ q: 'A child component wants to change a prop value. What should it do?', options: ['Ask the parent via a callback prop', 'Assign props.value = x', 'Use a global variable', 'Re-render itself'], answer: 0, why: 'Props are read-only; the owner of the state changes it.' }],
      exercise: { prompt: 'Write a <code>Card</code> component taking <code>title</code> and <code>count</code> props that renders <code>&lt;h2&gt;{title}&lt;/h2&gt;&lt;p&gt;{count} lessons&lt;/p&gt;</code>. Render <code>&lt;Card title="Python" count={5} /&gt;</code> and <code>&lt;Card title="SQL" count={9} /&gt;</code> in App.', starter: H + 'function Card(props) {\n  return null;\n}\n\nfunction App() {\n  return <div>{/* two cards */}</div>;\n}\n',
        solution: H + 'function Card({ title, count }) {\n  return (\n    <div>\n      <h2>{title}</h2>\n      <p>{count} lessons</p>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <div>\n      <Card title="Python" count={5} />\n      <Card title="SQL" count={9} />\n    </div>\n  );\n}\n',
        tests: [
          { name: 'Two h2 headings: Python and SQL', fn: async (root, { click, type, sleep }) => { const hs=[...root.querySelectorAll("h2")].map(h=>h.textContent.trim()); return hs.join()==="Python,SQL"; } },
          { name: 'Shows "5 lessons" and "9 lessons"', fn: async (root, { click, type, sleep }) => { const t=root.textContent; return t.includes("5 lessons") && t.includes("9 lessons"); } },
        ] } },
    { id: 'react-state', title: 'State with useState', minutes: 15,
      concept: `<p><strong>State</strong> is data a component remembers between renders. <code>useState</code> returns the current value and a setter. Calling the setter schedules a re-render with the new value.</p>
<pre class="snippet">function Counter() {
  const [count, setCount] = useState(0);
  return (
    &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;
      Clicked {count} times
    &lt;/button&gt;
  );
}</pre>
<p>Use the <em>updater form</em> <code>setCount(c =&gt; c + 1)</code> when the new value depends on the old one.</p>`,
      keyPoints: ['Hooks must be called at the top level of a component.', 'State updates trigger a re-render.', 'Treat state as immutable: replace, do not mutate.'],
      docs: [{ label: 'useState reference', url: RD + 'reference/react/useState' }, { label: 'State: a component\'s memory', url: RD + 'learn/state-a-components-memory' }, { label: 'Responding to events', url: RD + 'learn/responding-to-events' }],
      quiz: [{ q: 'After setCount(count + 1) inside a click handler, what does count equal on the very next line?', options: ['The old value', 'The new value', 'undefined', 'It throws'], answer: 0, why: 'State is a snapshot for this render; the new value appears on the next render.' }],
      exercise: { prompt: 'Build a counter: a <code>&lt;button&gt;</code> labeled <code>+1</code> and a <code>&lt;p&gt;</code> showing <code>Count: N</code>. It starts at <code>Count: 0</code>.', starter: H + 'function App() {\n  // add state here\n  return (\n    <div>\n      <p>Count: 0</p>\n      <button>+1</button>\n    </div>\n  );\n}\n',
        solution: H + 'function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>+1</button>\n    </div>\n  );\n}\n',
        tests: [
          { name: 'Starts at "Count: 0"', fn: async (root, { click, type, sleep }) => { return root.querySelector("p")?.textContent.trim()==="Count: 0"; } },
          { name: 'Clicking +1 twice shows "Count: 2"', fn: async (root, { click, type, sleep }) => { const b=root.querySelector("button"); if(!b) return false; await click(b); await click(b); return root.querySelector("p")?.textContent.trim()==="Count: 2"; } },
        ] } },
    { id: 'react-lists', title: 'Rendering Lists & Keys', minutes: 12,
      concept: `<p>Turn arrays into elements with <code>map</code>. Each item needs a stable, unique <strong>key</strong> so React can track it between renders. Use an id from your data, not the array index, when items can be reordered.</p>
<pre class="snippet">const langs = [
  { id: "py", name: "Python" },
  { id: "js", name: "JavaScript" },
];

function LangList() {
  return &lt;ul&gt;{langs.map(l =&gt; &lt;li key={l.id}&gt;{l.name}&lt;/li&gt;)}&lt;/ul&gt;;
}

// conditional rendering
{items.length === 0 && &lt;p&gt;Nothing yet&lt;/p&gt;}</pre>`,
      keyPoints: ['key goes on the outermost element in map.', 'Keys must be unique among siblings.', 'cond && <X/> renders X only when cond is true.'],
      docs: [{ label: 'Rendering lists', url: RD + 'learn/rendering-lists' }, { label: 'Conditional rendering', url: RD + 'learn/conditional-rendering' }],
      quiz: [{ q: 'Why are array indexes risky as keys?', options: ['They change when items are inserted or reordered', 'They are not unique', 'Numbers are not allowed as keys', 'They slow down map()'], answer: 0, why: 'Shifting indexes makes React mix up component state between items.' }],
      exercise: { prompt: 'Render the <code>tasks</code> array as a <code>&lt;ul&gt;</code> of <code>&lt;li&gt;</code> elements (use <code>task.id</code> as key). Show only tasks where <code>done</code> is <code>false</code>.', starter: H + 'const tasks = [\n  { id: 1, text: "Learn JSX", done: true },\n  { id: 2, text: "Learn state", done: false },\n  { id: 3, text: "Learn effects", done: false },\n];\n\nfunction App() {\n  return <ul></ul>;\n}\n',
        solution: H + 'const tasks = [\n  { id: 1, text: "Learn JSX", done: true },\n  { id: 2, text: "Learn state", done: false },\n  { id: 3, text: "Learn effects", done: false },\n];\n\nfunction App() {\n  return (\n    <ul>\n      {tasks.filter(t => !t.done).map(t => <li key={t.id}>{t.text}</li>)}\n    </ul>\n  );\n}\n',
        tests: [{ name: 'Renders exactly the 2 unfinished tasks', fn: async (root, { click, type, sleep }) => { const li=[...root.querySelectorAll("li")].map(x=>x.textContent.trim()); return li.join("|")==="Learn state|Learn effects"; } }] } },
    { id: 'react-forms', title: 'Forms & Controlled Inputs', minutes: 15,
      concept: `<p>A <strong>controlled input</strong> takes its value from state and updates state on every change, so React is the single source of truth.</p>
<pre class="snippet">function NameForm() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();                       // stop page reload
    setNames([...names, name]);               // new array, not push()
    setName("");
  }
  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input value={name} onChange={e =&gt; setName(e.target.value)} /&gt;
      &lt;button&gt;Add&lt;/button&gt;
    &lt;/form&gt;
  );
}</pre>`,
      keyPoints: ['value + onChange = controlled input.', 'Call e.preventDefault() in onSubmit.', 'Create new arrays/objects when updating state.'],
      docs: [{ label: '<input> reference', url: RD + 'reference/react-dom/components/input' }, { label: 'Updating arrays in state', url: RD + 'learn/updating-arrays-in-state' }, { label: 'Reacting to input with state', url: RD + 'learn/reacting-to-input-with-state' }],
      quiz: [{ q: 'Why use setItems([...items, x]) instead of items.push(x)?', options: ['React detects changes by new references', 'push is slower', 'push is not allowed in JSX', 'Both are identical'], answer: 0, why: 'Mutating the same array does not signal a change, so React may not re-render.' }],
      exercise: { prompt: 'Make an <code>&lt;input&gt;</code> and a <code>&lt;p&gt;</code> that live-previews the text in uppercase: typing <code>hi</code> shows <code>HI</code>.', starter: H + 'function App() {\n  return (\n    <div>\n      <input />\n      <p></p>\n    </div>\n  );\n}\n',
        solution: H + 'function App() {\n  const [text, setText] = useState("");\n  return (\n    <div>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <p>{text.toUpperCase()}</p>\n    </div>\n  );\n}\n',
        tests: [{ name: 'Typing "hi" shows "HI"', fn: async (root, { click, type, sleep }) => { const i=root.querySelector("input"); if(!i) return false; await type(i,"hi"); return root.querySelector("p")?.textContent.trim()==="HI"; } }] } },
    { id: 'react-effects', title: 'Side Effects with useEffect', minutes: 18,
      concept: `<p><code>useEffect</code> runs code <em>after</em> render to sync with things outside React: timers, subscriptions, fetching data, the document title. The dependency array controls when it re-runs, and the returned function cleans up.</p>
<pre class="snippet">function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() =&gt; {
    const id = setInterval(() =&gt; setNow(new Date()), 1000);
    return () =&gt; clearInterval(id);   // cleanup on unmount
  }, []);                              // [] = run once after mount
  return &lt;p&gt;{now.toLocaleTimeString()}&lt;/p&gt;;
}</pre>
<p>No array → runs after every render. <code>[a, b]</code> → runs when a or b change.</p>`,
      keyPoints: ['Effects run after the browser paints.', 'Always clean up timers and subscriptions.', 'You might not need an effect for derived values: compute during render.'],
      docs: [{ label: 'useEffect reference', url: RD + 'reference/react/useEffect' }, { label: 'Synchronizing with effects', url: RD + 'learn/synchronizing-with-effects' }, { label: 'You might not need an effect', url: RD + 'learn/you-might-not-need-an-effect' }],
      quiz: [{ q: 'What does an empty dependency array [] mean?', options: ['Run once after the first render', 'Run after every render', 'Never run', 'Run before rendering'], answer: 0, why: 'With no dependencies, there is nothing to trigger a re-run.' }],
      exercise: { prompt: 'Use <code>useEffect</code> so that 100 ms after mounting, a <code>&lt;p&gt;</code> changes from <code>Loading…</code> to <code>Loaded!</code>. Clean up the timeout.', starter: H + 'function App() {\n  const [status, setStatus] = useState("Loading…");\n  // add an effect here\n  return <p>{status}</p>;\n}\n',
        solution: H + 'function App() {\n  const [status, setStatus] = useState("Loading…");\n  useEffect(() => {\n    const id = setTimeout(() => setStatus("Loaded!"), 100);\n    return () => clearTimeout(id);\n  }, []);\n  return <p>{status}</p>;\n}\n',
        tests: [
          { name: 'Starts with "Loading…"', fn: async (root, { click, type, sleep }) => { return root.querySelector("p")?.textContent.trim()==="Loading…"; } },
          { name: 'Shows "Loaded!" after the timeout', fn: async (root, { click, type, sleep }) => { await sleep(400); return root.querySelector("p")?.textContent.trim()==="Loaded!"; } },
        ] } },
  ];
})(typeof window !== 'undefined' ? window : globalThis);
