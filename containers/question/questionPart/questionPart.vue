<template>
  <div class="question-part-item" :style="{fontSize: 14*ratio + 'px',lineHeight: 20*ratio + 'px'}">
    <div class="question-part-item-q" @click="showAnswer" :style="{marginTop: 20*ratio + 'px'}">
      {{question_part.question}}
    </div>
    <div v-html="question_part.answer" :class="[isHide?'question-part-item-a hide':'question-part-item-a show']" :style="{marginTop:isHide?0:20*ratio + 'px'}">
      {{question_part.answer}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from "jQuery";
  export default {
    name: 'questionPart',
    props: {
      questionPart:{
        type: Object
      }
    },
    data(){
      return{
        isHide: true,
        question_part: {},
        iWindow:{
          x:$(window).width()
        },
      }
    },
    methods: {
      showAnswer(){
        this.isHide=!this.isHide;
      }
    },
    computed: {
      ratio: function () {
        return this.iWindow.x / 375
      },
    },
    created(){
      this.question_part = this.questionPart;
    },
  };
</script>

<style lang="less" type="text/less">
  @import "questionPart.less";
</style>
