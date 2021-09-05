module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ], //使用推荐的React代码检测规范
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parserOptions: {
    //指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': [
      "warn",
      {
        "singleQuote": true,
        "trailingComma": 'none',
        "bracketSpacing": true,
        "jsxBracketSameLine": true
      }
    ],
    'semi': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/indent': ['off', 2], // 控制缩进为两个空格
    'quotes': [1, 'single'], // 字符串总为一个单引号包裹
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unused-vars': [2], //不能有声明后未被使用的变量或参数
    'react/no-unescaped-entities': 0,
    'react/display-name': 0,
    'no-debugger': 2, //禁用debugger
    'react/prop-types': 0,
    'no-console': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-var-requires': 0
  },
}
