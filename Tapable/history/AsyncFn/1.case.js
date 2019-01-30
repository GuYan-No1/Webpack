class AsyncParalleHook { // 钩子是异步的
  constructor(args){ // args => ['name']
    this.tasks =[];
  }
  tapAsync(name,task){
    this.tasks.push(task);
  }
  callAsync(...args){
    let finalCallback=args.pop();//拿出最终的函数
    let index = 0 ;
    let done=()=>{ // Promise.all
      index++;
      if (index===this.tasks.length) {
        finalCallback()
      }
    };
    this.tasks.forEach(task=>{
      task(...args,done);
    })
  }
}
let hook = new AsyncParalleHook(['name']);
let total = 0;
hook.tapAsync('react',(name,callback)=>{
  setTimeout(()=>{
    console.log('react',name);
    callback()
  },1000);
});
hook.tapAsync('node',(name,callback)=>{
  setTimeout(()=>{
    console.log('node',name);
    callback()
  },1000);
});

hook.callAsync('Crystal',()=>{
  console.log('end');
})

// AsyncParalleBailHook()  //带保修的异步并发的钩子