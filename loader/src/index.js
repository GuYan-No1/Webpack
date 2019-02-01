console.log('hello');

//加上-!不会让文件再通过pre+normal loader进行处理了
// let str = require('-!inline-loader!./a.js')
// ! 没有normal
// let str = require('!inline-loader!./a.js')
// !!什么都不要
let str = require('!!inline-loader!./a.js')

/* loader默认是由两部分组成pitch normal */

