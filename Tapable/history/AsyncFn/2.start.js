let {AsyncParallelHook} = require('tapable');

/* 异步的钩子 有两种形式 串行 并行-->需要等待所有并发的异步事件执行后再执行回调的方法*/
/* 同时发送多个请求,希望请求都发送完成之后执行回调 */
/* 注册方法分为 tap注册 tapAsync注册(原理内部回调有一个callback计数器机制,判断callback
   的执行次数,如果callback的次数等于注册函数的数量,就是执行我们传入的回调函数) */
/* tapable库中有三种注册方法 tap(同步注册) tapAsync(cd)异步注册 tapPromise(注册的是promise) */
/* tapable库中有三种调用方法 call(同步调用) callAsync异步调用 primise 与上面的注册方法一一对应 */
class Lesson {
  constructor(){
    this.index = 0; 
    this.hooks = {
      arch:new AsyncParallelHook(['name']),
    }
  }
  tap(){ //注册监听函数
    this.hooks.arch.tapPromise('node' ,(name)=>{
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          console.log('node',name);
          resolve()
        },1000)
      })
    });
    this.hooks.arch.tapPromise('react' ,(name)=>{
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          console.log('react',name);
          resolve()
        },1000)
      })
    })
  }
  start(){
    this.hooks.arch.promise('Crystal').then(()=>{
      console.log('end');
    });
  }
}

let l = new Lesson();
l.tap();// 注册这两个时间
l.start();//启动钩子