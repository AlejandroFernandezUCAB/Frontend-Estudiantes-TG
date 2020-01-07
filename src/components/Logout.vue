<template></template>

<script>
export default {
  name: 'Logout',
  created () {
    delete localStorage.token
    delete localStorage.username
    delete localStorage.email
    this.$store.dispatch('logout')
    this.$router.push('/')
  }
}
</script>
