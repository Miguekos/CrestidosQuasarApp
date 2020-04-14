<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div v-touch-swipe.mouse.left="handleSwipe" class="conSearch">
      <q-table
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
              <b class="detalletable">
                {{ props.row.name }}
              </b>
              <label class="my-table-details">
                {{ props.row.dni }}
              </label>
            </q-td>
            <q-td key="telefono" :props="props">
              {{ props.row.telefono }}
            </q-td>
            <q-td key="created_at.$date" cefonoss="text-red" :props="props">
              {{ formatFecha(props.row.created_at.$date) }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <!--    <q-page style="padding-top: 160px; padding-bottom: 70px" class="q-pa-md">-->
      <!--      <q-page-sticky position="top" expand class="bg-accent text-white">-->
      <!--        <q-toolbar>-->
      <!--          <q-btn flat round dense icon="map" />-->
      <!--          <q-toolbar-title>Title</q-toolbar-title>-->
      <!--        </q-toolbar>-->
      <!--      </q-page-sticky>-->
      <!--    </q-page>-->
      <q-page-sticky position="top" expand class="bg-white">
        <q-toolbar>
          <!--        <q-btn @click="IrAtras(getAtras)" flat round dense :icon="getAtras" />-->
          <!--        &lt;!&ndash;              <q-btn v-else flat round dense icon="map" />&ndash;&gt;-->
          <!--        &lt;!&ndash;              <div>IMEI {{ asd }}</div>&ndash;&gt;-->
          <!--        &lt;!&ndash;              <div>IMEI {{ IMEI }}</div>&ndash;&gt;-->
          <!--        <q-toolbar-title>Prestamos</q-toolbar-title>-->
          <Search class="col" />
        </q-toolbar>
      </q-page-sticky>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
export default {
  computed: {
    ...mapGetters("client", ["getClientes"])
  },
  data() {
    return {
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
          name: "telefono",
          align: "right",
          label: "Telefono",
          field: "telefono"
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
    formatFecha(arg) {
      return date.formatDate(arg, "DD-MM-YYYY");
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
    Search: () => import("../../components/Search")
  },
  async mounted() {
    this.loading = true;
    await this.callCliente();
    this.loading = false;
  },
  created() {
    console.log("created - Cliente");
    this.$q.loading.show({
      spinnerColor: "blue",
      spinnerSize: 100,
      backgroundColor: "grey",
      message: "Loading..",
      messageColor: "black"
    });
    this.$store.commit("general/setAtras", "map");
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
  /*word-wrap: break-word;*/
}
.detalletable {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  width: 100px;
}
.conSearch {
  padding-top: 45px;
}
</style>
