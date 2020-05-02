<template>
  <div class="">
    <q-layout class="bg-grey-4" view="lhh LpR lff">
      <q-header reveal class="bg-primary text-white">
        <q-toolbar>
          <q-btn
            v-if="backbutton"
            @click="IrAtras()"
            flat
            round
            dense
            icon="arrow_back"
          />
          <q-btn v-else flat round dense icon="map" />
          <q-toolbar-title @click="home">Prestamos</q-toolbar-title>
          <Search v-if="searchactive" />
          <q-icon
            class="q-ml-sm"
            size="20px"
            @click="Logout()"
            name="more_vert"
          ></q-icon>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page class="bg-grey-4">
          <router-view></router-view>
        </q-page>

        <q-page-scroller position="bottom">
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
        </q-page-scroller>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { LocalStorage } from "quasar";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("general", ["backbutton", "searchactive"])
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
      leftDrawerOpen: false
    };
  },
  methods: {
    ...mapActions("general", ["iconAtras"]),
    Logout() {
      this.$q.loading.show();
      LocalStorage.clear();
      // setTimeout(() => {
      this.$router.push("/auth");
      this.$q.notify({
        // progress: true,
        message: "Deslogueo Correcto",
        icon: "mail",
        color: "white",
        textColor: "primary"
      });
      this.$q.loading.hide();
      // }, 2000);
    },
    home() {
      this.$router.push("/");
    },
    IrAtras() {
      this.$router.go(-1);
      console.log("Ir Atras");
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
    }
  },
  components: {
    Tabs: () => import("./Tabs"),
    Search: () => import("../components/Search")
  },
  created() {
    this.$q.addressbarColor.set("#0056a1");
    console.log("this.$route.path");
    console.log(this.$route.path);
    this.$store.commit("general/setAtras", false);
  },
  mounted() {}
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
