// console.log('home111');

// class Log{
//   constructor(){
//     console.log('出错了');
    
//   }
// }

// let log = new Log();

//
let xhr = new XMLHttpRequest();
xhr.open('GET','/api/user',true);
xhr.onload = function () {
  console.log(xhr.response);
  
}
xhr.send();