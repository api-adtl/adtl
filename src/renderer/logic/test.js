// 测试逻辑
import ajax from '@/libs/ajax'

class test {

  constructor (api, group) {
    this.api = api
    this.group = group
    if (this.group.type == 'http' || this.group.type == 'https') {
      this.connect = new ajax(group.type, group.domain, group.port)
    }
  }

  send (senddata, callbak) {
    this.connect.send(this.api.type, this.api.url, senddata, callbak)
  }
}

export default test
