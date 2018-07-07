<template>
    <div class='title-component' :style="{paddingLeft: 20*ratio + 'px',paddingRight: 20*ratio + 'px',paddingTop: 14*ratio + 'px',paddingBottom: 41*ratio + 'px'}">
        <a></a>
        <h2 :style="{lineHeight: 33*ratio + 'px',fontSize: 24*ratio + 'px'}">
          {{newsDetailDatas.title}}
        </h2>
        <h4 :style="{marginTop: 10*ratio + 'px',lineHeight: 25*ratio + 'px',fontSize: 18*ratio + 'px'}">
          {{newsDetailDatas.subhead}}
        </h4>
        <p :style="{marginTop: 10*ratio + 'px',lineHeight: 20*ratio + 'px',fontSize: 14*ratio + 'px'}">
          {{newsDetailDatas.publishTime | formatDate }}
        </p>
        <div class='btn-box' :style="{marginTop: 10*ratio + 'px',height: 40*ratio + 'px'}">
            <a :href= newsDetailDatas.attachments class='btn-down' :style="{height: 40*ratio + 'px',width: 40*ratio + 'px'}">
                <img src="../../../layouts/image/down.png" alt="">
            </a>
            <span 
              class='btn-share' 
              :style="{height: 40*ratio + 'px',width: 40*ratio + 'px',marginLeft: 10*ratio + 'px'}"
              @click= 'shareFn'  
            >
                
                <img src="../../../layouts/image/share.png" alt="">
            </span>
        </div>
        <hr :style="{marginTop: 10*ratio + 'px'}"/>
        <div class='content-box' ref='contentBox' v-html="newsDetailDatas.htmlContent">
          {{newsDetailDatas.htmlContent}}
        </div>
        <!-- 返回首屏 -->
        <div
          class='btn-top'
          :style="{height: 40*ratio + 'px',width: 40*ratio + 'px',right: 20*ratio + 'px',bottom: 41*ratio + 'px'}"
          @click = backTop
        >
            <img src="../../../layouts/image/top.png" alt="">
        </div>
        
    </div>
</template>
<script>
import less from "./tComponent.less";
import $ from "jQuery";
import {formatDate} from '../../../configs/js/formatDate';
import setViewPort from '../../../configs/js/setViewPort.js'
setViewPort(1.0)
export default {
  props: ["newsDetailDatas"],
  data: function() {
    return {
      shareCompIf:true,
      iWindow:{
        x:$(window).width()
      },
      newsDetailData: this.newsDetailDatas
    };
  },
  methods:{
    backTop :function(){
      var initTop = $(window).scrollTop()
      var id  = setInterval(function(){
        initTop -= 20;
        if(initTop <= 0){
          initTop = 0
          clearInterval(id)
        }
        $(window).scrollTop(initTop-=50)
      },2)
    },
    shareFn:function(){
      let vm = this
      alert($('img').attr('src'))
      alert(location.href)
      dd.biz.util.share({
          type: 0,//分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
          url: location.href, //分享当前页面的url
          title: vm.newsDetailDatas.title, //分享页面的标题
          content: vm.newsDetailDatas.subhead,//分享页面的内容
          image: $('img').attr('src'),//分享也main的图片
          onSuccess : function() {
              alert('分享组建成功')
              //onSuccess将在调起分享组件成功之后回调
              /**/
          },
          onFail : function(err) {
              alert('分享组建失败')
          }
      })
      //dd.biz.util.share end
    }
  },
  computed: {
    ratio: function () {
      return this.iWindow.x / 375
    },
  },
  mounted: function() {
    var vm = this;
    this.$nextTick(function() {
        var jCBox = $(vm.$refs.contentBox)

    });
  },
  updated: function (){
      var j_p = $('p')
      var j_b = $('b')
      var j_h4 = $('h4')
      var j_h2 = $('h2')

  },
  filters: {
    formatDate(time){
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  }
  // components:{shareComp}
};
</script>
