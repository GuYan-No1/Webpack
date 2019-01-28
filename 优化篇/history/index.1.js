// import 在生产环境下会自动去除掉没有的代码
// tree-shaking模式 把没用到的代码 自动删除掉
import calc from './test';

// commonjs 模块会把结果放在default上,并且不支持tree-shaking模式
// let calc = require('./test');


// scope hosting 作用域提升

let a = 1;
let b = 2;
let c = 3;
let d = a * b * c;//在webpack中会自动省略，可以简化的代码
console.log(d,'---------');

console.log(calc.default.sum(1,2));
