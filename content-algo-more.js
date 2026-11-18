// TypeScript, Go and Rust names + solutions for every algorithm challenge.
(function (G) {
  const CL = G.CL;
  const X = {
    'reverse-string': {
      names: ['reverseString', 'reverseString', 'reverse_string'],
      typescript: `function reverseString(s: string): string {
  const chars: string[] = s.split("");
  let left = 0, right = chars.length - 1;
  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }
  return chars.join("");
}
`,
      go: `package main

func reverseString(s string) string {
	chars := []rune(s)
	for left, right := 0, len(chars)-1; left < right; left, right = left+1, right-1 {
		chars[left], chars[right] = chars[right], chars[left]
	}
	return string(chars)
}
`,
      rust: `fn reverse_string(s: &str) -> String {
    let mut chars: Vec<char> = s.chars().collect();
    let (mut left, mut right) = (0, chars.len());
    while left + 1 < right {
        chars.swap(left, right - 1);
        left += 1;
        right -= 1;
    }
    chars.into_iter().collect()
}
`,
    },
    'is-anagram': {
      names: ['isAnagram', 'isAnagram', 'is_anagram'],
      typescript: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  for (const ch of t) {
    const c = counts.get(ch) ?? 0;
    if (c === 0) return false;
    counts.set(ch, c - 1);
  }
  return true;
}
`,
      go: `package main

func isAnagram(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}
	var counts [26]int
	for _, c := range s {
		counts[c-'a']++
	}
	for _, c := range t {
		counts[c-'a']--
		if counts[c-'a'] < 0 {
			return false
		}
	}
	return true
}
`,
      rust: `use std::collections::HashMap;

fn is_anagram(s: &str, t: &str) -> bool {
    if s.len() != t.len() {
        return false;
    }
    let mut counts: HashMap<char, i32> = HashMap::new();
    for c in s.chars() {
        *counts.entry(c).or_insert(0) += 1;
    }
    for c in t.chars() {
        let n = counts.entry(c).or_insert(0);
        *n -= 1;
        if *n < 0 {
            return false;
        }
    }
    true
}
`,
    },
    'two-sum': {
      names: ['twoSum', 'twoSum', 'two_sum'],
      typescript: `function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const j = seen.get(target - nums[i]);
    if (j !== undefined) return [j, i];
    seen.set(nums[i], i);
  }
  return [];
}
`,
      go: `package main

func twoSum(nums []int, target int) []int {
	seen := map[int]int{} // value -> index
	for i, x := range nums {
		if j, ok := seen[target-x]; ok {
			return []int{j, i}
		}
		seen[x] = i
	}
	return nil
}
`,
      rust: `use std::collections::HashMap;

fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut seen: HashMap<i32, i32> = HashMap::new(); // value -> index
    for (i, &x) in nums.iter().enumerate() {
        if let Some(&j) = seen.get(&(target - x)) {
            return vec![j, i as i32];
        }
        seen.insert(x, i as i32);
    }
    vec![]
}
`,
    },
    'valid-parentheses': {
      names: ['isValid', 'isValid', 'is_valid'],
      typescript: `function isValid(s: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];
  for (const ch of s) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}
`,
      go: `package main

