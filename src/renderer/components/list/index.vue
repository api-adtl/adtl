<template>
  <div style="overflow-y: auto">
    <div :style="style2" style="margin-top: 10px;margin-left: 3px;margin-right: 2px;">
      <div>
        <Collapse>
          <Panel :name="groupobj.e_name"
                 v-for="(groupobj,index) in listdata.group"
                 :key="index">
            {{ groupobj.name }}
            <span class="group_type">{{ groupobj.type }}</span>
            ({{ groupobj['api_count'] }})

            <p slot="content">
              <list_index :add="add"
                          @count="countfun"
                          :dd="groupobj"
                          :dir="groupobj.e_name|dirr(dir)"
                          :zhantie="zhantie"
                          v-on:fuzhi="fuzhi"
                          :f5="f5"
                          @add_content="add_content">
              </list_index>
            </p>
          </Panel>

        </Collapse>
        <div>
          <div v-for="(apiobj,index) in listdata.api" :key="index">
            <div :class="apicalss">
              <div @click.left="goto(apiobj)"
                   @click.right="youjian(apiobj)">
                <Poptip trigger="focus"
                        content="点击打开，右击复制,再点取消复制">
                  <div>
                    <Icon v-if="apiobj.soft_link" type="ios-link"/>
                    <span>
                         {{ apiobj.name }}
                      </span>
                    <span>
                      <span class="request_type">
                        {{ apiobj.request_type }}
                      </span>
                    </span>


                  </div>
                </Poptip>

              </div>

            </div>
          </div>
        </div>
      </div>
      <span>
        API:{{ now_api_count }};合计 {{ count.api_count }}

        <br>
        分组:{{ now_group_count }};合计 {{ count.group_count }}

      </span>
      <div style="margin-bottom: 1px" v-if="add">
        <Button @click="add_group" size="small" type="primary">+分组</Button>

        <Button @click="open_in_folder" size="small" type="primary">OIF</Button>
      </div>


      <div v-if="dir!='.' && add">

        <Button v-if="dd.type  != 'test'"
                @click="add_api" size="small" type="primary">+API
        </Button>
        <Button v-if="dd.type  == 'test'"
                @click="add_test" size="small" type="info">+TEST
        </Button>

        <Button v-if="dd.type  != 'test'"
                @click="group_info" size="small" type="primary">当前分组参数
        </Button>
        <Button @click="edit_group" size="small" type="primary">编辑分组</Button>
        <Button @click="del_group" size="small" type="primary">删除分组</Button>

        <Button v-if="zhantie" @click="zhantie2"
                size="small" type="primary">粘贴到此分组
        </Button>
      </div>
    </div>


  </div>

</template>

<script>
import lists from '@/logic/lists'
// import tool from '@/libs/tool'
import list_index from './index'
import path from 'path'
import {shell} from 'electron'
import lodash from 'lodash';

