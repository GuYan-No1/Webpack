// let str = require('./a.js');
// console.log(str);

require('./index.css');
// require('./a.less');


// let fn = () => {
//   console.log('log');

// }
// fn()

// @log //类的装饰器(就是一个函数,如果装饰类的话第一个参数就是一个类)
// class A { //new A() =>a=1
//   a=1;
// }

// let a=new A();
// console.log(a.a);

// function log(target){
//   console.log(target,'23');
// }

// import $ from 'jquery';
// console.log($);

import logo from './logo.jpg';
let image = new Image();
image.src=logo;

document.body.appendChild(image);
