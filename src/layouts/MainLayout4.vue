<template>
  <div class="my-font">
    <q-layout view="lhh LpR lFf" class="shadow-2 rounded-borders">
      <q-header reveal class="bg-primary bg-white text-blue">
        <q-toolbar>
          <q-btn @click="IrAtras(getAtras)" flat round dense :icon="getAtras" />
          <q-toolbar-title>Prestamos</q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-footer>
        <q-tabs
          dense
          v-model="tab"
          indicator-color="transparent"
          active-color="white"
          class="bg-primary text-grey-6"
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
        <q-page class="q-pa-md pagina">
          <!--          <transition appear transition-show="rotate" transition-hide="rotate">-->
          <!--            &lt;!&ndash; Wrapping only one DOM element, defined by QBtn &ndash;&gt;-->
          <!--            <router-view />-->
          <!--          </transition>-->

          <!--          <transition-->
          <!--            name="transitions"-->
          <!--            enter-active-class="animated fadeIn"-->
          <!--            leave-active-class="animated fadeOut"-->
          <!--            mode="out-in"-->
          <!--          >-->
          <router-view></router-view>
          <!--          </transition>-->

          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
              size="16px"
              @click="registro()"
              round
              color="positive"
              icon="add"
              class="rotate-0"
            />
          </q-page-sticky>
        </q-page>

        <!--        <q-page-sticky position="top" expand class="bg-primary text-white">-->
        <!--          <q-toolbar>-->
        <!--            <q-btn-->
        <!--              @click="IrAtras(getAtras)"-->
        <!--              flat-->
        <!--              round-->
        <!--              dense-->
        <!--              :icon="getAtras"-->
        <!--            />-->
        <!--            &lt;!&ndash;              <q-btn v-else flat round dense icon="map" />&ndash;&gt;-->
        <!--            &lt;!&ndash;              <div>IMEI {{ asd }}</div>&ndash;&gt;-->
        <!--            &lt;!&ndash;              <div>IMEI {{ IMEI }}</div>&ndash;&gt;-->
        <!--            <q-toolbar-title>Prestamos</q-toolbar-title>-->
        <!--          </q-toolbar>-->
        <!--        </q-page-sticky>-->

        <q-page-scroller position="bottom">
          <q-btn fab icon="keyboard_arrow_up" color="blue" />
        </q-page-scroller>
      </q-page-container>
    </q-layout>
    <q-dialog persistent v-model="dialogRegistro">
      <Registro @cerrarDialog="dialogRegistro = false" />
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("general", ["getAtras"])
  },
  data() {
    return {
      stopAtras: false,
      IMEI: "",
      // asd: window.device.platform,
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
          // link: "https://chat.quasar.dev",
          icon: "description",
          alert: "green"
        },
        {
          title: "Config",
          caption: "forum.quasar.dev",
          // icon: "record_voice_over",
          // link: "https://forum.quasar.dev",
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
    onDeviceReady() {
      // navigator.notification.alert(
      //   "You are the winner Now!", // message
      //   // alertDismissed, // callback
      //   "Game Over now", // title
      //   "Done" // buttonName
      // );
      // navigator.notification.confirm(
      //   "You are the winner Now!", // message
      //   // alertDismissed, // callback
      //   "Game Over now", // title
      //   "Done" // buttonName
      // );
      // navigator.notification.prompt(
      //   "You are the winner Now!", // message
      //   // alertDismissed, // callback
      //   "Game Over now", // title
      //   "Done" // buttonName
      // );
      // navigator.notification.beep(1);
      // StatusBar.overlaysWebView(true);
      // StatusBar.backgroundColorByHexString("#33000000");
      // StatusBar.backgroundColorByName("red");
      // StatusBar.backgroundColorByHexString("#C0C0C0");
      // StatusBar.hide();
      // StatusBar.show();
      // StatusBar.styleLightContent();
      // console.log(StatusBar);
      // console.log(navigator.notification);
      // alert(navigator.notification);
      // this.IMEI = StatusBar;
      // this.IMEI = device;
    },
    IrAtras(arg) {
      console.log("Ir Atras");
      console.log(arg);
      if (arg == "arrow_back") {
        this.$router.go(-1);
      } else {
        console.log("No hacer nada");
      }
    },
    async URL(arg) {
      console.log("Ir a:", arg);
      if (arg == "/clientes") {
        this.stopAtras = false;
      } else {
        this.stopAtras = true;
      }
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
  },
  created() {
    this.$q.addressbarColor.set("#0056a1");
    this.stopAtras = false;
    console.log("this.$route.path");
    console.log(this.$route.path);
    // we register the event like on plugin's doc page
    // window.addEventListener("deviceready", this.onDeviceReady(), false);
    // StatusBar.backgroundColorByHexString("#333");
    // StatusBar.backgroundColorByName("red");
    this.$store.commit("general/setAtras", "map");
    // console.log("Simew se ejecuta created");
  },
  mounted() {
    // this.iconAtras("map");
    console.log("Simew se ejecuta mount");
  }
};
</script>
<style>
.pagina {
  padding-top: 5px;
  padding-bottom: 70px;
}
</style>
