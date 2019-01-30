class AsyncSeriesWaterfallHook { // 钩子是异步的
  constructor(args){ // args => ['name']
    this.tasks =[];
  }
  tapPromise(name,task){
    this.tasks.push(task);
  }
  promise(...args){
    let [first,...others]=this.tasks;
    if (first) {
      return others.reduce((p,n)=>{
        return p.then((data)=>n(data))
      },first(...args))
    }else{
      return new Promise((resolve,reject)=>{
        resolve();
      });
    }
  }
}
let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapPromise('react',(name)=>{
  return new Promise((resove,reject)=>{
    setTimeout(()=>{
      console.log('react',name);
      //resove('result')
      reject();
    },1000)
  })
 
});
hook.tapPromise('node',(data)=>{
  return new Promise((resove,reject)=>{
    setTimeout(()=>{
      console.log('react',data);
      resove()
    },1000)
  })
});

hook.promise('Crystal').then(()=>{
  console.log('Correct end');
}).catch(()=>{
  console.log('Error end');
})