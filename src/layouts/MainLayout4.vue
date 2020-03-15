<template>
  <div>
<!--    <q-layout view="lHh Lpr lFf">-->
    <q-layout view="lHh Lpr lFf" container style="height: 600px" class="shadow-2 rounded-borders">
      <q-header>
        <q-toolbar>
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>

      <!--      <q-page-container>-->
      <!--        <router-view />-->
      <!--      </q-page-container>-->
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn round color="positive" icon="add" class="rotate-0" />
      </q-page-sticky>
<!--      <q-page-sticky position="top" expand class="bg-secondary text-white">-->
      <q-page-sticky position="top">
        <q-tabs dense v-model="tab">
          <q-tab
            v-for="link in essentialLinks"
            :key="link.title"
            @click="URL(link.link)"
            :name="link.title"
            :label="link.title"
          />
        </q-tabs>
      </q-page-sticky>
    </q-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          icon: "chat",
          link: "https://chat.quasar.dev",
          icon: "description",
          alert: "green"
        },
        {
          title: "Config",
          caption: "forum.quasar.dev",
          icon: "record_voice_over",
          link: "https://forum.quasar.dev",
          icon: "settings",
          alert: "blue"
        }
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
    boton() {
      console.log("Se preciono el boton");
    }
  }
};
</script>
