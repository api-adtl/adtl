<template>
  <div>
    all_api
    <Button @click="update_unqid">
      升级标识符
    </Button>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-input v-model="filterName" type="search" placeholder="搜索">
        </vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
        height="300"
        max-height="700"
        :data="list2">
      <vxe-table-column type="seq" width="50">
      </vxe-table-column>
      <vxe-table-column field="uniqid" title="标识符"
                        min-width="100">
      </vxe-table-column>
      <vxe-table-column field="name" title="名字"
                        type="html" min-width="200">
      </vxe-table-column>
      <vxe-table-column field="request_type"
                        title="请求类型" min-width="80">
      </vxe-table-column>
      <vxe-table-column
          field="soft_link"
          :filters="[{data: null}]"
          :filter-render="{name: 'iSwitch'}"
          :cell-render="{name: 'iSwitch', props: {disabled: true}}"

                        title="链接" min-width="80">
      </vxe-table-column>
      <vxe-table-column field="url" title="地址"
                        type="html" min-width="200">
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
import api_basic from "../../logic/api_basic";
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
    /**
     * 更新唯一标识符
     */
    update_unqid(){
      for (let li in this.$store.state.api_list){
        let api = this.object_copy(this.$store.state.api_list[li]);
        console.log(api);

        // eslint-disable-next-line no-unreachable
        let apiob = new api_basic(api.dir,api.e_name);
        apiob.read((data)=>{
          apiob.save(data,()=>{

          });
        })
        break;
      }
    },
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
      for (let li in this.$store.state.api_list){
        // console.log('46',api)
        let api = this.object_copy(this.$store.state.api_list[li]);
        if(typeof api.soft_link === 'boolean' && api.soft_link){
            let api2 = this.object_copy(this.$store.state.api_list[api.soft_link_id]);
            api.request_type = api2.request_type;
            api.url = api2.url;
            api.dir = api2.dir;
            api.data_type = api2.data_type;
        }
        this.data2.push(this.object_copy(api));
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