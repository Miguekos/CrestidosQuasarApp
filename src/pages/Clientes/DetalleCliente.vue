<template>
  <div class="q-gutter-md">
    <q-card class="shadow-8" flat>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ getClienteOne.name }}</q-item-label>
          <q-item-label caption>
            {{ getClienteOne.dni }}
          </q-item-label>
          <q-item-label caption>
            {{ getClienteOne.telefono }}
          </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-btn
            @click="dialogRegistroNuevoCredito = true"
            icon="add"
            color="positive"
            outline
            >Credito</q-btn
          >
        </q-item-section>
      </q-item>
    </q-card>
    <q-separator />
    <!--    {{ getCreditsCrono.length }}-->
    <q-card v-for="link in getCredits" :key="link.idCliente" class="shadow-8">
      <q-expansion-item
        :header-class="{
          'text-green': link.estado,
          'text-red': link.estado == false
        }"
        group="somegroup"
        @click="getDetalleCrono(link._id)"
        icon="attach_money"
        :label="`CREDITO ACTIVO POR : ${link.deuda} ./S`"
        :caption="`Cuotas de: ${link.ImporteCuotas} ./S`"
      >
        <q-separator />
        <q-card class="">
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>
                    <div class="q-pa-xs">
                      <div
                        v-if="getCreditsCrono.cuotasPorPagar > 0"
                        class="q-mt-lg"
                      >
                        <q-item-label class="text-center" caption>
                          Selecciona cantidad de cuotas
                        </q-item-label>
                        <q-slider
                          name="Cuotas"
                          v-model="cuotas"
                          label-always
                          :min="1"
                          :max="getCreditsCrono.cuotasPorPagar"
                          :step="1"
                        />
                      </div>
                      <q-table
                        flat
                        dense
                        :data="getCreditsCrono.pagos"
                        :columns="columns"
                        row-key="fechaIngreso"
                        :pagination.sync="pagination"
                      >
                        <template v-slot:body="props">
                          <q-tr :props="props">
                            <q-td key="fechaIngreso" :props="props">
                              {{ formatFecha(props.row.fechaIngreso) }}
                            </q-td>
                            <q-td key="cuotasPagadas" :props="props">
                              {{ props.row.cuotasPagadas }}
                            </q-td>
                            <q-td
                              key="montoAbonado"
                              cefonoss="text-red"
                              :props="props"
                            >
                              {{ props.row.montoAbonado }}
                            </q-td>
                          </q-tr>
                        </template>
                        <template v-slot:bottom="props">
                          <div class="q-pa-md">
                            <q-btn
                              size="12px"
                              dense
                              icon="chevron_left"
                              color="primary"
                              class="q-mr-lg"
                              :disable="props.isFirstPage"
                              @click="props.prevPage"
                            />
                            <q-btn
                              size="12px"
                              dense
                              icon="chevron_right"
                              color="primary"
                              class="q-ml-lg"
                              :disable="props.isLastPage"
                              @click="props.nextPage"
                            />
                          </div>
                        </template>
                      </q-table>
                      <!--                      <q-form @submit="onSubmit" class="q-gutter-xs">-->

                      <q-card
                        v-if="getCreditsCrono.cuotasPorPagar == 0"
                        flat
                        bordered
                        class="bg-grey-2"
                      >
                        <q-card-section>
                          <div class="text-center text-red text-h5">
                            Credito Cancelado
                          </div>
                        </q-card-section>
                        <q-separator />
                        <!--                        <q-card-section class="row q-gutter-sm items-center">-->
                        <!--                          <div-->
                        <!--                            class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"-->
                        <!--                          >-->
                        <!--                            asdasd-->
                        <!--                          </div>-->
                        <!--                        </q-card-section>-->
                      </q-card>

                      <div>
                        <q-btn
                          v-if="getCreditsCrono.cuotasPorPagar > 0"
                          size="20px"
                          outline
                          class="full-width"
                          @click="onSubmit(link)"
                          label="Procesar"
                          color="primary"
                        />
                      </div>
                      <!--                      </q-form>-->
                    </div>
                  </q-item-label>
                  <q-item-label v-if="getCreditsCrono.length == 0">
                    <!--                    <TablaDetalle :info="getCreditsCrono" />-->
                  </q-item-label>
                  <q-item-label v-else>
                    <TablaDetalle :info="getCreditsCrono" />
                  </q-item-label>
                  <!--                    <q-item-label caption-->
                  <!--                      >Ultimo pago-->
                  <!--                      <span style="color: #0d47a1">{{ link.fecha }}</span>-->
                  <!--                      por-->
                  <!--                      <b style="color: #b71c1c"-->
                  <!--                        >{{ link.pago }}./S</b-->
                  <!--                      ></q-item-label-->
                  <!--                    >-->
                </q-item-section>
              </q-item>
              <q-separator />
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <!--        </div>-->
    </q-card>
    <q-dialog persistent v-model="dialogRegistroNuevoCredito">
      <Registro
        :idCLiente="clienteid"
        @cerrarDialog="dialogRegistroNuevoCredito = false"
      />
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
export default {
  name: "DetalleCliente",
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
        rowsPerPage: 5
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
    ...mapActions("client", ["callClienteOne"]),
    ...mapActions("pagos", ["abonarCuotas"]),
    formatFecha(arg) {
      return date.formatDate(arg, "DD-MM-YYYY HH:mm:ss");
    },
    async onSubmit(arg) {
      console.log(arg);
      const body = {
        ...arg,
        cliente: this.getClienteOne.name,
        dni: this.getClienteOne.dni,
        cuotasPagadas: this.cuotas
      };
      console.log(body);
      this.cuotas = 1;
      await this.abonarCuotas(body);
      // console.log("asdadad");
      // console.log(arg._id.$oid)
      await this.callCreditCrono(arg._id.$oid);
      // console.log("asdadad");
      // const formData = new FormData(evt.target);
      // const submitResult = [];
      // for (const [name, value] of formData.entries()) {
      //   console.log(name);
      //   console.log(value);
      // submitResult.push({
      //   name,
      //   value
      // });
      // }

      // this.submitResult = submitResult;
    },
    async getDetalleCrono(arg) {
      console.log(arg.$oid);
      await this.callCreditCrono(arg.$oid);
    },
    onLeft({ reset }) {
      this.$q.notify("Left action triggered. Resetting in 1 second.");
      this.finalize(reset);
    },

    onRight({ reset }) {
      this.$q.notify("Right action triggered. Resetting in 1 second.");
      this.finalize(reset);
    },

    finalize(reset) {
      this.timer = setTimeout(() => {
        reset();
      }, 1000);
    }
  },

  beforeDestroy() {
    clearTimeout(this.timer);
  },
  components: {
    Registro: () => import("../../components/dielogRegistroNuevoCredito"),
    TablaDetalle: () => import("./tablaDetalle")
  },
  async mounted() {
    this.$q.loading.show({
      spinnerColor: "blue",
      spinnerSize: 100,
      backgroundColor: "grey",
      message: "Loading..",
      messageColor: "black"
    });
    this.clienteid = this.$route.params;
    await this.callClienteOne(this.$route.params.id);
    await this.callCredit(this.$route.params);
    console.log(this.$route.params);
    console.log("Created");
    // if (this.getCredits[0]) {
    //   console.log("si tiene");
    //   console.log(this.getCredits[0]._id);
    //   await this.getDetalleCrono(this.getCredits[0]._id);
    // } else {
    //   console.log("no tiene");
    // }
    // console.log("Created");
    this.$q.loading.hide();
  }
};
</script>
<style>
.q-item {
  min-height: 70px;
}
.q-table__bottom {
  align-self: center;
}
</style>
