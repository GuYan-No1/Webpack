let {AsyncSeriesHook} = require('tapable');
class Lesson {
  constructor(){
    this.index = 0; 
    this.hooks = {
      arch:new AsyncSeriesHook(['name']),
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