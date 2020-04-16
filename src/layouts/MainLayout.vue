<template>
  <div class="">
    <q-layout class="bg-grey-4" view="lhh LpR lff">
      <q-header reveal class="bg-primary text-white">
        <q-toolbar>
          <q-btn
            v-if="backbutton"
            @click="IrAtras(getAtras)"
            flat
            round
            dense
            icon="arrow_back"
          />
          <q-btn v-else flat round dense icon="map" />
          <q-toolbar-title @click="home">Prestamos</q-toolbar-title>
          <!--          <Search />-->
        </q-toolbar>
      </q-header>

      <!--      <q-footer>-->
      <!--        <q-toolbar>-->
      <!--          <q-toolbar-title>Footer</q-toolbar-title>-->
      <!--        </q-toolbar>-->
      <!--      </q-footer>-->
      <q-page-container>
        <q-page class="bg-grey-4">
          <router-view></router-view>
          <!--          <q-page-sticky position="top" expand class="bg-primary text-white">-->
          <!--            <q-tabs v-model="tab">-->
          <!--              <q-tab-->
          <!--                v-for="link in essentialLinks"-->
          <!--                :key="link.title"-->
          <!--                @click="URL(link.link)"-->
          <!--                :name="link.title"-->
          <!--                :label="link.title"-->
          <!--                :icon="link.icon"-->
          <!--              />-->
          <!--            </q-tabs>-->
          <!--          </q-page-sticky>-->
        </q-page>

        <q-page-scroller position="bottom">
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
        </q-page-scroller>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("general", ["backbutton"])
  },
  data() {
    return {
      dialogRegistro: false,
      readonly: false,
      disable: false,
      text: "",
      options: null,
      filteredOptions: [],
      search: "",
      drawerLeft: false,
      drawerRight: false,
      tab: "mails",
      leftDrawerOpen: false,
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
    ...mapActions("general", ["iconAtras"]),
    home() {
      this.$router.push("/");
    },
    IrAtras(arg) {
      this.$router.go(-1);
      console.log("Ir Atras");
      console.log(arg);
      // if (arg == "arrow_back") {
      //   this.$router.go(-1);
      // } else {
      //   console.log("No hacer nada");
      // }
    },
    handleSwipe({ evt, ...info }) {
      this.info = info;
      this.$router.push("/pagos");
      // native Javascript event
      // console.log(evt)
    },
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
    swipePage(obj) {
      let delta;
      switch (obj.direction) {
        case "right":
          delta = -1;
          break;
        case "left":
          delta = 1;
          break;
        default:
          return;
      }

      if (Math.abs(obj.distance.x) < 0.5 * screen.width) {
        // ignore if not a wide swipe!
        return;
      }

      // get desired next page
      // const goto = routeList.getNext(delta, this.$router.currentRoute);
      // if (goto) {
      //   this.$router.push(goto);
      // }
    }
  },
  components: {
    Tabs: () => import("./Tabs"),
    Search: () => import("../components/Search")
  },
  created() {
    // this.iconAtras(false);
    this.$q.addressbarColor.set("#0056a1");
    this.stopAtras = false;
    console.log("this.$route.path");
    console.log(this.$route.path);
    // we register the event like on plugin's doc page
    // window.addEventListener("deviceready", this.onDeviceReady(), false);
    // StatusBar.backgroundColorByHexString("#333");
    // StatusBar.backgroundColorByName("red");
    this.$store.commit("general/setAtras", false);
    // console.log("Simew se ejecuta created");
  },
  mounted() {
    // this.iconAtras("map");
    console.log("Simew se ejecuta mount");
  }
};
</script>
<style lang="sass">
.GPL
  &__toolbar
    height: 64px

  &__toolbar-input
    width: 55%
    color: #b71c1c

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368

    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px

  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500

  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>
