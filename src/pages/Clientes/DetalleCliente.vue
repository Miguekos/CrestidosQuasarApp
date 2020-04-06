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
    <!--    <q-card class="shadow-8">-->
    <!--      <q-expansion-item-->
    <!--        class="itemexp"-->
    <!--        header-class="text-red"-->
    <!--        expand-icon-class="text-red"-->
    <!--        v-model="expandedActivos"-->
    <!--        icon="attach_money"-->
    <!--        label="Creditos Activos"-->
    <!--        caption="Detalle"-->
    <!--      >-->
    <!--        <q-separator />-->
    <!--        <q-card class="bg-red-1">-->
    <!--          <q-card-section>-->
    <!--            <q-list>-->
    <!--              <q-slide-item-->
    <!--                class="bg-red-1"-->
    <!--                v-for="link in essentialLinks"-->
    <!--                :key="link.deuda"-->
    <!--                @left="onLeft"-->
    <!--                @right="onRight"-->
    <!--                left-color="green"-->
    <!--                right-color="purple"-->
    <!--              >-->
    <!--                <template v-slot:left>-->
    <!--                  <div class="row items-center">-->
    <!--                    <q-icon left name="done" /> Realziar Abono..-->
    <!--                  </div>-->
    <!--                </template>-->
    <!--                <template v-slot:right>-->
    <!--                  <div class="row items-center">-->
    <!--                    Detalle de Pagos.. <q-icon right name="alarm" />-->
    <!--                  </div>-->
    <!--                </template>-->

    <!--                <q-item>-->
    <!--                  &lt;!&ndash;                    <q-item-section avatar>&ndash;&gt;-->
    <!--                  &lt;!&ndash;                      <q-icon color="primary" name="attach_money" />&ndash;&gt;-->
    <!--                  &lt;!&ndash;                    </q-item-section>&ndash;&gt;-->
    <!--                  <q-item-section>-->
    <!--                    <q-item-label-->
    <!--                      >Deuda:-->
    <!--                      <strong style="color: #bf360c"-->
    <!--                        ><u>{{ link.deuda }} ./S</u></strong-->
    <!--                      ></q-item-label-->
    <!--                    >-->
    <!--                    <q-item-label caption-->
    <!--                      >Ultimo pago-->
    <!--                      <span style="color: #0d47a1">{{ link.fecha }}</span>-->
    <!--                      por-->
    <!--                      <b style="color: #b71c1c"-->
    <!--                        >{{ link.pago }}./S</b-->
    <!--                      ></q-item-label-->
    <!--                    >-->
    <!--                  </q-item-section>-->
    <!--                </q-item>-->
    <!--                <q-separator />-->
    <!--              </q-slide-item>-->
    <!--            </q-list>-->
    <!--          </q-card-section>-->
    <!--        </q-card>-->
    <!--      </q-expansion-item>-->
    <!--      &lt;!&ndash;        </div>&ndash;&gt;-->
    <!--    </q-card>-->
    <!--    {{ essentialLinksPagados }}-->
    <q-card v-for="link in getCredits" :key="link.idCliente" class="shadow-8">
      <q-expansion-item
        header-class="text-green"
        v-model="link.expand"
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
                      <q-table
                        flat
                        dense
                        hide-bottom
                        :data="data"
                        :columns="columns"
                        row-key="name"
                      />
                      <!--                      <q-form @submit="onSubmit" class="q-gutter-xs">-->
                      <div class="q-mt-lg">
                        <q-item-label class="text-center" caption>
                          Selecciona cantidad de cuotas
                        </q-item-label>
                        <q-slider
                          name="Cuotas"
                          v-model="cuotas"
                          label-always
                          :min="1"
                          :max="link.cuotas"
                          :step="1"
                        />
                      </div>

                      <div>
                        <q-btn
                          size="md"
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
                  <q-item-label>
                    <TablaDetalle />
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
export default {
  name: "DetalleCliente",
  computed: {
    ...mapGetters("credit", ["getCredits"]),
    ...mapGetters("client", ["getClienteOne"])
  },
  data() {
    return {
      clienteid: null,
      dialogRegistroNuevoCredito: false,
      text: "",
      cuotas: 1,
      submitResult: [],
      loading: false,
      expandedActivos: false,
      expandedCancelados: false,
      info: null,
      tab: "emails",
      columns: [
        {
          name: "name",
          required: true,
          label: "Fecha",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          label: "Cuotas",
          field: "calories",
          sortable: true
        },
        {
          name: "fat",
          label: "Total",
          field: "fat",
          format: val => `${val} ./S`,
          sortable: true
        }
      ],
      data: [
        {
          name: "03/03/2020",
          calories: 1,
          fat: "25",
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "04/03/2020",
          calories: 1,
          fat: "25",
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "05/03/2020",
          calories: 1,
          fat: "25",
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          name: "06/03/2020",
          calories: 1,
          fat: "25",
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          name: "07/03/2020",
          calories: 1,
          fat: "25",
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        }
      ],
      dataDetalle: [
        {
          name: "Pretamo:",
          calories: 1,
          fat: "25",
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "Deuda actual:",
          calories: 1,
          fat: "25",
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "Cuotas pagadas:",
          calories: 1,
          fat: "25",
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          name: "06/03/2020",
          calories: 1,
          fat: "25",
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          name: "07/03/2020",
          calories: 1,
          fat: "25",
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        }
      ],
      essentialLinks: [
        {
          deuda: "1200",
          fecha: "Lunes 23/03/2020",
          pago: "50",
          icon: "group",
          alert: "red"
        },
        {
          deuda: "200",
          fecha: "Lunes 23/03/2020",
          pago: "20",
          icon: "attach_money",
          alert: "yellow"
        },
        {
          deuda: "1400",
          fecha: "Lunes 23/03/2020",
          // icon: "chat",
          pago: "80",
          icon: "description",
          alert: "green"
        },
        {
          deuda: "350",
          fecha: "Lunes 23/03/2020",
          // icon: "record_voice_over",
          pago: "20",
          icon: "settings",
          alert: "blue"
        }
        // {
        //   title: "",
        //   caption: "forum.quasar.dev",
        //   icon: "more_vert",
        //   link: "https://forum.quasar.dev",
        //   icon: "settings",
        //   alert: "blue"
        // }
      ],
      essentialLinksPagados: [
        // {
        //   deuda: "0",
        //   fecha: "Lunes 23/03/2020",
        //   pago: "50",
        //   icon: "group",
        //   alert: "red",
        //   monto: 1200
        // }
      ]
    };
  },
  methods: {
    ...mapActions("credit", ["callCredit"]),
    ...mapActions("client", ["callClienteOne"]),
    onSubmit(arg) {
      console.log(arg);
      const body = {
        ...arg,
        cuotasPagadas: this.cuotas
      };
      console.log(body);
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
  async created() {
    await this.callClienteOne(this.$route.params.id);
    console.log(this.$route.params);
    this.clienteid = this.$route.params;
    await this.callCredit(this.$route.params);
  }
};
</script>
<style>
.q-item {
  min-height: 70px;
}
</style>
