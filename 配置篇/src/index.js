// console.log('home111');

// class Log{
//   constructor(){
//     console.log('出错了');
    
//   }
// }

// let log = new Log();

//
let xhr = new XMLHttpRequest();
xhr.open('GET','/user',true);
xhr.onload = function () {
  console.log(xhr.response);
  
}
xhr.send();
// import 'bootstrap';


let url = '';
if (DEV==='dev') {
  url='http://localhost:3000'
} else {
  url='https://www.ailiyun.com'
}
console.log(url);



import './style'
console.log('home');

class Log{
  constructor() {
    console.log('出错了');
  }
}

let log = new Log();
