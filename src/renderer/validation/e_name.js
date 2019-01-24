import _ from 'lodash'

export default {
  getMessage (field) {
    return field + '字段不能为这个值(保留字)!'
  },
  validate (value) {
    let no = [
      'list',
      'api',
      'lists',
      'group'
    ]
    if (_.indexOf(no, value)) {
      return false
    }
  }
}
