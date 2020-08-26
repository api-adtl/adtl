
import lists from "../logic/lists";

export default {
    watch: {
        apiid() {
            this.init()
        }
    },
    methods: {
        deletee() {
            // 判断是否有引用
            for (let li in this.$store.state.api_list) {
                let api = this.object_copy(this.$store.state.api_list[li]);
                if(typeof api.soft_link ==='boolean' && api.soft_link){
                    if(api.soft_link_id ===this.dd1.uniqid){
                        console.log("不可删除");
                        this.$Message.error('存在软连接,不能删除!')
                        return ;
                    }
                }
            }

            // eslint-disable-next-line no-unreachable
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