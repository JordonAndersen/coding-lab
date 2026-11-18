(function (G) {
  const CL = (G.CL = G.CL || {});

  CL.challenges = [
    {
      id: 'reverse-string', title: 'Reverse a String', difficulty: 'Warm-up',
      prompt: 'Return the characters of <code>s</code> in reverse order. Try it <em>without</em> a built-in reverse: walk two pointers inward from both ends and swap.',
      params: [{ name: 's', type: 'string' }], returns: 'string',
      names: { python: 'reverse_string', javascript: 'reverseString', java: 'reverseString', csharp: 'ReverseString', cpp: 'reverseString' },
      tests: [
        { args: ['hello'], expected: 'olleh' }, { args: [''], expected: '' }, { args: ['a'], expected: 'a' },
        { args: ['racecar'], expected: 'racecar' }, { args: ['Code!'], expected: '!edoC' },
      ],
      hints: [
        'Put one index at the start (left = 0) and one at the end (right = length - 1).',
        'Strings are immutable in most of these languages. Copy into a list / char array first.',
        'Swap the characters at left and right, then move left forward and right backward until they meet.',
      ],
      complexity: { answer: 'O(n)', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], why: 'Each character is visited once: n/2 swaps is still linear time.' },
      solutions: {
        python: `def reverse_string(s):
    chars = list(s)
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
    return "".join(chars)
`,
        javascript: `function reverseString(s) {
  const chars = s.split("");
  let left = 0, right = chars.length - 1;
  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }
  return chars.join("");
}
`,
        java: `import java.util.*;

class Solution {
    public static String reverseString(String s) {
        char[] chars = s.toCharArray();
        int left = 0, right = chars.length - 1;
        while (left < right) {
            char tmp = chars[left];
            chars[left++] = chars[right];
            chars[right--] = tmp;
        }
        return new String(chars);
    }
}
`,
        csharp: `using System;
using System.Collections.Generic;

public class Solution
{
    public static string ReverseString(string s)
    {
        char[] chars = s.ToCharArray();
        int left = 0, right = chars.Length - 1;
        while (left < right)
        {
            (chars[left], chars[right]) = (chars[right], chars[left]);
            left++;
            right--;
        }
        return new string(chars);
    }
}
`,
        cpp: `#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

string reverseString(string s) {
    int left = 0, right = (int)s.size() - 1;
    while (left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
    return s;
}
`,
      },
    },
    {
      id: 'is-anagram', title: 'Valid Anagram', difficulty: 'Easy',
      prompt: 'Return <code>true</code> if <code>t</code> is an anagram of <code>s</code> (same letters, same counts, any order). Inputs are lowercase letters.',
      params: [{ name: 's', type: 'string' }, { name: 't', type: 'string' }], returns: 'bool',
      names: { python: 'is_anagram', javascript: 'isAnagram', java: 'isAnagram', csharp: 'IsAnagram', cpp: 'isAnagram' },
      tests: [
        { args: ['anagram', 'nagaram'], expected: true }, { args: ['rat', 'car'], expected: false },
        { args: ['', ''], expected: true }, { args: ['ab', 'a'], expected: false }, { args: ['listen', 'silent'], expected: true },
      ],
      hints: [
        'If the lengths differ, the answer is immediately false.',
        'Count how many times each letter appears in s.',
        'Walk through t and decrement the counts. If any count goes below zero, it is not an anagram.',
      ],
      complexity: { answer: 'O(n)', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'], why: 'One pass to count and one pass to check. Sorting both strings also works but costs O(n log n).' },
      solutions: {
        python: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1
    for ch in t:
        if counts.get(ch, 0) == 0:
            return False
        counts[ch] -= 1
    return True
`,
        javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const counts = new Map();
  for (const ch of s) counts.set(ch, (counts.get(ch) || 0) + 1);
  for (const ch of t) {
    if (!counts.get(ch)) return false;
    counts.set(ch, counts.get(ch) - 1);
  }
  return true;
}
`,
        java: `import java.util.*;

class Solution {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (char c : s.toCharArray()) counts[c - 'a']++;
        for (char c : t.toCharArray()) {
            if (--counts[c - 'a'] < 0) return false;
        }
        return true;
    }
}
`,
        csharp: `using System;
using System.Collections.Generic;

public class Solution
{
    public static bool IsAnagram(string s, string t)
    {
        if (s.Length != t.Length) return false;
        var counts = new Dictionary<char, int>();
        foreach (char c in s) counts[c] = counts.GetValueOrDefault(c) + 1;
        foreach (char c in t)
        {
            if (counts.GetValueOrDefault(c) == 0) return false;
            counts[c]--;
        }
        return true;
    }
}
`,
        cpp: `#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    unordered_map<char, int> counts;
    for (char c : s) counts[c]++;
    for (char c : t) {
        if (--counts[c] < 0) return false;
    }
    return true;
}
`,
      },
    },
    {
      id: 'two-sum', title: 'Two Sum', difficulty: 'Easy',
      prompt: 'Given an array <code>nums</code> and a <code>target</code>, return the indices <code>[i, j]</code> (with <code>i &lt; j</code>) of the two numbers that add up to the target. Exactly one answer exists.',
      params: [{ name: 'nums', type: 'int[]' }, { name: 'target', type: 'int' }], returns: 'int[]',
      names: { python: 'two_sum', javascript: 'twoSum', java: 'twoSum', csharp: 'TwoSum', cpp: 'twoSum' },
      tests: [
        { args: [[2, 7, 11, 15], 9], expected: [0, 1] }, { args: [[3, 2, 4], 6], expected: [1, 2] },
        { args: [[3, 3], 6], expected: [0, 1] }, { args: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
        { args: [[1, 5, 9, 12], 21], expected: [2, 3] },
      ],
      hints: [
        'The brute-force version checks every pair with two loops: O(n²). Can you do it in one pass?',
        'For each number x, the number you need is target - x. That is the "complement".',
        'Keep a hash map from value to index for numbers already seen. If the complement is in the map, you are done.',
      ],
      complexity: { answer: 'O(n)', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'], why: 'Single pass, and each hash-map lookup or insert is O(1) on average. The trade is O(n) extra space for the map.' },
      solutions: {
        python: `def two_sum(nums, target):
    seen = {}  # value -> index
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:
            return [seen[need], i]
        seen[x] = i
    return []
`,
        javascript: `function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
`,
        java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) return new int[]{seen.get(need), i};
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}
`,
        csharp: `using System;
using System.Collections.Generic;

public class Solution
{
    public static int[] TwoSum(int[] nums, int target)
    {
        var seen = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++)
        {
            int need = target - nums[i];
            if (seen.TryGetValue(need, out int j)) return new int[] { j, i };
            seen[nums[i]] = i;
        }
        return new int[0];
    }
}
`,
        cpp: `#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen; // value -> index
    for (int i = 0; i < (int)nums.size(); i++) {
        int need = target - nums[i];
        auto it = seen.find(need);
        if (it != seen.end()) return {it->second, i};
        seen[nums[i]] = i;
    }
    return {};
}
`,
      },
    },
    {
      id: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'Easy',
      prompt: 'Given a string of brackets <code>()[]{}</code>, return <code>true</code> if every opener is closed by the same type, in the correct order.',
      params: [{ name: 's', type: 'string' }], returns: 'bool',
      names: { python: 'is_valid', javascript: 'isValid', java: 'isValid', csharp: 'IsValid', cpp: 'isValid' },
      tests: [
        { args: ['()'], expected: true }, { args: ['()[]{}'], expected: true }, { args: ['(]'], expected: false },
        { args: ['([)]'], expected: false }, { args: ['{[]}'], expected: true }, { args: [''], expected: true }, { args: ['(('], expected: false },
      ],
      hints: [
        'The most recently opened bracket must be the first one closed. That is Last-In-First-Out.',
        'Push openers onto a stack. On a closer, the top of the stack must be its matching opener.',
        'At the end, the stack must be empty. Leftover openers mean the string is invalid.',
      ],
      complexity: { answer: 'O(n)', options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'], why: 'Each character is pushed and popped at most once.' },
      solutions: {
        python: `def is_valid(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack
`,
        javascript: `function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
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
        java: `import java.util.*;

class Solution {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char open = stack.pop();
                if ((c == ')' && open != '(') || (c == ']' && open != '[') || (c == '}' && open != '{')) return false;
            }
        }
        return stack.isEmpty();
    }
}
`,
        csharp: `using System;
using System.Collections.Generic;

public class Solution
{
    public static bool IsValid(string s)
    {
        var pairs = new Dictionary<char, char> { [')'] = '(', [']'] = '[', ['}'] = '{' };
        var stack = new Stack<char>();
        foreach (char c in s)
        {
            if (pairs.ContainsKey(c))
            {
                if (stack.Count == 0 || stack.Pop() != pairs[c]) return false;
            }
            else stack.Push(c);
        }
        return stack.Count == 0;
    }
}
`,
        cpp: `#include <vector>
#include <string>
#include <unordered_map>
#include <stack>
using namespace std;

bool isValid(string s) {
    unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
    stack<char> st;
    for (char c : s) {
        if (pairs.count(c)) {
            if (st.empty() || st.top() != pairs[c]) return false;
            st.pop();
        } else {
            st.push(c);
        }
    }
    return st.empty();
}
`,
      },
    },
    {
      id: 'binary-search', title: 'Binary Search', difficulty: 'Easy',
      prompt: '<code>nums</code> is sorted in ascending order. Return the index of <code>target</code>, or <code>-1</code> if it is not present. Aim for O(log n).',
      params: [{ name: 'nums', type: 'int[]' }, { name: 'target', type: 'int' }], returns: 'int',
      names: { python: 'binary_search', javascript: 'binarySearch', java: 'binarySearch', csharp: 'BinarySearch', cpp: 'binarySearch' },
      tests: [
        { args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 }, { args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
        { args: [[5], 5], expected: 0 }, { args: [[], 1], expected: -1 },
        { args: [[1, 3, 5, 7, 9, 11], 1], expected: 0 }, { args: [[1, 3, 5, 7, 9, 11], 11], expected: 5 },
      ],
      hints: [
        'Keep a search window [lo, hi]. Start with the whole array.',
        'Check the middle element. If it is too small, the answer must be to the right, so discard the left half.',
        'Loop while lo <= hi. Compute mid as lo + (hi - lo) / 2 to avoid integer overflow in Java/C#/C++.',
      ],
      complexity: { answer: 'O(log n)', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], why: 'Each step halves the window, so at most about log₂(n) steps are needed.' },
      solutions: {
        python: `def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
`,
        javascript: `function binarySearch(nums, target) {
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
        java: `import java.util.*;

class Solution {
    public static int binarySearch(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}
`,
        csharp: `using System;
using System.Collections.Generic;

public class Solution
{
    public static int BinarySearch(int[] nums, int target)
    {
        int lo = 0, hi = nums.Length - 1;
        while (lo <= hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}
`,
        cpp: `#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

int binarySearch(vector<int>& nums, int target) {
    int lo = 0, hi = (int)nums.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
`,
      },
    },
    {
      id: 'insertion-sort', title: 'Insertion Sort', difficulty: 'Easy',
      prompt: 'Sort <code>nums</code> in ascending order <strong>by implementing insertion sort yourself</strong> (no built-in sort). Return the sorted array.',
      params: [{ name: 'nums', type: 'int[]' }], returns: 'int[]',
      names: { python: 'insertion_sort', javascript: 'insertionSort', java: 'insertionSort', csharp: 'InsertionSort', cpp: 'insertionSort' },
      tests: [
        { args: [[5, 2, 4, 6, 1, 3]], expected: [1, 2, 3, 4, 5, 6] }, { args: [[]], expected: [] }, { args: [[1]], expected: [1] },
        { args: [[3, -1, 2, -1]], expected: [-1, -1, 2, 3] }, { args: [[9, 8, 7, 6]], expected: [6, 7, 8, 9] },
      ],
      hints: [
        'Think of sorting playing cards in your hand: take the next card and slide it left until it is in place.',
        'For i from 1 to n-1: save key = nums[i], then shift larger elements in nums[0..i-1] one step right.',
        'Drop the key into the gap you opened up.',
      ],
      complexity: { answer: 'O(n²)', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], why: 'Worst case (reverse-sorted input) shifts every element past all earlier ones: 1+2+…+(n-1) ≈ n²/2. Best case (already sorted) is O(n).' },
      solutions: {
        python: `def insertion_sort(nums):
    for i in range(1, len(nums)):
        key = nums[i]
        j = i - 1
        while j >= 0 and nums[j] > key:
            nums[j + 1] = nums[j]
            j -= 1
        nums[j + 1] = key
    return nums
`,
        javascript: `function insertionSort(nums) {
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
        java: `import java.util.*;

class Solution {
    public static int[] insertionSort(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            int key = nums[i];
            int j = i - 1;
            while (j >= 0 && nums[j] > key) {
                nums[j + 1] = nums[j];
                j--;
            }
            nums[j + 1] = key;
        }
        return nums;
    }
}
`,
        csharp: `using System;
using System.Collections.Generic;

public class Solution
{
    public static int[] InsertionSort(int[] nums)
    {
        for (int i = 1; i < nums.Length; i++)
        {
            int key = nums[i];
            int j = i - 1;
            while (j >= 0 && nums[j] > key)
            {
                nums[j + 1] = nums[j];
                j--;
            }
            nums[j + 1] = key;
        }
        return nums;
    }
}
`,
        cpp: `#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

vector<int> insertionSort(vector<int>& nums) {
    for (int i = 1; i < (int)nums.size(); i++) {
        int key = nums[i];
        int j = i - 1;
        while (j >= 0 && nums[j] > key) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = key;
    }
    return nums;
}
`,
      },
    },
    {
      id: 'merge-sorted', title: 'Merge Two Sorted Arrays', difficulty: 'Easy',
      prompt: 'Arrays <code>a</code> and <code>b</code> are each sorted ascending. Return one sorted array containing all elements of both, in O(n + m). This is the heart of merge sort.',
      params: [{ name: 'a', type: 'int[]' }, { name: 'b', type: 'int[]' }], returns: 'int[]',
      names: { python: 'merge_sorted', javascript: 'mergeSorted', java: 'mergeSorted', csharp: 'MergeSorted', cpp: 'mergeSorted' },
      tests: [
        { args: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6] }, { args: [[], [1, 2]], expected: [1, 2] },
        { args: [[1, 2, 3], []], expected: [1, 2, 3] }, { args: [[1, 1, 2], [1, 3]], expected: [1, 1, 1, 2, 3] },
        { args: [[-5, 0, 10], [-6, 20]], expected: [-6, -5, 0, 10, 20] },
      ],
      hints: [
        'Use one pointer into each array, both starting at 0.',
        'Compare a[i] and b[j]; append the smaller one and advance only that pointer.',
        'When one array runs out, append everything left in the other.',
      ],
      complexity: { answer: 'O(n + m)', options: ['O(n + m)', 'O(n · m)', 'O((n+m) log(n+m))', 'O(1)'], why: 'Every element is appended exactly once.' },
      solutions: {
        python: `def merge_sorted(a, b):
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out
`,
        javascript: `function mergeSorted(a, b) {
  let i = 0, j = 0;
  const out = [];
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) out.push(a[i++]);
    else out.push(b[j++]);
  }
  return out.concat(a.slice(i), b.slice(j));
}
`,
        java: `import java.util.*;

class Solution {
    public static int[] mergeSorted(int[] a, int[] b) {
        int[] out = new int[a.length + b.length];
        int i = 0, j = 0, k = 0;
        while (i < a.length && j < b.length) {
            out[k++] = (a[i] <= b[j]) ? a[i++] : b[j++];
        }
        while (i < a.length) out[k++] = a[i++];
        while (j < b.length) out[k++] = b[j++];
        return out;
    }
}
`,
        csharp: `using System;
using System.Collections.Generic;

public class Solution
{
    public static int[] MergeSorted(int[] a, int[] b)
    {
        var outList = new List<int>(a.Length + b.Length);
        int i = 0, j = 0;
        while (i < a.Length && j < b.Length)
        {
            outList.Add(a[i] <= b[j] ? a[i++] : b[j++]);
        }
        while (i < a.Length) outList.Add(a[i++]);
        while (j < b.Length) outList.Add(b[j++]);
        return outList.ToArray();
    }
}
`,
        cpp: `#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

vector<int> mergeSorted(vector<int>& a, vector<int>& b) {
    vector<int> out;
    out.reserve(a.size() + b.size());
    size_t i = 0, j = 0;
    while (i < a.size() && j < b.size()) {
        if (a[i] <= b[j]) out.push_back(a[i++]);
        else out.push_back(b[j++]);
    }
    while (i < a.size()) out.push_back(a[i++]);
    while (j < b.size()) out.push_back(b[j++]);
    return out;
}
`,
      },
    },
    {
      id: 'max-subarray', title: 'Maximum Subarray (Kadane)', difficulty: 'Medium',
      prompt: 'Return the largest sum of any non-empty contiguous subarray of <code>nums</code>.',
      params: [{ name: 'nums', type: 'int[]' }], returns: 'int',
      names: { python: 'max_subarray', javascript: 'maxSubarray', java: 'maxSubarray', csharp: 'MaxSubarray', cpp: 'maxSubarray' },
      tests: [
        { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 }, { args: [[1]], expected: 1 },
        { args: [[5, 4, -1, 7, 8]], expected: 23 }, { args: [[-3, -1, -2]], expected: -1 }, { args: [[2, -1, 2]], expected: 3 },
      ],
      hints: [
        'Brute force tries every (start, end) pair: O(n²). Look for a single pass.',
        'At each index ask: is it better to extend the previous subarray, or start fresh here?',
        'current = max(x, current + x); best = max(best, current). Start both at nums[0] so all-negative arrays work.',
      ],
      complexity: { answer: 'O(n)', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(n³)'], why: 'Kadane’s algorithm keeps two running numbers and visits each element once. O(1) extra space.' },
      solutions: {
        python: `def max_subarray(nums):
    best = current = nums[0]
    for x in nums[1:]:
        current = max(x, current + x)
        best = max(best, current)
    return best
`,
        javascript: `function maxSubarray(nums) {
  let best = nums[0], current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}
`,
        java: `import java.util.*;

class Solution {
    public static int maxSubarray(int[] nums) {
        int best = nums[0], current = nums[0];
        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }
        return best;
    }
}
`,
        csharp: `using System;
using System.Collections.Generic;

public class Solution
{
    public static int MaxSubarray(int[] nums)
    {
        int best = nums[0], current = nums[0];
        for (int i = 1; i < nums.Length; i++)
        {
            current = Math.Max(nums[i], current + nums[i]);
            best = Math.Max(best, current);
        }
        return best;
    }
}
`,
        cpp: `#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int maxSubarray(vector<int>& nums) {
    int best = nums[0], current = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        current = max(nums[i], current + nums[i]);
        best = max(best, current);
    }
    return best;
}
`,
      },
    },
    {
      id: 'climb-stairs', title: 'Climbing Stairs', difficulty: 'Easy',
      prompt: 'You can climb 1 or 2 steps at a time. How many distinct ways can you reach the top of a staircase with <code>n</code> steps?',
      params: [{ name: 'n', type: 'int' }], returns: 'int',
      names: { python: 'climb_stairs', javascript: 'climbStairs', java: 'climbStairs', csharp: 'ClimbStairs', cpp: 'climbStairs' },
      tests: [
        { args: [1], expected: 1 }, { args: [2], expected: 2 }, { args: [3], expected: 3 },
        { args: [5], expected: 8 }, { args: [10], expected: 89 }, { args: [30], expected: 1346269 },
      ],
      hints: [
        'To reach step n, your last move came from step n-1 or step n-2.',
        'So ways(n) = ways(n-1) + ways(n-2). That is the Fibonacci recurrence.',
        'Plain recursion is O(2ⁿ) and n = 30 will be slow. Build up from the bottom with two variables instead.',
      ],
      complexity: { answer: 'O(n)', options: ['O(2ⁿ)', 'O(n²)', 'O(n)', 'O(log n)'], why: 'Bottom-up DP computes each subproblem once. The naive recursive version recomputes them and is O(2ⁿ).' },
      solutions: {
        python: `def climb_stairs(n):
    a, b = 1, 1  # ways to reach step 0 and step 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b
`,
        javascript: `function climbStairs(n) {
  let a = 1, b = 1;
  for (let i = 1; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
`,
        java: `import java.util.*;

class Solution {
    public static int climbStairs(int n) {
        int a = 1, b = 1;
        for (int i = 1; i < n; i++) {
            int next = a + b;
            a = b;
            b = next;
        }
        return b;
    }
}
`,
        csharp: `using System;
using System.Collections.Generic;

public class Solution
{
    public static int ClimbStairs(int n)
    {
        int a = 1, b = 1;
        for (int i = 1; i < n; i++)
        {
            (a, b) = (b, a + b);
        }
        return b;
    }
}
`,
        cpp: `#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

int climbStairs(int n) {
    int a = 1, b = 1;
    for (int i = 1; i < n; i++) {
        int next = a + b;
        a = b;
        b = next;
    }
    return b;
}
`,
      },
    },
    {
      id: 'count-islands', title: 'Number of Islands', difficulty: 'Medium',
      prompt: '<code>grid</code> is a 2-D map of <code>1</code> (land) and <code>0</code> (water). Land cells connect up, down, left and right. Return the number of separate islands.',
      params: [{ name: 'grid', type: 'int[][]' }], returns: 'int',
      names: { python: 'count_islands', javascript: 'countIslands', java: 'countIslands', csharp: 'CountIslands', cpp: 'countIslands' },
      tests: [
        { args: [[[1, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 1]]], expected: 3 },
        { args: [[[1, 1, 1], [0, 1, 0], [1, 1, 1]]], expected: 1 }, { args: [[[0, 0], [0, 0]]], expected: 0 },
        { args: [[[1, 0, 1], [0, 1, 0], [1, 0, 1]]], expected: 5 }, { args: [[[1]]], expected: 1 },
      ],
      hints: [
        'Treat the grid as a graph: each land cell is a node with edges to its land neighbors.',
        'Scan every cell. When you find unvisited land, that is a new island: count it.',
        'Then flood-fill (DFS with a stack or BFS with a queue) from that cell, marking every connected land cell as visited (e.g. set it to 0).',
      ],
      complexity: { answer: 'O(rows × cols)', options: ['O(rows × cols)', 'O((rows × cols)²)', 'O(rows + cols)', 'O(log(rows × cols))'], why: 'Each cell is visited a constant number of times by the scan and the flood fill.' },
      solutions: {
        python: `def count_islands(grid):
    rows, cols = len(grid), len(grid[0]) if grid else 0
    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                count += 1
                stack = [(r, c)]
                grid[r][c] = 0
                while stack:
                    y, x = stack.pop()
                    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        ny, nx = y + dy, x + dx
                        if 0 <= ny < rows and 0 <= nx < cols and grid[ny][nx] == 1:
                            grid[ny][nx] = 0
                            stack.append((ny, nx))
    return count
`,
        javascript: `function countIslands(grid) {
  const rows = grid.length, cols = rows ? grid[0].length : 0;
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== 1) continue;
      count++;
      const stack = [[r, c]];
      grid[r][c] = 0;
      while (stack.length) {
        const [y, x] = stack.pop();
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
        java: `import java.util.*;

class Solution {
    public static int countIslands(int[][] grid) {
        int rows = grid.length, cols = rows == 0 ? 0 : grid[0].length, count = 0;
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] != 1) continue;
                count++;
                Deque<int[]> stack = new ArrayDeque<>();
                stack.push(new int[]{r, c});
                grid[r][c] = 0;
                while (!stack.isEmpty()) {
                    int[] cell = stack.pop();
                    for (int[] d : dirs) {
                        int ny = cell[0] + d[0], nx = cell[1] + d[1];
                        if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && grid[ny][nx] == 1) {
                            grid[ny][nx] = 0;
                            stack.push(new int[]{ny, nx});
                        }
                    }
                }
            }
        }
        return count;
    }
}
`,
        csharp: `using System;
using System.Collections.Generic;

public class Solution
{
    public static int CountIslands(int[][] grid)
    {
        int rows = grid.Length, cols = rows == 0 ? 0 : grid[0].Length, count = 0;
        var dirs = new (int dy, int dx)[] { (1, 0), (-1, 0), (0, 1), (0, -1) };
        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] != 1) continue;
                count++;
                var stack = new Stack<(int y, int x)>();
                stack.Push((r, c));
                grid[r][c] = 0;
                while (stack.Count > 0)
                {
                    var (y, x) = stack.Pop();
                    foreach (var (dy, dx) in dirs)
                    {
                        int ny = y + dy, nx = x + dx;
                        if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && grid[ny][nx] == 1)
                        {
                            grid[ny][nx] = 0;
                            stack.Push((ny, nx));
                        }
                    }
                }
            }
        }
        return count;
    }
}
`,
        cpp: `#include <vector>
