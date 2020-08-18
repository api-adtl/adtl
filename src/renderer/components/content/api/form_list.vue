<template>
  <div>
    <Form label-position="right" :label-width="100">
      <FormItem v-for="input in list2" :label="input.name" >
        <Row>
          <Col span="6">
            <Input v-model="input.value"></Input>
          </Col>

          <Col span="6">
            <span>
               &nbsp; &nbsp;{{ input.description }}
            </span>
          </Col>
        </Row>
      </FormItem>
    </Form>

  </div>
</template>

<script>
export default {
  name: "form_list",
  data(){
    return {
      list2:[],
      formRight:{

      }
    };
  },
  props:[
      'list'
  ],
  methods:{
    init(){
      this.list2 =JSON.parse(JSON.stringify(this.list));
    }
  },
  watch:{
    list(){
      this.init();
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>

</style>