<template>
  <div v-touch-swipe.mouse.left="handleSwipe" class="">
    <q-table
      :data="getClientes"
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
          <q-td key="name" :props="props">
            {{ props.row.name }}
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
  </div>
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
      loading: false,
      info: null,
      pagination: {
        // sortBy: "asc",
        sortBy: "desc",
        descending: true,
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
      this.$router.push("/clientes/detallecliente/1");
      // this.$q.dialog({});
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
  async mounted() {
    this.loading = true;
    await this.callCliente();
    this.loading = false;
  },
  created() {
    // this.$q.addressbarColor.set("#0056a1");
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
