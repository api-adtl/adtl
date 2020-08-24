<template>
  <div>
    all_api
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-input v-model="filterName" type="search" placeholder="搜索">
        </vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
        height="300"
        max-height="1000"
        :data="list2">
      <vxe-table-column type="seq" width="50">
      </vxe-table-column>
      <vxe-table-column field="number" title="标识符" min-width="100">
      </vxe-table-column>
      <vxe-table-column field="name" title="名字" type="html" min-width="200">
      </vxe-table-column>
      <vxe-table-column field="request_type" title="请求类型" min-width="100">
      </vxe-table-column>
      <vxe-table-column field="url" title="地址"  type="html" min-width="200">
      </vxe-table-column>
      <vxe-table-column type="seq"
                        width="160"
                         show-overflow>
        <template v-slot:header>
          <div>
            动作
          </div>
        </template>
        <template v-slot="{ row }">
          <vxe-button @click="showDetailEvent(row)">
            打开API
          </vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <div>

    </div>
  </div>
</template>

<script>
import XEUtils from 'xe-utils';
export default {
  name: "all_api",
  data() {
    return {
      filterName: '',
      titlehelp:{message: '双击打开这个API'},
      columns1: [
        {
          title: 'API名字',
          key: 'name'
        },
        {
          title: '地址',
          key: 'url'
        },
      ],
      list: this.$store.state.api_list,
      data2:[]
    }
  },
  methods:{
    showDetailEvent(api){
      console.log(11155, this.apito(api));
      this.$router.push(this.apito(api));
    },
    apito(value) {
      if (value.request_type == 'ws') {
        return {name: 'api_ws', params: {apiid: value.number}}
      } else {
        return {name: 'api', params: {apiid: value.number}}
      }
    },
    init(){
      for (let api in this.$store.state.api_list){
        // console.log('46',api)
        this.data2.push(this.$store.state.api_list[api]);
      }
    }
  },
  computed:{
    list2(){
      const filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const options = { children: 'children' }
        const searchProps = ['name', 'url']
        const rest = XEUtils.searchTree(this.data2,
            item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1), options)
        XEUtils.eachTree(rest, item => {
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
        }, options)
        return rest;
      }
      return this.data2;
    }

  },
  mounted() {
      this.init();
  }
}
</script>

<style>
.keyword-lighten {
  color: #000;
  background-color: #FFFF00;
}
</style>