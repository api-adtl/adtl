<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo" :class="{'dev-logo':!isPackaged}">
                      
                    </div>
                    <div class="layout-nav">
                        <router-link to="/">
                            <Button type="success" @click="edit" ghost>返回首页</Button>
                        </router-link>

                        <Button type="warning" @click="edit" ghost>编辑</Button>
                        <span v-if="obj_data" style="    color: white;">
                            项目名字: <span class="info">{{obj_data.name}}</span>

                            描述: <span class="info">
                              {{obj_data.description}}     {{isPackaged}}
                          </span>
                        </span>

                        <div style="width: 200px;float: right;color: white;">
                          <envv @change="envselect_change"></envv>
                        </div>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{padding: '0 10px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>{{now}}</BreadcrumbItem>
                    <BreadcrumbItem> 神马API（我还没想好这个怎么弄） </BreadcrumbItem>
                </Breadcrumb>
              
                <Content :style="{padding: '24px 0', minHeight: '280px',overflowY:true, background: '#fff'}">
                    <Layout>
                        <Sider hide-trigger width="250" :style="{background: '#fff'}">
                            <div id="lists" style="min-height: 650px;">
                                <list v-model="content_list"></list>
                            </div>
                        </Sider>
                        <Content :style="{padding: '2px', minHeight: '650px', background: '#fff'}">
                            <router-view v-if="now"></router-view>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2018-2020 &copy; ADTl项目组</Footer>
        </Layout>
    </div>
</template>

<script>

  import fs from 'fs'
  import path from 'path'
  import list from './list'
  import envv from './envv'
  import content_index from './content/index'
  import  process  from 'process'

  export default {
    data () {
      return {
        isdir: false,
        index: '',
        obj_data: {},
        iframesrc: '/#/kong',
        content_index: 0,
        content_list: {},
        now: this.$store.state.now_open,
        isPackaged:true,
      }
    },
    name: 'open',
    components: {list, content_index,envv},
    beforeRouteUpdate (to, from, next) {
      this.init()
      next()
    },
    methods: {
      envselect_change(){
        console.log("当前环境变量组改变");
        this.$forceUpdate();
      },
      dir_call () {
        this.index = path.join(this.now, 'index.json')
        console.log(this.isdir, this.now, this.index)
        fs.access(this.index, fs.constants.F_OK, (err) => {
          if (err) {
            console.log('不存在')
            this.create()
          } else {
            console.log('存在')
            this.read()
          }

        })
      },
      read () {
        // 读取数据
        this.isPackaged = !process.env.WEBPACK_DEV_SERVER;
        // 保存历史
        let hist = this.$ls.get('history')
        if (hist == null) {
          hist = []
        }
        hist.push(this.now)
        hist = this.$lodash.uniq(hist)
        console.log('当前项目列表', hist)
        this.$ls.set('history', hist)
        fs.readFile(this.index, {
          encoding: 'utf8'
        }, (err, data) => {
          if (err) {
            throw err
          }
          console.log('这是配置文件的内容:', data)
          this.obj_data = JSON.parse(data)
        })
      },
      edit () {
        console.log('edit')
        //this.$Message.warning("编辑的逻辑等待开发!");
        this.$router.push({name: 'create', params: {index: this.index}})
      },
      create () {
        //新建一个项目
        this.$router.push({name: 'create', params: {index: this.index}})
      },
      init () {
        this.$store.dispatch('api_num')
        if (this.now) {
          console.log('now', this.now)
          fs.stat(this.now, (err, stats) => {
            console.log(err, stats)
            if (err) {
              throw err
            } else {
              if (stats.isDirectory()) {
                //文件夹
                console.log('文件夹的处理逻辑!')
                this.isdir = true
                this.dir_call()
              } else {
                // 文件处理逻辑
                let pp = path.dirname(this.now)
                this.$store.commit('set_now', pp)
                this.$Message.success('正在打开!')

                this.$router.push('/open/')
              }
            }

          })
        }

      }

    },
    created () {
      
      if (this.now) {
        this.init()
      } else {
        this.$router.push('/')
      }

    }
  }
</script>

<style>
    .dev-logo{
      border-color:red;
    }
   
   

    .info {
        color: cadetblue;
    }


    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;

        border-radius: 4px;
        height: 100vh;
    }

    .layout-logo {
      border-style: solid;
      border-width: 1px;
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 600px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .layout-footer-center {
        text-align: center;
    }

</style>
