<template>
  <news-list :showYBar="true" :channelId="2"></news-list>
</template>

<script type="text/ecmascript-6">
  import NewsList from '../../components/newsList/newsList'
  export default {
    name: 'media',
    components: {NewsList},
  };
</script>

<style lang="less" type="text/less">

</style>
