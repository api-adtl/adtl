<template>
  <div>
    <div v-if="info_xy">
      <div>
        <div >
          <span>get参数</span>
          <form_list :list="send.get">
          </form_list>
        </div>

        <div >
          <span>form参数</span>
          <div>
            <form_input v-model="send.form"></form_input>
          </div>
        </div>

        <div >
          <span>header 参数</span>

          <form_list :list="send.headers">
          </form_list>
        </div>
      </div>

    </div>
    <br>
    <Button @click="info" size="small" type="primary">接口信息</Button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button @click="random" size="small" type="primary">数据生成</Button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button @click="test" size="small" type="primary">进行测试</Button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button @click="test13" size="small" type="primary">生成 & 测试</Button>
    <Button @click="test100" size="small" type="primary">进行测试*100</Button>

    <response :response="response" :api="api" :errormsg="errormsg"></response>

  </div>
</template>
<script>
import test from '../../../logic/test'
import response from './response'
import Mock from 'mockjs'
import jsonFormat from 'json-format'
import form_input from './form_input'
import form_list from './form_list'

export default {
  name: 'test',
  data() {
    return {
      testob: {},
      response: {},
      send2: {},
      loading: true,
      errormsg: '',
      info_xy: false
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
    response,
    form_input,
    form_list
  },
  methods: {
    //方法列表
    info() {
      this.info_xy = !this.info_xy;
    },
    random() {
      console.log('应用生成器!')
      let mmrule = {}
      let send = this.send2
      var Random = Mock.Random
      for (let valu of this.grnerated) {
        if (typeof mmrule[valu.name] == 'undefined') {
          mmrule[valu.name] = {};
        }
        if (this.$lodash.isEmpty(valu.format)) {
          //没有参数
          console.log('56!', valu)
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
    test() {
      //进行测试
      if (this.loading == false) {
        this.loading = true;
        this.test1(this.send2)
      }

    },
    test13() {
      this.random();
      this.test();
    },
    test100() {
      for (let i = 0; i < 100; i++) {
        this.test13();
      }
    },
    test1(send) {
      this.errormsg = '';
      if (this.$lodash.isEmpty(this.testob)) {
        this.init();
      }
      this.testob.send(send, (data) => {
        // 成功处理
        this.loading = false;
        this.response = this.$lodash.cloneDeep(data)
      }, (error) => {
        this.errormsg = error;
        // 错误处理
        this.loading = false;

        if (error.response) {
          //请求已发出,但服务器使用状态代码进行响应
          //落在2xx的范围之外
          console.log(1, error.response.data)
          console.log(error.response.status)
          this.response = {
            'data': error.response.data,
            'headers': error.response.headers,
            'status': error.response.status,
            'config': error.response.config,
          }
          console.log(this.response)
        } else {
          //在设置触发错误的请求时发生了错误
          this.errormsg = error;
          console.log('Error', error.message)
        }
        //console.log(error.config)
        //this.response = this.$lodash.cloneDeep(error.config)
      })
    },
    init() {
      this.response = {};
      this.loading = false;
      this.send2 = this.$lodash.cloneDeep(this.send)

      if (!this.$lodash.isEmpty(this.api) && !this.$lodash.isEmpty(this.group)) {
        this.testob = new test(this.api, this.group)
      }
    }
  },
  watch: {
    //监听列表
    send: {
      deep: true,
      handler(noww1) {
        console.log(noww1)
        this.init()
      }

    },
    loading(new1) {
      if (new1 == true) {
        this.$Spin.show();
      } else {
        this.$Spin.hide();
      }
    }
  },

  created() {
    //创建完成后
    this.init()
  },
  filters: {
    //过滤器
    format(value1) {
      let aa = jsonFormat(value1, {
        type: 'space',
        size: 2
      })
      console.log(aa)
      return aa
    }
  }
}
</script>

<style>

</style>
