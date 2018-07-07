<template>
  <div>
      <!-- 年份部分 -->
      <y-bar :y-len = yLen @change-year = changeYearFn></y-bar>
      <!-- 内容部分 -->
      <file :year = year></file>
  </div>

</template>
<script>
// import yBarLess from './yBar/yBar.less'
import setViewPort from '../../configs/js/setViewPort.js'
import yBar  from '../../components/yBar/yBar'
import file from '../../components/file/file.vue'

setViewPort(1.0)
export default {
  data:function(){
    return {
      yLen :5,
      year:2018

    }
  },
  methods:{
    changeYearFn:function(y){
      this.year = y
      console.log(this.year)
    }
  },
  components:{yBar,file}
}
</script>
<style>

</style>
