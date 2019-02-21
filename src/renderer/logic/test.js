// 测试逻辑
import ajax from '../libs/ajax'
import ws from '../libs/ws'

class test {

  constructor (api, group) {
    this.api = api
    this.group = group
    if (this.group.type == 'http' || this.group.type == 'https') {
      this.connect = new ajax(group.type, group.domain, group.port)
    } else {
      this.connect = new ws(group.type, group.domain, group.port)
    }
  }

  send (senddata, callbak) {
    this.connect.send(this.api.request_type, this.api.url, senddata, callbak)
  }

  close () {
    this.connect.close()
  }
}

export default test
