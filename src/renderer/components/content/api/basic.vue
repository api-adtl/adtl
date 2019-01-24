<template>
    <div>
        基本信息编辑{{edit}}
        <div v-if="edit">
            编辑
            <form action="">
                <div>
                    网址 :
                    <Input v-model="form.url"/>
                </div>

            </form>
        </div>

        <div v-if="!edit">
            <div>
                网址 : <span> {{ form.url }}</span>
            </div>
        </div>
    </div>
</template>

<script>
  import api from '@/logic/api'

  export default {
    name: 'kong',

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
        this.apiobj = new api(this.dd)
        this.apiobj.read('basic', this.form, (data) => {
          console.log('rad', data)
          this.form = data
        })
      },
      save () {
        console.log('save4basic')
        this.apiobj.save('basic', this.form, () => {
          console.log('保存成功')
        })

      }
    },
    watch: {
      //监听列表
      edit (new1) {
        if (new1 === false) {
          this.save()
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
