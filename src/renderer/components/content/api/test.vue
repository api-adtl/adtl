<template>
    <div>
        API : {{api}}<br>
        group:{{group}}<br>
        send: {{send2}}{{send}}
        <br>
        <Button @click="random" size="small" type="primary">数据生成</Button>
        <br>
        <Button @click="test" size="small" type="primary">进行测试</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button @click="test13" size="small" type="primary">生成 & 测试</Button>
        <response :response="response" :api="api"></response>

    </div>
</template>
<script>
  import test from '../../../logic/test'
  import response from './response'
  import Mock from 'mockjs'

  export default {
    name: 'test',
    data () {
      return {
        testob: {},
        response: {},
        send2: {},
        loading:true
      }
    },

    props: [
      //数据传参
      'api',
      'group',
      'send',
      'grnerated'
    ],
    computed: {
      //计算属性
    },
    components: {
      //注册组件
      response
    },
    methods: {
      //方法列表
      random () {
        console.log('应用生成器!')
        let mmrule = {}
        let send = this.send2
        var Random = Mock.Random
        for (let valu of this.grnerated) {
          if(typeof mmrule[valu.name] == 'undefined'){
            mmrule[valu.name]={};
          }
          if (this.$lodash.isEmpty(valu.format)) {
            //没有参数
            console.log('56!',valu)
            mmrule[valu.name][valu.name2] = Random[valu.unit]()
          } else {
            if (this.$lodash.isArray(valu.format)) {
              //多个参数
              mmrule[valu.name][valu.name2] = Random[valu.unit](...valu.format)
            } else {
              //一个参数
              mmrule[valu.name][valu.name2] = Random[valu.unit](valu.format)
            }
          }
        }
        
        this.send2 = this.$lodash.merge(send, mmrule)
        console.log('se4nd', this.send2)

      },
      test () {
        //进行测试
        if(this.loading==false){
          this.loading = true;
          this.test1(this.send2)
        }
        
      },
      test13(){
        this.random();
        this.test();
      },
      test1 (send) {
          this.testob.send(send, (data) => {
             this.loading = false;
            console.log('返回!', data)
          if (typeof data == 'string') {
            console.log('返回数据!', data)
          } else {
            this.response = this.$lodash.cloneDeep(data)
          }
        })
      },
      init () {
        this.loading = false;
        this.send2 = this.$lodash.cloneDeep(this.send)
        console.log('log,init')
        this.testob = new test(this.api, this.group)
      }
    },
    watch: {
      //监听列表
      send: {
        deep: true,
        handler (noww1) {
          console.log(noww1)
          this.init()
        }

      },
      loading(new1){
        if(new1 == true){
          this.$Spin.show();
        }else{
          this.$Spin.hide();
        }
      }
    },

    created () {
      //创建完成后
      this.init()
    }
  }
</script>

<style>

</style>
