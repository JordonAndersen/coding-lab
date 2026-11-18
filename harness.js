// Generates starters and test harnesses for algorithm challenges in every language.
(function (G) {
  const CL = (G.CL = G.CL || {});

  const TYPES = {
    java: { int: 'int', 'int[]': 'int[]', string: 'String', bool: 'boolean', 'int[][]': 'int[][]' },
    csharp: { int: 'int', 'int[]': 'int[]', string: 'string', bool: 'bool', 'int[][]': 'int[][]' },
    cppParam: { int: 'int', 'int[]': 'vector<int>&', string: 'string', bool: 'bool', 'int[][]': 'vector<vector<int>>&' },
    cppRet: { int: 'int', 'int[]': 'vector<int>', string: 'string', bool: 'bool', 'int[][]': 'vector<vector<int>>' },
  };
  TYPES.ts = { int: 'number', 'int[]': 'number[]', string: 'string', bool: 'boolean', 'int[][]': 'number[][]' };
  TYPES.go = { int: 'int', 'int[]': '[]int', string: 'string', bool: 'bool', 'int[][]': '[][]int' };
  TYPES.rustParam = { int: 'i32', 'int[]': 'Vec<i32>', string: '&str', bool: 'bool', 'int[][]': 'Vec<Vec<i32>>' };
  TYPES.rustRet = { int: 'i32', 'int[]': 'Vec<i32>', string: 'String', bool: 'bool', 'int[][]': 'Vec<Vec<i32>>' };
  const DEFAULT_RET = {
    typescript: { int: '0', 'int[]': '[]', string: '""', bool: 'false' },
    go: { int: '0', 'int[]': 'nil', string: '""', bool: 'false' },
    rust: { int: '0', 'int[]': 'vec![]', string: 'String::new()', bool: 'false' },
    java: { int: '0', 'int[]': 'new int[0]', string: '""', bool: 'false' },
    csharp: { int: '0', 'int[]': 'new int[0]', string: '""', bool: 'false' },
    cpp: { int: '0', 'int[]': '{}', string: '""', bool: 'false' },
  };

  function strLit(s) {
    return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }

  function lit(lang, type, v) {
    if (type === 'int') return String(v);
    if (type === 'bool') return v ? (lang === 'python' ? 'True' : 'true') : lang === 'python' ? 'False' : 'false';
    if (type === 'string') return strLit(v);
    if (type === 'int[]') {
      const xs = v.join(', ');
      if (lang === 'java' || lang === 'csharp') return 'new int[]{' + xs + '}';
      if (lang === 'cpp') return 'vector<int>{' + xs + '}';
      if (lang === 'go') return '[]int{' + xs + '}';
      if (lang === 'rust') return 'vec![' + xs + ']';
      return '[' + xs + ']';
    }
    if (type === 'int[][]') {
      if (lang === 'java') return 'new int[][]{' + v.map((r) => '{' + r.join(', ') + '}').join(', ') + '}';
      if (lang === 'csharp') return 'new int[][]{' + v.map((r) => 'new int[]{' + r.join(', ') + '}').join(', ') + '}';
      if (lang === 'cpp') return 'vector<vector<int>>{' + v.map((r) => '{' + r.join(', ') + '}').join(', ') + '}';
      if (lang === 'go') return '[][]int{' + v.map((r) => '{' + r.join(', ') + '}').join(', ') + '}';
      if (lang === 'rust') return 'vec![' + v.map((r) => 'vec![' + r.join(', ') + ']').join(', ') + ']';
      return JSON.stringify(v);
    }
    throw new Error('Unknown type ' + type);
  }

  // Human-readable form used for expected values (matches the show() helpers below)
  function show(type, v) {
    if (type === 'int[]') return '[' + v.join(', ') + ']';
    if (type === 'int[][]') return '[' + v.map((r) => '[' + r.join(', ') + ']').join(', ') + ']';
    if (type === 'bool') return v ? 'true' : 'false';
    return String(v);
  }

  function starter(ch, lang) {
    const n = ch.names[lang];
    const ps = ch.params;
    if (lang === 'python') {
      return 'def ' + n + '(' + ps.map((p) => p.name).join(', ') + '):\n    # Your code here\n    pass\n';
    }
    if (lang === 'javascript') {
      return 'function ' + n + '(' + ps.map((p) => p.name).join(', ') + ') {\n  // Your code here\n}\n';
    }
    if (lang === 'typescript') {
      return 'function ' + n + '(' + ps.map((p) => p.name + ': ' + TYPES.ts[p.type]).join(', ') + '): ' + TYPES.ts[ch.returns] +
        ' {\n  // Your code here\n  return ' + DEFAULT_RET.typescript[ch.returns] + ';\n}\n';
    }
    if (lang === 'go') {
      return 'package main\n\nfunc ' + n + '(' + ps.map((p) => p.name + ' ' + TYPES.go[p.type]).join(', ') + ') ' + TYPES.go[ch.returns] +
        ' {\n\t// Your code here\n\treturn ' + DEFAULT_RET.go[ch.returns] + '\n}\n';
    }
    if (lang === 'rust') {
      const mut = ch.rustMut || [];
      return 'fn ' + n + '(' + ps.map((p) => (mut.includes(p.name) ? 'mut ' : '') + p.name + ': ' + TYPES.rustParam[p.type]).join(', ') + ') -> ' + TYPES.rustRet[ch.returns] +
        ' {\n    // Your code here\n    ' + DEFAULT_RET.rust[ch.returns] + '\n}\n';
    }
    if (lang === 'java') {
      return (
        'import java.util.*;\n\nclass Solution {\n    public static ' + TYPES.java[ch.returns] + ' ' + n + '(' +
        ps.map((p) => TYPES.java[p.type] + ' ' + p.name).join(', ') +
        ') {\n        // Your code here\n        return ' + DEFAULT_RET.java[ch.returns] + ';\n    }\n}\n'
      );
    }
    if (lang === 'csharp') {
      return (
        'using System;\nusing System.Collections.Generic;\n\npublic class Solution\n{\n    public static ' + TYPES.csharp[ch.returns] + ' ' + n + '(' +
        ps.map((p) => TYPES.csharp[p.type] + ' ' + p.name).join(', ') +
        ')\n    {\n        // Your code here\n        return ' + DEFAULT_RET.csharp[ch.returns] + ';\n    }\n}\n'
      );
    }
    if (lang === 'cpp') {
      return (
        '#include <vector>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\n' + TYPES.cppRet[ch.returns] + ' ' + n + '(' +
        ps.map((p) => TYPES.cppParam[p.type] + ' ' + p.name).join(', ') +
        ') {\n    // Your code here\n    return ' + DEFAULT_RET.cpp[ch.returns] + ';\n}\n'
      );
    }
  }

  // Full, runnable program = user's code + a generated main() that runs every test.
  function program(ch, lang, userCode) {
    const n = ch.names[lang];
    const T = ch.tests;
    if (lang === 'java') {
      let body = '';
      T.forEach((t, i) => {
        body +=
          '        {\n            Object r = Solution.' + n + '(' + t.args.map((a, j) => lit('java', ch.params[j].type, a)).join(', ') + ');\n' +
          '            String got = show(r), exp = ' + strLit(show(ch.returns, t.expected)) + ';\n' +
          '            if (got.equals(exp)) { passed++; System.out.println("Test ' + (i + 1) + ': PASS"); }\n' +
          '            else System.out.println("Test ' + (i + 1) + ': FAIL  got " + got + "  expected " + exp);\n        }\n';
      });
      return (
        userCode.trimEnd() + '\n\n// ---- Test harness generated by CodeLab ----\npublic class Main {\n' +
        '    static String show(Object o) {\n        if (o instanceof int[]) return java.util.Arrays.toString((int[]) o);\n' +
        '        if (o instanceof int[][]) return java.util.Arrays.deepToString((int[][]) o);\n        return String.valueOf(o);\n    }\n' +
        '    public static void main(String[] args) {\n        int passed = 0;\n' + body +
        '        System.out.println(passed + "/' + T.length + ' tests passed");\n    }\n}\n'
      );
    }
    if (lang === 'csharp') {
      let body = '';
      T.forEach((t, i) => {
        body +=
          '        {\n            object r = Solution.' + n + '(' + t.args.map((a, j) => lit('csharp', ch.params[j].type, a)).join(', ') + ');\n' +
          '            string got = Show(r), exp = ' + strLit(show(ch.returns, t.expected)) + ';\n' +
          '            if (got == exp) { passed++; Console.WriteLine("Test ' + (i + 1) + ': PASS"); }\n' +
          '            else Console.WriteLine("Test ' + (i + 1) + ': FAIL  got " + got + "  expected " + exp);\n        }\n';
      });
      return (
        userCode.trimEnd() + '\n\n// ---- Test harness generated by CodeLab ----\npublic class Program\n{\n' +
        '    static string Show(object o)\n    {\n' +
        '        if (o is int[] a) return "[" + string.Join(", ", a) + "]";\n' +
        '        if (o is int[][] g) return "[" + string.Join(", ", System.Array.ConvertAll(g, x => "[" + string.Join(", ", x) + "]")) + "]";\n' +
        '        if (o is bool b) return b ? "true" : "false";\n        return o == null ? "null" : o.ToString();\n    }\n' +
        '    public static void Main()\n    {\n        int passed = 0;\n' + body +
        '        Console.WriteLine(passed + "/' + T.length + ' tests passed");\n    }\n}\n'
      );
    }
    if (lang === 'cpp') {
      let body = '';
      T.forEach((t, i) => {
        const decls = t.args.map((a, j) => '        auto a' + j + ' = ' + lit('cpp', ch.params[j].type, a) + ';\n').join('');
        body +=
          '    {\n' + decls.replace(/^ {8}/gm, '        ') +
          '        string got = show(' + n + '(' + t.args.map((_, j) => 'a' + j).join(', ') + ')), exp = ' + strLit(show(ch.returns, t.expected)) + ';\n' +
          '        if (got == exp) { passed++; cout << "Test ' + (i + 1) + ': PASS\\n"; }\n' +
          '        else cout << "Test ' + (i + 1) + ': FAIL  got " << got << "  expected " << exp << "\\n";\n    }\n';
      });
      return (
        '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\n' + userCode.trimEnd() +
        '\n\n// ---- Test harness generated by CodeLab ----\n' +
        'string show(bool b) { return b ? "true" : "false"; }\nstring show(int v) { return to_string(v); }\nstring show(const string& s) { return s; }\n' +
        'string show(const vector<int>& v) { string s = "["; for (size_t i = 0; i < v.size(); i++) { if (i) s += ", "; s += to_string(v[i]); } return s + "]"; }\n' +
        'string show(const vector<vector<int>>& g) { string s = "["; for (size_t i = 0; i < g.size(); i++) { if (i) s += ", "; s += show(g[i]); } return s + "]"; }\n' +
        'int main() {\n    int passed = 0;\n' + body + '    cout << passed << "/' + T.length + ' tests passed\\n";\n    return 0;\n}\n'
      );
    }
    if (lang === 'go') {
      let body = '';
      T.forEach((t, i) => {
        body +=
          '\t{\n\t\tgot := codelabShow(' + n + '(' + t.args.map((a, j) => lit('go', ch.params[j].type, a)).join(', ') + '))\n' +
          '\t\texp := ' + strLit(show(ch.returns, t.expected)) + '\n' +
          '\t\tif got == exp {\n\t\t\tpassed++\n\t\t\tcodelabFmt.Println("Test ' + (i + 1) + ': PASS")\n\t\t} else {\n' +
          '\t\t\tcodelabFmt.Println("Test ' + (i + 1) + ': FAIL  got " + got + "  expected " + exp)\n\t\t}\n\t}\n';
      });
      // the harness import must come right after the package clause
      let code = userCode.trimEnd();
      const pkg = code.match(/^\s*package\s+\w+[^\n]*\n/m);
      const imp = '\nimport codelabFmt "fmt"\n';
      code = pkg ? code.slice(0, pkg.index + pkg[0].length) + imp + code.slice(pkg.index + pkg[0].length) : 'package main\n' + imp + '\n' + code;
      return (
        code + '\n\n// ---- Test harness generated by CodeLab ----\n' +
        'func codelabShow(v any) string {\n\tswitch x := v.(type) {\n' +
        '\tcase []int:\n\t\ts := "["\n\t\tfor i, e := range x {\n\t\t\tif i > 0 {\n\t\t\t\ts += ", "\n\t\t\t}\n\t\t\ts += codelabFmt.Sprint(e)\n\t\t}\n\t\treturn s + "]"\n' +
        '\tcase [][]int:\n\t\ts := "["\n\t\tfor i, e := range x {\n\t\t\tif i > 0 {\n\t\t\t\ts += ", "\n\t\t\t}\n\t\t\ts += codelabShow(e)\n\t\t}\n\t\treturn s + "]"\n' +
        '\tdefault:\n\t\treturn codelabFmt.Sprint(x)\n\t}\n}\n\n' +
        'func main() {\n\tpassed := 0\n' + body + '\tcodelabFmt.Printf("%d/' + T.length + ' tests passed\\n", passed)\n}\n'
      );
    }
    if (lang === 'rust') {
      let body = '';
      T.forEach((t, i) => {
        body +=
          '    {\n        let got = ' + n + '(' + t.args.map((a, j) => lit('rust', ch.params[j].type, a)).join(', ') + ').codelab_show();\n' +
          '        let exp = ' + strLit(show(ch.returns, t.expected)) + ';\n' +
          '        if got == exp { passed += 1; println!("Test ' + (i + 1) + ': PASS"); }\n' +
          '        else { println!("Test ' + (i + 1) + ': FAIL  got {}  expected {}", got, exp); }\n    }\n';
      });
      return (
        userCode.trimEnd() + '\n\n// ---- Test harness generated by CodeLab ----\n' +
        'trait CodelabShow { fn codelab_show(&self) -> String; }\n' +
        'impl CodelabShow for i32 { fn codelab_show(&self) -> String { self.to_string() } }\n' +
        'impl CodelabShow for bool { fn codelab_show(&self) -> String { self.to_string() } }\n' +
        'impl CodelabShow for String { fn codelab_show(&self) -> String { self.clone() } }\n' +
        'impl CodelabShow for Vec<i32> { fn codelab_show(&self) -> String { format!("{:?}", self) } }\n' +
        'impl CodelabShow for Vec<Vec<i32>> { fn codelab_show(&self) -> String { format!("{:?}", self) } }\n\n' +
        'fn main() {\n    let mut passed = 0;\n' + body + '    println!("{}/' + T.length + ' tests passed", passed);\n}\n'
      );
    }
    return userCode;
  }

  CL.harness = { starter, program, show, lit };
})(typeof window !== 'undefined' ? window : globalThis);
