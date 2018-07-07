<template>
  <div class="question-part">
    <div class="question-part-title" @click="start" :style="{fontSize: 14*ratio + 'px',lineHeight: 49*ratio + 'px'}">
      <span>{{ data_item.title }}</span>
      <span :class="[rotate?'fa icon icon-question-down down':'icon icon-question-down up']" :style="{height: 10*ratio + 'px',width: 17*ratio + 'px'}"></span>
    </div>
    <div :class="[rotate?'question-part-list hide':'question-part-list show']" :style="{paddingLeft: 20*ratio + 'px',paddingBottom: 18*ratio + 'px'}">
      <question-part  v-for="(question_part_item,index) in data_item.questionPartList" :key="index" :questionPart="question_part_item"></question-part>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from "jQuery";
  import QuestionPart from '../questionPart/questionPart'
  export default {
    name: 'questionList',
    components: {QuestionPart},
    props: {
      item:{
        type: Object
      }
    },
    data(){
      return{
        rotate: true,
        data_item: {},
        iWindow:{
          x:$(window).width()
        },
      }
    },
    methods: {
      start(){
        this.rotate = !this.rotate;
      }
    },
    computed: {
      ratio: function () {
        return this.iWindow.x / 375
      },
    },
    created(){
      this.data_item = this.item;
    },
  };
</script>

<style lang="less" type="text/less">
  @import "questionList.less";
</style>
