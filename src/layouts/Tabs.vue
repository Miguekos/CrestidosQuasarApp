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
          <!--          <q-tab name="movies" label="Movies" />-->
        </q-tabs>

        <q-tab-panels v-model="tab" animated swipeable class="bg-grey-4">
          <q-tab-panel class="paneles" name="clientes">
            <!--            <div class="text-h6">Clientes</div>-->
            <!--            <Search class="col" />-->
            <Clientes />
          </q-tab-panel>

          <q-tab-panel class="paneles" name="pagos">
            <!--            <div class="text-h6">Pagos</div>-->
            <!--            Lorem ipsum dolor sit amet consectetur adipisicing elit.-->
            <Pagos />
          </q-tab-panel>

          <!--          <q-tab-panel class="paneles" name="movies">-->
          <!--            <div class="text-h6">Movies</div>-->
          <!--            Lorem ipsum dolor sit amet consectetur adipisicing elit.-->
          <!--          </q-tab-panel>-->
        </q-tab-panels>
      </q-card>

      <!--      <q-card>-->
      <!--        <q-tabs-->
      <!--          v-model="tab"-->
      <!--          class="bg-purple text-white"-->
      <!--          align="justify"-->
      <!--          narrow-indicator-->
      <!--        >-->
      <!--          <q-tab name="clientes" label="Clientes" />-->
      <!--          <q-tab name="pagos" label="Pagos" />-->
      <!--          <q-tab name="movies" label="Movies" />-->
      <!--        </q-tabs>-->

      <!--        <q-separator />-->

      <!--        <q-tab-panels v-model="tab" animated class="bg-purple-1 text-center">-->
      <!--          <q-tab-panel name="clientes">-->
      <!--            <div class="text-h6">Clientes</div>-->
      <!--            Lorem ipsum dolor sit amet consectetur adipisicing elit.-->
      <!--          </q-tab-panel>-->

      <!--          <q-tab-panel name="pagos" class="bg-purple-2">-->
      <!--            <div class="text-h6">Pagos</div>-->
      <!--            Lorem ipsum dolor sit amet consectetur adipisicing elit.-->
      <!--          </q-tab-panel>-->

      <!--          <q-tab-panel name="movies">-->
      <!--            <div class="text-h6">Movies</div>-->
      <!--            Lorem ipsum dolor sit amet consectetur adipisicing elit.-->
      <!--          </q-tab-panel>-->
      <!--        </q-tab-panels>-->
      <!--      </q-card>-->
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
    Pagos: () => import("../pages/Pagos/Index")
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
