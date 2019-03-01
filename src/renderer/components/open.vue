<template>
    <div class="layout">

        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">123</div>
                    <div class="layout-nav">
                        <router-link to="/">
                            <Button type="success" @click="edit" ghost>返回首页</Button>
                        </router-link>

                        <Button type="warning" @click="edit" ghost>编辑</Button>
                        <span v-if="obj_data">
                            项目信息:                            名字: <span class="info">{{obj_data.name}}</span>

                            描述: <span class="info">
            {{obj_data.description}}
        </span>
                        </span>


                    </div>
                </Menu>
            </Header>
            <Layout :style="{padding: '0 10px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                当前位于: {{now}}
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff'}">
                            <div id="lists" style="height: 650px;overflow-y: auto;">
                                <list v-model="content_list"></list>
                            </div>
                        </Sider>
                        <Content :style="{padding: '2px', minHeight: '380px', background: '#fff'}">
                            <router-view v-if="now"></router-view>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2018-2019 &copy;青岛兴数网络科技有限公司</Footer>
        </Layout>
    </div>
</template>

<script>

  import fs from 'fs'
  import path from 'path'
  import list from './list'
  import content_index from './content/index'

  export default {
    data () {
      return {
        isdir: false,
        index: '',
        obj_data: {},
        iframesrc: '/#/kong',
        content_index: 0,
        content_list: {},
        now: this.$store.state.now_open
      }
    },
    name: 'open',
    components: {list, content_index},
    beforeRouteUpdate (to, from, next) {
      this.init()
      next()
    },
    methods: {
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
    .ivu-layout-sider {
        height: 520px;
    }

    .info {
        color: cadetblue;
    }


    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 900px;
    }

    .layout-logo {
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
        width: 540px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .layout-footer-center {
        text-align: center;
    }

</style>
