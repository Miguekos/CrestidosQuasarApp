<template>
  <div v-touch-swipe.mouse.left="handleSwipe" class="">
    <q-table
      :data="getClientes"
      :columns="columns"
      row-key="details"
      flat
      hide-bottom
      :pagination.sync="pagination"
      :loading="loading"
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
          <q-td key="nombre" :props="props">
            {{ props.row.nombre }}
            <div class="my-table-details">
              {{ props.row.fecha }}
            </div>
          </q-td>
          <q-td key="monto_a_apagar" :props="props">
            {{ props.row.monto_a_apagar }} .S/
          </q-td>
          <q-td key="deuda" class="text-red" :props="props">
            {{ props.row.deuda }} .S/
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("client", ["getClientes"])
  },
  data() {
    return {
      loading: false,
      info: null,
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "nombre",
          required: true,
          label: "Clientes",
          align: "left",
          field: "nombre",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "monto_a_apagar",
          align: "right",
          label: "Prestado",
          format: val => `${val} ./S`,
          field: "monto_a_apagar",
          sortable: true
        },
        {
          name: "deuda",
          align: "right",
          label: "Deuda",
          field: "deuda",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("client", ["callCliente"]),
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
    this.$q.addressbarColor.set("#0056a1");
  }
};
</script>

<style>
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #2b33d3;
  margin-top: 4px;
}
</style>
