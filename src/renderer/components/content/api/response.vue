<template>
    <div>
        测试结果组件

        <br>

        <ButtonGroup>
            <Button :style="bus" @click="open('data')" ghost type="primary">data</Button>
            <Button :style="bus" @click="open('config')" ghost type="primary">config</Button>
            <Button :style="bus" @click="open('status')" ghost type="primary">status</Button>
            <Button :style="bus" @click="open('headers')" ghost type="primary">headers</Button>
        </ButtonGroup>
        <div>
            <div v-if="status.data">
                {{response.data}}
            </div>
            <div v-if="status.config">
                {{response.config}}
            </div>
            <div v-if="status.status">
                {{response.status}}
            </div>
            <div v-if="status.headers">
                {{response.headers}}
            </div>
        </div>
    </div>
</template>

<script>


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
          data: false,
          config: false,
          status: false,
          headers: false
        }
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
      'response'
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
        this.status.data = true
        this.status.config = false
        this.status.headers = false
        this.status.status = false
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
    }
  }
</script>

<style>

</style>
