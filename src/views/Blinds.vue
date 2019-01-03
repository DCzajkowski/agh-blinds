<template>
  <div class="p-8 max-w-3xl mx-auto">
    <div class="flex after:flex-auto -mx-4">
      <div v-for="(blind, index) in blinds" :key="`blind-${index}`" class="w-32 h-32 p-2 relative">
        <div class="absolute top-3 left-3 text-grey-darkest font-bold z-10 w-6 h-6 flex items-center justify-center text-sm">{{ index + 1 }}</div>
        <div class="h-28 w-28 bg-blue-light overflow-hidden">
          <div class="h-28 w-28 bg-grey transition-slowest" :style="`transform: translateY(-${blind}%)`"></div>
        </div>
      </div>
    </div>


    <div class="flex justify-between mt-32 w-full">
      <div>
        <mode-button :mode="mode" @click.native="toggleMode"></mode-button>
      </div>

      <template v-if="mode === 1">
        <div v-for="(blind, index) in blinds" :key="`panel-${index}`" class="flex flex-col">
          <up-button @click.native="up(index + 1)"></up-button>
          <down-button class="mt-4" @click.native="down(index + 1)"></down-button>
          <stop-button class="mt-4" @click.native="stop(index + 1)"></stop-button>
          <span class="mt-4 text-3xl text-grey flex justify-center">{{ index + 1 }}</span>
        </div>

        <div class="flex flex-col">
          <up-button @click.native="up('all')"></up-button>
          <down-button class="mt-4" @click.native="down('all')"></down-button>
          <stop-button class="mt-4" @click.native="stop('all')"></stop-button>
          <span class="mt-4 text-3xl text-grey flex justify-center">All</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  import UpButton from '@/components/UpButton'
  import DownButton from '@/components/DownButton'
  import StopButton from '@/components/StopButton'
  import ModeButton from '@/components/ModeButton'

  let interval

  export default {
    components: {
      UpButton,
      DownButton,
      StopButton,
      ModeButton,
    },
    data() {
      return {
        blinds: [],
        mode: 1,
      }
    },
    computed: {
      modeName() {
        return this.mode === 0 ? 'auto' : 'manual'
      },
    },
    methods: {
      async fetchBlinds() {
        this.blinds = (await this.$http.get('http://localhost:8081/status')).data.levels
      },
      toggleMode() {
        this.mode = (this.mode === 0) ? 1 : 0

        this.$http.post('http://localhost:8080/mode', qs.stringify({
          mode: this.modeName
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      },
      setupInterval() {
        interval = setInterval(this.fetchBlinds, 1000)
      },
      tearDownInterval() {
        clearInterval(interval)
      },
      up(index) {
        this.control(index, 'up')
      },
      down(index) {
        this.control(index, 'down')
      },
      stop(index) {
        this.control(index, 'stop')
      },
      control(index, action) {
        this.$http.post('http://localhost:8080/control', qs.stringify({
          index, action,
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      },
    },
    created() {
      this.fetchBlinds()
      this.setupInterval()
    },
    beforeDestroy() {
      this.tearDownInterval()
    }
  }
</script>
