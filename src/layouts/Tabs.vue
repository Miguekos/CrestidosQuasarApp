<template>
  <div class="">
    <div class="">
      <q-card flat>
        <q-tabs
          v-model="tab"
          class="bg-grey-4 text-grey-7"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="clientes" label="Clientes" />
          <q-tab name="pagos" label="Pagos" />
          <!--          <q-tab name="control" label="Control" />-->
        </q-tabs>

        <q-tab-panels v-model="tab" animated swipeable class="bg-grey-4">
          <q-tab-panel class="paneles" name="clientes">
            <Clientes />
          </q-tab-panel>

          <q-tab-panel class="paneles" name="pagos">
            <Pagos />
          </q-tab-panel>

          <!--          <q-tab-panel class="paneles" name="control">-->
          <!--            <Control />-->
          <!--          </q-tab-panel>-->
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: "clientes"
    };
  },
  components: {
    Clientes: () => import("../pages/Clientes/Index"),
    Search: () => import("../components/Search"),
    Pagos: () => import("../pages/Pagos/Index"),
    Control: () => import("../pages/Control/Index")
  }
};
</script>
<style>
.paneles {
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 70px;
  padding-left: 0px;
}
</style>
