<template>
  <div class="q-pa-md">
    <q-table
      flat
      hide-bottom
      :data="getCreditsCrono.pagos"
      :columns="columns"
      row-key="fechaIngreso"
      :pagination.sync="pagination"
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
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>
            Bueno esto es triste... no hay data
          </span>
          <!--                              <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />-->
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="fechaIngreso" :props="props">
            {{ formatFecha(props.row.fechaIngreso) }}
          </q-td>
          <q-td key="cuotasPagadas" :props="props">
            {{ props.row.cuotasPagadas }}
          </q-td>
          <q-td key="montoAbonado" cefonoss="text-red" :props="props">
            {{ props.row.montoAbonado }} ./S
          </q-td>
        </q-tr>
      </template>
      <!--      <template v-slot:bottom="props">-->
      <!--        <div align="center" class="q-pa-md">-->
      <!--          <q-btn-->
      <!--            size="12px"-->
      <!--            dense-->
      <!--            icon="chevron_left"-->
      <!--            color="primary"-->
      <!--            class="q-mr-lg"-->
      <!--            :disable="props.isFirstPage"-->
      <!--            @click="props.prevPage"-->
      <!--          />-->
      <!--          <q-btn-->
      <!--            size="12px"-->
      <!--            dense-->
      <!--            icon="chevron_right"-->
      <!--            color="primary"-->
      <!--            class="q-ml-lg"-->
      <!--            :disable="props.isLastPage"-->
      <!--            @click="props.nextPage"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </template>-->
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
export default {
  computed: {
    ...mapGetters("credit", ["getCredits", "getCreditsCrono"]),
    ...mapGetters("client", ["getClienteOne"])
  },
  data() {
    return {
      pagination: {
        sortBy: "fechaIngreso",
        descending: true,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      cliente: "",
      clienteid: null,
      dialogRegistroNuevoCredito: false,
      text: "",
      cuotas: 1,
      submitResult: [],
      loading: false,
      expandedActivos: false,
      expandedCancelados: false,
      info: [],
      tab: "emails",
      columns: [
        {
          name: "fechaIngreso",
          required: true,
          label: "Fecha",
          align: "left",
          field: "fechaIngreso",
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "cuotasPagadas",
          label: "Cuotas",
          align: "center",
          field: "cuotasPagadas"
        },
        {
          name: "montoAbonado",
          label: "Total",
          field: "montoAbonado",
          format: val => `${val} ./S`
        }
      ]
    };
  },
  methods: {
    ...mapActions("credit", ["callCredit", "callCreditCrono"]),
    formatFecha(arg) {
      let formattedString = date.formatDate(arg, "ddd DD/MM/YY - hh:mm a", {
        days: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado"
        ],
        daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        months: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"
        ],
        monthsShort: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic"
        ]
      });
      // console.log(formattedString);
      return formattedString;
    }
  },
  async created() {
    console.log("TablaCrono");
    console.log(this.$route.params.id);
    await this.callCreditCrono(this.$route.params.id);
  }
};
</script>

<style scoped></style>
