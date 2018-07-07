<template>
  <div class="panel ali-news"  :style="{marginLeft: 20*ratio + 'px',marginRight: 20*ratio + 'px'}">
    <div class="ali-title" :style="{lineHeight: 33*ratio + 'px',fontSize: 24*ratio + 'px',paddingBottom: 38*ratio + 'px',paddingTop: 60*ratio + 'px'}">{{label.news}}</div>
    <ul class="homenews-list">
      <li class="homenews-item"
          :style="{lineHeight: 20*ratio + 'px',fontSize: 14*ratio + 'px',paddingBottom: 60*ratio + 'px',paddingTop: 20*ratio + 'px'}"
          v-for = "(v,index) in newsList"
          :key = index
          ref='_li'
          :newsId="v.id"

      >
        <p class="homenews-item-time">
          {{v.publishTime | formatDate}}
        </p>
        <p class="homenews-item-title"
           :style="{lineHeight: 33*ratio + 'px',fontSize: 24*ratio + 'px',marginTop: 16*ratio + 'px',marginBottom: 20*ratio + 'px'}"
           @click="togoNewsDetail(v.id)"
        >
          {{v.title}}
        </p>
        <p>
          <a :href=v.sourceDocUrl target="_blank"><span :style="{height: 25*ratio + 'px',width: 20*ratio + 'px',marginRight: 10*ratio + 'px'}"></span>PowerPoint</a>
        </p>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from "jQuery";
  import * as CONFIG from '../../../configs/configs';
  import {formatDate} from '../../../configs/js/formatDate';
  export const root = process.env.API_ROOT;

  
  
  export default {
    name: 'homeNews',
    data: function() {
      return {
        iWindow:{
          x:$(window).width()
        },
        newsList: [],
        language: 'cn'
      };
    },
    computed: {
      ratio: function () {
        return this.iWindow.x / 375
      },
      label:function(){
        return  eval('('+this.$t('lang.homeNews')+')')
      },
    },
    methods: {
      getNewsListData: function(e) {
        var that = this;

        if(this.$i18n.locale == 'zh-CN'){
          this.currentLanguage = 'cn'
        }else{
          this.currentLanguage = 'en'
        }

        $.ajax({
          type: 'Get',
          url: root + "/investment/ir/news/newslist",
          data: {
            languageType: this.currentLanguage,
            channelId: CONFIG.CHAMMEL_ID[1],
            pageNo: 1,
            pageSize: 3
          },
          success: function (data) {
            that.newsList = data.datas;
          }
        })
      },
      togoNewsDetail: function(id){
        this.$router.push({path:'/newsDetail/',query:{id:id,language:this.currentLanguage}})
        // this.$router.push("/newsDetail/" + id);
      }
    },
    created:function() {
      this.getNewsListData();
    },
    filters: {
      formatDate(time){
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    }
  };
</script>

<style lang="less" type="text/less">
@import "homeNews";
</style>