func isValid(s string) bool {
	pairs := map[rune]rune{')': '(', ']': '[', '}': '{'}
	stack := []rune{}
	for _, c := range s {
		if open, isCloser := pairs[c]; isCloser {
			if len(stack) == 0 || stack[len(stack)-1] != open {
				return false
			}
			stack = stack[:len(stack)-1]
		} else {
			stack = append(stack, c)
		}
	}
	return len(stack) == 0
}
`,
      rust: `fn is_valid(s: &str) -> bool {
    let mut stack: Vec<char> = Vec::new();
    for c in s.chars() {
        match c {
            '(' | '[' | '{' => stack.push(c),
            ')' => if stack.pop() != Some('(') { return false; },
            ']' => if stack.pop() != Some('[') { return false; },
            '}' => if stack.pop() != Some('{') { return false; },
            _ => {}
        }
    }
    stack.is_empty()
}
`,
    },
    'binary-search': {
      names: ['binarySearch', 'binarySearch', 'binary_search'],
      typescript: `function binarySearch(nums: number[], target: number): number {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
`,
      go: `package main

func binarySearch(nums []int, target int) int {
	lo, hi := 0, len(nums)-1
	for lo <= hi {
		mid := lo + (hi-lo)/2
		switch {
		case nums[mid] == target:
			return mid
		case nums[mid] < target:
			lo = mid + 1
		default:
			hi = mid - 1
		}
	}
	return -1
}
`,
      rust: `fn binary_search(nums: Vec<i32>, target: i32) -> i32 {
    // half-open window [lo, hi) avoids underflow on usize
    let (mut lo, mut hi) = (0usize, nums.len());
    while lo < hi {
        let mid = lo + (hi - lo) / 2;
        if nums[mid] == target {
            return mid as i32;
        } else if nums[mid] < target {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    -1
}
`,
    },
    'insertion-sort': {
      names: ['insertionSort', 'insertionSort', 'insertion_sort'], rustMut: ['nums'],
      typescript: `function insertionSort(nums: number[]): number[] {
  for (let i = 1; i < nums.length; i++) {
    const key = nums[i];
    let j = i - 1;
    while (j >= 0 && nums[j] > key) {
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = key;
  }
  return nums;
}
`,
      go: `package main

func insertionSort(nums []int) []int {
	for i := 1; i < len(nums); i++ {
		key := nums[i]
		j := i - 1
		for j >= 0 && nums[j] > key {
			nums[j+1] = nums[j]
			j--
		}
		nums[j+1] = key
	}
	return nums
}
`,
      rust: `fn insertion_sort(mut nums: Vec<i32>) -> Vec<i32> {
    for i in 1..nums.len() {
        let key = nums[i];
        let mut j = i;
        while j > 0 && nums[j - 1] > key {
            nums[j] = nums[j - 1];
            j -= 1;
        }
        nums[j] = key;
    }
    nums
}
`,
    },
    'merge-sorted': {
      names: ['mergeSorted', 'mergeSorted', 'merge_sorted'],
      typescript: `function mergeSorted(a: number[], b: number[]): number[] {
  let i = 0, j = 0;
  const out: number[] = [];
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) out.push(a[i++]);
    else out.push(b[j++]);
  }
  return out.concat(a.slice(i), b.slice(j));
}
`,
      go: `package main

func mergeSorted(a []int, b []int) []int {
	out := make([]int, 0, len(a)+len(b))
	i, j := 0, 0
	for i < len(a) && j < len(b) {
		if a[i] <= b[j] {
			out = append(out, a[i])
			i++
		} else {
			out = append(out, b[j])
			j++
		}
	}
	out = append(out, a[i:]...)
	return append(out, b[j:]...)
}
`,
      rust: `fn merge_sorted(a: Vec<i32>, b: Vec<i32>) -> Vec<i32> {
    let mut out = Vec::with_capacity(a.len() + b.len());
    let (mut i, mut j) = (0, 0);
    while i < a.len() && j < b.len() {
        if a[i] <= b[j] {
            out.push(a[i]);
            i += 1;
        } else {
            out.push(b[j]);
            j += 1;
        }
    }
    out.extend_from_slice(&a[i..]);
    out.extend_from_slice(&b[j..]);
    out
}
`,
    },
    'max-subarray': {
      names: ['maxSubarray', 'maxSubarray', 'max_subarray'],
      typescript: `function maxSubarray(nums: number[]): number {
  let best = nums[0], current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}
`,
      go: `package main

func maxSubarray(nums []int) int {
	best, current := nums[0], nums[0]
	for _, x := range nums[1:] {
		current = max(x, current+x)
		best = max(best, current)
	}
	return best
}
`,
      rust: `fn max_subarray(nums: Vec<i32>) -> i32 {
    let mut best = nums[0];
    let mut current = nums[0];
    for &x in &nums[1..] {
        current = x.max(current + x);
        best = best.max(current);
    }
    best
}
`,
    },
    'climb-stairs': {
      names: ['climbStairs', 'climbStairs', 'climb_stairs'],
      typescript: `function climbStairs(n: number): number {
  let a = 1, b = 1;
  for (let i = 1; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
`,
      go: `package main

func climbStairs(n int) int {
	a, b := 1, 1
	for i := 1; i < n; i++ {
		a, b = b, a+b
	}
	return b
}
`,
      rust: `fn climb_stairs(n: i32) -> i32 {
    let (mut a, mut b) = (1, 1);
    for _ in 1..n {
        let next = a + b;
        a = b;
        b = next;
    }
    b
}
`,
    },
    'count-islands': {
      names: ['countIslands', 'countIslands', 'count_islands'], rustMut: ['grid'],
      typescript: `function countIslands(grid: number[][]): number {
  const rows = grid.length, cols = rows ? grid[0].length : 0;
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== 1) continue;
      count++;
      const stack: [number, number][] = [[r, c]];
      grid[r][c] = 0;
      while (stack.length) {
        const [y, x] = stack.pop()!;
        for (const [dy, dx] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const ny = y + dy, nx = x + dx;
          if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && grid[ny][nx] === 1) {
            grid[ny][nx] = 0;
            stack.push([ny, nx]);
          }
        }
      }
    }
  }
  return count;
}
`,
      go: `package main

