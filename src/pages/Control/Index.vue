<template>
  <q-page padding>
    <Indicadores />
  </q-page>
</template>

<script>
export default {
  name: "Control",
  components: {
    Indicadores: () => import("./Indicadores.vue")
  }
};
</script>

<style scoped></style>
