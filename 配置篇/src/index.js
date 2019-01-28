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