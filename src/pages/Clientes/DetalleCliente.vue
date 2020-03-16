<template>
  <div>
    <q-card flat class="my-card">
      <q-card-section class="text-center">
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
        </q-avatar>
        <q-item-section>
          <q-item-label overline>Miguel Rodriguez</q-item-label>
          <q-item-label>001811517</q-item-label>
          <q-item-label caption>965778450</q-item-label>
        </q-item-section>
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-expansion-item
            popup
            icon="mail"
            label="Credito 1"
            caption="Detalle"
          >
            <q-separator />
            <q-card>
              <q-card-section> </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item
            popup
            icon="send"
            label="Credito 2"
            caption="Detalle"
          >
            <q-separator />
            <q-card>
              <q-card-section>
                Credito 2
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item
            popup
            icon="drafts"
            label="Credito 3"
            caption="Detalle"
          >
            <q-separator />
            <q-card>
              <q-card-section>
                Credito 3
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "DetalleCliente",
  data() {
    return {
      loading: false,
      info: null
    };
  },
  created() {
    console.log(this.$route.params);
  }
};
</script>
