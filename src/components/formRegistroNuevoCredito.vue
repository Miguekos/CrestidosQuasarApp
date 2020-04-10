<template>
  <!--  <div class="q-pa-md" style="max-width: 400px">-->
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-xs">
      <q-input
        dense
        filled
        autofocus
        v-model="monto"
        label="Monto *"
        type="number"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'El campo no puede estar vacio'
        ]"
      />

      <q-input dense filled type="number" v-model="cuotas" label="Cuotas *" />

      <q-input dense filled type="text" v-model="interes" label="Intereses *" />

      <q-separator />

      <div class="row" align="right">
        <div class="col-6 q-pa-xs">
          <q-btn
            class="full-width"
            outline
            label="Salir"
            color="negative"
            type="reset"
            v-close-popup
          />
        </div>
        <div class="col-6 q-pa-xs">
          <q-btn
            class="full-width"
            outline
            label="Agregar"
            color="positive"
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      monto: null,
      cuotas: 24,
      interes: 20
    };
  },
  methods: {
    ...mapActions("credit", ["addCredit", "callCredit"]),
    cerrar() {
      console.log("Se preciono Cerrar");
    },
    onSubmit() {
      this.addCredit({
        idcliente: this.$route.params.id,
        monto: this.monto,
        cuotas: this.cuotas,
        interes: this.interes
      })
        .then(resp => {
          this.$q.notify({
            color: "green",
            position: "top-right",
            textColor: "white",
            icon: "cloud_done",
            message: `${resp}`
          });
          this.callCredit(this.$route.params);
          this.$emit("cerrarDialogo");
        })
        .catch(err => {
          this.$q.notify({
            color: "red-4",
            position: "top-right",
            textColor: "white",
            icon: "cloud_done",
            message: `${err.data}`
          });
        });
    },
    onReset() {
      this.monto = null;
    }
  },
  created() {
    console.log("Cargando dialog add Creditos");
    // console.log(this.$route.params);
  }
};
</script>
