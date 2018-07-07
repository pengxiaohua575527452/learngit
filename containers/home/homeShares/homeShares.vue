<template>
  <div class="panel ali-shares" :style="{paddingTop: 60*ratio + 'px',paddingBottom: 60*ratio + 'px',marginLeft: 20*ratio + 'px',marginRight: 20*ratio + 'px'}">
    <div class="aaa"></div>
    <div class="shares-title" :style="{fontSize: 30*ratio + 'px',lineHeight: 42*ratio + 'px'}">
      {{label.title}}
    </div>
    <div class="shares-price" :style="{marginTop: 30*ratio + 'px',marginBottom: 32*ratio + 'px'}">
      <!--{{shareData}}-->
      <p :style="{fontSize: 50*ratio + 'px',lineHeight: 70*ratio + 'px'}"><span>$ {{shareData.stockInfo.currPrice}}</span><span :style="{fontSize: 18*ratio + 'px',lineHeight: 45*ratio + 'px',marginLeft: 10*ratio + 'px'}">{{label.unit}}</span></p>
      <p :style="{fontSize: 20*ratio + 'px',lineHeight: 28*ratio + 'px',color:shareRises?'#2DA94F':'#E51D24'}"><span>${{shareData.stockInfo.priceChange}} ({{shareData.stockInfo.priceChangePer}}) </span><span :style="{fontSize: 12*ratio + 'px',lineHeight: 20*ratio + 'px',marginLeft: 3*ratio + 'px'}">{{label.unit}}</span></p>
    </div>
    <ul class="shares-detail" :style="{fontSize: 14*ratio + 'px',lineHeight: 34*ratio + 'px'}">
      <li><span>{{label.volumes}}</span><span>{{(shareData.stockInfo.turnover/1000000).toFixed(2)}}  {{label.vUnit}}</span></li>
      <li><span>{{label.marketGap}}</span><span>{{(shareData.stockInfo.totalMarketValue/1000000000).toFixed(2)}} {{label.bn}}</span></li>
      <li><span>{{label.high}}</span><span>{{shareData.stockInfo.highPriceYear}} {{label.unit}}</span></li>
      <li><span>{{label.low}}</span><span>{{shareData.stockInfo.lowerPriceYear}} {{label.unit}}</span></li>
    </ul>
    <div class="shares-chart">
      <div>
        <!-- <share ></share> -->
      </div>
      <div class="shares-chart-tip" :style="{fontSize: 12*ratio + 'px',lineHeight: 17*ratio + 'px'}">
        <p>{{label.delayend}}</p>
        <p>{{label.priceend}}{{shareData.stockInfo.renewalTime | formatDate}} - ET</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from "jQuery";
  // import Share from "../../../components/share/share"
  import {formatDate} from '../../../configs/js/formatDate';
  export const root = process.env.API_ROOT;
  export default {
    name: 'homeShares',
    // components: {Share},
    data: function() {
      return {
        iWindow:{
          x:$(window).width()
        },
        shareData: {
          stockInfo: {
            currPrice: '100',
            priceChange: '',
            priceChangePer: '',
            turnover: '',
            totalMarketValue: '',
            highPriceYear: '',
            lowerPriceYear: '',
            renewalTime: ''
          },
          stockInfoList:''
        },
        shareRises: true
      };
    },
    computed: {
      ratio: function () {
        return this.iWindow.x / 375
      },
      label:function(){
        return  eval('('+this.$t('lang.homeShares')+')')
      }
    },
    methods: {
      getShareData: function(e) {
        var that = this;
        // $.ajax({
        //   type: 'Get',
        //   url: root + "/stock/getstock",
        //   success: function (data) {
        //     that.shareData = data;
        //     // that.shareRises = data.stockInfo.priceChange < 0 ? false : true;
        //   }
        // })
      },
    },
    created:function() {
      this.getShareData();
    },
    filters: {
      formatDate(time){
        var date = new Date(time);
        return formatDate(date, 'MM/dd/yyyy hh:mm:ss');
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        var vm = this
        $.ajax({
            type:'GET',
            url:root + '/investment/stock/getstock',
            data:{},
            success:function(data){
                vm.shareData.stockInfo = data.stockInfo
            }
        }) // ajax end
      })
    }
  };
</script>

<style lang="less" type="text/less">
@import "homeShares";
</style>
