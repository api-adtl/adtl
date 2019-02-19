<template>
    <div>
        结构 信息编辑{{edit}}
        <div v-if="edit">
            编辑
            <form action="">
                <table border="1" style="    width: 100%;">
                    <th><input type="text" v-model="form"></th>
                </table>
            </form>
        </div>

        <div v-if="!edit">
            {{form2}}
        </div>
    </div>
</template>

<script>
  import api from '@/logic/api'

  export default {
    name: 'api_structure',

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
          this.apiobj.read('structure', this.form, (data) => {
            console.log('ragetd', data)
            this.form = data
            this.init_data()

          })
        }

      },
      init_data () {
        let send = this.value
        let form2 = this.$lodash.cloneDeep(this.form)
        if (!this.$lodash.isEmpty(send)) {
          this.$lodash.forIn(form2, (d) => {
            if (!this.$lodash.isUndefined(send[d.name])) {
              d.value = send[d.name]
            }
          })
        }
        this.form2 = form2
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
