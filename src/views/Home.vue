<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="h-12 mb-4">
      <div v-if="!isValid" class="bg-red-dark px-6 py-4 rounded text-white">
        <span>The amount of blinds must be a positive integer smaller than 10.</span>
      </div>
    </div>
    <form :action="blindsRoute" method="post" @submit.prevent="submit" class="flex flex-col">
      <input type="text" v-model="n" class="bg-grey-dark rounded-full py-4 px-6 text-md outline-none focus:shadow-outline">
      <button
        class="mt-4 rounded-full py-4 px-6 text-md focus:outline-none focus:shadow-outline"
        :class="{
          'bg-green-dark text-black': isValid,
          'bg-grey-darker text-grey-light': !isValid,
        }"
        type="submit"
        :disabled="!isValid"
      >{{ isValid ? `Create ${n} blind${(n > 1) ? 's' : ''}` : 'Fix input' }}</button>
    </form>
  </div>
</template>

<script>
  import qs from 'qs'

  export default {
    data() {
      return {
        n: 1,
      }
    },
    computed: {
      blindsRoute() {
        return '/#' + this.$router.options.routes.find(({ name }) => name === 'Blinds').path
      },
      isNumber() {
        return value => {
          if (typeof value === 'number') {
            return value - value === 0
          }

          if (typeof value === 'string' && value.trim() !== '') {
            return Number.isFinite ? Number.isFinite(+value) : isFinite(+value)
          }

          return false
        }
      },
      isValid() {
        const value = this.n

        return this.isNumber(value) && value > 0 && value <= 9
      },
    },
    methods: {
      async submit() {
        this.$store.commit('n', this.n)

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
