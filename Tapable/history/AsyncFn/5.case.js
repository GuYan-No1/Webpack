class AsyncSeriesWaterfallHook { // 钩子是异步的
  constructor(args){ // args => ['name']
    this.tasks =[];
  }
  tapAsync(name,task){
    this.tasks.push(task);
  }
  callAsync(...args){
    let finalCallback = args.pop()
    let index = 0;
    let next = (err,data)=>{
      let task = this.tasks[index];
      if(!task || err) return finalCallback();
      if(index===0){ // 执行的是第一个
        task(...args,next)
      }else{
        task(data,next);
      }
      index++;
    }
    next()
  }
}
let hook = new AsyncSeriesWaterfallHook(['name']);
let total = 0;
hook.tapAsync('react',(name,callback)=>{
  setTimeout(()=>{
    console.log('react',name);
    callback('null','result')
  },1000)
 
});
hook.tapAsync('node',(data,callback)=>{
  setTimeout(()=>{
    console.log('node',data);
    callback(null)
  },1000)
});

hook.callAsync('Crystal',()=>{
  console.log('end');
})