<template>
  <q-page padding>
    <q-table
      v-if="getAbonos.length != 0"
      grid-header
      class="transparent"
      :data="getAbonos"
      :columns="columns"
      row-key="created_at.$date"
      flat
      hide-bottom
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      binary-state-sort
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-primary text-bold"
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
              Cuotas: {{ props.row.cuotasPagadas }}
            </label>
          </q-td>
          <q-td key="created_at.$date" :props="props">
            {{ props.row.montoTotalAbonado }} ./s
            <label class="my-table-details">
              {{ formatDate(props.row.created_at.$date) }}
            </label>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> No hay data que mostrar </span>
          <!--          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />-->
        </div>
      </template>
    </q-table>
    <div
      v-else
      style="padding-bottom: 450px; padding-top: 10px;"
      class="text-center text-h5"
    >
      <div>
        <!--        {{ $q.screen.height }}-->
        Pagos sin registrar
      </div>
      <div>
        <span class="text-caption">{{ formatDate(Date.now()) }}</span>
      </div>
    </div>
    <q-dialog v-model="card" persistent>
      <q-card class="my-card full-width bg-grey-4">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-xs">
          <q-toolbar>
            <q-toolbar-title
              ><span class="text-weight-bold">{{
                clienteDetalle.cliente
              }}</span></q-toolbar-title
            >
            <q-btn round color="primary" dense icon="close" v-close-popup />
          </q-toolbar>

          <q-card-section id="test" class="q-pa-xs">
            <div class="text-center text-caption text-red">
              Abono por:
              <strong>{{ clienteDetalle.montoTotalAbonado }} ./S</strong>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              <TablaDetalle :info="getCreditsCrono" />
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn type="submit" color="negative" label="Eliminar" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <!--    <q-page-sticky position="top" expand class="bg-accent text-white">-->
    <!--      <q-toolbar>-->
    <!--        <q-btn flat round dense icon="map" />-->
    <!--        <q-toolbar-title>Title</q-toolbar-title>-->
    <!--      </q-toolbar>-->
    <!--    </q-page-sticky>-->
  </q-page>
</template>

<script>
import { Fechas } from "src/directives/formatFecha";
import { dom } from "quasar";
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
export default {
  computed: {
    ...mapGetters("pagos", ["getAbonos"]),
    ...mapGetters("credit", ["getCredits", "getCreditsCrono"])
  },
  data() {
    return {
      filter: "",
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
          name: "created_at.$date",
          align: "right",
          label: "Monto",
          field: "created_at.$date"
        }
      ]
    };
  },
  methods: {
    ...mapActions("pagos", ["callAbonos", "deleteAbonos"]),
    ...mapActions("credit", ["callCredit", "callCreditCrono"]),
    formatDate(arg) {
      console.log("Formateando Fecha");
      return Fechas.larga(arg);
      // return date.formatDate(arg, "DD-MM-YYYY");
    },
    async onSubmit() {
      console.log(this.clienteDetalle._id.$oid);
      await this.deleteAbonos(this.clienteDetalle._id.$oid);
      await this.callAbonos();
      this.card = false;
    },
    onReset() {
      console.log("Se intento Reinciar");
    },
    async detalleCliente(arg) {
      await this.callCreditCrono(arg.idCredito);
      this.clienteDetalle = arg;
      this.card = true;
      console.log(arg);
    }
  },
  components: {
    TablaDetalle: () => import("./tablaDetalle")
  },
  async mounted() {
    this.loading = true;
    // await this.callCliente();
    await this.callAbonos();
    this.loading = false;
  },
  async created() {
    // const { height, width, viewport, style } = dom;
    // console.log(style(DomElement, "height"));
    // const { height, offset } = dom;
    // console.log(dom);
    // let { height, width } = viewport();
    console.log("Create Abonados");
    // await this.callAbonos();
    this.$q.loading.show({
      spinnerColor: "blue",
      spinnerSize: 100,
      backgroundColor: "grey",
      message: "Loading..",
      messageColor: "black"
    });
    this.$store.commit("general/setAtras", false);
    this.$store.commit("general/setSearch", false);
    this.$q.addressbarColor.set("#0056a1");
    this.$q.loading.hide();
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
<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 500px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 600px

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
