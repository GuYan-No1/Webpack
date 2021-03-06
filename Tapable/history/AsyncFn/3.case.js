class AsyncSeriesHook { // 钩子是异步的
  constructor(args){ // args => ['name']
    this.tasks =[];
  }
  tapAsync(name,task){
    this.tasks.push(task);
  }
  callAsync(...args){
  let finalCallback = args.pop();
  let index =0;
  let next =()=>{
    if(this.tasks.length === index) return finalCallback();
    let task = this.tasks[index++];
    task(...args ,next)
    }
    next()
  }
}
let hook = new AsyncSeriesHook(['name']);
let total = 0;
hook.tapAsync('react',(name,callback)=>{
  setTimeout(()=>{
    console.log('react',name);
    callback()
  },1000)
 
});
hook.tapAsync('node',(name,callback)=>{
  setTimeout(()=>{
    console.log('node',name);
    callback()
  },1000)
});

hook.callAsync('Crystal',()=>{
  console.log('end');
})