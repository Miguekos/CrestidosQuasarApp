<template>
  <div class="q-pa-xs">
    <!--    <q-option-group-->
    <!--      v-model="separator"-->
    <!--      inline-->
    <!--      class="q-mb-md"-->
    <!--      :options="[-->
    <!--        { label: 'Horizontal', value: 'horizontal' },-->
    <!--        { label: 'Vertical', value: 'vertical' },-->
    <!--        { label: 'Cell', value: 'cell' },-->
    <!--        { label: 'None', value: 'none' }-->
    <!--      ]"-->
    <!--    />-->

    <q-markup-table dense :separator="separator" bordered>
      <thead>
        <tr>
          <th class="text-left">Prestamo:</th>
          <th class="text-right">1200 ./S</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">Deuda Actual:</td>
          <td class="text-right">600 ./S</td>
        </tr>
        <tr>
          <td class="text-left">Cuotas Canceladas:</td>
          <td class="text-right">6</td>
        </tr>
        <tr>
          <td class="text-left">Proximo Pago:</td>
          <td class="text-right">09/03/2020</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      separator: "horizontal"
    };
  }
};
</script>
