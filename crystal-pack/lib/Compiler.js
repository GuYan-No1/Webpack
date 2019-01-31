const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const t = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
/* babylon 主要是把源码 转换成ast
 * @babel/traverse遍历节点
 * @babel/types
 * @babel/generator
 */
class Compiler {
  constructor(config) {
    this.config = config;
    /* 需要做两件事：1)、需要保存主入口文件的路径 2)需要保存所有文件的依赖 */
    this.entryId; // './src/index.js'
    this.modules = {};  
    this.entry = config.entry; // 入口路径
    this.root = process.cwd(); // 工作路径
  }
  getSource(modulePath) {
    let content = fs.readFileSync(modulePath, 'utf8');
    return content;
  }

 /* 解析源码 */
  parse(source, parentPath) { // AST解析语法树
    let ast = babylon.parse(source);
    let dependencies = []; //依赖的数组
    traverse(ast, {
      CallExpression(p) {
        let node = p.node; //对应的节点
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require';
          let moduleName = node.arguments[0].value; //取到的模块的引用名字
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js'); //.a.js
          moduleName = './' + path.join(parentPath, moduleName); // './src/a.js'
          dependencies.push(moduleName);
          node.arguments = [t.stringLiteral(moduleName)];
        }
      }
    });
    let sourceCode = generator(ast).code;
    return {
      sourceCode,
      dependencies
    };
  }

  /* 构建模块 */
  buildModule(modulePath, isEntry) {
    // 拿到模块的内容
    let source = this.getSource(modulePath);
    // 模块id moduleName = modulePath - this.root;
    let moduleName = './' + path.relative(this.root, modulePath);
    if (isEntry) {
      this.entryId = moduleName; //保存入口的名字
    }
    //解析需要把source源码进行改造，返回一个依赖列表
    let { sourceCode,dependencies } = this.parse(source, path.dirname(moduleName)); // ./src
    // 把相对路径和模块中的内容对应起来
    this.modules[moduleName] = sourceCode;

    dependencies.forEach(dep => { //附模块的加载
        this.buildModule(path.join(this.root, dep), false)
      }
    )
  }

  /* 发射文件 */
  emitFile() { 
  }

 /*  执行 并且创建模块的依赖关系 */
  run() {
    this.buildModule(path.resolve(this.root, this.entry), true);
    console.log(this.modules, this.entryId);
    // 发射一个文件 打包后的文件
    this.emitFile();
  }
};

module.exports = Compiler;