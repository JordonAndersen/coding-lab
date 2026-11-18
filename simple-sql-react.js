// Simple mode cards: SQL and React
(function (G) {
  const CL = (G.CL = G.CL || {});
  CL.simple = CL.simple || {};
  Object.assign(CL.simple, {
    /* ---------- SQL ---------- */
    'sql-select': [
      { e: '🗃️', t: 'Databases are big tables', b: 'A database stores information in <b>tables</b>, like spreadsheets. Each <b>row</b> is one thing (like one employee). Each <b>column</b> is one detail (like their name).' },
      { e: '🗣️', t: 'SQL asks questions', b: '<b>SQL</b> is the language for asking a database questions. You describe <i>what</i> you want, and the database figures out <i>how</i> to get it.' },
      { e: '👆', t: 'SELECT and FROM', b: '<code>SELECT</code> picks the columns. <code>FROM</code> says which table.', code: 'SELECT name, title FROM employees;' },
      { e: '⭐', t: 'Shortcuts', b: '<code>SELECT *</code> means "every column". <code>DISTINCT</code> removes repeats.', code: 'SELECT DISTINCT location FROM departments;', think: 'Look at the schema under the editor. Which table would you use to list department names?' },
    ],
    'sql-where': [
      { e: '🔍', t: 'Filtering rows', b: '<code>WHERE</code> keeps only the rows that match a condition.', code: 'SELECT name FROM employees WHERE salary > 100000;' },
      { e: '🔗', t: 'AND / OR', b: 'Combine conditions with <code>AND</code> (both must be true) or <code>OR</code> (either one).', code: 'WHERE dept_id = 1 AND salary > 120000' },
      { e: '🃏', t: 'Pattern matching', b: '<code>LIKE</code> matches patterns. <code>%</code> means "any letters here".', code: "WHERE title LIKE '%Engineer%'" },
      { e: '👻', t: 'Missing values', b: '<code>NULL</code> means "no value". You can’t use <code>= NULL</code>; you must write <code>IS NULL</code>.', think: 'Which employees have no manager? How would you ask for them?' },
    ],
    'sql-order': [
      { e: '🔀', t: 'Rows come in no special order', b: 'Unless you ask, a database can return rows in any order it likes.' },
      { e: '⬇️', t: 'ORDER BY', b: '<code>ORDER BY</code> sorts the results. Add <code>DESC</code> for biggest first.', code: 'SELECT name, salary FROM employees\nORDER BY salary DESC;' },
      { e: '🔝', t: 'LIMIT: just the top few', b: '<code>LIMIT 3</code> keeps only the first 3 rows. Together with ORDER BY, that gives you a "top 3" list.' },
      { e: '🎯', t: 'Put them together', b: 'First sort, then cut off the list.', code: 'SELECT id, amount FROM orders\nORDER BY amount DESC\nLIMIT 3;', think: 'Why is LIMIT without ORDER BY not a reliable "top 3"?' },
    ],
    'sql-aggregate': [
      { e: '🧮', t: 'Summing things up', b: '<b>Aggregate functions</b> squash many rows into one answer: <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>.', code: 'SELECT COUNT(*) FROM employees;' },
      { e: '🗂️', t: 'GROUP BY: one answer per group', b: '<code>GROUP BY</code> splits rows into groups and gives one summary row for each group.', code: 'SELECT status, COUNT(*) AS n\nFROM orders\nGROUP BY status;' },
      { e: '🏷️', t: 'Naming results with AS', b: '<code>AS</code> gives a column a friendly name, like <code>COUNT(*) AS n</code>.' },
      { e: '📏', t: 'The grouping rule', b: 'Every column you SELECT must either be in GROUP BY or be inside a function like SUM.', think: 'How would you find the total amount for each order status?' },
    ],
    'sql-having': [
      { e: '🪣', t: 'Filter after grouping', b: '<code>WHERE</code> filters single rows <b>before</b> grouping. <code>HAVING</code> filters whole groups <b>after</b>.' },
      { e: '📝', t: 'The order of steps', b: 'Think of it in order: pick rows (WHERE), make groups (GROUP BY), then keep some groups (HAVING).', code: "SELECT customer_id, SUM(amount) AS spent\nFROM orders\nWHERE status = 'paid'\nGROUP BY customer_id\nHAVING SUM(amount) > 2000;" },
      { e: '🤔', t: 'Which one do I use?', b: 'If your condition uses SUM, COUNT or AVG, it goes in HAVING. Otherwise, use WHERE.', think: 'Is "status = paid" a row filter or a group filter?' },
    ],
    'sql-join': [
      { e: '🧩', t: 'Data is split across tables', b: 'Orders store a <code>customer_id</code>, not the customer’s name. The names live in a separate <code>customers</code> table.' },
      { e: '🔗', t: 'JOIN connects them', b: 'A <code>JOIN</code> matches rows from two tables using a shared value.', code: 'SELECT o.id, c.name, o.amount\nFROM orders o\nJOIN customers c ON c.id = o.customer_id;' },
      { e: '✏️', t: 'Short nicknames', b: '<code>orders o</code> gives the table a short nickname, so you can write <code>o.amount</code> instead of <code>orders.amount</code>.' },
      { e: '🚫', t: 'Only matches survive', b: 'A plain JOIN only keeps rows that have a match on <b>both</b> sides.', think: 'If a department has no employees, will it show up in a JOIN of departments and employees?' },
    ],
    'sql-left-join': [
      { e: '⬅️', t: 'Keep everything on the left', b: 'A <code>LEFT JOIN</code> keeps <b>every</b> row from the first table, even ones with no match.' },
      { e: '🕳️', t: 'Missing matches become NULL', b: 'When there’s no match, the columns from the second table come back as <code>NULL</code>.' },
      { e: '🔎', t: 'Finding what’s missing', b: 'LEFT JOIN plus <code>IS NULL</code> finds things with <b>no</b> related rows, like customers who never ordered.', code: 'SELECT c.name\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL;' },
      { e: '🧮', t: 'Counting carefully', b: 'After a LEFT JOIN, use <code>COUNT(o.id)</code>, not <code>COUNT(*)</code>, so empty groups count as 0.', think: 'Why would <code>COUNT(*)</code> say 1 for a customer with no orders?' },
    ],
    'sql-subquery': [
      { e: '🪆', t: 'A query inside a query', b: 'A <b>subquery</b> is a SELECT tucked inside another SELECT, in parentheses.' },
      { e: '📊', t: 'Using it as a number', b: 'First the inner query finds the average. Then the outer query compares each salary to it.', code: 'SELECT name, salary FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);' },
      { e: '📋', t: 'Using it as a list', b: '<code>IN (subquery)</code> checks whether a value is in a list of results.', code: 'SELECT name FROM customers\nWHERE city IN (SELECT location FROM departments);', think: 'What would you need to know first to find "who earns more than average"?' },
    ],
    'sql-case': [
      { e: '🚦', t: 'if/else for SQL', b: '<code>CASE</code> lets a query choose a value based on conditions.' },
      { e: '🏷️', t: 'Labeling rows', b: 'Checks run top to bottom. The first true one wins.', code: "SELECT id, amount,\n  CASE\n    WHEN amount >= 1000 THEN 'large'\n    WHEN amount >= 400  THEN 'medium'\n    ELSE 'small'\n  END AS size\nFROM orders;" },
      { e: '❔', t: 'No ELSE?', b: 'If nothing matches and there’s no ELSE, you get <code>NULL</code>.', think: 'Why does the order of the WHEN lines matter here?' },
    ],
    'sql-cte': [
      { e: '📝', t: 'Name a step', b: 'A <b>CTE</b> (Common Table Expression) gives a name to a mini-query using <code>WITH</code>. Then you can use that name like a table.' },
      { e: '🪜', t: 'Big problems, small steps', b: 'Step 1: work out the average pay per department. Step 2: join it to department names.', code: 'WITH dept_pay AS (\n  SELECT dept_id, AVG(salary) AS avg_salary\n  FROM employees GROUP BY dept_id\n)\nSELECT d.name, p.avg_salary\nFROM dept_pay p JOIN departments d ON d.id = p.dept_id;' },
      { e: '📖', t: 'Easier to read', b: 'CTEs make long queries read top to bottom, like steps in a recipe.', think: 'How would you add a filter to keep only departments that average over 90,000?' },
    ],
    'sql-window': [
      { e: '🪟', t: 'Look at neighbors without squashing', b: '<b>Window functions</b> calculate across related rows but still keep every row. GROUP BY can’t do that.' },
      { e: '🥇', t: 'Ranking', b: '<code>RANK()</code> numbers rows in order. <code>PARTITION BY</code> restarts the count for each group.', code: 'SELECT name, dept_id, salary,\n  RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank\nFROM employees;' },
      { e: '➕', t: 'Running totals', b: '<code>SUM(amount) OVER (ORDER BY order_date)</code> adds up as it goes, like a running score.', think: 'What’s the difference between a department’s total and its "running" total?' },
    ],

    /* ---------- React ---------- */
    'react-jsx': [
      { e: '⚛️', t: 'Building with blocks', b: '<b>React</b> builds web pages out of <b>components</b>, small reusable pieces like buttons, cards and menus.' },
      { e: '🧱', t: 'A component is a function', b: 'A component is a function that returns what should appear on screen. Its name must start with a capital letter.', code: 'function Hello() {\n  return <h1>Hello, React</h1>;\n}' },
      { e: '🏷️', t: 'JSX looks like HTML', b: 'That HTML-looking code is <b>JSX</b>. One difference: use <code>className</code> instead of <code>class</code>.' },
      { e: '🧮', t: 'Curly braces run JavaScript', b: 'Put any JavaScript inside <code>{ }</code> and React shows the result.', code: '<p>{2 + 3}</p>   // shows 5', think: 'What would <code>&lt;p&gt;{"hi".toUpperCase()}&lt;/p&gt;</code> show?' },
    ],
    'react-props': [
      { e: '🎁', t: 'Props are inputs', b: '<b>Props</b> pass information into a component, like settings. They look like HTML attributes.', code: '<Card title="Python" count={5} />' },
      { e: '📥', t: 'Reading props', b: 'The component receives props as an object. Pull out the parts you need with <code>{ }</code>.', code: 'function Card({ title, count }) {\n  return <div><h2>{title}</h2><p>{count} lessons</p></div>;\n}' },
      { e: '🔁', t: 'One component, many uses', b: 'Use the same Card with different props to make many cards.' },
      { e: '🚫', t: 'Props are read-only', b: 'A component should never change its own props. The parent decides what to pass in.', think: 'Why use <code>count={5}</code> with braces instead of <code>count="5"</code>?' },
    ],
    'react-state': [
      { e: '🧠', t: 'State is memory', b: '<b>State</b> is information a component remembers, like how many times a button was clicked.' },
      { e: '🪝', t: 'useState', b: '<code>useState</code> gives you the current value and a function to change it.', code: 'const [count, setCount] = useState(0);' },
      { e: '🖱️', t: 'Changing state redraws', b: 'Call the setter, and React redraws the component with the new value.', code: '<button onClick={() => setCount(c => c + 1)}>\n  Clicked {count} times\n</button>' },
      { e: '⚠️', t: 'Don’t change it directly', b: '<code>count = count + 1</code> won’t update the screen. Always use the setter.', think: 'Why might React need to know when your data changes?' },
    ],
    'react-lists': [
      { e: '📋', t: 'Lists from arrays', b: 'Use <code>map</code> to turn an array of data into a list of elements.', code: '<ul>\n  {tasks.map(t => <li key={t.id}>{t.text}</li>)}\n</ul>' },
      { e: '🔑', t: 'Keys', b: 'Every item in a list needs a unique <code>key</code>, so React can keep track of it when the list changes.' },
      { e: '🧹', t: 'Show only some', b: 'Use <code>filter</code> before <code>map</code> to show only certain items.', code: 'tasks.filter(t => !t.done).map(...)' },
      { e: '❓', t: 'Show something only sometimes', b: '<code>{isEmpty &amp;&amp; &lt;p&gt;Nothing yet&lt;/p&gt;}</code> only shows the message when <code>isEmpty</code> is true.', think: 'Why is an id better than the position number (index) for a key?' },
    ],
    'react-forms': [
      { e: '⌨️', t: 'Inputs that React controls', b: 'A <b>controlled input</b> gets its value from state and updates that state each time you type.', code: 'const [text, setText] = useState("");\n<input value={text} onChange={e => setText(e.target.value)} />' },
      { e: '🔄', t: 'Live updates', b: 'Since the text lives in state, you can show it anywhere instantly, even in uppercase!', code: '<p>{text.toUpperCase()}</p>' },
      { e: '🛑', t: 'Stop the page reload', b: 'Forms normally reload the page when submitted. Call <code>e.preventDefault()</code> to stop that.' },
      { e: '🆕', t: 'Make new arrays', b: 'To add to a list in state, make a <b>new</b> array: <code>setItems([...items, newItem])</code>. Don’t use push.', think: 'What does <code>e.target.value</code> hold while you’re typing?' },
    ],
    'react-effects': [
      { e: '⚡', t: 'Doing things after drawing', b: '<code>useEffect</code> runs code <b>after</b> your component appears, for jobs like timers or loading data.' },
      { e: '📅', t: 'When does it run?', b: 'The array at the end controls timing. An empty array <code>[]</code> means "run once, when the component first appears".', code: 'useEffect(() => {\n  const id = setTimeout(() => setStatus("Loaded!"), 100);\n  return () => clearTimeout(id);\n}, []);' },
      { e: '🧽', t: 'Clean up after yourself', b: 'The function you <code>return</code> is the <b>cleanup</b>. It runs when the component goes away, so timers don’t keep running.' },
      { e: '🤏', t: 'Not everything needs an effect', b: 'If you can calculate something straight from props or state, just calculate it. No effect needed!', think: 'What could go wrong if you forgot to clear a timer?' },
    ],
  });
})(typeof window !== 'undefined' ? window : globalThis);
