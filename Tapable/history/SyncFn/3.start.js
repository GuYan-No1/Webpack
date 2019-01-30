let {SyncWaterfallHook} = require('tapable');

/* Waterfall 瀑布 */
/* 原理：调用tap的时候会把监听的函数注册到一个数组中，调用call的时候会把数组中的函数依次执行,
   会将上一个函数执行的返回结果作为参数传递给下一个函数*/
class Lesson {
  constructor(){
    this.hooks={
      arch:new SyncWaterfallHook(['name']),
    }
  }
  tap(){ //注册监听函数
    this.hooks.arch.tap('node' ,(name)=>{
      console.log('node',name);
      return 'node学的还不错'
    });
    this.hooks.arch.tap('react' ,(data)=>{
      console.log('react',data);    
    })
  }
  start(){
    this.hooks.arch.call('Crystal');
  }
}

let l = new Lesson();
l.tap();// 注册这两个时间
l.start();//启动钩子