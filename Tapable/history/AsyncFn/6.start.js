let {AsyncSeriesWaterfallHook} = require('tapable');
class Lesson {
  constructor(){
    this.index = 0; 
    this.hooks = {
      arch:new AsyncSeriesWaterfallHook(['name']),
    }
  }
  tap(){ //注册监听函数
    this.hooks.arch.tapPromise('node' ,(name)=>{
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          console.log('node',name);
          resolve('result')
        //  reject()
        },1000)
      })
    });
    this.hooks.arch.tapPromise('react' ,(data)=>{
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          console.log('react',data);
          resolve()
        },1000)
      })
    })
  }
  start(){
    this.hooks.arch.promise('Crystal').then(()=>{
      console.log('Correct end');
    }).catch(()=>{
      console.log('Error end');
    });
  }
}

let l = new Lesson();
l.tap();// 注册这两个时间
l.start();//启动钩子