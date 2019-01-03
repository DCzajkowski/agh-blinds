<template>
  <div class="p-8 max-w-3xl mx-auto">
    <div class="flex justify-between mt-32 w-full">
      <div v-for="(blind, index) in blinds" :key="`panel-${index}`" class="flex flex-col">
        <up-button @click="up(index + 1)"></up-button>
        <down-button class="mt-4" @click="down(index + 1)"></down-button>
        <stop-button class="mt-4" @click="stop(index + 1)"></stop-button>
        <span class="mt-4 text-3xl text-grey flex justify-center">{{ index + 1 }}</span>
      </div>

      <div class="flex flex-col">
        <up-button @click="up('all')"></up-button>
        <down-button class="mt-4" @click="down('all')"></down-button>
        <stop-button class="mt-4" @click="stop('all')"></stop-button>
        <span class="mt-4 text-3xl text-grey flex justify-center">All</span>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'

  export default {
    data() {
      return {
        blinds: [],
      }
    },
    methods: {
      async fetchBlinds() {
        this.blinds = (await this.$http.get('http://localhost:8081/status')).data.levels
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
    },
  }
</script>
