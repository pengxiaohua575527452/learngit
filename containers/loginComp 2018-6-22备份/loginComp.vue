<template>
<div class='out-box'
> 
    <!--注册的当前页面 -->
    <div 
        class='login-container'
        :style = "{height:iWindow.y + 'px'}"
    >
        <div class='login-comp ch'  ref='loginComp'>
            <!-- logo盒子 -->
            <div 
                class='logo-box'
            >
                <img src="../../layouts/image/ali_logo.png" alt="">
                <div>
                    <h2
                    >{{label.h2}}</h2>
                    <h4
                    >{{label.h4}}</h4>
                </div>
            </div>
            <!-- .logo-box end -->
            <form 
                action=""
                method = 'post'       
                onSubmit = "return false"
            >
                <!-- 手机 -->
                <!-- <div class='phone-box'>
                    <div 
                        class='BtnPCode'
                        @click='BtnPCodeClick'
                    >
                        <p>{{pCode}}</p>
                        <span></span>
                        <ul class='menu'>
                            <li></li>
                        </ul>
                    </div>
                    <input class='input-number' type="number" name='phone' :placeholder = label.phone v-model= info.phone  >
                </div> -->
                <!-- 验证码 -->
                <!-- <div class='v-code'>
                    <input class='input-v-code' type="text" name='v-code' :placeholder = label.vc v-model= info.vCode>
                    <div
                        @click='getVCodeFn'
                    >{{label.vcb}}</div>
                </div> -->
                <!-- 请输入姓名 ch -->
                <div class='input-name' v-if= label.name >
                    <input type="text" name='name' :placeholder = label.name v-model= info.name>
                    <!-- 男士 -->
                    <!-- <label 
                        class='active' 
                        for="male" 
                        ref='male'
                        @click='labelMaleClickFn'
                    > 
                        <input id='male' type="radio" name='sex' value='male'     v-model= info.sex>
                        <div class='radio-icon'></div>
                        <span >{{label.m}}</span>
                    </label>-->
                    <!-- 女士 -->
                    <!-- <label 
                        for="famale" 
                        ref="female"
                        @click='labelFemaleClickFn'
                    >
                        <input id='famale' type="radio" name='sex' value='female' v-model= info.sex>
                        <div class='radio-icon'></div>
                        <span>{{label.f}}</span>
                    </label> -->
                </div>
                <!-- 姓名-en -->
                <div class='input-name' v-if = label.fName>
                    <input  type="text" name='fName' :placeholder='label.fName' v-model= info.fName>
                    <!-- <label 
                        class='en-label active' 
                        for="male" 
                        ref="male"
                        @click='labelMaleClickFn'    
                    >
                        <input id='male' type="radio" name='sex' value='male'  v-model= info.sex>
                        <div class='radio-icon'></div>
                        <span>{{label.m}}</span>
                    </label> -->
                </div>
                <div class='input-name' v-if = label.fName>
                    <input type="text" name='lName' :placeholder='label.lName' v-model= info.lName>
                    <!-- <label
                        class='en-label'  
                        for='female' 
                        ref="female"
                        @click='labelFemaleClickFn'
                    >
                        <input id='female' type="radio" name='sex' value='male'  v-model= info.sex>
                        <div class='radio-icon'></div>
                        <span>{{label.f}}</span>
                    </label> -->
                </div>
                <!-- 身份选择按钮 -->
                <!-- 身份选择 我是： I am: -->
                <!-- @click='chooseStatus'   -->
                <div 
                    class='status-box'
                    @click='chooseStatus' 
                >
                    <!-- <input 
                        type='text' 
                        name='status' 
                        v-model = info.status    
                    /> -->
                    <!-- <h6>{{label.im}}</h6> -->
                    <!-- <p>{{info.staus}}</p>   -->
                    <!-- <p>{{ info.status }}</p> -->
                    <input 
                        type='text' 
                        name='status' 
                        v-model = info.status  
                        disabled = true 
                        :placeholder = label.status
                        
                    />
                    <!-- @click='statusInputClick'  -->
                </div>
                <div class='status-menu-box'>
                    <ul 
                        class='status-menu'
                        ref='statusMenu'
                        :style="{left:iWindow.x + 'px'}"
                    >
                        <li 
                            v-for="(v,i) in statusList"
                            :key = i
                            :data-status= v
                            @click = 'choseStatus'
                            
                        >{{v}}</li>
                    </ul>
                </div>
                <!-- 身份选择按钮 结束 -->
                <!-- 公司名 -->
                <div class='c-name'>
                    <input type="text" name='c-name' :placeholder= label.c v-model = info.cName>
                </div>
                <!-- 公司名称结束 -->
                <!-- 机构所属 -->
                <!-- 基金规模 -->
                <div 
                    class='fund-size-box'
                    v-if= fundIf    
                >
                    <input class='fund-size-title' :value = label.fundSize disabled=true />
                    
                    <!-- <input class='fund-size-symbol' :value = label.symbol disabled = true /> -->
                    <input class='fund-size' type="number" placeholder = '0' v-model = info.fundSize >
                    <input class='fund-unit' :value = label.unit disabled = true />
                </div>
                <!-- 基金属性 -->
                <div 
                    id='fund-style-box'
                    v-if= fundIf     
                >
                    <form> 
                        <input class='fund-style' type="text" :placeholder = label.fundStyle disabled = true>
                        <input 
                            class='fund-style-value' 
                            type='text' 
                            :placeholder = label.fundStyleValue  
                            v-model = info.fundStyle 

                            @click='openFundStyleMenu'
                            
                        />
                    </form>
                </div>
                <!-- //基金属性下拉菜单 -->
                <div class='fund-style-menu' ref='fundStyleMenu'>
                    <div
                        ref='fundStyleMenuBox'
                    >
                        <div
                            @click = 'fundStyleClick'
                        >{{label.fundStyleLong}}</div>
                        <div
                            @click = 'fundStyleClick'
                        >{{label.fundStyleHedge}}</div>
                    </div>
                </div>
                <!-- 机构所属 -->
                <!-- 按钮 -->
                <div class='btn-box' >
                    <input 
                        type="submit" 
                        :value= label.submit 
                    />
                    <input type="reset" :value= label.reset />
                </div>
            </form> 
            <!-- //获取对象使用 -->
        </div>
        <div class='toggle' @click='clickFn'>{{version}}</div>
        
    </div>
    <!-- 列表开始 -->
    <transition
        @before-enter = 'beforeEnter'
        @enter = 'enter'
        @leave = 'leave'
        @before-leave = 'beforeLeave'
        @after-leave = 'afterLeave'
    >
 
        <div 
            class='pCode'  
            ref='pCode'
            v-if='menuIf'
            
        >
            <div class='back'>
                <div 
                    class='arrow-box'
                    @click="arrowFn"
                >
                    <span class='arrow'></span>
                    <span class='bar'></span>
                </div>
                <span>{{label.choose}}</span>
            </div>
            <div class='search'>
                <form 
                    action='#'
                    @submit = "submitFn"
                >
                    <input
                        class='input' 
                        type="text" 
                        :placeholder= label.search
                        ref = search
                    />
                </form>
            </div>
            <ul class='pCodeMenu'>
                <li 
                    v-for="(v,index) in pCodeObj"
                    :key = index
                >
                    <div class='chart' v-if="v.chart"  v-show = "showChTitle">{{v.chart}}</div>
                    <div class='chart' v-if="v.enChart" v-show = "!showChTitle">{{v.enChart}}</div>
                    <div 
                        class='content' 
                        v-if='!v.chart'
                        @click = "menuDivClick"    
                    >
                        <span v-if='pCodeCh'>{{v.cName}}</span>
                        <span v-if='!pCodeCh'>{{v.eName}}</span>
                        <span class='pCodeNumber' :data-title = v.pCode>{{v.pCode}}</span>
                    </div>
                </li>
            </ul> 
        </div>
        <!-- 列表结束 -->
    </transition>
    <!--class='login-container'-->
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
// 设置放大比例
setViewPort(1)

