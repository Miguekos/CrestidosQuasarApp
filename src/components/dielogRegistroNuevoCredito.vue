<template>
  <div class="full-width">
    <q-card>
      <q-card-section>
        <div class="text-center text-h6"><u>Agregar credito</u></div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <!--      <q-card-section>-->
        <Formulario @cerrarDialogo="cerrando()" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      basic: false,
      fixed: false
    };
  },
  methods: {
    cerrando() {
      this.$emit("cerrarDialog");
    }
  },

  components: {
    Formulario: () => import("./formRegistroNuevoCredito.vue")
  }
};
</script>