export default {
  name: 'list_index',
  data() {
    return {
      count: {
        api_count: 0,
        group_count: 0
      },
      count_list: {},
      listdata: {
        group: {},
        api: {}
      }
    }
  },
  props: [
    'dir',
    'add',
    'dd',
    'f5',
    'zhantie'
  ],
  watch: {
    f5() {
      console.log('f5')
      this.init()
    }
  },
  //dir
  filters: {
    dirr(value, dir) {
      return path.posix.join(dir, value)
    },
    apito(value) {
      console.log('79', value)
      if (value.request_type == 'ws') {
        return {name: 'api_ws', query: {number: value.number}}
      } else {
        return {name: 'api', query: {number: value.number}}
      }

    }
  },
  computed: {
    style2() {
      return {
        // 'border-color':tool.getRandomColor()
      }

    },
    now_api_count() {
      return Object.keys(this.listdata.api).length;
    },
    now_group_count() {
      return Object.keys(this.listdata.group).length;
    },
    apicalss() {
      if (this.dd.type == 'test') {
        return 'api-li-test';
      }
      if (this.dd.type == 'ws') {
        return 'api-li-ws';
      }

      return 'api-li';
    }
  },
  components: {list_index},
  methods: {
    countfun([ename, sub_count]) {
      if (ename) {
        // this.count_list[ename]= sub_count;
        let gg169 = this.object_copy(lodash.merge(this.listdata.group[ename], sub_count));
        console.log(gg169);
        this.$set(this.listdata.group,
            ename,
            gg169
        );

        let api_count = this.now_api_count;
        let group_count = this.now_group_count;
        for (let li in this.listdata.group) {
          let gg = this.listdata.group[li];

          if (typeof gg['api_count'] === 'number') {
            api_count = api_count + gg['api_count'];
            group_count = group_count + gg['group_count'];
          }
        }
        this.count = {
          api_count: api_count,
          group_count: group_count
        };

      }

      if (typeof (this.dd) === 'object') {
        console.log('emit1911', this.dd['e_name'], this.count)
        // let argg= [];
        this.$emit('count', [this.dd['e_name'], this.count]);
      }


    },
    apito(value) {
      if (this.dd.type == 'test') {
        return {name: 'test', params: {apiid: value.number}}
      } else {
        if (value.request_type == 'ws') {
          return {name: 'api_ws', params: {apiid: value.number}}
        } else {
          return {name: 'api', params: {apiid: value.number}}
        }
      }
    },
    goto(api) {
      console.log(11155, this.apito(api));
      this.$router.push(this.apito(api));
      console.log(api);
    },
    youjian(api) {
      this.$ls.set('fuzhi', api);
      this.fuzhi();
    },
    fuzhi() {
      this.$emit('fuzhi');
    },
    zhantie2() {
      console.log("粘贴1");

      this.$emit('add_content', {
        name: 'fuzhi_api',
        query: {
          dir: this.dir
        }
      })
      this.$emit('fuzhi');
    },
    open_in_folder() {
      this.$Message.loading('正在使用文件管理器打开...')
      setTimeout(() => {
        shell.showItemInFolder(path.join(this.$store.state.now_open, this.dir))
      }, 1000)

    },
    empty(valuee) {
      console.log('ll', valuee)
      return this.$lodash.isEmpty(valuee)
    },
    group_info() {
      this.$router.push({
        name: 'group_info', query: {
          dir: this.dd.dir,
          e_name: this.dd.e_name
        }
      })
    },
    edit_group() {
      if (this.dir != '.' && this.listdata.dir != '.') {
        this.$router.push({
          name: 'edit_group', query: {
            dir: this.dd.dir,
            e_name: this.dd.e_name
          }
        })
      }

    },
    del_group() {
      console.log('shanchu', this.dd)
      this.$Modal.confirm({
        title: '删除警告!',
        content: '<p>您确定要删除这个分组么?名字:' + this.name,
        onOk: () => {
          let listo = new lists(this.dd.dir)
          listo.read(() => {
            listo.remove_group(this.dd.e_name, () => {
              this.$Message.info('删除完成!')
              // this.$router.currentRoute;

              // this.$router.push('/open')
            })
          })

        },
        onCancel: () => {
          this.$Message.info('出尔反尔!')
        }
      })

    },
    add_group() {
      console.log('增加分组')
      this.$emit('add_content', {
        name: 'add_group',
        query: {
          dir: this.dir
        }
      })
    },
    add_content(content) {
      this.$emit('add_content', content)
    },
    add_api() {
      console.log('增加API')
      this.$emit('add_content', {
        name: 'add_api',
        query: {
          dir: this.dir
        }
      })
    },
    add_test() {
      this.$emit('add_content', {
        name: 'add_test',
        query: {
          dir: this.dir
        }
      })
    },
    init() {
      let listo = new lists(this.dir)
      listo.read((data) => {
        this.listdata = this.$lodash.cloneDeep(data)
        this.$lodash.forIn(this.listdata.api, (b, key) => {

          this.$store.commit('add_api', b, key)
          // this.listdata.api[key].number = this.$store.getters.apinum

        })

        this.$lodash.forIn(this.listdata.group, (b, key) => {

          this.$store.commit('add_group', this.$lodash.clone(b))
          this.listdata.group[key].number = this.$store.getters.apinum

        })
        this.count = {
          api_count: this.now_api_count,
          group_count: this.now_group_count
        };
        this.countfun([false, {}]);
      })
    }
  },
  created() {
    this.init()

  }
}
</script>

<style>

.type {
  font-size: 1.1em;
  font-weight: bold;
  color: brown;
}

.ivu-cell-extra {
  font-size: 1.1em;
  font-weight: bold;
  color: brown;
}
</style>