#include <string>
#include <unordered_map>
#include <stack>
#include <utility>
using namespace std;

int countIslands(vector<vector<int>>& grid) {
    int rows = grid.size(), cols = rows ? grid[0].size() : 0, count = 0;
    int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] != 1) continue;
            count++;
            stack<pair<int, int>> st;
            st.push({r, c});
            grid[r][c] = 0;
            while (!st.empty()) {
                auto [y, x] = st.top();
                st.pop();
                for (auto& d : dirs) {
                    int ny = y + d[0], nx = x + d[1];
                    if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && grid[ny][nx] == 1) {
                        grid[ny][nx] = 0;
                        st.push({ny, nx});
                    }
                }
            }
        }
    }
    return count;
}
`,
      },
    },
  ];

  const D = {
    bigo: { label: 'Big-O notation (Khan Academy)', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation' },
    pyTime: { label: 'Python TimeComplexity (wiki.python.org)', url: 'https://wiki.python.org/moin/TimeComplexity' },
    pyDict: { label: 'Python dict', url: 'https://docs.python.org/3/library/stdtypes.html#mapping-types-dict' },
    jsMap: { label: 'JavaScript Map (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map' },
    javaHashMap: { label: 'Java HashMap', url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html' },
    csDict: { label: 'C# Dictionary<TKey,TValue>', url: 'https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2' },
    cppUmap: { label: 'C++ std::unordered_map', url: 'https://en.cppreference.com/w/cpp/container/unordered_map' },
    javaDeque: { label: 'Java ArrayDeque', url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html' },
    csStack: { label: 'C# Stack<T>', url: 'https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.stack-1' },
    cppStack: { label: 'C++ std::stack', url: 'https://en.cppreference.com/w/cpp/container/stack' },
    pyBisect: { label: 'Python bisect module', url: 'https://docs.python.org/3/library/bisect.html' },
    javaArrays: { label: 'Java Arrays.binarySearch / sort', url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html' },
    cppBinary: { label: 'C++ std::lower_bound', url: 'https://en.cppreference.com/w/cpp/algorithm/lower_bound' },
    pySort: { label: 'Python Sorting HOW TO', url: 'https://docs.python.org/3/howto/sorting.html' },
    jsSort: { label: 'Array.prototype.sort (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort' },
    cppSort: { label: 'C++ std::sort', url: 'https://en.cppreference.com/w/cpp/algorithm/sort' },
    cppMerge: { label: 'C++ std::merge', url: 'https://en.cppreference.com/w/cpp/algorithm/merge' },
    pyHeapq: { label: 'Python heapq.merge', url: 'https://docs.python.org/3/library/heapq.html#heapq.merge' },
    pyLru: { label: 'Python functools.cache (memoization)', url: 'https://docs.python.org/3/library/functools.html#functools.cache' },
    pyDeque: { label: 'Python collections.deque', url: 'https://docs.python.org/3/library/collections.html#collections.deque' },
    csQueue: { label: 'C# Queue<T>', url: 'https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.queue-1' },
    cppQueue: { label: 'C++ std::queue', url: 'https://en.cppreference.com/w/cpp/container/queue' },
    pyCounter: { label: 'Python collections.Counter', url: 'https://docs.python.org/3/library/collections.html#collections.Counter' },
    javaString: { label: 'Java String', url: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html' },
    jsString: { label: 'String (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String' },
    cppString: { label: 'C++ std::string', url: 'https://en.cppreference.com/w/cpp/string/basic_string' },
  };
  CL.docRefs = D;

  CL.algoLessons = [
    {
      id: 'algo-bigo', title: 'Big-O: Measuring Growth', minutes: 12,
      concept: `<p>Big-O describes how an algorithm's work <strong>grows</strong> as the input size <em>n</em> grows. It ignores constants and small terms, so you can compare approaches before writing any code.</p>
