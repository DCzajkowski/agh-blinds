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
      <div v-for="(blind, index) in blinds" :key="`panel-${index}`" class="flex flex-col">
        <button class="flex items-center justify-center focus:outline-none focus:shadow-outline pointer w-16 h-16 rounded-full bg-grey-darkest" @click="up(index + 1)">
          <svg class="text-grey-dark w-16 h-16 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </button>
        <button class="flex items-center justify-center focus:outline-none focus:shadow-outline pointer w-16 h-16 rounded-full bg-grey-darkest mt-4" @click="down(index + 1)">
          <svg class="text-grey-dark w-16 h-16 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
        </button>
        <button class="flex items-center justify-center focus:outline-none focus:shadow-outline pointer w-16 h-16 rounded-full bg-grey-darkest mt-4" @click="stop(index + 1)">
          <svg class="text-grey-dark w-12 h-12 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 6h12v12H6z"/></svg>
        </button>
        <span class="mt-4 text-3xl text-grey flex justify-center">{{ index + 1 }}</span>
      </div>

      <div class="flex flex-col">
        <button class="flex items-center justify-center focus:outline-none focus:shadow-outline pointer w-16 h-16 rounded-full bg-grey-darkest" @click="up('all')">
          <svg class="text-grey-dark w-16 h-16 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        </button>
        <button class="flex items-center justify-center focus:outline-none focus:shadow-outline pointer w-16 h-16 rounded-full bg-grey-darkest mt-4" @click="down('all')">
          <svg class="text-grey-dark w-16 h-16 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
        </button>
        <button class="flex items-center justify-center focus:outline-none focus:shadow-outline pointer w-16 h-16 rounded-full bg-grey-darkest mt-4" @click="stop('all')">
          <svg class="text-grey-dark w-12 h-12 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 6h12v12H6z"/></svg>
        </button>
        <span class="mt-4 text-3xl text-grey flex justify-center">All</span>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'

  let interval

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
