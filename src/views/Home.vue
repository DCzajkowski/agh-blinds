<template>
  <div class="">
    <form :action="blindsRoute" method="post" @submit.prevent="submit">
      <input type="text" v-model="n">
      <button type="submit">Create</button>
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
