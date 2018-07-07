<template>
  <!-- 常见问题 -->
  <div id="question" class="question container">
    <!-- 问题列表 -->
    <div class="question-list" :style="{marginTop: 20*ratio + 'px',marginBottom: 110*ratio + 'px',paddingLeft: 20*ratio + 'px',paddingRight: 20*ratio + 'px'}">
      <question-list v-for="(questionItem,index) in questionList" :key = " index + Math.random() " :item="questionItem"></question-list>
    </div>
    <div class="question-robot" :style="{bottom:16*ratio + 'px'}">
      <img src="../../layouts/image/icon_robot.png" :style="{height:90*ratio + 'px'}" @click="openRobot">
    </div>
  </div>
</template>

<script>
  import $ from "jQuery";
  import QuestionList from './questionList/questionList'
  import * as QuectionList from './question.js';
  export default {
    name: 'question',
    components: {QuestionList},
    data: function() {
      return {
        rotate: true,
        // questionList: QuectionList.QUESTION_LIST_DATA,
        iWindow:{
          x:$(window).width()
        },
      };
    },
    computed: {
      ratio: function () {
        return this.iWindow.x / 375
      },
      questionList: function(){
        return QuectionList[this.$t("lang.question")]
      }
    },
    methods:{
      //获取cookie
      getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) == ' ') c = c.substring(1)
          if (c.indexOf(name) != -1) return c.substring(name.length, c.length)
        }
        return ""
      },
      openRobot(){
        let vm = this;
        alert("机器人：" + window.corpId);
        dd.ready(readyRes => {
          dd.biz.chat.toConversation({
            corpId: window.corpId, //企业id
            chatId: 1311590862750719,//会话Id
            onSuccess : function() {
              // alert("调用成功啦");
            },
            onFail : function() {
              // alert("调用失败啦");
            }
          })
        });

      }
    }
  };
</script>

<style lang="less" type="text/less">
@import "question.less";
</style>
