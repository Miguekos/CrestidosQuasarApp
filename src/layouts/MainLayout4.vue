<template>
  <div>
    <q-layout view="lhh LpR lFf" class="shadow-2 rounded-borders">
      <!--      <q-header reveal class="bg-black">-->
      <!--        <q-toolbar>-->
      <!--          Prestamo-->
      <!--        </q-toolbar>-->
      <!--      </q-header>-->

      <q-footer>
        <q-tabs
          dense
          v-model="tab"
          indicator-color="transparent"
          active-color="white"
          class="bg-primary text-grey-6 shadow-2"
        >
          <q-tab
            v-for="link in essentialLinks"
            :key="link.title"
            @click="URL(link.link)"
            :name="link.title"
            :label="link.title"
            :icon="link.icon"
          />
          <!--          <q-tab name="movies" icon="movie" label="Movies" />-->
        </q-tabs>
      </q-footer>

      <q-page-container>
        <q-page style="padding-top: 60px; padding-bottom: 50px" class="q-pa-md">
          <transition appear>
            <!-- Wrapping only one DOM element, defined by QBtn -->
            <router-view />
          </transition>

          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
              @click="registro()"
              round
              color="positive"
              icon="add"
              class="rotate-0"
            />
          </q-page-sticky>

          <q-page-sticky position="top" expand class="bg-primary text-white">
            <q-toolbar>
              <q-btn flat round dense icon="map" />
              <q-toolbar-title>Clientes</q-toolbar-title>
            </q-toolbar>
          </q-page-sticky>
        </q-page>

        <q-page-scroller position="bottom">
          <q-btn fab icon="keyboard_arrow_up" color="red" />
        </q-page-scroller>
      </q-page-container>
    </q-layout>
    <q-dialog persistent v-model="dialogRegistro">
      <Registro @cerrarDialog="dialogRegistro = false" />
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: "mails",
      dialogRegistro: false,
      essentialLinks: [
        {
          title: "Clientes",
          caption: "quasar.dev",
          link: "/clientes",
          icon: "group",
          alert: "red"
        },
        {
          title: "Pagos",
          caption: "github.com/quasarframework",
          link: "/pagos",
          icon: "attach_money",
          alert: "yellow"
        },
        {
          title: "Control",
          caption: "chat.quasar.dev",
          // icon: "chat",
          link: "https://chat.quasar.dev",
          icon: "description",
          alert: "green"
        },
        {
          title: "Config",
          caption: "forum.quasar.dev",
          // icon: "record_voice_over",
          link: "https://forum.quasar.dev",
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
      ]
    };
  },
  methods: {
    async URL(arg) {
      console.log("Ir a:", arg);
      if (arg == "logout") {
        console.log("Entro en el deslogueo");
        this.logout();
        this.$q.notify({
          message: "Session Cerrada",
          color: "red"
        });
        await this.$router.push("/login");
      } else {
        this.link = arg;
        // console.log(arg);
        await this.$router.push(arg);
      }
    },
    registro() {
      this.dialogRegistro = true;
    }
  },
  components: {
    Registro: () => import("../components/dielogRegistro")
  }
};
</script>
