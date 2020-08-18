export default {
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
            console.log("应用环境变量", jsonstring, data, this.now_env);
            return JSON.parse(jsonstring);
        },
    }
}