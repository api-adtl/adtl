<template>
    <div id="wrapper">
        <main>
            <div class="left-side">
                <span class="title">
                  欢迎使用API测试工具
                </span>

                <div @dragover="dragover" @drop="dropopen" id="holder">
                    拖动项目文件夹/项目描述文件到这里
                </div>

                <div v-if="hist">
                    项目列表:

                    <ul>
                        <li v-for="hi in hist" @click="open_obj(hi)">
                            {{hi}}
                        </li>
                    </ul>
                </div>

            </div>
        </main>
    </div>
</template>

<script>
  import cache from '@/logic/cache'

  export default {
    name: 'landing-page',
    data () {
      return {
        hist: null
      }
    },
    components: {},
    methods: {
      open_obj (now) {
        console.log('open', now)
        this.$store.commit('set_now', now)
        this.$router.push('/open/')
      },

      dropopen (e) {
        e.preventDefault()
        e.stopPropagation()
        for (let f of e.dataTransfer.files) {
          //跳转
          this.$store.commit('set_now', f.path)
          this.$router.push('/open/')
        }
      },
      dragover (e) {
        e.preventDefault()
        e.stopPropagation()
      },
      open_old () {
        let old = cache.get([this.now, 'now'])
        console.log(130, old)
        if (old) {
          this.$router.push(old)
        }
      }
    },
    created () {
      let hist = this.$ls.get('history')
      this.hist = hist
      this.open_old();

    }
  }
</script>

<style>
    #holder {
        width: 200px;
        height: 200px;
        background-color: blanchedalmond;
    }

    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Source Sans Pro', sans-serif;
    }

    #wrapper {
        background: radial-gradient(
                ellipse at top left,
                rgba(255, 255, 255, 1) 40%,
                rgba(229, 229, 229, .9) 100%
        );
        height: 100vh;
        padding: 60px 80px;
        width: 100vw;
    }

    #logo {
        height: auto;
        margin-bottom: 20px;
        width: 420px;
    }

    main {
        display: flex;
        justify-content: space-between;
    }

    main > div {
        flex-basis: 50%;
    }

    .left-side {
        display: flex;
        flex-direction: column;
    }

    .welcome {
        color: #555;
        font-size: 23px;
        margin-bottom: 10px;
    }

    .title {
        color: #2c3e50;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 6px;
    }

    .title.alt {
        font-size: 18px;
        margin-bottom: 10px;
    }

    .doc p {
        color: black;
        margin-bottom: 10px;
    }

    .doc button {
        font-size: .8em;
        cursor: pointer;
        outline: none;
        padding: 0.75em 2em;
        border-radius: 2em;
        display: inline-block;
        color: #fff;
        background-color: #4fc08d;
        transition: all 0.15s ease;
        box-sizing: border-box;
        border: 1px solid #4fc08d;
    }

    .doc button.alt {
        color: #42b983;
        background-color: transparent;
    }
</style>
