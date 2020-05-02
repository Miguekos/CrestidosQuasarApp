<template>
  <div class="row items-center">
    <q-card class="my-card transparent">
      <div class="q-pa-xs">
        <q-card-section class="bg-primary text-white shadow-5" v-ripple>
          <div class="text-h5">Cantidad recaudada</div>
          <div class="text-h6">4.000 ./S</div>
        </q-card-section>
      </div>
      <div class="q-pa-xs">
        <q-card-section class="bg-secondary text-white">
          <div class="text-h5">Clientes por recaudar</div>
          <div class="text-6">20 Clientes</div>
        </q-card-section>
      </div>
      <div class="q-pa-xs">
        <q-card-section class="bg-brown-8 text-white">
          <div class="text-h5">Clientes por recaudar</div>
          <div class="text-6">32 Clientes</div>
        </q-card-section>
      </div>
      <div class="q-pa-xs">
        <q-card-section class="bg-orange-7 text-white">
          <div class="text-h5">Caja Chica</div>
          <div class="text-6">650 ./S</div>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    };
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  /*max-width: 50px*/
</style>
