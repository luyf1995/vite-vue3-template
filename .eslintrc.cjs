module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      // jsx 语法支持
      jsx: true
    }
  },
  // vue/vue3-recommended 使用vue3推荐的eslint规则
  // plugin:@typescript-eslint/recommended 使用typescript推荐的规则
  // plugin:prettier/recommended 让eslint用prettier的规则来做校验，解决prettier和eslint的冲突（需要配合eslint-config-prettier和eslint-plugin-prettier插件使用）
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  /**
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    'no-var': 'error',
    'arrow-parens': ['error', 'as-needed'], // 箭头函数的参数可以不使用圆括号
    'consistent-return': 'off', // 要求 return 语句要么总是指定返回的值，要么不指定
    camelcase: 'error', // 强制驼峰法命名
    eqeqeq: 'error', // 强制全等( === 和 !==)
    'func-names': 'off', // 函数表达式必须有名字
    'global-require': 'off', // 取消对require的验证，使得可以使用require来加载图片的相对路径
    'import/no-unresolved': 'off', // 取消自动解析路径，以此开启alias的别名路径设置
    'import/extensions': 'off', // 取消对文件扩展名的验证
    indent: 'off', // 缩进风格(强制使用一致的缩进)
    'linebreak-style': 'off', // 取消换行符\n或\r\n的验证()
    'max-len': 'off', // 字符串最大长度
    'no-unused-vars': 'off', // 禁止出现未使用过的变量
    'no-redeclare': 'off', // 禁止多次声明同一变量
    'no-use-before-define': 'off', // 禁止在变量定义之前使用它们
    'no-unused-expressions': 'off', // 允许使用未使用过的表达式，以此来支持a && a()的代码形式
    'no-plusplus': 'off', // 禁止使用++，--
    'no-underscore-dangle': 'off', // 允许在标识符中使用下划线
    'no-param-reassign': 'off', // 禁止对 function 的参数进行重新赋值
    'no-nested-ternary': 'off', // 禁止嵌套三元表达式
    'no-else-return': 'off', // 禁止 if 语句中 return 语句之后有 else 块
    'prefer-rest-params': 'off', //  允许使用 arguments
    'prefer-arrow-callback': 'off', // 要求回调函数使用箭头函数
    'prefer-const': 'off', // 不要首选const
    'template-curly-spacing': 'off', // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'no-useless-escape': 'off', // 是否允许使用转义字符
    'no-empty': 'off', // 是否允许块内容为空
    'no-multiple-empty-lines': ['error', { max: 2 }], // ???  不允许多个空行
    'spaced-comment': 'error', // 要求在注释前有空白,

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'off', // 禁止定义未使用的变量
    '@typescript-eslint/no-empty-function': 'off', // 允许空方法体
    '@typescript-eslint/no-this-alias': 'off', // 允许this的复制
    '@typescript-eslint/no-inferrable-types': 'off', // 禁止使用显式的类型声明，当 TypeScript 能够自动推断类型时
    '@typescript-eslint/ban-ts-comment': 'off', // 禁止使用 @ts-ignore 和 @ts-nocheck 注释，这些注释用于忽略
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型，要求使用更具体的类型
    '@typescript-eslint/no-non-null-assertion': 'off', // 禁止使用非空断言运算符 !，因为它会绕过 TypeScript 的类型检查。

    // vue (https://eslint.vuejs.org/rules)
    'vue/multi-word-component-names': 'off', // 组件命名单个单词
    'vue/no-unused-vars': 'off', // 禁止出现未使用过的变量
    'vue/no-parsing-error': 'off', // vue 没有关闭标签报错
    'vue/no-reserved-keys': 'off', // vue   可以使用 __  当为变量名
    'vue/no-mutating-props': 'error' // 禁止在组件中直接修改 props 的值，以确保遵循 Vue.js 的单向数据流原则
  }
}
