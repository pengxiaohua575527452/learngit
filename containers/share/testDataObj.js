var d = []
//基础的时间是 2000年1月1日
var base = +new Date(2000,1,1)
//每分钟获取一次数据，初始获取7个小时的
for(var i =1;i< 20*7;i++){
  d.push([
    base,
    
    (Math.random()-0.5)*50 + 200
  ])
  base +=  3*60*1000
}

export default {d}