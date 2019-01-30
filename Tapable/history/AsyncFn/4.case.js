class AsyncSeriesHook { // 钩子是异步的
  constructor(args){ // args => ['name']
    this.tasks =[];
  }
  tapPromise(name,task){
    this.tasks.push(task);
  }
  promise(...args){
    let [first,...others]=this.tasks;
    return others.reduce((p,n)=>{
      return p.then(()=>n(...args))
    },first(...args))
  }
}
let hook = new AsyncSeriesHook(['name']);
let total = 0;
hook.tapPromise('react',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('react',name);
      resolve()
    },1000)
  })
 
});
hook.tapPromise('node',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('node',name);
      resolve()
    },1000)
  })
});

hook.promise('Crystal').then(()=>{
  console.log('end');
})