<table class="mini"><tr><th>Big-O</th><th>Name</th><th>Typical example</th></tr>
<tr><td>O(1)</td><td>constant</td><td>array index, hash-map lookup</td></tr>
<tr><td>O(log n)</td><td>logarithmic</td><td>binary search</td></tr>
<tr><td>O(n)</td><td>linear</td><td>one loop over the input</td></tr>
<tr><td>O(n log n)</td><td>linearithmic</td><td>good comparison sorts (merge sort)</td></tr>
<tr><td>O(n²)</td><td>quadratic</td><td>nested loops over the same input</td></tr>
<tr><td>O(2ⁿ)</td><td>exponential</td><td>naive recursive Fibonacci</td></tr></table>
<p>Rules of thumb: <strong>sequential steps add</strong> (O(n) + O(n) = O(n)), <strong>nested steps multiply</strong> (a loop inside a loop = O(n²)), and <strong>drop constants</strong> (O(3n) = O(n)). Space complexity uses the same notation for extra memory.</p>
<pre class="snippet">for i in range(n):        # runs n times
    for j in range(n):    # runs n times for each i
        total += i * j    # O(1)
# total: n × n × O(1) = O(n²)</pre>`,
      keyPoints: ['Big-O is about growth rate, not exact speed.', 'Nested loops multiply; sequential loops add.', 'Hash maps trade O(n) memory for O(1) lookups.'],
      docs: [D.bigo, D.pyTime],
      quiz: [
        { q: 'A function loops over an array once, then loops over it again separately. What is its time complexity?', options: ['O(n)', 'O(2n²)', 'O(n²)', 'O(log n)'], answer: 0, why: 'Sequential loops add: O(n) + O(n) = O(2n), and dropping the constant gives O(n).' },
        { q: 'Which operation is typically O(log n)?', options: ['Reading arr[5]', 'Binary search in a sorted array', 'Finding the max in an unsorted array', 'Comparing every pair of items'], answer: 1, why: 'Binary search halves the remaining range each step.' },
        { q: 'If an O(n²) algorithm takes 1 second for n = 1,000, roughly how long for n = 2,000?', options: ['2 seconds', '4 seconds', '1 second', '8 seconds'], answer: 1, why: 'Doubling n multiplies n² by 4.' },
      ],
    },
    { id: 'algo-two-pointers', title: 'Two Pointers', minutes: 15, challenge: 'reverse-string',
      concept: `<p>The <strong>two-pointer</strong> pattern keeps two indexes into a sequence and moves them toward each other (or in the same direction at different speeds). It often turns an O(n²) nested-loop idea into a single O(n) pass.</p>
<p>Classic uses: reversing in place, checking palindromes, finding a pair in a <em>sorted</em> array that sums to a target, and removing duplicates.</p>
<pre class="snippet">left, right = 0, len(items) - 1
while left < right:
    # look at items[left] and items[right]
    left += 1
    right -= 1</pre>
<p>Strings are <strong>immutable</strong> in Python, JavaScript, Java and C#, so you copy them into a mutable list/char array before swapping. C++ <code>std::string</code> is mutable.</p>`,
      keyPoints: ['Two indexes, one pass.', 'Loop condition is usually left < right.', 'Convert immutable strings to arrays before swapping.'],
      docs: [D.javaString, D.jsString, D.cppString],
      quiz: [{ q: 'Why does the loop use left < right instead of left <= right when reversing?', options: ['When they meet, the middle character is already in place', 'It is faster to compare with <', 'It avoids negative indexes', 'It is required by the language'], answer: 0, why: 'In an odd-length string the middle character swaps with itself, so there is nothing left to do.' }],
    },
    { id: 'algo-counting', title: 'Frequency Counting', minutes: 15, challenge: 'is-anagram',
      concept: `<p>Many problems are really asking "how many of each thing are there?" Build a <strong>frequency table</strong> (a hash map, or a fixed array when the alphabet is small) in one pass, then answer questions from it.</p>
<pre class="snippet">counts = {}
for ch in "banana":
    counts[ch] = counts.get(ch, 0) + 1
# {'b': 1, 'a': 3, 'n': 2}</pre>
<p>Python's <code>collections.Counter</code> does this for you. In Java, an <code>int[26]</code> indexed by <code>c - 'a'</code> is a fast trick for lowercase letters.</p>`,
      keyPoints: ['Count once, query many times.', 'Fixed-size arrays beat hash maps for tiny alphabets.', 'Comparing two frequency tables is O(alphabet size).'],
      docs: [D.pyCounter, D.pyDict, D.jsMap],
      quiz: [{ q: 'Sorting both strings also detects anagrams. Why might counting be preferred?', options: ['Counting is O(n); sorting is O(n log n)', 'Sorting does not work for anagrams', 'Counting uses no memory', 'Sorting changes the answer'], answer: 0, why: 'Counting makes linear passes; comparison sorting costs O(n log n).' }],
    },
    { id: 'algo-hashing', title: 'Hash Maps & Complements', minutes: 18, challenge: 'two-sum',
      concept: `<p>A <strong>hash map</strong> stores key → value pairs with average O(1) insert and lookup. The key is hashed to a bucket, so you jump straight to it instead of scanning.</p>
<p>The <em>complement</em> trick: instead of asking "which pair sums to the target?" (O(n²)), ask for each element "have I already seen <code>target - x</code>?" One pass, O(n).</p>
<table class="mini"><tr><th>Language</th><th>Hash map type</th></tr>
<tr><td>Python</td><td><code>dict</code></td></tr><tr><td>JavaScript</td><td><code>Map</code> (or a plain object)</td></tr>
<tr><td>Java</td><td><code>HashMap&lt;K,V&gt;</code></td></tr><tr><td>C#</td><td><code>Dictionary&lt;TKey,TValue&gt;</code></td></tr>
<tr><td>C++</td><td><code>std::unordered_map</code></td></tr>
<tr><td>TypeScript</td><td><code>Map&lt;K, V&gt;</code></td></tr><tr><td>Go</td><td><code>map[K]V</code></td></tr>
<tr><td>Rust</td><td><code>std::collections::HashMap</code></td></tr></table>`,
      keyPoints: ['Average O(1) lookup, worst case O(n) with many collisions.', 'Trade memory for speed.', '"Have I seen what I need?" is a reusable pattern.'],
      docs: [D.pyDict, D.jsMap, D.javaHashMap, D.csDict, D.cppUmap],
      quiz: [
        { q: 'Why do we check for the complement BEFORE inserting the current number?', options: ['So a number is not paired with itself', 'Because insertion is slow', 'To keep the map sorted', 'It makes no difference'], answer: 0, why: 'With target 6 and x = 3, inserting first would let 3 match itself at the same index.' },
      ],
    },
    { id: 'algo-stacks', title: 'Stacks (LIFO)', minutes: 15, challenge: 'valid-parentheses',
      concept: `<p>A <strong>stack</strong> is Last-In-First-Out: <code>push</code> adds to the top, <code>pop</code> removes from the top. Both are O(1). Use a stack whenever the most recent thing must be handled first: matching brackets, undo history, evaluating expressions, and depth-first search.</p>
<p>A <strong>queue</strong> is the opposite (First-In-First-Out) and powers breadth-first search.</p>
<table class="mini"><tr><th>Language</th><th>Stack</th><th>Queue</th></tr>
<tr><td>Python</td><td><code>list</code> (append/pop)</td><td><code>collections.deque</code></td></tr>
<tr><td>JavaScript</td><td><code>Array</code> (push/pop)</td><td>Array (shift is O(n); fine for small inputs)</td></tr>
<tr><td>Java</td><td><code>ArrayDeque</code> (push/pop)</td><td><code>ArrayDeque</code> (offer/poll)</td></tr>
<tr><td>C#</td><td><code>Stack&lt;T&gt;</code></td><td><code>Queue&lt;T&gt;</code></td></tr>
<tr><td>C++</td><td><code>std::stack</code></td><td><code>std::queue</code></td></tr>
<tr><td>Go</td><td>slice (append / s[:len(s)-1])</td><td>slice, or a channel</td></tr>
<tr><td>Rust</td><td><code>Vec</code> (push/pop)</td><td><code>VecDeque</code></td></tr></table>`,
      keyPoints: ['LIFO: last in, first out.', 'Check for an empty stack before popping.', 'Java: prefer ArrayDeque over the legacy Stack class.'],
      docs: [D.pyDeque, D.javaDeque, D.csStack, D.cppStack],
      quiz: [{ q: 'You push A, B, C onto a stack, then pop twice. What is left?', options: ['A', 'C', 'B', 'A and B'], answer: 0, why: 'Pops remove C, then B, leaving A.' }],
    },
    { id: 'algo-binary-search', title: 'Binary Search', minutes: 15, challenge: 'binary-search',
      concept: `<p>On <strong>sorted</strong> data you can find a value by repeatedly checking the middle and throwing away the half that cannot contain it. 1,000,000 items need at most about 20 checks.</p>
<pre class="snippet">lo, hi = 0, n - 1
while lo <= hi:
    mid = lo + (hi - lo) // 2
    if a[mid] == target: return mid
    if a[mid] < target:  lo = mid + 1
    else:                hi = mid - 1
return -1</pre>
<p>Off-by-one bugs are the classic trap. Decide whether <code>hi</code> is inclusive or exclusive and stay consistent. Standard libraries ship versions: Python <code>bisect</code>, Java <code>Arrays.binarySearch</code>, C++ <code>std::lower_bound</code>.</p>`,
      keyPoints: ['Requires sorted input.', 'Halving each step → O(log n).', 'mid = lo + (hi - lo) / 2 avoids overflow.'],
      docs: [D.pyBisect, D.javaArrays, D.cppBinary],
      quiz: [{ q: 'Why write lo + (hi - lo) / 2 instead of (lo + hi) / 2 in Java or C++?', options: ['lo + hi can overflow a 32-bit int', 'It is more readable', 'It rounds differently', 'Division is slower otherwise'], answer: 0, why: 'For very large indexes, lo + hi can exceed the int maximum.' }],
    },
    { id: 'algo-sorting', title: 'Sorting Fundamentals', minutes: 18, challenge: 'insertion-sort',
      concept: `<p>Sorting puts data in order so you can search, deduplicate, or merge it efficiently. Know these:</p>
<table class="mini"><tr><th>Algorithm</th><th>Average</th><th>Worst</th><th>Notes</th></tr>
<tr><td>Insertion sort</td><td>O(n²)</td><td>O(n²)</td><td>Great for tiny or nearly-sorted input. Stable.</td></tr>
<tr><td>Merge sort</td><td>O(n log n)</td><td>O(n log n)</td><td>Divide and conquer; O(n) extra space. Stable.</td></tr>
<tr><td>Quick sort</td><td>O(n log n)</td><td>O(n²)</td><td>In place and fast in practice. Not stable.</td></tr>
<tr><td>Library sorts</td><td>O(n log n)</td><td>O(n log n)</td><td>Python/Java objects use TimSort (a hybrid of merge and insertion sort).</td></tr></table>
<p><strong>Stable</strong> means equal elements keep their original relative order. That matters when sorting records by one field after another.</p>`,
      keyPoints: ['O(n log n) is the best possible for comparison sorts.', 'Use library sorts in real code; implement them to learn.', 'JavaScript sort() compares as strings unless you pass a comparator.'],
      docs: [D.pySort, D.jsSort, D.cppSort],
      quiz: [
        { q: 'What does [10, 9, 1].sort() return in JavaScript with no comparator?', options: ['[1, 10, 9]', '[1, 9, 10]', '[10, 9, 1]', 'An error'], answer: 0, why: 'Default sort converts to strings: "1" < "10" < "9". Use (a, b) => a - b.' },
        { q: 'Insertion sort on an already-sorted array runs in…', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'], answer: 0, why: 'The inner loop never shifts anything, so each element costs O(1).' },
      ],
    },
    { id: 'algo-merge', title: 'Merging & Divide and Conquer', minutes: 15, challenge: 'merge-sorted',
      concept: `<p><strong>Divide and conquer</strong>: split a problem into smaller copies of itself, solve them, and combine the results. Merge sort splits the array in half until pieces have one element, then <em>merges</em> sorted halves back together.</p>
<p>The merge step is a two-pointer walk: compare the fronts, take the smaller, advance. Because there are log₂(n) levels of splitting and each level does O(n) merging work, merge sort is O(n log n).</p>
<pre class="snippet">def merge_sort(a):
    if len(a) <= 1: return a
    mid = len(a) // 2
    return merge(merge_sort(a[:mid]), merge_sort(a[mid:]))</pre>`,
      keyPoints: ['Split → solve → combine.', 'Merging two sorted lists is O(n + m).', 'Use <= when comparing to keep the merge stable.'],
      docs: [D.cppMerge, D.pyHeapq],
      quiz: [{ q: 'How many levels of splitting does merge sort do on 16 elements?', options: ['4', '8', '16', '2'], answer: 0, why: '16 → 8 → 4 → 2 → 1 is log₂(16) = 4 levels.' }],
    },
    { id: 'algo-greedy', title: 'Running State & Kadane', minutes: 15, challenge: 'max-subarray',
      concept: `<p>Some problems can be solved by carrying a small amount of <strong>running state</strong> through a single pass and making the locally best decision at each step.</p>
<p>Kadane's algorithm keeps <code>current</code> (best sum of a subarray ending <em>here</em>) and <code>best</code> (best seen anywhere). At each element: either extend the previous run or start a new one, whichever is larger.</p>
<pre class="snippet">current = best = nums[0]
for x in nums[1:]:
    current = max(x, current + x)
    best = max(best, current)</pre>
<p>This is also the simplest example of <em>dynamic programming</em>: the answer at position i is built from the answer at i-1.</p>`,
      keyPoints: ['Define precisely what your running variable means.', 'Initialize from the first element to handle all-negative input.', 'O(n) time, O(1) space.'],
      docs: [D.bigo],
      quiz: [{ q: 'If you initialize best = 0, which input breaks?', options: ['[-3, -1, -2]', '[1, 2, 3]', '[5, -1, 5]', '[0]'], answer: 0, why: 'All-negative input should return -1, but best would stay 0.' }],
    },
    { id: 'algo-dp', title: 'Recursion & Dynamic Programming', minutes: 20, challenge: 'climb-stairs',
      concept: `<p><strong>Recursion</strong>: a function that calls itself on a smaller input until it reaches a <em>base case</em>. Every recursive call adds a frame to the call stack.</p>
<p><strong>Dynamic programming</strong> fixes recursion that repeats the same subproblems. Two styles:</p>
<ul><li><strong>Top-down (memoization)</strong>: recurse, but cache results. Python: <code>@functools.cache</code>.</li>
<li><strong>Bottom-up (tabulation)</strong>: fill answers from the smallest case upward in a loop.</li></ul>
<pre class="snippet">from functools import cache

@cache
def fib(n):
    if n < 2: return n         # base case
    return fib(n-1) + fib(n-2)  # recurrence</pre>
<p>Recipe: (1) define the state, (2) write the recurrence, (3) identify base cases, (4) choose an order to compute.</p>`,
      keyPoints: ['Every recursion needs a base case.', 'Overlapping subproblems → cache them.', 'Bottom-up DP avoids stack-depth limits.'],
      docs: [D.pyLru],
      quiz: [
        { q: 'Naive recursive fib(n) without memoization is roughly…', options: ['O(2ⁿ)', 'O(n)', 'O(n²)', 'O(log n)'], answer: 0, why: 'Each call branches into two more calls, recomputing the same values.' },
        { q: 'What happens if a recursive function has no reachable base case?', options: ['Stack overflow / recursion error', 'It returns 0', 'It runs in O(1)', 'The compiler fixes it'], answer: 0, why: 'Calls pile up until the call stack runs out.' },
      ],
    },
    { id: 'algo-graphs', title: 'Graphs: DFS & BFS', minutes: 22, challenge: 'count-islands',
      concept: `<p>A <strong>graph</strong> is nodes connected by edges. A grid is a graph where each cell links to its neighbors.</p>
<ul><li><strong>DFS (depth-first)</strong>: go as deep as possible, then back up. Use recursion or a <em>stack</em>.</li>
<li><strong>BFS (breadth-first)</strong>: explore in rings outward. Use a <em>queue</em>. BFS finds shortest paths in unweighted graphs.</li></ul>
<p>Always track <strong>visited</strong> nodes, or you will loop forever on cycles. On a grid you can overwrite a cell (e.g. 1 → 0) to mark it.</p>
<pre class="snippet">from collections import deque
queue = deque([start]); seen = {start}
while queue:
    node = queue.popleft()
    for nxt in neighbors(node):
        if nxt not in seen:
            seen.add(nxt); queue.append(nxt)</pre>`,
      keyPoints: ['DFS → stack, BFS → queue.', 'Mark visited when you push, not when you pop, to avoid duplicates.', 'Traversal is O(V + E).'],
      docs: [D.pyDeque, D.csQueue, D.cppQueue],
      quiz: [{ q: 'Which traversal finds the shortest path (fewest edges) in an unweighted graph?', options: ['BFS', 'DFS', 'Both always', 'Neither'], answer: 0, why: 'BFS visits nodes in order of distance from the start.' }],
    },
  ];
})(typeof window !== 'undefined' ? window : globalThis);
