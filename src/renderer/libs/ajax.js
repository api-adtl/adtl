import axios from 'axios'

class ajax {
  constructor (protocol, hostname, port) {
    let url2 = protocol + '://' + hostname + ':' + port
    this.axios = axios.create({
      baseURL: url2
    })
  }

  send (type, url, senddata, callbak) {
    console.log('send12', arguments)
    if (type == 'get') {
      this.axios.request({
        method: type,
        url: url,
        data: senddata.form,
        params: senddata.get,
        headers: senddata.header
      }).then(callbak).catch(() => {

      })
    }
  }


}

export default ajax
