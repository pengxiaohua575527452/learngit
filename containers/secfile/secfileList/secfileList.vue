<template>
  <div class="panel secfile-list" :style="{paddingLeft: 20*ratio + 'px',paddingRight: 20*ratio + 'px',paddingBottom: 7*ratio + 'px'}">
    <div class="secfile-item" v-for="(secfileItem,index) in secfileData" :key="index" :style="{paddingTop: 30*ratio + 'px',paddingBottom: 30*ratio + 'px'}">
      <div class="secfile-item-title" :style="{fontSize: 18*ratio + 'px',lineHeight: 25*ratio + 'px'}">{{secfileItem.filings}}</div>
      <div class="secfile-item-subtitle" :style="{fontSize: 16*ratio + 'px',lineHeight: 22*ratio + 'px',marginTop: 10*ratio + 'px',marginBottom: 4*ratio + 'px'}">{{secfileItem.description}}</div>
      <div>
        <div class="secfile-item-time" :style="{fontSize: 14*ratio + 'px',lineHeight: 20*ratio + 'px'}">{{secfileItem.filedDate | formatDate}}</div>
        <div class="secfile-item-link">
          <a v-for="(item,index) in formatAttach(secfileItem.attachments)" :index="index" :key="index" :href="item.url">
            <span class="icon icon-download-w" v-if="item.type === 'WORD'" :style="{width: 20*ratio + 'px',height: 26*ratio + 'px',marginLeft: 5*ratio + 'px'}"></span>
            <span class="icon icon-download-e" v-if="item.type === 'EXCEL'" :style="{width: 20*ratio + 'px',height: 26*ratio + 'px',marginLeft: 5*ratio + 'px'}"></span>
            <span class="icon icon-download-p" v-if="item.type === 'PDF'" :style="{width: 20*ratio + 'px',height: 26*ratio + 'px',marginLeft: 5*ratio + 'px'}"></span>
            <span class="icon icon-download-x" v-if="item.type === 'XBRL'" :style="{width: 20*ratio + 'px',height: 26*ratio + 'px',marginLeft: 5*ratio + 'px'}"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from "jQuery";
  import {formatDate} from '../../../configs/js/formatDate';
  export default {
    name: 'secfileList',
    props: {
      secfileData:{
        type: Array
      }
    },
    data(){
      return{
        secfileList: [{
          attachments: ''
        }],
        iWindow:{
          x:$(window).width()
        },
      }
    },
    computed: {
      ratio: function () {
        return this.iWindow.x / 375
      },
    },
    methods: {
      formatAttach(str){
        if(str && str.length>0){
          return $.parseJSON(str);
        }
      }
    },
    created(){
      this.secfileList = this.secfileData;
    },
    filters: {
      formatDate(time){
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    },
  };
</script>

<style lang="less" type="text/less">
@import "secfileList";
</style>
