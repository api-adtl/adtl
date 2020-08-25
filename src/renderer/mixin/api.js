
import lists from "../logic/lists";

export default {
    methods: {

        deletee() {
            console.log('删除')
            let listb = new lists(this.dd1.dir)
            listb.read((data) => {
                console.log('data', data)
                listb.remove_api(this.dd1.e_name, () => {
                    this.$Message.success('删除成功!')
                    this.$router.push('/open/')
                })
            })

        },
        deletee_link() {
            console.log('删除软连接', this.dd_softlink)
            let listb = new lists(this.dd_softlink.dir)
            listb.read((data) => {
                console.log('data', data)
                listb.remove_softapi(this.dd_softlink.e_name, () => {
                    this.$Message.success('删除软连接成功!')
                    this.$router.push('/open/')
                })
            })
        },
    },

}