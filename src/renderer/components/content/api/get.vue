<template>
    <div>
        GET信息编辑{{edit}}
        <div v-if="edit">
            编辑
            <form action="">
                <table border="1" style="    width: 100%;">
                    <tr v-for="input,key in form">
                        <th>
                            <input type="text" v-model="form[key].name" placeholder="参数名字" >
                        </th>
                        <th><input type="text" v-model="form[key].value" placeholder="默认值"></th>
                        <th><input type="text" v-model="form[key].description" placeholder="提示信息"></th>
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
            <div v-for="input in form2">
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
        form: [],
        form2: [],
        ddata1: {}
      }
    },
    props: [
      //数据传参
      'dd',
      'edit',
      'value'
    ],
    methods: {
      //方法列表
      //方法列表
      init () {
        if (typeof this.dd.dir == 'string') {
          this.apiobj = new api(this.dd)
          this.apiobj.read('get', this.form, (data) => {
            console.log('ragetd', data)
            this.form = data
            this.init_data()

          })
        }

      },
      init_data () {
        
        this.form2 = this.$lodash.cloneDeep(this.form)
 
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
        this.apiobj.save('get', newdata, () => {
          console.log('保存成功')
        })
      },
      add_one () {
        this.form.push({
          name: '',
          value: '',
          description: ''
        })
      },
      input2 () {
        this.ddata1 = {}
        this.$lodash.forIn(this.form2, (d) => {
          this.ddata1[d.name] = d.value
        })
        this.$emit('input', this.ddata1)
        console.log('ddata', this.ddata1)
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
      },
      form2: {
        handler () {
          this.input2()
        },
        deep: true
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
