class AsyncServiesWaterfallHook{
  constructor(args){
      this.tasks = [];
  }

  tapPromise(name,task){
      this.tasks.push(task)
  }

  promise(...args){
      let [first,...others] = this.tasks;
      if(first){
         return others.reduce((p,n)=>{
              return p.then((data)=>n(data))
         },first(...args))
      }else{
          return new Promise((resolve,reject)=>{
              resolve();
          })
      }
  }
}
let hook = new AsyncServiesWaterfallHook('[name]');

hook.tapPromise('react',(name)=>{
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
          console.log('react',name)
          //resolve('result')
          reject()
      },1000)
  })
});

hook.tapPromise('webpack',(data)=>{
  return new Promise((resolve,reject)=>{
     setTimeout(()=>{
       console.log('webpack',data);
       resolve()
     },1000)
  });
});

hook.promise('Crystal').then(()=>{
  console.log('Correct End')
}).catch(()=>{
  console.log('Error End')
});