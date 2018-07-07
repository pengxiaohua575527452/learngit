<template>
  <!-- 首页 -->
  <div class="home container">
    <!-- 股价 -->
    <home-shares></home-shares>
    <!-- 业绩 -->
    <home-achievement></home-achievement>
    <!-- 新闻 -->
    <home-news></home-news>
    <!-- 活动 -->
    <home-activity></home-activity>
  </div>
</template>

<script type="text/ecmascript-6">
// alert('home.vue')
  import NewsList from '../../components/newsList/newsList'
  import HomeShares from './homeShares/homeShares'
  import HomeAchievement from './homeAchievement/homeAchievement'
  import HomeNews from './homeNews/homeNews'
  import HomeActivity from './homeActivity/homeActivity'
  
// alert('所有组件已经导入完毕')
  export default {
    name: 'home',
    components: {NewsList, HomeShares, HomeAchievement, HomeNews, HomeActivity}
  };
</script>

<style lang="less" type="text/less">
  .home {
    & .panel {
      border-bottom: 1px #EAEAEA solid;
    }
  }
</style>
