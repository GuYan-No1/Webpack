let {SyncLoopHook} = require('tapable');

/* Loop 循环 */
/* 原理：调用tap的时候会把监听的函数注册到一个数组中，调用call的时候会把数组中的函数依次执行,
   遇到某个不返回undefined的函数会一直执行*/
class Lesson {
  constructor(){
    this.index = 0; 
    this.hooks = {
      arch:new SyncLoopHook(['name']),
    }
  }
  tap(){ //注册监听函数
    this.hooks.arch.tap('node' ,(name)=>{
      console.log('node',name);
      return ++this.index === 3 ? undefined :'继续学';
    });
    this.hooks.arch.tap('react' ,(name)=>{
      console.log('react',name);    
    })
  }
  start(){
    this.hooks.arch.call('Crystal');
  }
}

let l = new Lesson();
l.tap();// 注册这两个时间
l.start();//启动钩子