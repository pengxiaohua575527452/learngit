<template>
<div class='out-box'>
    <div class='login-comp' ref='login-comp' >
        <!-- logo 开始 -->
        <div class='logo-box'>
            <img src="../../layouts/image/ali_logo.png" alt="">
        </div>
        <h1 class='title'>{{$t("lang.loginTitle")}}</h1>
        <h2 class='subtitle'>{{$t('lang.loginSubtitle')}}</h2>
        <!-- logo 结束 -->
        <form class='form' action="#"  onsubmit = "return false ">
            <div v-if = inputNameIf>
                <input
                    class='input-name'
                    type="text"
                    :placeholder = "$t('lang.name')"
                    v-if = zhIf
                    v-model = info.name
                 />
                <input
                    class='input-name-f-name'
                    type="text"
                    :placeholder = "$t('lang.fName')"
                    v-if= !zhIf
                    v-model = info.fName
                />
                <input
                    class='input-name-l-name'
                    type="text"
                    :placeholder = "$t('lang.lName')"
                    v-if= !zhIf
                    v-model = info.lName
                />
                <transition
                    @before-enter = beforeEnterAllWarningFn
                    @enter = enterAllWarningFn
                    @leave = leaveAllWarningFn
                >
                    <p
                        class='all-warning-style'
                        v-if = inputNameWarningIf
                    >{{$t('lang.inputNameWarning')}}</p>
                </transition>
            </div>
            <!-- 身份选择按钮 -->
            <div v-if= inputStatusIf  @click = inputStatusFn    >
                <input
                    class='input-status'
                    type="text"
                    :placeholder = "$t('lang.status')"
                    disabled = true
                    v-model = info.status
                 />
            </div>
            <transition
                    @before-enter = beforeEnterAllWarningFn
                    @enter = enterAllWarningFn
                    @leave = leaveAllWarningFn
            >
                <p v-if = inputStatusWarningIf class='all-warning-style'>{{$t('lang.inputStatusWarning')}}</p>
            </transition>
            <!-- 身份选择按钮 -->
            <!-- 身份选择菜单开始 -->
            <transition
            >
                <ul
                    class='status-menu'
                    ref = statusMenu
                    v-if = statusMenuIf
                >
                    <li
                        v-for = "(v,i) in statusList"
                        :key = i
                        :data-value = v
                        @click= statusMenuFn
                    >{{v}}</li>
                </ul>
            </transition>
            <!-- 身份选择菜单开始 -->
            <!-- 基金规模 -->
            <div v-if = fundSizeIf >
                <div class='fund-size-input-box'>
                    <h4 class='fund-size-symbol'>{{$t('lang.symbol')}}</h4>
                    <input
                        class='fund-size-input'
                        type="number"
                        placeholder = 0
                        v-model = info.fundSize
                    />
                    <p class='fund-size-unit'>{{$t('lang.unit')}}</p>
                </div>
                <transition
                    @before-enter = beforeEnterAllWarningFn
                    @enter = enterAllWarningFn
                    @leave = leaveAllWarningFn
                >
                    <p class='all-warning-style'>{{$t('lang.fundSizeSubtitle')}}</p>
                </transition>
            </div>
            <!-- 基金风格 -->
            <div v-if = fundStyleIf class='fund-style-box'>
                <div class='fund-style-input-box'>
                    <label
                         
                        for='long-only'
                        ref="labelFundStyleLong"
                        :data-fund-style = "$t('lang.fundStyleLong')"
                        @click='labelInputFundStyleFn'
                    >
                        {{$t('lang.fundStyleLong')}}
                    </label>
                    <label
                        for="hedge"
                        ref = "labelFundStyleHedge"
                        @click='labelInputFundStyleFn'
                        :data-fund-style = "$t('lang.fundStyleHedge')"

                    >{{$t('lang.fundStyleHedge')}}</label>
                </div>
                <p class='fund-style-subtitle'>{{$t('lang.fundStyleSubtitle')}}</p>
                <p class='fund-style-warning'>{{$t('lang.w')}}</p>
            </div>
            <!-- 公司名称 -->
            <div v-if = cNameIf class='c-name-box'>
                <input class='c-name-input' type="text" name='c-name' v-model = info.cName :placeholder = "$t('lang.c')" />
            </div>
            <transition
                    @before-enter = beforeEnterAllWarningFn
                    @enter = enterAllWarningFn
                    @leave = leaveAllWarningFn
            >
                <p
                    class='all-warning-style'
                    v-if = cNameWarningIf
                >{{$t('lang.cNameWarning')}}</p>
            </transition>
        </form>

        <div class="next-box">
            <div class="pre silent" @click='preClickFn' >{{$t('lang.btnPre')}}</div>
            <div class="next" @click='nextClickFn'>{{$t('lang.btnNext')}}</div>
        </div>
    </div>
