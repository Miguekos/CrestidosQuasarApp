<template>
  <!--    <div v-touch-swipe.mouse.left="handleSwipe" class="conSearch">-->
  <div class="conSearcht">
    <q-table
      class="transparent"
      :data="getClientes"
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
          <q-td key="name" :props="props">
            <span class="detalletable">
              {{ props.row.name }}
            </span>
            <label class="my-table-details">
              Dni: {{ props.row.dni }} </label>
          </q-td>
          <q-td key="created_at.$date" :props="props">
            <span class="detalletable">
              <span>Telf:</span
              ><span class="text-red-5"> {{ props.row.telefono }}</span>
            </span>
            <label class="my-table-details">
              {{ formatDate(props.row.created_at.$date) }}
            </label>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[22, 22]">
      <q-btn
        size="16px"
        @click="registro()"
        round
        color="positive"
        icon="add"
        class="rotate-0"
      />
    </q-page-sticky>
    <q-dialog persistent v-model="dialogRegistro">
      <Registro @cerrarDialog="dialogRegistro = false" />
    </q-dialog>
  </div>
</template>

<script>
import { Fechas } from "src/directives/formatFecha";
import { QSpinnerGears } from "quasar";
import { mapGetters, mapActions, mapState } from "vuex";
import { date } from "quasar";
export default {
  computed: {
    ...mapGetters("client", ["getClientes"])
    // ...mapState("general", ["formatearFecha"])
  },
  data() {
    return {
      dialogRegistro: false,
      filter: "",
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
          name: "name",
          label: "Clientes",
          align: "left",
          field: "name",
          format: val => `${val}`
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
    ...mapActions("client", ["callCliente"]),
    registro() {
      this.dialogRegistro = true;
    },
    formatDate(arg) {
      console.log("Formateando Fecha");
      return Fechas.Corta(arg);
      // return date.formatDate(arg, "DD-MM-YYYY");
    },
    detalleCliente(arg) {
      console.log("DetallesDelClienteSeleccionado");
      console.log(arg._id.$oid);
      this.$router.push(`/clientes/detallecliente/${arg._id.$oid}`);
      // this.$q.dialog({});
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
    Search: () => import("../../components/Search"),
    Registro: () => import("../../components/dielogRegistro")
  },
  async mounted() {},
  async created() {
    this.loading = true;
    console.log("created - Cliente");
    // this.$q.loading.show({
    //   spinner: QSpinnerGears,
    //   spinnerColor: "blue",
    //   spinnerSize: 100,
    //   backgroundColor: "grey-4"
    // });
    await this.callCliente();
    this.$store.commit("general/setAtras", false);
    this.$store.commit("general/setSearch", true);
    this.$q.addressbarColor.set("#0056a1");
    // this.$q.loading.hide();
    this.loading = false;
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
