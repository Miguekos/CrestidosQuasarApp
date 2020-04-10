<template>
  <div v-touch-swipe.mouse.left="handleSwipe" class="">
    <q-table
      :data="getAbonos"
      :columns="columns"
      row-key="created_at.$date"
      flat
      hide-bottom
      :pagination.sync="pagination"
      :loading="loading"
      binary-state-sort
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class=""
            style="font-size: 16px"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" @click="detalleCliente(props.row)">
          <q-td key="cliente" :props="props">
            {{ props.row.cliente }}
            <label class="my-table-details">
              {{ props.row.dni }}
            </label>
          </q-td>
          <q-td key="montoTotalAbonado" :props="props">
            {{ props.row.montoTotalAbonado }} ./S
          </q-td>
          <q-td key="created_at.$date" cefonoss="text-red" :props="props">
            {{ formatFecha(props.row.created_at.$date) }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="toolbar">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold">Quasar</span>
            Framework</q-toolbar-title
          >

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="card">
      <q-card class="my-card full-width">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-xs">
          <!--        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />-->
          <q-toolbar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
            </q-avatar>

            <q-toolbar-title
              ><span class="text-weight-bold">{{
                clienteDetalle.cliente
              }}</span></q-toolbar-title
            >
            <!--            <div class="row no-wrap items-center">-->
            <!--              <div class="col text-h6 ellipsis">-->
            <!--                {{ clienteDetalle.cliente }}-->
            <!--                <div class="text-caption text-red">-->
            <!--                  Abono por:-->
            <!--                  <strong>{{ clienteDetalle.montoTotalAbonado }} ./S</strong>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->

            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>

          <q-card-section class="q-pt-xs">
            <div class="text-center text-caption text-red">
              Abono por:
              <strong>{{ clienteDetalle.montoTotalAbonado }} ./S</strong>
            </div>
            <!--          <q-btn-->
            <!--            fab-->
            <!--            color="primary"-->
            <!--            icon="place"-->
            <!--            class="absolute"-->
            <!--            style="top: 0; right: 12px; transform: translateY(-50%);"-->
            <!--          />-->
            <!--          {{ clienteDetalle }}-->
            <!--            <div class="row no-wrap items-center">-->
            <!--              <div class="col text-h6 ellipsis">-->
            <!--                {{ clienteDetalle.cliente }}-->
            <!--                <div class="text-caption text-red">-->
            <!--                  Abono por:-->
            <!--                  <strong>{{ clienteDetalle.montoTotalAbonado }} ./S</strong>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--          <q-rating v-model="stars" :max="5" size="32px" />-->
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              <TablaDetalle :info="getCreditsCrono" />
            </div>
            <div class="text-caption text-center text-grey">
              Tu proxima fecha de pago es:
              <strong class="text-red">{{
                getCreditsCrono.proximadiadepago[0]
              }}</strong>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center">
            <!--          <q-btn v-close-popup flat color="primary" label="Cerrar" />-->
            <!--            <q-btn flat type="reset" color="positive" label="Cerrar" />-->
            <q-input
              dense
              autofocus
              color="purple-12"
              standout
              v-model="text"
              label="Escriba Elimiar"
            />
            <q-btn flat type="submit" color="negative" label="Eliminar" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
export default {
  computed: {
    ...mapGetters("pagos", ["getAbonos"]),
    ...mapGetters("credit", ["getCredits", "getCreditsCrono"])
  },
  data() {
    return {
      text: "",
      separator: "horizontal",
      clienteDetalle: "",
      toolbar: false,
      card: false,
      stars: 3,
      loading: false,
      info: null,
      pagination: {
        // sortBy: "asc",
        sortBy: "created_at.$date",
        descending: false,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "cliente",
          label: "Clientes",
          align: "left",
          field: "cliente",
          format: val => `${val}`
        },
        {
          name: "montoTotalAbonado",
          align: "right",
          label: "Monto",
          field: "montoTotalAbonado"
        },
        {
          name: "created_at.$date",
          align: "right",
          label: "Fecha",
          field: "created_at.$date",
          required: true,
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("pagos", ["callAbonos", "deleteAbonos"]),
    ...mapActions("credit", ["callCredit", "callCreditCrono"]),
    async onSubmit() {
      console.log(this.clienteDetalle._id.$oid);
      if (this.text == "Eliminar") {
        await this.deleteAbonos(this.clienteDetalle._id.$oid);
        await this.callAbonos();
        console.log("Eliminado");
        this.card = false;
        this.$q.notify({
          position: "top-right",
          color: "green",
          message: "Se elimno Correctamente"
        });
      } else {
        this.$q.notify({
          position: "top-right",
          color: "red",
          message: "Debe Tipeat Eliminar Para confirmar"
        });
      }
    },
    onReset() {
      console.log("Se intento Reinciar");
    },
    formatFecha(arg) {
      return date.formatDate(arg, "DD-MM-YYYY");
    },
    detalleCliente(arg) {
      this.clienteDetalle = arg;
      // this.$router.push("/clientes/detallecliente/1");
      // this.$q.dialog({});
      // this.toolbar = true;
      this.card = true;
      console.log(arg);
    },
    detallesDeCredito(arg) {
      console.log(arg);
    },
    handleSwipe({ evt, ...info }) {
      this.info = info;
      this.$router.push("/pagos");
      // native Javascript event
      // console.log(evt)
    }
  },
  components: {
    TablaDetalle: () => import("./tablaDetalle")
  },
  async mounted() {
    this.loading = true;
    await this.callAbonos();
    // await this.callCliente();
    this.loading = false;
  },
  async created() {
    this.$q.addressbarColor.set("#0056a1");
  }
};
</script>

<style>
.my-table-details {
  font-size: 10px;
  font-style: normal;
  max-width: 322px;
  white-space: pre-line;
  color: #93939a;
  margin-top: 5px;
}
</style>
