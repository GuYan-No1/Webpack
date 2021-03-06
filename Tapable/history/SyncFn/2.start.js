let {SyncBailHook} = require('tapable');

/* 原理：调用tap的时候会把监听的函数注册到一个数组中，调用call的时候会把数组中的函数依次执行,
   如果有其中一个函数返回一个非undefined的值函数其余函数停止执行*/
class Lesson {
  constructor(){
    this.hooks={
      arch:new SyncBailHook(['name']),
    }
  }
  tap(){ //注册监听函数
    this.hooks.arch.tap('node' ,(name)=>{
      console.log('node',name);
      return '想停止学习'
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