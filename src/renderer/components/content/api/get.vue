<template>
    <div>
        GET信息编辑{{edit}}
        <div v-if="edit">
            编辑
            <form action="">
                <table border="1" style="    width: 100%;">
                    <tr v-for="input,key in form">
                        <th>
                            <input type="text" v-model="form[key].name">
                        </th>
                        <th><input type="text" v-model="form[key].value"></th>
                        <th><input type="text" v-model="form[key].description"></th>
                    </tr>
                    <tr>
                        <th colspan="3">

                            <div @click="add_one">
                                增加一个
                            </div>
                        </th>
                    </tr>

                </table>

            </form>
        </div>

        <div v-if="!edit">
            <div v-for="input,key in form2">
                {{ input.name }} :
                <Input style="width: 300px" v-model="input.value"/>
                <span>
                    {{ input.description }}
                </span>

            </div>
        </div>
    </div>
</template>

<script>
  import api from '@/logic/api'

  export default {
    name: 'get',

    data () {
      return {
        form: [
          {
            name: '',
            value: '',
            description: ''
          }
        ],
        form2: [
          {
            name: '',
            value: '',
            description: ''
          }
        ],
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
        this.apiobj.read('get', this.form, (data) => {
          console.log('rad', data)
          this.form = data
          this.form2 = this.$lodash.cloneDeep(this.form)

        })
      },
      save () {
        console.log('save4get')
        let newdata = []
        for (let val of this.form) {
          if (val.name != '') {
            newdata.push(val)
          }
        }
        this.form = newdata
        this.form2 = this.$lodash.cloneDeep(this.form)
        this.apiobj.save('get', [], () => {
          console.log('保存成功')
        })
      },
      add_one () {
        this.form.push({
          name: '',
          value: '',
          description: ''
        })
      }
    },
    watch: {
      //监听列表
      edit (new1) {
        if (new1 === false) {
          this.save()
        }
      },
      dd () {
        this.init()
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
