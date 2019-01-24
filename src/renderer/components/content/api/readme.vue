<template>
    <div>
        <mavon-editor
                :defaultOpen="defaultOpen"
                :subfield="false"
                :toolbarsFlag="toolbarsFlag"
                @save="save"
                style="height: 100%"
                v-model="readme"></mavon-editor>
    </div>
</template>

<script>
  import api from '@/logic/api'

  export default {
    name: 'readme',
    //混合
    mixins: [],
    delimiters: [
      //改变纯文本插入分隔符
    ],
    data () {
      return {
        readme: '',
        defaultOpen: 'preview',
        toolbarsFlag: false,
        apiobj: {}
      }
    },
    props: [
      //数据传参
      'dd',
      'edit'
    ],
    computed: {
      //计算属性
    },
    components: {
      //注册组件
    },
    methods: {
      //方法列表
      init () {
        this.apiobj = new api(this.dd)
        this.apiobj.readme((data) => {
          this.readme = data
        })
      },
      save () {
        this.apiobj.readme_save(this.readme, () => {
          console.log('保存成功')
        })

      }
    },
    watch: {
      //监听列表
      edit (new1) {
        if (new1) {
          this.toolbarsFlag = true
          this.defaultOpen = 'edit'
        } else {
          this.toolbarsFlag = false
          this.defaultOpen = 'preview'
          this.save()
        }
        console.log(new1)
      }
    },
    beforeCreate () {
      //初始化之后
    },
    created () {
      //创建完成后
      this.init()
    }
  }
</script>

<style>

</style>
