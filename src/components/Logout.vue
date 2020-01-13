<template></template>

<script>
export default {
  name: "Logout",
  created() {
    // Se procede a hacer logout del usuario, y se borran las variables local que tenga
    delete localStorage.token;
    delete localStorage.username;
    delete localStorage.email;
    this.$store.dispatch("logout");
    this.$router.push("/");
  }
};
</script>
