class SyncWaterfallHook { // 钩子是同步的
  constructor(args){ // args => ['name']
    this.tasks =[];
  }
  tap(name,task){
    this.tasks.push(task);
  }
  call(...args){
    let [fister,...others]= this.tasks;
    let ret = fister(...args);
    others.reduce((a,b)=>{
      return b(a);
    },ret)
  }
}
let hook = new SyncWaterfallHook(['name']);
hook.tap('react',(name)=>{
  console.log('react',name);
  return 'react OK';
});
hook.tap('node',(data)=>{
  console.log('node',data);
  return 'node OK';
});
hook.tap('webapck',(data)=>{
  console.log('webpack',data);
});

hook.call('Crystal')