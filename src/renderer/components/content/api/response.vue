<template>
    <div>
        测试结果组件
        <br>
        <div>
          <div　class="error" v-if="errormsg">
          
             <Alert type="error" show-icon>
                出错了
                <span slot="desc">
                    {{errormsg}}
                </span>
            </Alert>
          </div>

          <dir>
            <ButtonGroup>
              <Button :style="bus" @click="open('data')" ghost type="primary">data</Button>
              <Button :style="bus" @click="open('config')" ghost type="primary">config</Button>
              <Button :style="bus" @click="open('status')" ghost type="primary">status</Button>
              <Button :style="bus" @click="open('headers')" ghost type="primary">headers</Button>
              <Button :style="bus" @click="open('all')" ghost type="primary">ALL</Button>
            </ButtonGroup>
            </dir>
            <div>
            <div v-if="status.data && api && response.data" >
              <div v-if="api.request_type != 'view' & api.request_type != 'image'" >
                <pre>{{response.data|format_data(api.data_type)}}</pre>
              </div>
              <Button @click="view=!view" ghost type="primary">视图显示Iframe</Button>
              <div v-if="api.request_type== 'view' || view">
                视图显示(红框不是内容)
                <br>
                <iframe width="100%" height="500px" style="border: 1px red solid;" frameborder="0" 
                :src="response.config.url">
                </iframe>
              </div>

              <div v-if="api.request_type== 'image'">
                图片显示 (红框不是内容,1px宽)
                <br>
                <div style="border: 1px red solid;">
                  <img :src="response.config.url" >
                </div>
                
                
              </div>
            </div>
            
            <div v-if="status.config">
                <pre>{{response.config|format}}</pre>
            </div>
            <div v-if="status.status">
                <pre>{{response.status|format}}</pre>
            </div>
            <div v-if="status.headers">
                <pre>{{response.headers|format}}</pre>
            </div>
            <div v-if="status.all">
                <pre>{{response|format}}</pre>
            </div>
          </div>
            
        </div>
    </div>
</template>

<script>

  import jsonFormat from 'json-format'

  export default {
    name: 'response',
    //混合
    mixins: [],
    delimiters: [
      //改变纯文本插入分隔符
    ],
    data () {
      return {
        bus: {
          width: '100px'
        },
        status: {
          data: true,
          config: false,
          status: false,
          headers: false,
          all: false
        },
        view:false
      }
    },
    //无状态组件
    functional: false,

    extends: {
      // 扩展
    },
    model: {
      //定制v-model,双向绑定
    },
    props: [
      //数据传参
      'response',
      'api',
      'errormsg'
    ],
    computed: {
      //计算属性
    },
    components: {
      //注册组件
    },
    methods: {
      //方法列表
      open (name) {
        this.status.data = false
        this.status.config = false
        this.status.headers = false
        this.status.status = false
        this.status.all = false
        this.status[name] = true
      }
    },
    watch: {
      //监听列表
     
    },
    beforeCreate () {
      //初始化之后
    },
    created () {
      //创建完成后
    },
    beforeMount () {
      //挂载开始之前
    },
    mounted () {
      //挂载之后
      
    },
    beforeUpdate () {
      //更新开始之前
    },
    updated () {
      //更新之后
    },
    activated () {
      //组件 激活
    },
    deactivated () {
      //组件停用
    },
    beforeDestroy () {
      //销毁之前
    },
    destroyed () {
      //销毁之后
    },
    errorCaptured () {
      //子孙组件的错误
    },
    directives: {
      //自定义指令
    },
    filters: {
      //过滤器
      format (value1) {
        let aa = jsonFormat(value1, {
          type: 'space',
          size: 2
        })
        console.log(aa)
        return aa
      },
      format_data(value1,dt){
        let aa = '';
       
        
        if( dt == 'json'){
            aa = jsonFormat(value1, {
                              type: 'space',
                              size: 2
            })
          
          
        }else{
          aa = value1;
        }
        
        console.log(aa);
        return aa;
      }
    }
  }
</script>

<style>

</style>
