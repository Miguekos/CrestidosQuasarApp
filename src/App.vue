<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    console.log("Esto se ejecuta en cada accion");
    this.$q.addressbarColor.set("#0056a1");
  }
};
</script>
<style></style>
