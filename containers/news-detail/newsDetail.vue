<template>
<div>
  <news-detail :newsDetailDatas="newsDetailDatas"></news-detail>
</div>
</template>

<script type="text/ecmascript-6">
  import $ from "jQuery";
  import NewsDetail from "./tComponent/tComponent"

  export const root = process.env.API_ROOT;
  export default {
    name: 'newsdetail',
    components: {NewsDetail},
    data: function() {
      return {
        newsDetailDatas: []
      }
    },
    mounted:function(){
      this.initDetail();
    },
    methods:{
      initDetail(){
        var that = this;
        var id = this.$route.query.id;
        var languageType = this.$route.query.language;

        $.ajax({
          type: 'Get',
          url: root + "/ir/news/newsdetail",
          data: {
            languageType: languageType,
            id: id
          },
          success: function (data) {
            that.newsDetailDatas = data;
          }
        })
      }
    }
  };
</script>

<style lang="less" type="text/less">

</style>