</div>
</template>
<script>
import $ from 'jQuery'
import less from './loginComp.less'
import resetLess from '../../layouts/less/reset.less'
import pCodeObj from './phoneCode.js'
import setViewPort from '../../configs/js/setViewPort.js'
import headerBar from '../../components/headerBar/headerBar.vue'
import clickFlash from '../../configs/js/clickFlash.js'
 export const root = process.env.API_ROOT

// 设置放大比例
setViewPort(1)
// alert('进入 loginComp')
export default {
    data:function(){
        return {
            // version:'EN',
            inputNameIf:true,
            inputNameWarningIf:false,
            inputStatusIf:false,
            inputStatusWarningIf:false,
            statusMenuIf:false,
            fundSizeIf:false,
            fundStyleIf:false,
            cNameIf:false,
            cNameWarningIf:false,
            info:{
                corp_id:'ding2585e7fd381d17fe',
                id:1,
                // userId: "14131906501145522",
                userId: localStorage.userId,
                name:'',
                fName:'',
                lName:'',
                status:'',
                fundSize:'',
                fundStyle:'',
                cName:''

            },
            currentPage:'inputNameIf',
            iWindow:{
                y:$(window).height()
            }

        }
    },
    computed:{
        statusList:function(){
            //获取json字符串
            //把字符串转化成数组
            return eval('('+this.$t('lang.statusList')+')')
        },
        zhIf:function(){
            return this.$i18n.locale == 'zh-CN'
        }
    },
    methods:{
        //捕捉手机软键盘的开始事件
        fromOnSubmitFn:function(){
            this.nextClickFn()
            $('body').css({background:'#333'})

            return false;
        },
        inputStatusFn:function(){


            this.statusMenuIf = true

            return false
        },
        statusMenuFn:function(e){
            this.statusMenuIf = false
            this.info.status = e.target.dataset.value

        },
        // 返回前一步按钮
        preClickFn:function(){
            var s = this.currentPage;
            if(s == 'cNameIf'){
                this.cNameIf = false;
                if(this.info.status == '基金经理' || this.info.status == 'Portfolio Manager' ){
                    this.fundStyleIf = true;
                    this.currentPage = 'fundStyleIf'
                }else {
                    this.inputStatusIf = true;
                    this.currentPage = 'inputStatusIf'
                }
                this.cNameWarningIf = false;
            }else if(s == 'fundStyleIf'){
                    this.fundStyleIf = false;
                    this.fundSizeIf = true;
                    this.currentPage = 'fundSizeIf'
            }else if(s == 'fundSizeIf'){
                    this.fundSizeIf = false;
                    this.inputStatusIf = true;
                    this.currentPage = 'inputStatusIf'
            }else if(s == 'inputStatusIf'){
                this.inputStatusIf = false;
                this.inputNameIf = true;
                this.currentPage = 'inputNameIf'
                this.inputStatusWarningIf = false;
            }
        },
        //preClickFn end
        nextClickFn:function(){
            //点击下一步还需要判断当前的信息是否输入完成
            var vm = this
            var s = this.currentPage;
            if(s == 'inputNameIf'){
                //中文版的情况
                if(this.$i18n.locale == 'zh-CN'){
                    if( checkChName(vm.info.name)){
                        inputNameContinue(vm)
                        this.inputNameWarningIf = false;
                    }else{
                        this.inputNameWarningIf = true;
                    }

                }else{
                    //英文版的情况
                    if(checkEnName(this.info.fName) && checkEnName(this.info.lName)){
                        inputNameContinue(vm)
                        this.inputNameWarningIf = false;
                    }else{
                        this.inputNameWarningIf = true;
                    }
                }
                //检查名称后下一步的操作函数
                function inputNameContinue(vm){
                    vm.inputNameIf = false;
                    vm.inputStatusIf = true;
                    vm.currentPage = 'inputStatusIf';
                }
                //检查中文名称的合法性
                function checkChName(str){
                    var b = true ;
                    var reg = /^[\u4E00-\u9FA5]+$/;
                    if(!reg.test(str)){
                        b = false
                    }
                    return b
                };
                //检测英文名称的合法性
                //分为两步第一步检测是否有·这个分隔符，有就分割成数组，检测数组
                function checkEnName(str){

                    if(str == ''){
                        return false
                    }
                    var b = true;
                    var a = str.split(/\·/)
                    for(var i=0;i<a.length;i++){
                        if(/[^a-zA-z]/.test(a[i])){
                            b = false
                        }
                    }
                    return b
                }
            //当前是选择身份状态
            }else if(s == 'inputStatusIf' ){

                if(this.info.status.length > 0){
                    // 当选择的是基金经理的时候
                    if(this.info.status == '基金经理' || this.info.status == 'Portfolio Manager' ){
                        this.inputStatusIf = false;
                        this.fundSizeIf = true;
                        this.currentPage = 'fundSizeIf'

                    }else {
                        // 当不是基金经理的时候
                        this.inputStatusIf = false;
                        this.cNameIf = true;
                        this.currentPage = 'cNameIf'
                    }
                    this.inputStatusWarningIf = false

                }else{
                    this.inputStatusWarningIf = true
                }
            //当前是选择基金规模状态
            }else if(s == 'fundSizeIf'){
                if(this.info.fundSize>0 && this.info.fundSize[0] != 0){
                    this.fundSizeIf = false;
                    this.fundStyleIf = true;
                    this.currentPage = 'fundStyleIf'
                }
            }else if(s == 'fundStyleIf'){
                this.fundStyleIf = false;
                this.cNameIf = true;
                this.currentPage = 'cNameIf'
            }else if(s == 'cNameIf'){
                var vm = this
                if(this.info.cName.length > 0){
                    this.cNameWarningIf = false;
                    var infoJson = JSON.stringify(this.info)
                    var vm = this
                    // alert('进入ajax')
                    // alert(JSON.stringify(vm.info))
                    // alert('loginComp.localStorage.userid' + vm.info.userId)
                     $.ajax({
                        type: 'POST',
                        url:root+"/investment/reg/saveUser",
                       
                        data:{detail:JSON.stringify(vm.info)},
                        success:function(data){
                            // alert('传递的数据是 ： '+ infoJson)
                            // alert('信息保存成功 ： '+JSON.stringify(data))
                            vm.$router.push({path:'/home/'})
                        },
                        error:function(d){
                            alert('失败')
                            alert(JSON.stringify(d))
                        },
                        complete:function(){
                            // alert('complete')
                        }
                    

                     })

                    //  alert('ajax 下一行的代码')
                }else{
                    this.cNameWarningIf = true
                }
            }
            //为了防止手机软键盘提交表单
            // return false;
        },
        //nextClickFn end
        labelInputFundStyleFn:function(e){
            var jL = $(this.$refs.labelFundStyleLong)
            var jH = $(this.$refs.labelFundStyleHedge)
            var str = e.target.dataset.fundStyle;
            this.info.fundStyle = str

            //this.version == 'EN' 表示当前是中文版的
            if(this.$i18n.locale == 'zh-CN'){
                if(str == '长期'){
                    jL.addClass('active')
                    jH.removeClass('active')
                }else{
                    jL.removeClass('active')
                    jH.addClass('active')
                }
            }else{
                if(str == 'Long Only'){
                    jL.addClass('active')
                    jH.removeClass('active')
                }else{
                    jL.removeClass('active')
                    jH.addClass('active')
                }
            }
        },
        //labelInputFundStyleFn  end
        beforeEnterAllWarningFn:function(el){
            $(el).css({opacity:0})
        },
        enterAllWarningFn:function(el,done){
            $(el).animate({
                opacity:1
            },{
                duration:150,
                complete:function(){
                    done()
                }
            })
        },
        leaveAllWarningFn:function(el,done){
            $(el).animate({
                opacity:0
            },{
                duration:150,
                complete:function(){
                    done()
                }
            })
        },
        getCookie(cname) {
            if(document.cookie.length > 0){
                var ca = document.cookie.split(';')
                // alert('document.cookie : '+ document.cookie)
                var array = document.cookie.split('{')
                var len = array.length;
                // alert('array : '+ array)
                // alert('len  + '+ len)
                // alert('{'+array[1])

                return '{'+array[1]

            }else{
             return '';
            }


        // var name = cname + "=";
        // var ca = document.cookie.split(';')
        // for (var i = 0; i < ca.length; i++) {
        //     var c = ca[i]
        //     while (c.charAt(0) == ' ') c = c.substring(1)
        //     if (c.indexOf(name) != -1) return c.substring(name.length, c.length)
        // }
        // return ""
      },

    },
    // methods end
    mounted:function(){
            // alert('_cookieStr')
        let cookieStr = this.getCookie(window.corpId)
        // alert(cookieStr)
        const _cookieStr = eval('('+cookieStr+')')

        // alert(_cookieStr)
        this.info.userId = _cookieStr.u

        // alert(this.info.userId)

         

    }
}
</script>


