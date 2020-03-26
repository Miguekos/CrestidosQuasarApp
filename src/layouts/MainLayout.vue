<template>
  <div class="q-pa-md">
    <q-layout view="lhh LpR lff">
      <q-header reveal class="bg-primary">
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          <q-space></q-space>
          <!--          <q-toolbar-title>Control de Creditos</q-toolbar-title>-->
          <!--          <q-input-->
          <!--            class="GPL__toolbar-input"-->
          <!--            dense-->
          <!--            standout="bg-primary"-->
          <!--            v-model="search"-->
          <!--            placeholder="Search"-->
          <!--          >-->
          <!--            <template v-slot:prepend>-->
          <!--              <q-icon v-if="search === ''" name="search" />-->
          <!--              <q-icon-->
          <!--                v-else-->
          <!--                name="clear"-->
          <!--                class="cursor-pointer"-->
          <!--                @click="search = ''"-->
          <!--              />-->
          <!--            </template>-->
          <!--          </q-input>-->
          <q-input
            dark
            standout
            dense
            v-model="text"
            label="Buscar"
            :readonly="readonly"
            :disable="disable"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-space></q-space>

          <q-btn round icon="more_vert" flat color="white" size="sx">
            <q-menu transition-show="scale" transition-hide="scale" fit>
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section>Perfil</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Contraseña</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Notificaciones</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Historial</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Salir</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <!--      <q-footer>-->
      <!--        <q-toolbar>-->
      <!--          <q-toolbar-title>Footer</q-toolbar-title>-->
      <!--        </q-toolbar>-->
      <!--      </q-footer>-->
      <q-page-container>
        <q-page style="padding-top: 30px; padding-bottom: 40px">
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <!-- Wrapping only one DOM element, defined by QBtn -->
            <router-view />
          </transition>

          <q-page-sticky position="bottom-right" :offset="[22, 22]">
            <q-btn
              size="18px"
              round
              color="positive"
              icon="add"
              class="rotate-0"
            />
          </q-page-sticky>

          <q-page-sticky position="top" expand class="bg-primary text-white">
            <q-tabs v-model="tab">
              <q-tab
                v-for="link in essentialLinks"
                :key="link.title"
                @click="URL(link.link)"
                :name="link.title"
                :label="link.title"
                :icon="link.icon"
              />
            </q-tabs>
          </q-page-sticky>
        </q-page>

        <q-page-scroller position="bottom">
          <q-btn fab icon="keyboard_arrow_up" color="primary" />
        </q-page-scroller>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { fabGithub } from "@quasar/extras/fontawesome-v5";
const stringOptions = [
  "quasarframework/quasar",
  "quasarframework/quasar-awesome"
];
export default {
  data() {
    return {
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
    handleSwipe({ evt, ...info }) {
      this.info = info;
      this.$router.push("/pagos");
      // native Javascript event
      // console.log(evt)
    },
    filter(val, update) {
      if (this.options === null) {
        // load data
        setTimeout(() => {
          this.options = stringOptions;
          this.$refs.search.filter("");
        }, 2000);
        update();
        return;
      }

      if (val === "") {
        update(() => {
          this.filteredOptions = this.options.map(op => ({ label: op }));
        });
        return;
      }

      update(() => {
        this.filteredOptions = [
          {
            label: val,
            type: "In this repository"
          },
          {
            label: val,
            type: "All GitHub"
          },
          ...this.options
            .filter(op => op.toLowerCase().includes(val.toLowerCase()))
            .map(op => ({ label: op }))
        ];
      });
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
  created() {
    this.fabGithub = fabGithub;
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
