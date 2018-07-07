<template>
  <news-list :showYBar="true" :channelId="1"></news-list>
</template>

<script type="text/ecmascript-6">
  import NewsList from '../../components/newsList/newsList'
  import setViewPort from '../../configs/js/setViewPort.js'

  setViewPort(1.0)
  export default {
    name: 'news',
    components: {NewsList},
  };
</script>

<style lang="less" type="text/less">

</style>
