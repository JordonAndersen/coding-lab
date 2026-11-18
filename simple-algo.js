// Simple mode: bite-size cards for the Algorithms & Theory track.
// Card fields: e = emoji, t = title, b = body (HTML), code = optional snippet, think = optional prompt.
(function (G) {
  const CL = (G.CL = G.CL || {});
  CL.simple = CL.simple || {};
  Object.assign(CL.simple, {
    'algo-bigo': [
      { e: '🐢', t: 'Fast now, slow later', b: 'Some code feels instant with 10 items but crawls with 1 million. <b>Big-O</b> describes how the amount of work <b>grows</b> as the input gets bigger.' },
      { e: '📚', t: 'Three ways to find a book', b: '<p><b>O(1)</b>: you already know the exact shelf. One step, no matter how big the library is.</p><p><b>O(n)</b>: check every book, one by one. Twice the books means twice the work.</p><p><b>O(log n)</b>: books are sorted, so you open the middle and throw away half each time.</p>' },
      { e: '🔁', t: 'Loops add up', b: 'One loop over <code>n</code> items is <b>O(n)</b>. A loop <i>inside</i> a loop is <b>O(n²)</b>: for each item, you go through all the items again.', code: 'for a in items:        # n times\n    for b in items:    # n times for EACH a\n        compare(a, b)  # n × n = n² steps' },
      { e: '✂️', t: 'Ignore the small stuff', b: 'Big-O only cares about the <b>biggest</b> part. <code>3n + 5</code> is just <b>O(n)</b>. When n is a million, the "+5" and the "×3" barely matter.' },
      { e: '📈', t: 'Why it matters', b: 'If an O(n²) program takes 1 second for 1,000 items, it takes about <b>4 seconds</b> for 2,000 items and <b>100 seconds</b> for 10,000.', think: 'Try the Python experiment on the right. How much bigger does the n² number get each time n grows 10×?' },
    ],
    'algo-two-pointers': [
      { e: '👉👈', t: 'Two fingers on a list', b: 'The <b>two-pointer</b> trick uses two positions in a list. Usually one starts at the beginning and one at the end, and they move toward each other.' },
      { e: '🔄', t: 'Reversing a word', b: 'To flip <code>"code"</code>, swap the first and last letters, then the second and second-to-last, and keep going until the pointers meet in the middle.', code: 'c o d e   → swap c,e → e o d c\n  ↑   ↑\n e o d c  → swap o,d → e d o c\n    ↑ ↑' },
      { e: '🧱', t: 'Strings can’t be changed', b: 'In Python, JavaScript, Java and C#, strings are <b>immutable</b>: you can’t swap letters inside them. So first turn the string into a list of characters, swap in the list, then join it back.' },
      { e: '🛑', t: 'When to stop', b: 'Keep going while <code>left &lt; right</code>. When they meet, every letter has been swapped once. That’s just one pass, so it’s <b>O(n)</b>.', think: 'In a word with 5 letters, which letter never moves?' },
    ],
    'algo-counting': [
      { e: '🧮', t: 'Count first, answer later', b: 'Lots of puzzles are secretly asking "how many of each thing?" So build a <b>tally</b> first, then answer questions from it.' },
      { e: '📊', t: 'Making a tally', b: 'Walk through the word once. Each time you see a letter, add 1 to its count.', code: 'counts = {}\nfor letter in "banana":\n    counts[letter] = counts.get(letter, 0) + 1\n# {"b": 1, "a": 3, "n": 2}' },
      { e: '🔤', t: 'What’s an anagram?', b: 'Two words are <b>anagrams</b> if they use exactly the same letters the same number of times, like <code>listen</code> and <code>silent</code>.' },
      { e: '✅', t: 'The plan', b: 'Count the letters in the first word. Then go through the second word and <b>subtract</b>. If any count drops below zero, the words don’t match.', think: 'Why can you say "not an anagram" right away if the two words have different lengths?' },
    ],
    'algo-hashing': [
      { e: '🗄️', t: 'A super-fast lookup table', b: 'A <b>hash map</b> stores pairs: a <b>key</b> and a <b>value</b>, like a word and its definition. Finding a key is almost instant, no matter how many pairs there are.' },
      { e: '🏷️', t: 'Different names, same idea', b: 'Python calls it a <code>dict</code>. JavaScript and TypeScript use <code>Map</code>. Java has <code>HashMap</code>, C# has <code>Dictionary</code>, C++ has <code>unordered_map</code>, Go has <code>map</code>, and Rust has <code>HashMap</code>.' },
      { e: '🎯', t: 'The Two Sum puzzle', b: 'Find two numbers in a list that add up to a target. Checking every pair works, but it’s slow: <b>O(n²)</b>.' },
      { e: '💡', t: 'Ask for your partner', b: 'For each number <code>x</code>, the partner you need is <code>target − x</code>. Keep a hash map of numbers you’ve already seen. If the partner is in there, you’re done!', code: 'target = 9, list = [2, 7, 11]\nsee 2 → need 7 → not seen yet, remember 2\nsee 7 → need 2 → seen it! answer: [0, 1]', think: 'Why should you check for the partner <i>before</i> adding the current number to the map?' },
    ],
    'algo-stacks': [
      { e: '🥞', t: 'A stack of pancakes', b: 'A <b>stack</b> works like pancakes: you add to the top and eat from the top. The last one in is the first one out. Programmers call this <b>LIFO</b>.' },
      { e: '⬆️', t: 'Push and pop', b: '<code>push</code> puts something on top. <code>pop</code> takes the top thing off. Both are super quick: <b>O(1)</b>.', code: 'stack = []\nstack.append("A")   # push\nstack.append("B")   # push\nstack.pop()         # gives "B"' },
      { e: '🧩', t: 'Matching brackets', b: 'In <code>{[()]}</code>, the most recent opening bracket must close first. That’s exactly LIFO! Push every opener. When you see a closer, pop and check that they match.' },
      { e: '🚶', t: 'Its cousin: the queue', b: 'A <b>queue</b> is like a line at lunch: first in, first out (<b>FIFO</b>). Stacks help with "undo" and searching deep. Queues help with taking turns and searching wide.', think: 'Your browser’s Back button remembers pages you visited. Is that a stack or a queue?' },
    ],
    'algo-binary-search': [
      { e: '🔢', t: 'Guess my number', b: 'I’m thinking of a number from 1 to 100. The smart first guess is <b>50</b>. "Higher!" Now only 51–100 are left. Each guess cuts the choices in <b>half</b>.' },
      { e: '📖', t: 'It only works on sorted lists', b: 'Binary search needs the list in order. Look at the middle item. Too small? Ignore the left half. Too big? Ignore the right half.' },
      { e: '⚡', t: 'Ridiculously fast', b: 'Halving is powerful. One million items need only about <b>20</b> checks. That’s <b>O(log n)</b>.' },
      { e: '🎛️', t: 'The code pattern', b: 'Keep a <code>lo</code> and a <code>hi</code> edge and look at the middle each time.', code: 'lo, hi = 0, len(nums) - 1\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if nums[mid] == target: return mid\n    if nums[mid] < target: lo = mid + 1\n    else:                  hi = mid - 1\nreturn -1', think: 'What happens if the target isn’t in the list at all?' },
    ],
    'algo-sorting': [
      { e: '🃏', t: 'Sorting cards in your hand', b: '<b>Insertion sort</b> works like sorting playing cards: pick up the next card and slide it left until it’s in the right spot.' },
      { e: '👣', t: 'Step by step', b: 'Start at the second item. Save it as <code>key</code>. Shift every bigger item one spot to the right, then drop <code>key</code> into the gap.', code: '[5, 2, 4]  key = 2 → shift 5 → [2, 5, 4]\n[2, 5, 4]  key = 4 → shift 5 → [2, 4, 5]' },
      { e: '🐌', t: 'How fast is it?', b: 'In the worst case, every card slides past every other card: <b>O(n²)</b>. Faster sorts like <b>merge sort</b> take <b>O(n log n)</b>.' },
      { e: '⚠️', t: 'A JavaScript surprise', b: 'In JavaScript, <code>[10, 9, 1].sort()</code> gives <code>[1, 10, 9]</code>! It sorts numbers like words. Use <code>sort((a, b) =&gt; a - b)</code> for numbers.', think: 'Why would comparing "10" and "9" as text put "10" first?' },
    ],
    'algo-merge': [
      { e: '✂️', t: 'Split, solve, combine', b: '<b>Divide and conquer</b> means breaking a big problem into small copies of itself, solving those, and then putting the answers together.' },
      { e: '🤝', t: 'Merging two sorted lists', b: 'Imagine two lines of students already sorted by height. Compare the front person of each line, send the shorter one forward, and repeat.', code: '[1, 4]  and  [2, 3]\n1 < 2 → take 1\n4 > 2 → take 2\n4 > 3 → take 3\nleft over → take 4\nresult: [1, 2, 3, 4]' },
      { e: '🧹', t: 'Don’t forget the leftovers', b: 'When one list runs out, just add everything left in the other one. It’s already in order!' },
      { e: '🏗️', t: 'That’s merge sort', b: 'Merge sort keeps splitting a list in half until every piece has one item, then merges the pieces back together. That gives <b>O(n log n)</b>.', think: 'How many times can you cut 16 in half before you reach 1?' },
    ],
    'algo-greedy': [
      { e: '🏃', t: 'Carry a little memory', b: 'Some problems can be solved in a single walk through the list. You just carry one or two numbers along with you and update them at each step.' },
      { e: '💰', t: 'The best streak', b: 'Find the biggest total of numbers that sit next to each other. In <code>[−2, 1, −3, 4, −1, 2, 1]</code>, the best streak is <code>4, −1, 2, 1</code> = <b>6</b>.' },
      { e: '🤔', t: 'Keep going or start over?', b: 'At each number, ask one question: is it better to <b>add this number to my streak</b>, or <b>start a new streak here</b>? Pick whichever is bigger.', code: 'current = max(x, current + x)\nbest    = max(best, current)' },
      { e: '🏁', t: 'Kadane’s algorithm', b: 'That idea has a name: <b>Kadane’s algorithm</b>. One pass, two numbers: <b>O(n)</b>. Start both at the first number so lists that are all negative still work.', think: 'If every number is negative, what should the answer be?' },
    ],
    'algo-dp': [
      { e: '🪞', t: 'A function that calls itself', b: '<b>Recursion</b> is when a function solves a problem by calling itself on a smaller version. It always needs a <b>base case</b>, a point where it stops.' },
      { e: '🪜', t: 'The staircase puzzle', b: 'You can climb 1 or 2 steps at a time. To reach step <code>n</code>, your last move came from step <code>n−1</code> or step <code>n−2</code>. So: <code>ways(n) = ways(n−1) + ways(n−2)</code>.' },
      { e: '🔂', t: 'Doing the same work twice', b: 'Plain recursion recalculates the same steps over and over. For step 30 that’s over a million calls! That’s <b>O(2ⁿ)</b>.' },
      { e: '📝', t: 'Write it down: dynamic programming', b: '<b>Dynamic programming</b> means saving answers so you never compute them twice. Build up from the bottom with a loop.', code: 'a, b = 1, 1          # ways to reach step 0 and 1\nfor _ in range(n - 1):\n    a, b = b, a + b\nreturn b', think: 'These numbers (1, 1, 2, 3, 5, 8…) have a famous name. Do you know it?' },
    ],
    'algo-graphs': [
      { e: '🕸️', t: 'Dots and lines', b: 'A <b>graph</b> is a bunch of things (nodes) connected by links (edges). Maps, friend lists and websites are all graphs. A grid is a graph too: each square connects to its neighbors.' },
      { e: '🏝️', t: 'Counting islands', b: 'On a map of 1s (land) and 0s (water), an <b>island</b> is land squares touching up, down, left or right. How many separate islands are there?' },
      { e: '🌊', t: 'Flood it', b: 'Scan the map. When you find land you haven’t visited, count one new island. Then <b>flood</b> outward to every connected land square and mark them as visited.' },
      { e: '🧭', t: 'Deep or wide?', b: '<b>DFS</b> (depth-first) goes as far as it can, then backs up. It uses a <b>stack</b>. <b>BFS</b> (breadth-first) spreads out in rings. It uses a <b>queue</b> and finds shortest paths.', think: 'Why do you need to mark squares as visited? What would happen if you didn’t?' },
    ],
  });
})(typeof window !== 'undefined' ? window : globalThis);
