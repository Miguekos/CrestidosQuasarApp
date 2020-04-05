<template>
  <div class="q-gutter-md">
    <q-card flat>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Miguel Rodriguez</q-item-label>
          <q-item-label caption>
            001811517
          </q-item-label>
          <q-item-label caption>
            965778450
          </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-btn icon="add" color="positive" outline>Credito</q-btn>
        </q-item-section>
      </q-item>
    </q-card>
    <q-separator />
    <q-card>
      <q-expansion-item
        class="itemexp"
        header-class="text-red"
        expand-icon-class="text-red"
        v-model="expandedActivos"
        icon="attach_money"
        label="Creditos Activos"
        caption="Detalle"
      >
        <q-separator />
        <q-card class="bg-red-1">
          <q-card-section>
            <q-list>
              <q-slide-item
                class="bg-red-1"
                v-for="link in essentialLinks"
                :key="link.deuda"
                @left="onLeft"
                @right="onRight"
                left-color="green"
                right-color="purple"
              >
                <template v-slot:left>
                  <div class="row items-center">
                    <q-icon left name="done" /> Realziar Abono..
                  </div>
                </template>
                <template v-slot:right>
                  <div class="row items-center">
                    Detalle de Pagos.. <q-icon right name="alarm" />
                  </div>
                </template>

                <q-item>
                  <!--                    <q-item-section avatar>-->
                  <!--                      <q-icon color="primary" name="attach_money" />-->
                  <!--                    </q-item-section>-->
                  <q-item-section>
                    <q-item-label
                      >Deuda:
                      <strong style="color: #bf360c"
                        ><u>{{ link.deuda }} ./S</u></strong
                      ></q-item-label
                    >
                    <q-item-label caption
                      >Ultimo pago
                      <span style="color: #0d47a1">{{ link.fecha }}</span>
                      por
                      <b style="color: #b71c1c"
                        >{{ link.pago }}./S</b
                      ></q-item-label
                    >
                  </q-item-section>
                </q-item>
                <q-separator />
              </q-slide-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <!--        </div>-->
    </q-card>
    <q-card>
      <q-expansion-item
        header-class="text-green"
        v-model="expandedCancelados"
        icon="attach_money"
        label="Credito Activo"
        caption="Deuda: 800"
        :caption-lines="1"
      >
        <q-separator />
        <q-card class="bg-green-1">
          <q-card-section>
            <q-list>
              <q-slide-item
                class="bg-green-1"
                v-for="link in essentialLinksPagados"
                :key="link.deuda"
                @left="onLeft"
                @right="onRight"
                left-color="green"
                right-color="purple"
              >
                <q-item>
                  <q-item-section>
                    <q-item-label>
                      <div class="q-pa-xs">
                        <q-table
                          dense
                          hide-bottom
                          :data="data"
                          :columns="columns"
                          row-key="name"
                        />
                        <q-form @submit="onSubmit" class="q-gutter-xs">
                          <div class="q-mt-lg">
                            <q-item-label class="text-center" caption>
                              Selecciona cantidad de cuotas
                            </q-item-label>
                            <q-slider
                              name="Cuotas"
                              v-model="cuotas"
                              label-always
                              :min="1"
                              :max="21"
                              :step="1"
                            />
                          </div>

                          <div>
                            <!--                            <q-input-->
                            <!--                              standout="bg-teal text-white"-->
                            <!--                              v-model="text"-->
                            <!--                              label="Custom standout"-->
                            <!--                            />-->
                            <q-btn
                              size="sm"
                              class="full-width"
                              label="Procesar"
                              type="submit"
                              color="primary"
                            />
                          </div>
                        </q-form>

                        <q-card
                          v-if="submitResult.length > 0"
                          flat
                          bordered
                          class="q-mt-md bg-grey-2"
                        >
                          <!--                          <q-separator />-->
                          <q-card-section
                            class="row q-gutter-sm items-center text-center"
                          >
                            <div
                              v-for="(item, index) in submitResult"
                              :key="index"
                              class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
                            >
                              {{ item.value }} {{ item.name }} procesada
                            </div>
                          </q-card-section>
                        </q-card>
                      </div>
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
              </q-slide-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <!--        </div>-->
    </q-card>
  </div>
</template>
<script>
export default {
  name: "DetalleCliente",
  data() {
    return {
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
          align: "center",
          label: "Cuotas",
          field: "calories",
          sortable: true
        },
        { name: "fat", label: "Total", field: "fat", sortable: true }
      ],
      data: [
        {
          name: "03/03/2020",
          calories: 1,
          fat: 100,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "03/03/2020",
          calories: 2,
          fat: 200,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "03/03/2020",
          calories: 1,
          fat: 100,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          name: "03/03/2020",
          calories: 1,
          fat: 100,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          name: "03/03/2020",
          calories: 1,
          fat: 100,
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
        {
          deuda: "0",
          fecha: "Lunes 23/03/2020",
          pago: "50",
          icon: "group",
          alert: "red",
          monto: 1200
        }
      ]
    };
  },
  methods: {
    onSubmit(evt) {
      const formData = new FormData(evt.target);
      const submitResult = [];

      for (const [name, value] of formData.entries()) {
        submitResult.push({
          name,
          value
        });
      }

      this.submitResult = submitResult;
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
  created() {
    console.log(this.$route.params);
  }
};
</script>
<style>
.q-item {
  min-height: 70px;
}
</style>
