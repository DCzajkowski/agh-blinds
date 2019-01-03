<template>
  <rounded-button>
    <svg v-if="mode === 0" xmlns="http://www.w3.org/2000/svg" class="text-grey-dark w-12 h-12 fill-current" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10.85 12.65h2.3L12 9l-1.15 3.65zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM14.3 16l-.7-2h-3.2l-.7 2H7.8L11 7h2l3.2 9h-1.9z"/></svg>
    <svg v-else-if="mode === 1" xmlns="http://www.w3.org/2000/svg" class="text-grey-dark w-12 h-12 fill-current" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z"/></svg>
  </rounded-button>
</template>

<script>
  import RoundedButton from '@/components/RoundedButton'

  export default {
    props: {
      /**
       * 0 - mode auto
       * 1 - mode manual
       */
      mode: {
        validator: value => [0, 1].includes(value),
      },
    },
    components: {
      RoundedButton,
    },
  }
</script>