func countIslands(grid [][]int) int {
	rows := len(grid)
	if rows == 0 {
		return 0
	}
	cols := len(grid[0])
	count := 0
	dirs := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] != 1 {
				continue
			}
			count++
			stack := [][2]int{{r, c}}
			grid[r][c] = 0
			for len(stack) > 0 {
				cell := stack[len(stack)-1]
				stack = stack[:len(stack)-1]
				for _, d := range dirs {
					ny, nx := cell[0]+d[0], cell[1]+d[1]
					if ny >= 0 && ny < rows && nx >= 0 && nx < cols && grid[ny][nx] == 1 {
						grid[ny][nx] = 0
						stack = append(stack, [2]int{ny, nx})
					}
				}
			}
		}
	}
	return count
}
`,
      rust: `fn count_islands(mut grid: Vec<Vec<i32>>) -> i32 {
    let rows = grid.len();
    let cols = if rows > 0 { grid[0].len() } else { 0 };
    let mut count = 0;
    for r in 0..rows {
        for c in 0..cols {
            if grid[r][c] != 1 {
                continue;
            }
            count += 1;
            let mut stack = vec![(r, c)];
            grid[r][c] = 0;
            while let Some((y, x)) = stack.pop() {
                let mut neighbors = Vec::new();
                if y > 0 { neighbors.push((y - 1, x)); }
                if y + 1 < rows { neighbors.push((y + 1, x)); }
                if x > 0 { neighbors.push((y, x - 1)); }
                if x + 1 < cols { neighbors.push((y, x + 1)); }
                for (ny, nx) in neighbors {
                    if grid[ny][nx] == 1 {
                        grid[ny][nx] = 0;
                        stack.push((ny, nx));
                    }
                }
            }
        }
    }
    count
}
`,
    },
  };
  CL.challenges.forEach((ch) => {
    const x = X[ch.id];
    if (!x) return;
    ch.names.typescript = x.names[0];
    ch.names.go = x.names[1];
    ch.names.rust = x.names[2];
    if (x.rustMut) ch.rustMut = x.rustMut;
    ch.solutions.typescript = x.typescript;
    ch.solutions.go = x.go;
    ch.solutions.rust = x.rust;
  });
})(typeof window !== 'undefined' ? window : globalThis);
