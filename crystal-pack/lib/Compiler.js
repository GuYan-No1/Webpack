const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const t = require('@babel/types');
/* es6 模块需要用.default */
const traverse = require('@babel/traverse').default; 
const generator = require('@babel/generator').default;
const ejs = require('ejs');
const {SyncHook} = require('tapable');
/* babylon 主要是把源码 转换成ast
 * @babel/traverse 遍历节点
 * @babel/types 遍历好的的节点替换
 * @babel/generator 解析替换后的节点
 */
class Compiler {
  constructor(config) {
    this.config = config;
    /* 需要做两件事：1)需要保存主入口文件的路径 2)需要保存所有的模块依赖 */
    this.entryId; // 主路径'./src/index.js'
    this.modules = {};  // 存储所有的依赖关系 {路径:'源码'}
    this.entry = config.entry; // 入口模块路径
    this.root = process.cwd(); // 工作路径 找到当前进程的工作目录
    this.hooks={
      entryOption:new SyncHook(),
      compile:new SyncHook(),
      afterCompile:new SyncHook(),
      afterPlugins:new SyncHook(),
      run:new SyncHook(),
      emit:new SyncHook(),
      done:new SyncHook()
    }
    const plugins = config.plugins;
    if(Array.isArray(plugins)){
      plugins.forEach(plugin=>{
        plugin.apply(this)
      });
    }
    this.hooks.afterPlugins.call();
  }
  /* 如果传递了plugins参数 */

  /* 读取源码 */
  getSource(modulePath) {// ./index.less
    let content = fs.readFileSync(modulePath, 'utf8');
    let rules=this.config.module.rules;
    //拿到每个规则来处理
    for(let i=0;i<rules.length;i++){
      let rule = rules[i];
      let {test,use} =rule;
      let len = use.length-1;
      if(test.test(modulePath)){ //这个模块需要loader来转化
        //(loader)获取对应的loader函数
        function normalLoader(){
          let loader=require(use[len--]);
          content=loader(content)
          //递归调用loader实现转化
          if(len>=0){
            normalLoader()
          }
        }
        normalLoader()
      }
    }
    return content;
  }

 /* 解析源码 做两件事情1)把require改成__webpack_require;2)给a.js前面加上src*/
  parse(source, parentPath) { // AST解析语法树
    let ast = babylon.parse(source);
    let dependencies = []; //依赖的数组
    traverse(ast, {
      CallExpression(p) {
        let node = p.node; //对应的节点
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__';
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

    // entryId entryId = modulePath - this.root + './';
    let moduleName = './' + path.relative(this.root, modulePath);
    if (isEntry) {
      this.entryId = moduleName; //保存主入口的名字
    }
    //解析需要把source源码进行改造，返回一个依赖列表
    let { sourceCode,dependencies } = this.parse(source, path.dirname(moduleName)); // ./src

    // 把相对路径和模块中的内容对应起来
    this.modules[moduleName] = sourceCode;

     //附模块的加载 递归加载
    dependencies.forEach(dep => {
        this.buildModule(path.join(this.root, dep), false)
      }
    )
  }

  /* 发射文件 */
  emitFile() { 
    // 用数据 渲染我们的模板
    // 1)拿到输出到哪个目录下  输出路径
    let main =path.join(this.config.output.path,this.config.output.filename);
    // 模板的路径
    let templateStr = this.getSource(path.join(__dirname,'main.ejs'));
    let code=ejs.render(templateStr,{entryId:this.entryId,modules:this.modules});
    this.assets={};
    // 资源中路径对应的代码
    this.assets[main] = code;
    fs.writeFileSync(main,this.assets[main]);
  }

 /*  执行 并且创建模块的依赖关系 */
  run() {
    this.hooks.run.call();
    this.hooks.compile.call();
    this.buildModule(path.resolve(this.root, this.entry), true);
    this.hooks.afterCompile.call();
    // 发射一个文件 打包后的文件
    this.emitFile();
    this.hooks.emit.call();
    this.hooks.done.call();    
  }
};

module.exports = Compiler;