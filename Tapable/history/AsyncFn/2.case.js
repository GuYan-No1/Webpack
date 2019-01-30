class AsyncParalleHook { // 钩子是异步的
  constructor(args){ // args => ['name']
    this.tasks =[];
  }
  tapPromise(name,task){
    this.tasks.push(task);
  }
  promise(...args){
    let tasks = this.tasks.map(task=>task(...args));
    return Promise.all(tasks);
  }
}
let hook = new AsyncParalleHook(['name']);
let total = 0;
hook.tapPromise('react',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('react',name);
      resolve()
    },1000);
  })
 
});
hook.tapPromise('node',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('node',name);
      resolve()
    },1000);
  })
});

hook.promise('Crystal').then(()=>{
  console.log('end');
})