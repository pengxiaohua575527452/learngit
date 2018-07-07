<template>
  <!-- SEC文件 -->
  <div class="secfile container">
    <!-- 筛选条件 -->
    <div class="secfile-search" :style="{paddingTop: 60*ratio + 'px',paddingBottom: 10*ratio + 'px',paddingLeft: 20*ratio + 'px',paddingRight: 20*ratio + 'px'}">
      <p :style="{fontSize: 14*ratio + 'px',lineHeight: 20*ratio + 'px'}">{{label.getInfo}}</p>
      <div class="secfile-search-block" :style="{marginTop: 10*ratio + 'px',paddingTop: 10*ratio + 'px',paddingLeft: 30*ratio + 'px',paddingRight: 30*ratio + 'px'}">
        <p :style="{fontSize: 20*ratio + 'px',lineHeight: 48*ratio + 'px'}">{{label.filterFile}}</p>
        <div class="secfile-search-block-term" :style="{paddingBottom: 20*ratio + 'px'}">
          <label :style="{fontSize: 12*ratio + 'px',lineHeight: 17*ratio + 'px',marginBottom: 5*ratio + 'px'}">{{label.group}}</label>
          <input type="text" :placeholder = label.items
                 :style="{fontSize: 14*ratio + 'px',lineHeight: 30*ratio + 'px',height: 30*ratio + 'px',paddingLeft: 10*ratio + 'px',paddingRight: 10*ratio + 'px'}"
                 @click="showSelect"
                 v-model="year"
                 id="selectYear"
                 data-id="0"
                 readonly="readonly"
          />
        </div>
        <div class="secfile-search-block-term" :style="{paddingBottom: 20*ratio + 'px'}">
          <label :style="{fontSize: 12*ratio + 'px',lineHeight: 17*ratio + 'px',marginBottom: 5*ratio + 'px'}">{{label.filing}}</label>
          <input type="text" :placeholder = label.any
                 :style="{fontSize: 14*ratio + 'px',lineHeight: 30*ratio + 'px',height: 30*ratio + 'px',paddingLeft: 10*ratio + 'px',paddingRight: 10*ratio + 'px'}"
                 @keyup.enter="blurSeach()"
                  v-model="keyword"
                  ref="keyword"
          />
        </div>
      </div>
     
    </div>
    <!-- 查询结果 -->
    <secfile-list :secfileData="secfileData"></secfile-list>
    <!-- 到底部提示 -->
    <end-bottom :end-bottom-if = endBottomIf></end-bottom>
    <!-- 等待动画部分 -->
    <!-- E:\alitt_protal\src\components\waitComp\waitComp.vue -->
    <wait-comp v-if= waitCompIf @wait = waitFn></wait-comp>
     
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from "jQuery";
  import SecfileList from './secfileList/secfileList';
  import * as CONFIG from '../../configs/configs';
  import slideUpdata from "../../configs/js/slideUpdata.js";
  import "../../components/iosSelect/iosSelect.js"
  export const root = process.env.API_ROOT;
  import endBottom from '../../components/endBottom/endBottom.vue'
  import waitComp from '../../components/waitComp/waitComp.vue'
  
  export default {
    name: 'secfile',
    components: {SecfileList,endBottom,waitComp},
    data: function() {
      return {
        waitCompIf:false,
        endBottomIf:false,
        secfileData: [],
        iWindow:{
          x:$(window).width()
        },
        year: '',
        keyword: '',
        pageNo: 1,
        pageSize: 4
      };
    },
    computed: {
      ratio: function () {
        return this.iWindow.x / 375
      },
      label:function(){

        return eval('('+this.$t('lang.sec')+')')
      },
      shopTypeList:function(){

        return [{
          id: 0,
          value: this.label.all
        },{
          id: 1,
          value: "2018"
        },{
          id: 2,
          value: "2017"
        },{
          id: 3,
          value: "2016"
        },{
          id: 4,
          value: "2015"
        },{
          id: 5,
          value: "2014"
        }]

      }
    },
    methods: {
      waitFn:function(){
        if(this.waitCompIf){
          this.waitCompIf = false
        }else{
          this.waitCompIf = true
        }
      },
      blurSeach(){
        this.$refs.keyword.blur();
        this.getSecfileListData('create');
      },
      getSecfileListData: function(e) {
        var that = this;
        that.waitFn()
        if(e !== 'updata'){
          that.pageNo = 1;
        }
        $.ajax({
          type: 'Get',
          // url: root + "//filings//getsecfiles",
          url: root + "/investment/filings/getsecfiles",
          data: {
            year: that.year === "-全部-" ? '' : that.year,
            keyword: that.keyword,
            channelId: CONFIG.CHAMMEL_ID[3],
            pageNo: that.pageNo,
            pageSize: that.pageSize
          },
          success: function (data) {
            that.pageNo = that.pageNo + 1;
            if(e === 'updata'){
              const listdata = that.secfileData;
              that.secfileData = listdata.concat(data.datas);
            } else {
              that.secfileData = data.datas;
              that.endBottomIf = false
            }

            // 注册上拉刷新函数
            slideUpdata(function () {
              that.getSecfileListData('updata');
            });
            if(data.datas.length == 0){
              that.endBottomIf = true
              $(window).off()
            }

            that. waitFn()
          }
        })
      },
      showSelect(){
        //select 选择框
        var vm = this;
        var yearDom = document.querySelector('#selectYear');
        var yearId = yearDom.dataset['id'];
        new IosSelect(1,
          [vm.shopTypeList],
          {
            container: '.container',
            itemHeight: 35,
            itemShowCount: 7,
            oneLevelId: yearId,
            callback: function (selectOneObj) {
              yearDom.dataset['id'] = selectOneObj.id;
              vm.year = selectOneObj.value;
            }
          });
      }
    },
    mounted: function() {
      this.$nextTick(function() {

        //上拉刷新
        var vm = this;
        slideUpdata(function () {
          vm.getSecfileListData('updata');
        });
      }); //$nextTick end
    },
    created:function() {
      this.getSecfileListData('create');
    },
    watch: {
      "year": "getSecfileListData"
    }
  };
</script>

<style lang="less" type="text/less">
  @import "secfile";
  @import "../../components/iosSelect/iosSelect";
  @import "../../components/iosSelect/iosSelectStyle";
</style>
