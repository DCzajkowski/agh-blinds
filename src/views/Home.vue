<template>
  <div class="flex justify-center items-center h-screen">
    <form :action="blindsRoute" method="post" @submit.prevent="submit" class="flex flex-col">
      <input type="text" v-model="n" class="bg-grey-dark rounded-full py-4 px-6 text-md outline-none focus:shadow-outline">
      <button class="bg-green-dark mt-4 rounded-full py-4 px-6 text-md focus:outline-none focus:shadow-outline" type="submit">Create {{ n }} blinds</button>
    </form>
  </div>
</template>

<script>
  import qs from 'qs'

  export default {
    computed: {
      blindsRoute() {
        return '/#' + this.$router.options.routes.find(({ name }) => name === 'Blinds').path
      },
      n: {
        get() {
          return this.$store.state.n
        },
        set(value) {
          this.$store.commit('n', value)
        },
      },
    },
    methods: {
      async submit() {
        await this.$http.post('http://localhost:8082/init', qs.stringify({
          n: this.n,
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })

        this.$router.push({ name: 'Blinds' })
      },
    },
  }
</script>
