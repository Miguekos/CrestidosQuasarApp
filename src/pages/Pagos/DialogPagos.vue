<template>
  <div>
    <q-card style="width: 300px">
      <!-- <q-card-section>
        <div class="text-h6">Inception</div>
      </q-card-section> -->
      <div>
        <div>
          <q-card-section
            @click="boton()"
            class="bg-primary text-white curs cursor-pointer"
          >
            <div class="text-h6">{{ listarCreditos.name }}</div>
            <div class="text-subtitle2">
              Debe cancelar: {{ listarCreditos.carbs }} ./S
            </div>
            <div class="text-subtitle2">
              Deuda Total: {{ listarCreditos.sodium }} ./S
            </div>
          </q-card-section>
        </div>
        <q-separator />
        <div>
          <q-card-section
            @click="boton()"
            class="bg-primary text-white cursor-pointer"
          >
            <div class="text-h6">{{ listarCreditos.name }}</div>
            <div class="text-subtitle2">
              Debe cancelar: {{ listarCreditos.carbs }} ./S
            </div>
            <div class="text-subtitle2">
              Deuda Total: {{ listarCreditos.sodium }} ./S
            </div>
          </q-card-section>
        </div>
      </div>
      <!-- <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Open another dialog" @click="secondDialog = true" />
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions> -->
    </q-card>

    <q-dialog
      v-model="secondDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Monto a cancelar</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            type="number"
            square
            outlined
            v-model="monto"
            label="Monto"
          />
        </q-card-section>

        <q-card-actions align="right" class="">
          <q-btn color="red" label="Cerrar" v-close-popup />
          <q-btn color="green" label="Abonar" @click="Abono()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  props: ["listarCreditos"],
  data() {
    return {
      monto: null,
      creditoSeleccionado: "",
      lorem: "Lorem ipsum dolor sit amet",
      inception: false,
      secondDialog: false
    };
  },
  methods: {
    showNotif(arg) {
      this.$q.notify({
        position: "top-right",
        message: `Pago aplicado a ${arg.name}`,
        color: "secondary"
      });
    },
    Abono() {
      console.log("Abono agregado");
      this.secondDialog = false;
      this.$emit("cerrarCreditos");
      this.showNotif(this.creditoSeleccionado);
    },
    boton() {
      console.log("Nuevo Dialog");
      this.creditoSeleccionado = this.listarCreditos;
      this.monto = this.listarCreditos.carbs;
      this.secondDialog = true;
    }
  }
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>
