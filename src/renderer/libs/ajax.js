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
      this.get_send(url, senddata, callbak)
    }
  }

  get_send (url, senddata, callbak) {
    this.axios.get(url, {
      params: senddata.get
    }).then(callbak).catch((error) => {
      console.log('error', error)
    })
  }

}

export default ajax
