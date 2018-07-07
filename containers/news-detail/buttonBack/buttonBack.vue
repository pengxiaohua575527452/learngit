<template>
    <div class='button-component' :style="{height:iHeight+'px'}" v-if='false'>      
        <span 
          class='back-arrow'
          :style = '{width:iHeight*0.6+"px",height:iHeight*0.6+"px" }'
        ></span>
        <span @click = 'backClick'>返回</span>
    </div>
</template>
<script>
import less from "./buttonBack.less";
export default {
  props: ["iHeight"],
  data: function() {
    return {
      iArrow: {}
    };
  },
  methods: {
    backClick: function(e) {
      history.back();
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.iArrow["x"] = this.$props.iHeight;
    });
  }
};
</script>
