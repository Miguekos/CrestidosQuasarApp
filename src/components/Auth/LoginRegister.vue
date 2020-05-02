<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        <!--        asd-->
        {{ tab | titleCase }}
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        v-model="formData.email"
        :rules="[
          val => isValidEmailAddress(val) || 'Por favor introduce un email correcto.'
        ]"
        ref="email"
        lazy-rules
        outlined
        class="col"
        label="Email"
        stack-label
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        v-model="formData.password"
        :rules="[
          val => val.length >= 6 || 'Por favor passeord minimo 6 caracteres.'
        ]"
        ref="password"
        lazy-rules
        type="password"
        outlined
        class="col"
        label="Password"
        stack-label
      />
    </div>
    <div class="">
      <q-btn class="full-width" color="primary" :label="tab" type="submit" />
    </div>
  </form>
</template>

<script>
import { LocalStorage } from "quasar";
import { mapActions } from "vuex";
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab == "Login") {
          console.log();
          this.login({
            email: this.formData.email,
            pwd: this.formData.password
          })
            .then(resp => {
              if (resp.codRes == "00") {
                LocalStorage.set("loggin", true);
                console.log("loguerado Correctamente");
                this.$router.push("/");
              } else if (resp.codRes == "01") {
                console.log("Email o Contraseña incorrecta");
              }
            })
            .catch(err => {
              console.log(err);
            });
          console.log("login the user");
        } else {
          console.log("register the user");
        }
      }
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>
