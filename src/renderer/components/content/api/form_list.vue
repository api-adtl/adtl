<template>
  <div>
    <Form label-position="right" :label-width="100">
      <FormItem v-for="input in list" :label="input.name" >
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
      formRight:{
        input1:1,
        input2:2,
        input3:3
      }
    };
  },
  props:[
      'list'
  ]
}
</script>

<style scoped>

</style>