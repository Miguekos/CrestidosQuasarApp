<template>
  <div class="loginform flex flex-center">
    <div class="row justify-center">
      <!-- <div class="col-8 text-center">
        <p class="text-white caption">Inicio de Sesion </p>
      </div> -->

      <q-card
        class="my-card text-white"
        style="width: 300px; height: 280px; background: radial-gradient(circle, #26a69a 0%, #014a88 100%)"
      >
        Aqui va el ogin
      </q-card>
    </div>
  </div>
</template>

<script>
// import { LocalStorage } from "quasar";
import { mapActions } from "vuex";
console.log(process.env.API);
// import { openURL } from 'quasar'
export default {
  // preFetch({ store }) {
  //   console.log("stored autth");
  //   console.log(store.state.auth.auth);
  //   if (!store.state.auth) {
  //     console.log(store.state.auth);
  //     // redirect('/')
  //   }
  // },
  data() {
    return {
      loading: false,
      form: {
        email: "user@user.com",
        password: "secret"
      }
    };
  },
  methods: {
    login() {}
  }
};
</script>

<style scoped>
.loginform {
  /* background-color: #365552; */
  background-image: url("/statics/fondo.jpg");
}

.titulo {
  font-size: 22px;
}
</style>
