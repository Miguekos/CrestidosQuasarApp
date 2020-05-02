<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px; margin: 0 auto;">
      <q-card>
        <q-tabs
          v-model="tab"
          class="bg-primary text-white"
          align="justify"
          narrow-indicator
        >
          <q-tab name="Login" label="Login" />
          <q-tab name="Registrar" label="Registrar" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="bg-primary-1 text-center">
          <q-tab-panel name="Login">
            <login-register :tab="tab" />
          </q-tab-panel>

          <q-tab-panel name="Registrar">
            <login-register :tab="tab" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "Login"
    };
  },
  components: {
    "login-register": require("../../components/Auth/LoginRegister.vue").default
  }
};
</script>

<style>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}
</style>
