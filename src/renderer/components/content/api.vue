<template>
    <div style="overflow: auto;height: 100%;">
        <div>
            <h3>
              {{dd1.name}}
            </h3>
            <div style="font-size: 20px">
              <span class="request_type">
                {{dd1.request_type}}
              </span>
              <span>
                {{request_true_url}}
              </span>

              <span style="color: #a1a1a1">
                {{dd1.e_name}}
              </span>
              <Button @click="deletee" size="small" type="primary">删除API</Button>
            </div>


            <br>
            分组信息 : {{group_env}} <br>
            SEND : {{send}} <br>
            grnerated: {{grnerated}}
        </div>

        <br>

        <div>
            <Menu @on-select="select1" active-name="readme" mode="horizontal" theme="light">
                <MenuItem name="readme" style="padding: 0 10px;">
                    <Icon type="ios-paper"/>
                    readme
                </MenuItem>
                <MenuItem name="jiben" style="padding: 0 10px;">
                    <Icon type="ios-settings"/>
                    基本信息
                </MenuItem>
                <MenuItem name="get" style="padding: 0 10px;">
                    <Icon type="ios-construct"/>
                    get
                </MenuItem>

                <MenuItem name="form" style="padding: 0 10px;">

                    <Icon type="ios-apps"/>
                    form
                </MenuItem>

                <MenuItem name="header" style="padding: 0 10px;">
                    <Icon type="md-attach"/>
                    header
                </MenuItem>

                <MenuItem name="test" style="padding: 0 10px;">
                    <Icon type="ios-alarm"/>
                    test
                </MenuItem>

                <MenuItem name="generated" style="padding: 0 10px;">
                    <Icon type="ios-alarm"/>
                    generated
                </MenuItem>


            </Menu>

            <div v-show="select.readme">
                <div>
                    <Button @click="()=>{this.edit.readme=!this.edit.readme}" icon="ios-search"
                            shape="circle"
                            type="primary">编辑
                    </Button>
                    <readme :dd="dd1" :edit="edit.readme" v-model="is_init"></readme>

                </div>

            </div>
            <div v-if="is_init" v-show="select.jiben">
                基本信息
                <Button @click="()=>{this.edit.jiben=!this.edit.jiben}" icon="ios-search"
                        shape="circle"
                        type="primary">编辑
                </Button>
                <basic :dd="dd1" :edit="edit.jiben"></basic>
            </div>
            <div v-if="is_init" v-show="select.get">
                <api_get :dd="dd1" :edit="edit.get" v-model="send.get"></api_get>
            </div>
            <div v-if="is_init" v-show="select.form">
                <api_form :dd="dd1" :edit="edit.form" v-model="send.form">
                </api_form>
            </div>
            <div v-if="is_init" v-show="select.header">

                <api_header :dd="dd1"
                            @save="send_save"
                            v-model="send.headers">
                </api_header>
            </div>

            <div v-if="is_init" v-show="select.test">
                <api_test :api="dd1" :grnerated="grnerated"
                          :group="group_env"
                          :send="send"></api_test>
            </div>

            <div v-if="is_init" v-show="select.generated">
                <Button @click="()=>{this.edit.generated=!this.edit.generated}" icon="ios-search"
                        shape="circle"
                        type="primary">编辑
                </Button>
                <generated :api="dd1"
                           :edit="edit.generated"
                           :group="group_env"
                           :send="send"

                           v-model="grnerated"></generated>
            </div>


        </div>


    </div>
</template>

<script>
  import readme from './api/readme'
  import basic from './api/basic'
  import api_get from './api/get'
  import api_form from './api/form'
  import api_header from './api/header'
  import api_test from './api/test'
  import lists from '../../logic/lists'
  import group from '@/logic/group'
  import generated from './api/generated'
  import envv from "../../logic/envv";

  export default {
    name: 'api',
    //混合
    mixins: [],
    delimiters: [
      //改变纯文本插入分隔符
    ],
    data () {
      return {
        envlist:{},
        now_env:[],
        group: {},
        group_env:{},
        is_init: false,
        send: {
          get: {},
          form: {},
          headers: {}
        },
        send_env:{},
        select: {
          readme: true,
          jiben: false,
          get: false,
          form: false,
          header: false,
          test: false,
          generated: false
        },
        grnerated: {},
        edit: {
          readme: false,
          jiben: false,
          get: false,
          form: false,
          header: false,
          test: false,
          generated: false
        }
      }
    },
    //无状态组件
    functional: false,

    extends: {
      // 扩展
    },

    props: [
      'number'
    ],

    components: {
      //注册组件
      readme,
      basic,
      api_get,
      api_form,
      api_header,
      api_test,
      generated
    },
    watch: {
      number () {
        this.init()
      },
      envselect(){
        this.group_env = this.apply_env(this.group)
      },
    },
    computed:{
      envselect(){
        return this.$store.state.envselect;
      },
      request_true_url(){
        return this.group_env.type+'://'+this.group_env.domain+':'+this.group_env.port+this.dd1.url;
      }
    },

    methods: {
      /**
       * 发送数据发生改变
       *
       */
      send_save(){
        this.send_env = this.apply_env(this.send);
      },
      /**
       * 应用环境变量数据
       * @param data
       */
      apply_env(data){

        let jsonstring = JSON.stringify(data);
        this.now_env = this.envlist[this.$store.state.envselect];

        for (let envob of this.now_env){

          jsonstring = jsonstring.replace('{'+envob.name+'}', envob.value)
        }
        console.log("应用环境变量",jsonstring,data);
        return JSON.parse(jsonstring);
      },
      deletee () {
        console.log('删除')
        let listb = new lists(this.dd1.dir)
        listb.read((data) => {
          console.log('data', data)
          listb.remove_api(this.dd1.e_name, () => {
            this.$Message.success('删除成功!')
            this.$router.push('/open/')
          })
        })

      },
      //方法列表
      select1 (name) {
        console.log('select1')
        this.select.readme = false
        this.select.jiben = false
        this.select.get = false
        this.select.form = false
        this.select.header = false
        this.select.test = false
        this.select.generated = false
        this.select[name] = true
      },
      /**
       * 读取环境变量
       */
      read_env(){
        let envvob= new envv();
        envvob.read((data)=>{
          console.log("环境变量读取成功!");
          this.envlist=data;
          this.read_api();
          this.read_group();
        })

      },
      read_group(){
        let groupb = new group(this.dd1.dir)
        groupb.read('info', {}, (data) => {
          if (this.$lodash.isEmpty(data)) {
            groupb.readp('info', {}, (data) => {
              console.log('readgroup', data)
              this.group_env = this.apply_env(data);
              this.group= data;
            })

          } else {
             this.group_env = this.apply_env(data);
            this.group= data;
          }
        })
      },
      //初始化
      init () {
        this.dd1 = this.$store.state.api_list[this.number]
        this.read_env();
      },
      read_api () {
        console.log('read_api', this.dd1.dir)
        let listo = new lists(this.dd1.dir)
        listo.read((data) => {
          console.log('read_api ok:', data)
          this.dd1 = data.api[this.dd1.e_name]
        })
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
