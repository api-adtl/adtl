<template>
    <div>
        <div style="border: cadetblue solid 1px ;margin: 2px;padding:1px 1px">
            <Collapse>
                <Panel :name="groupobj.e_name" v-for="groupobj in listdata.group">
                    {{groupobj.name}} <span class="type">{{groupobj.type}}</span>
                    <p slot="content">
                        <list_index :add="add" :dir="groupobj.e_name|dirr(dir)"></list_index>
                    </p>
                </Panel>

            </Collapse>
            <CellGroup>
                <Cell :extra="apiobj.request_type" :title="apiobj.name"
                      :to="apiobj.number|apito" style="border: #ccc solid 1px;margin-top: 2px"
                      v-for="apiobj in listdata.api"/>
            </CellGroup>

        </div>

        <div style="margin-bottom: 1px" v-if="add">
            <Button @click="add_group" type="primary">+分组</Button>
            <Button @click="add_api" type="primary">+API</Button>
        </div>

    </div>

</template>

<script>
  import lists from '@/logic/lists'
  import list_index from './index'
  import path from 'path'

  export default {
    name: 'list_index',
    data () {
      return {
        listdata: {}
      }
    },
    props: [
      'dir',
      'add'
    ],
    //dir
    filters: {
      dirr (value, dir) {
        return path.join(dir, value)
      },
      apito (value) {
        return {name: 'api', query: {number: value}}
      }
    },
    components: {list_index},
    methods: {
      add_group () {
        console.log('增加分组')
        this.$emit('add_content', 'add_group')
      },
      add_api () {
        console.log('增加API')
        this.$emit('add_content', 'add_api')
      }
    },
    created () {
      let listo = new lists(this.dir)
      listo.read((data) => {
        this.listdata = data
        this.$lodash.forIn(this.listdata.group, (group) => {
          console.log('group', group)
        })
      })
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
