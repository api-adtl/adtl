import lodash from 'lodash';
import process from "process";

export default {
    computed: {
        isPackaged() {
            return !process.env.WEBPACK_DEV_SERVER;
        }
    },
    methods: {

        /**
         * 应用环境变量数据
         * @param data
         */
        apply_env(data) {

            let jsonstring = JSON.stringify(data);
            this.now_env = this.envlist[this.$store.state.envselect];
            for (let envob of this.now_env) {

                jsonstring = jsonstring.replace('{' + envob.name + '}', envob.value)
            }
            console.log("应用环境变量", jsonstring, jsonstring);
            return JSON.parse(jsonstring);
        },
        empty2(vall) {
            console.log('empty2', vall);
            return lodash.isEmpty(vall);
        },
        refresh_list() {
            let f5 = document.getElementById("f5");
            if (typeof f5 == 'object') {
                f5.click();
            }
            this.$Message.success("刷新列表完成!");

        }
    },

}