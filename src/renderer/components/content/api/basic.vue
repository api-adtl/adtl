<template>
    <div>
        基本信息编辑 {{dd}}


        <div v-if="!edit">
            <div>
                请求类型: <span> {{ dd.request_type }}</span>
            </div>

            <div>
                名字 : <span> {{ dd.name }}</span>
            </div>

            <div>
                标识 : <span> {{ dd.e_name }}</span>
            </div>


            <div>
                所处分组 : <span> {{ dd.dir }}</span>
            </div>

            <div>
                网址 : <span> {{ dd.url }}</span>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'basic',

    data () {
      return {
        form: {
          url: ''
        }
      }
    },
    props: [
      //数据传参
      'dd',
      'edit'
    ],
    methods: {
      //方法列表
      //方法列表
      init () {

      },
      save () {

      }
    },
    watch: {
      //监听列表
      edit (new1) {
        if (new1 === false) {
          console.log('没有机会了!')
        } else {
          this.$router.push({
            name: 'edit_api',
            query: {
              dir: this.dd.dir,
              e_name: this.dd.e_name
            }
          })

        }
      }
    },
    created () {
      //创建完成后
      this.init()
    },
  }
</script>

<style>

</style>
