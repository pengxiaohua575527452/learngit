<template>
    <div class='share'>

    </div>
</template>
<script>
import $ from 'jquery'
//导入 echarts 我的没有办法安装，只能够才使用script 导入
// import echarts from 'echarts'
//引入假的数据测试
// import data  from './testDataObj.js'
import setViewPort from '../../configs/js/setViewPort.js'
//设置窗口
setViewPort(1.0)
export default {
    mounted:function(){
        this.$nextTick(function(){
            
function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    }
}

// 自定义假的数据开始==== 

var data = [];

var now = +new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
    data.push(randomData());
}


var d = []
//基础的时间是 2000年1月1日
var base = +new Date(2000, 1, 1)
//每分钟获取一次数据，初始获取7个小时的
for (var i = 1; i < 20 * 7; i++) {
    d.push([
        base,
        (Math.random() - 0.5) * 50 + 200
    ])
    base += 3 * 60 * 1000
}
// 自定义假的数据结束======
//处理数据
//数据的目标 [[时间戳,数值],...]
// 单个数据项的时间间隔是3分钟，密度不需要太大了
//获取一组数据的平均值
var sum = 0;
for (var i = 0; i < d.length; i++) {
    sum += d[i][1];
}
var mean = (sum / d.length).toFixed(2)

var myChart = echarts.init($('.share')[0])

var option = {
    grid: {
        left:'20%',
        right:'10%',
        top:'10%',
        bottom:'10%',
        show: true,
        borderColor: '#333',
        containLabel:true,
        borderWidth:0.1
    },
    xAxis: {
        type: 'time',
        position: 'top',
        axisLine: {
            onZero: false
        },
        boundaryGap: false,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#333'
            }
        },
        axisLabel: {
            margin: 5,
            fontSize: 12,
            showMaxLabel: true,
            formatter: function (v) {
                var h;
                if (new Date(v).getMinutes() == 0) {
                    h = new Date(v).getHours()

                    if (h > 12) {
                        h = h % 12 + 'pm'
                    } else {
                        h = h + 'am'
                    }
                }
                return h
            }
        },
        axisLine: {
            lineStyle: {
                color: '#444'
            }
        },
        axisTick: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: false,
        min: function (v) {
            return v.min - 20
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        maxInterval: 0.01,
        axisLabel: {
            fontSize: 12,
            margin: 10,
            formatter: function (v, i) {
                var str = ''
                if (i == 350) {
                    str = "$" + v.toFixed(2)
                } else if (v == mean) {
                    str = "$" + mean
                } else {
                    str = ''
                }
                return str
            }
        },
        axisLine: {
            lineStyle: {
                color: '#444'
            }
        },
    },
    series: [{
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: d,
        lineStyle: {
            color: '#444'
        },
        areaStyle: {
            color: '#333'
        },
        sampling: 'average',
        animation: false,
        markLine: {
            silent: true,
            symbol: false,
            lineStyle: {
                color: '#444',
                type: 'solid'
            },

            data: [
                {
                    type: 'average'
                }
            ],
            label: {
                show: false,
                position: 'start',
                formatter: "$" + '{c}'
            }
        },
        lineStyle: {
            normal: {
                opacity: 0
            }
        },
    }]
};
myChart.setOption(option)

setInterval(function(){
for(var i=0;i<5;i++){
    base +=  3*60*1000;
    d.shift()

    d.push([
    base,
    (Math.random()-0.5)*50 + 200
    ])
}

sum = 0;
for (var i = 0; i < d.length; i++) {
    sum += d[i][1];
}
mean = (sum / d.length).toFixed(2)

myChart.clear()
option.series[0].data = d

myChart.setOption(option)

},1000)


         
            
           
        })//this.$nextTick end
    }//mountd end
}//default end




</script>
<style>
.share{
    width:100%;
    height:200px;
    
}
</style>

