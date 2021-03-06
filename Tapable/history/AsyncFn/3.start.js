let {AsyncSeriesHook} = require('tapable');
class Lesson {
  constructor(){
    this.index = 0; 
    this.hooks = {
      arch:new AsyncSeriesHook(['name']),
    }
  }
  tap(){ //注册监听函数
    this.hooks.arch.tapAsync('node' ,(name,callback)=>{
      setTimeout(()=>{
        console.log('node',name);
        callback()
      },1000)
    });
    this.hooks.arch.tapAsync('react' ,(name,callback)=>{
      setTimeout(()=>{
        console.log('react',name);
        callback()
      },1000)
    })
  }
  start(){
    this.hooks.arch.callAsync('Crystal',()=>{
      console.log('end');
    });
  }
}

let l = new Lesson();
l.tap();// 注册这两个时间
l.start();//启动钩子