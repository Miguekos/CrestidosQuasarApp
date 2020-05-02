<template>
  <transition
    appear
    enter-active-class="animated fadeInUp"
    leave-active-class="animated fadeOut"
  >
    <div class="q-gutter-md q-pa-md bg-grey-4">
      <q-card flat class="shadow-8 transparent">
        <q-item v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ getClienteOne.name }}</q-item-label>
            <q-item-label caption>
              <span class="text-primary text-bold">dni:</span>
              {{ getClienteOne.dni }}
            </q-item-label>
            <q-item-label caption>
              <span class="text-primary text-bold">telf:</span>
              {{ getClienteOne.telefono }}
            </q-item-label>
            <q-item-label caption>
              <q-rating size="18px" v-model="stars" :max="5" color="primary" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
      <q-item-section>
        <q-btn
          @click="dialogRegistroNuevoCredito = true"
          push
          sizw="10px"
          color="positive"
          >Agregar Credito</q-btn
        >
      </q-item-section>
      <q-separator />
      <!--    {{ getCreditsCrono.length }}-->
      <q-card v-for="link in getCredits" :key="link.idCliente" class="" flat>
        <q-expansion-item
          :header-class="{
            'text-green': link.estado,
            'text-red': link.estado == false
          }"
          group="somegroup"
          @click="getDetalleCrono(link._id)"
          icon="attach_money"
          :label="`CREDITO POR : ${link.deuda} ./S`"
          :caption="`Inició: ${formatFecha(link.created_at.$date)}`"
        >
          <q-separator />
          <div class="">
            <q-card>
              <q-tabs
                v-model="listas"
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
              >
                <q-tab class="text-purple" name="cuotas" label="Cuotas" />
                <q-tab class="text-orange" name="abonos" label="Monto" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="listas" animated swipeable infinite>
                <q-tab-panel name="cuotas">
                  <q-card flat class="">
                    <q-list>
                      <q-item>
                        <q-item-section>
                          <q-item-label>
                            <div class="q-pa-xs">
                              <div
                                v-if="getCreditsCrono.cuotasPorPagar > 0"
                                class="q-mt-xs"
                              >
                                <q-item-label class="text-center" caption>
                                  Selecciona cantidad de cuotas
                                </q-item-label>
                                <q-slider
                                  name="Cuotas"
                                  v-model="cuotas"
                                  label
                                  :label-value="cuotas + ' Cuotas'"
                                  label-always
                                  :min="1"
                                  :max="getCreditsCrono.cuotasPorPagar"
                                  :step="1"
                                />
                              </div>
                              <!--                        <TablaCronograma :getCreditsCrono="getCreditsCrono" />-->
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
                              </q-card>

                              <div>
                                <q-btn
                                  v-if="getCreditsCrono.cuotasPorPagar > 0"
                                  :loading="loadingboronabonar"
                                  size="16px"
                                  color="grey-4"
                                  text-color="primary"
                                  push
                                  class="full-width"
                                  @click="onSubmit(link, 1)"
                                  label="Procesar"
                                />
                              </div>
                              <!--                      </q-form>-->
                            </div>
                          </q-item-label>
                          <q-item-label v-if="getCreditsCrono.length == 0">
                            <!--                    <TablaDetalle :info="getCreditsCrono" />-->
                          </q-item-label>
                          <q-item-label
                            @click="fechasCronograma(link._id)"
                            v-else
                          >
                            <TablaDetalle :info="getCreditsCrono" />
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-separator />
                    </q-list>
                  </q-card>
                </q-tab-panel>
                <q-tab-panel name="abonos">
                  <q-card flat class="">
                    <q-list>
                      <q-item>
                        <q-item-section>
                          <q-item-label>
                            <div class="q-pa-xs">
                              <div
                                v-if="getCreditsCrono.cuotasPorPagar > 0"
                                class="q-mt-xs"
                              >
                                <!--                                  <q-item-label class="text-center" caption>-->
                                <!--                                    Coloca el Monto-->
                                <!--                                  </q-item-label>-->
                                <q-input
                                  class="q-pb-md"
                                  v-model="cuotasMonto"
                                  dense
                                  square
                                  filled
                                  label="Monto"
                                />
                              </div>
                              <!--                        <TablaCronograma :getCreditsCrono="getCreditsCrono" />-->
                              <!--                      <q-form @submit="onSubmit" class="q-gutter-xs">-->

                              <q-card
                                v-if="getCreditsCrono.cuotasPorPagar == 0.0"
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
                              </q-card>

                              <div>
                                <q-btn
                                  v-if="getCreditsCrono.cuotasPorPagar > 0.0"
                                  :loading="loadingboronabonar"
                                  size="16px"
                                  color="grey-4"
                                  text-color="primary"
                                  push
                                  class="full-width"
                                  @click="onSubmit(link, 2)"
                                  label="Procesar"
                                />
                              </div>
                              <!--                      </q-form>-->
                            </div>
                          </q-item-label>
                          <q-item-label v-if="getCreditsCrono.length == 0">
                            <!--                    <TablaDetalle :info="getCreditsCrono" />-->
                          </q-item-label>
                          <q-item-label
                            @click="fechasCronograma(link._id)"
                            v-else
                          >
                            <TablaDetalle :info="getCreditsCrono" />
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-separator />
                    </q-list>
                  </q-card>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
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
  </transition>
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
      stars: 3,
      listas: "cuotas",
      loadingboronabonar: false,
      pagination: {
        sortBy: "fechaIngreso",
        descending: true,
        page: 1,
        rowsPerPage: 3
        // rowsNumber: xx if getting data from a server
      },
      cliente: "",
      clienteid: null,
      dialogRegistroNuevoCredito: false,
      text: "",
      cuotas: 1,
      cuotasMonto: null,
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
    },
    async onSubmit(arg, tipo) {
      this.loadingboronabonar = true;
      console.log("Realizando Abono");
      console.log("getCreditsCrono", this.getCreditsCrono.deudaActual);
      const deudaActual = this.getCreditsCrono.deudaActual;
      const importeCuota = this.getCreditsCrono.importeCuota;
      let body = {};
      if (tipo == 1) {
        const total = this.cuotas * importeCuota;
        if (total <= deudaActual) {
          body = {
            ...arg,
            cliente: this.getClienteOne.name,
            dni: this.getClienteOne.dni,
            cuotasPagadas: this.cuotas,
            tipoPago: 1,
            cuotasMonto: 0
          };
          this.AbonarCuenta(body, arg._id.$oid, 1);
        } else {
          this.notificacion(1);
          this.AbonarCuenta(null, null, 2);
        }
      } else if (tipo == 2) {
        const total = this.cuotasMonto;
        if (total <= deudaActual) {
          body = {
            ...arg,
            cliente: this.getClienteOne.name,
            dni: this.getClienteOne.dni,
            cuotasPagadas: 0,
            tipoPago: 2,
            cuotasMonto: this.cuotasMonto
          };
          this.AbonarCuenta(body, arg._id.$oid, 1);
        } else {
          this.notificacion(1);
          this.AbonarCuenta(null, null, 2);
        }
      }
    },
    async AbonarCuenta(arg, id, tipo) {
      if (tipo == 1) {
        console.log(arg);
        this.cuotas = 1;
        this.cuotasMonto = null;
        await this.abonarCuotas(arg);
        const respp = await this.callCreditCrono(id);
        this.loadingboronabonar = false;
      } else if (tipo == 2) {
        console.log(arg);
        this.cuotas = 1;
        this.cuotasMonto = null;
        this.loadingboronabonar = false;
      }
    },
    notificacion(arg) {
      this.$q.notify({
        message: "No se puede procesar un pago superior a la deuda",
        color: "red",
        position: "top-right"
      });
    },
    async getDetalleCrono(arg) {
      this.$q.loading.show();
      console.log(arg.$oid);
      await this.callCreditCrono(arg.$oid);
      this.$q.loading.hide();
    },
    fechasCronograma(arg) {
      console.log("fechasCronograma");
      this.$router.push(`/clientes/detallecronograma/${arg.$oid}`);
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
    TablaDetalle: () => import("./tablaDetalle"),
    TablaCronograma: () => import("./TablaCronograma")
  },
  async mounted() {
    this.$store.commit("general/setAtras", true);
    this.$store.commit("general/setSearch", false);
    this.$q.loading.show({
      spinnerColor: "blue",
      spinnerSize: 100,
      backgroundColor: "grey-4"
    });
    this.clienteid = this.$route.params;
    await this.callClienteOne(this.$route.params.id);
    await this.callCredit(this.$route.params);
    console.log(this.$route.params);
    console.log("Created");
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
