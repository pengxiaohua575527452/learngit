<template>
  <div class="panel ali-achievement" :style="{paddingTop: 60*ratio + 'px',paddingBottom: 60*ratio + 'px',marginLeft: 20*ratio + 'px',marginRight: 20*ratio + 'px',fontSize: 14*ratio + 'px'}">
    <p class="achievement-title" :style="{fontSize: 24*ratio + 'px',lineHeight: 33*ratio + 'px'}">{{label.title}}</p>
    <p class="achievement-subtitle" :style="{lineHeight: 20*ratio + 'px',marginTop: 5*ratio + 'px'}">{{label.subtitle}}</p>
    <p class="achievement-link">
      <a href="https://edge.media-server.com/m6/p/z742sd9z"><span class="icon icon-live" :style="{paddingLeft: 21*ratio + 'px',marginLeft: 10*ratio + 'px',marginRight: 10*ratio + 'px',backgroundSize: iconHeight + 'px',marginTop: 10*ratio + 'px'}">{{label.liveVideo}}</span></a>
      <a :href= "$t('lang.homeAchievementPressRellease')"><span class="icon icon-news" :style="{paddingLeft: 21*ratio + 'px',marginLeft: 10*ratio + 'px',marginRight: 10*ratio + 'px',backgroundSize: iconHeight + 'px',marginTop: 10*ratio + 'px'}">{{label.pressRelease}}</span></a>
      <a href="https://www.alibabagroup.com/en/ir/presentations/pre180504.pdf" target="_blank"><span class="icon icon-ppt" :style="{paddingLeft: 21*ratio + 'px',marginLeft: 10*ratio + 'px',marginRight: 10*ratio + 'px',backgroundSize: iconHeight-2 + 'px',marginTop: 10*ratio + 'px'}">{{label.demoMaterial}}</span></a>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from "jQuery";
  export default {
    name: 'homeAchievement',
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
      iconHeight: function() {
        return this.iWindow.x / 375 * 16;
      },
      label:function(){
        return eval('('+this.$t('lang.hogAchievement')+')')
      }
    }
  };
</script>

<style lang="less" type="text/less">
@import "homeAchievement";
</style>