var statusList = {
    ch:[
        '用户',
        '员工',
        '记者',
        '独立投资人',
        '买方分析师',
        '卖方分析师',
        '基金经理',
        '股票经纪',
        '其他'
    ],
    en:[
        'User',
        'Staff',
        'Journalist',
        'Individual Investor ',
        'Buy-side Analyst ',
        'Sell-side Analyst',
        'Portfolio Manager',
        'Stock Broker',
        'Other'
    ]
}

var fundStyleList = {
    ch:{
        longOnly:'长期',
        hedge:'对冲'
    },
    en:{
        longOnly:'Long Only',
        hedge:'Hedge'
    }
}

var ch=''
// 获取json字符串
var label = {
    ch:{
        h2:'投资者门户',
        h4:'用户注册',
        phone:'请输入手机号',
        vc:'请输入验证码',
        vcb:'发送验证码',
        name:'请输入姓名',
        fName:false,
        lName:false,
        m:'男士',
        f:'女士',
        c:'请输入公司名称',
        submit:'注册',
        reset:'取消',
        choose:'选择国家和地区',
        search:'搜索',
        im:'我是',
        status:'请选择身份',
        symbol:'￥',
        fundSize:'规模 ￥',
        fundStyle:'基金类型',
        unit:'百万',
        fundStyleValue:'长期 / 对冲',
        fundStyleLong:'长期',
        fundStyleHedge:'对冲'
 
                    
    },
    en:{
        h2:'Investor Portal',
        h4:'Registration ',
        phone:'P Number',
        vc:'V Code',
        vcb:'Send VC',
        name:false,
        fName:'FirstName',
        lName:'LastName',
        m:'Male',
        f:'Female',
        c:'Corporate Name',
        submit:'Login',
        reset:'Reset',
        choose:'Selection Of Countries ',
        search:'Search',
        im:"I'm",
        status:'Choose Status',
        symbol:'$',
        fundSize:'F Size $',
        fundStyle:'F Style',
        unit:'Million',
        fundStyleValue:'Long Only / Hedge',
        fundStyleLong:'Long Only',
        fundStyleHedge:'Hedge'
    }
}
export default {
    data:function(){
        return {
            iWindow:{
                x:$(window).width(),
                y:$(window).height()
            },
            pCode:'+86',
            version:'EN',
            label:label['ch'],
            statusList : statusList.ch,
            fundStyleList : fundStyleList.ch,
            info:{
                phone:'',
                vCode:'',
                name:'',
                sex:'male',
                cName:'',
                status:'',
                fundSize:'',
                fundStyle:''
            },
            pCodeObj:pCodeObj,
            jMenuList:'',
            menuIf:0,
            showChTitle:true,
            fundIf:false
        }
    },
    computed:{
        ratio:function(){
            return this.iWindow.x/375
        },
        loginContainer:function(){

            return{
                h:this.iWindow.y
            }
        },
        pCodeCh:function(){
            if(this.version == 'EN' ){
                return true
            }else{
                return false
            }
             
        }
        // showChTitle:function(){
        //     if(this.version == 'EN'){
        //         return true
        //     }
        // }
    },
    methods:{
        submitFn:function(){
            var vm = this 
            var str = this.$refs.search.value
            var len = pCodeObj.length;

            var a =  []
            for(var i=0;i<len;i++){
                if(vm.version == "EN"){
                    if(pCodeObj[i].cName.indexOf(str) >= 0){
                        a.push(pCodeObj[i])
                    }

                }else{
                    pCodeObj[i].eName.toLowerCase().indexOf(str.toLowerCase()) >= 0? a.push(pCodeObj[i]):'';
                }
                
            }

            this.pCodeObj = a
            
            return false
        },
        getVCodeFn:function(){
            console.log('获取验证码')
            //获取验证码的点击事件
            var vm = this
            $.get({
                url:'',
                data:"{phone="+vm.info.phone+"}"
            })
        },
        clickFn:function(){
            //点击更改界面标签文本
            var j = $(this.$refs.loginComp)
            if(j.hasClass('en')){
                j.removeClass('en').addClass('ch')
                this.label  = label.ch
                this.statusList = statusList.ch
                this.version = 'EN'
                this.showChTitle = true
            }else{
                j.removeClass('ch').addClass('en')
                this.label  = label.en
                this.statusList = statusList.en
                this.version = 'CH'
                this.showChTitle = false
            }
        },
        chooseStatus:function(e){
        //点击触发身份信息
            var j = $(this.$refs.statusMenu)
            var jLeft = j.css('left')

            clickFlash(e.currentTarget)
            j.animate({
                    left:'0px'
                },{
                    duration:150
                }) 
        },
        // statusInputClick:function(e){
        //     //禁止手机键盘弹出的方法
        //     console.log( e.currentTarget.disabled = true)
        //     console.log(e.currentTarget.disabled)
        //     // e.currentTarget.activeElement.blur()
        // },
        choseStatus:function(e){
        //选择身份完毕调用的函数
            var vm = this
            var j = $(this.$refs.statusMenu)
            var jLeft = j.css('left')
            var target = e.target


            clickFlash(target)
            j.animate({
                    left:this.iWindow.y + 'px'
                },{
                    duration:150,
                    done:function(){
                        vm.info.status = target.dataset.status

                        if(vm.info.status == "基金经理" || vm.info.status == "Portfolio Manager"){
                            vm.fundIf = true;
                        }else{
                            vm.fundIf = false;
                        }
                    }
                })

             

        },
        //点击弹出下拉的基金类型的菜单
        openFundStyleMenu:function(e){

           
            var jA = $(this.$refs.fundStyleMenuBox)
            var jBox = $(this.$refs.fundStyleMenu)
            
            jBox.css({overflow:'visible'})
             
            jA.animate({
                height:'50px'
            },{
                duration:200
            })

            return false
        },
        //点击收藏基金类型的下拉菜单
        fundStyleClick:function(e){
            var j = $(e.target)
            this.info.fundStyle = j.text()
            var jA = $(this.$refs.fundStyleMenuBox)
            var jBox = $(this.$refs.fundStyleMenu)
            
           
            jA.animate({
                height:'0px'
            },{
                duration:200,
                done:function(){
                    jBox.css({overflow:'visible'})
                }
            })
        },
        choseFundStyle:function(){


        },
        BtnPCodeClick:function(){
            this.menuIf = 1

        
        },
        labelMaleClickFn:function(){
            $(this.$refs.male).addClass('active')
            $(this.$refs.female).removeClass('active')

        },
        labelFemaleClickFn:function(){
            $(this.$refs.male).removeClass('active')
            $(this.$refs.female).addClass('active')

        },
        arrowFn:function(){
            //点击闪现
            
            this.menuIf = 0
        },
        // 列表组件开始 
        //点击列表
        menuDivClick:function(e){
            clickFlash(e.currentTarget)
             
            this.menuIf = 0
            //设置phone开篇
          this.pCode ='+'+$(e.currentTarget).find('.pCodeNumber').text() 
           
        },
        beforeEnter:function(el){

            var vm = this;
            this.menuIf = 1
            $(el).css({left:vm.iWindow.x})
           
            
        },
        enter: function(el,done){
            
            $(el).animate({
                left:0
            },{
                duration:300,
                complete:function(){
                    done()
                }
            })
        },
        beforeLeave :function(el){
            
        },
        leave:function(el,done){
            var vm = this
            $(el).animate({
                left:vm.iWindow.x
            },{
                duration:300,
                complete:function(){
                    done()
                    vm.menuIf = 0
                }
            })
        },
        afterLeave:function(e){
            
        },
        searchFn :function(e){
            console.log(e.target.value)
            console.log('a')
            // var vm = this
            
            // var str = e.target.value
            // var len = pCodeObj.length
            // var a = pCodeObj
            // //this.version EN == 是中文版
            // //this.version CH == 是英文
            
            // a.filter(function(v){
                
                
            //     if(vm.version == 'EN'){
            //         console.log(v.cName)
            //         console.log(str)
                     
            //         return v.cName == str
            //     }else{
            //         return v.eName.indexOf(str)
            //     }
            // })

            
            // vm.pCodeObj = a
            


             

            
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            //把列表对象绑定到属性上
            this.jMenuList = $(this.$refs.pCode)
        })
    }

}
</script>
