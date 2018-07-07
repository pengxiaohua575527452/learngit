<template>
    <div class='other-web'>
        <button-back></button-back>
        <iframe :src= otherWebUrl></iframe>
    </div>
</template>
<script>
// E:\alitt_protal\src\components\btnBack\btnBack.vue
// E:\alitt_protal\src\containers\otherWeb\otherWeb.vue
import buttonBack from '../../components/btnBack/btnBack.vue'

export default {
    computed:{
        otherWebUrl:function(){
            return localStorage.otherWebUrl
        }
    },
    components:{buttonBack}
}
</script>
<style scoped>
.other-web{
    width:100%;
    height:100%;
}
iframe{
    width:100%;
    height:100%;
}

</style>

