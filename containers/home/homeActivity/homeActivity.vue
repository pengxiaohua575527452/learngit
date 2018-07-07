<template>
  <div class="panel ali-activity"  :style="{marginLeft: 20*ratio + 'px',marginRight: 20*ratio + 'px'}">
    <div class="ali-title" :style="{lineHeight: 33*ratio + 'px',fontSize: 24*ratio + 'px',paddingBottom: 40*ratio + 'px',paddingTop: 60*ratio + 'px'}">{{label.active}}</div>
    <ul class="activity-list">
      <li class="activity-item" :style="{lineHeight: 20*ratio + 'px',fontSize: 14*ratio + 'px',paddingBottom: 42*ratio + 'px'}">
        <a 
           href="https://www.alibabagroup.com/cn/ir/investorday" 
        >
           <!-- @click='clickFn("https://www.alibabagroup.com/cn/ir/investorday")' -->
        <!-- href="https://www.alibabagroup.com/cn/ir/investorday" -->
          <img src="../../../../static/image/banner_activity.png">
          <p class="activity-item-title" :style="{lineHeight: 25*ratio + 'px',fontSize: 18*ratio + 'px',marginTop: 10*ratio + 'px'}">{{label.title}}</p>
        </a>
        <p class="activity-item-time" :style="{marginTop: 10*ratio + 'px'}">{{label.time}}</p>
        <p :style="{marginTop: 10*ratio + 'px'}">
          <a href="https://www.alibabagroup.com/cn/global/video?id=5467907773001">
            <span class="icon icon-video" :style="{height: 20*ratio + 'px',paddingLeft: 30*ratio + 'px'}">{{label.video}}</span>
          </a>
          <a 
           
           href="https://www.alibabagroup.com/en/ir/presentations/Investor_Day_2017_Daniel.pdf">
            <span class="icon icon-view" :style="{height: 20*ratio + 'px',paddingLeft: 30*ratio + 'px',marginLeft: 20*ratio + 'px'}">{{label.demo}}</span>
          </a>
        </p>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from "jQuery";
  import * as CONFIG from '../../../configs/configs';
  export const root = process.env.API_ROOT;
  export default {
    name: 'homeActivity',
    data: function() {
      return {
        iWindow:{
          x:$(window).width()
        },
      };
    },
    computed: {
      ratio: function () {
        return this.iWindow.x / 375
      },
      label:function(){
        // "{'active':'活动','title':'2017 阿里巴巴投资者日','time':'2017年6月8-9日','video':'视频','demo':'演示',}"
        // "{'active':'Activity','title':'Alibaba Investor Day','time':'8th March,2004','video':'Video','demo':'Demonstration',}"
        return eval('('+this.$t('lang.homeActivity')+')')
      }
    },
    methods:{

      clickFn:function(url){
        localStorage.otherWebUrl = url
        this.$router.push('/otherWeb')
      }
    }
  };
</script>

<style lang="less" type="text/less">
@import "homeActivity";
</style>
