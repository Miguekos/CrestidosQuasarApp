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
      <!--      <thead>-->
      <!--        <tr>-->
      <!--          <th class="text-left">Prestamo:</th>-->
      <!--          <th class="text-right"> {{ info.deuda }} ./S</th>-->
      <!--        </tr>-->
      <!--      </thead>-->
      <tbody>
        <tr>
          <td class="text-left">Prestamo:</td>
          <td class="text-right">{{ info.deuda }} ./S</td>
        </tr>
        <tr>
          <td class="text-left">Deuda Actual:</td>
          <td class="text-right">{{ info.deudaActual }} ./S</td>
        </tr>
        <tr>
          <td class="text-left">Importe por cuotas:</td>
          <td class="text-primary text-bold text-right">{{ info.importeCuota }} ./S</td>
        </tr>
        <tr>
          <td class="text-left">Cuotas Canceladas:</td>
          <td class="text-right">{{ info.totalCuotasPagadas }}</td>
        </tr>
        <tr>
          <td class="text-left">Proximo Pago:</td>
          <td class="text-right">{{ info.proximadiadepago[0] }}</td>
        </tr>
        <tr>
          <td class="text-left">Cuotas Vencidas:</td>
          <td v-if="info.DiasMora > 0" class="text-red text-right">
            <strong>{{ info.DiasMora }}</strong>
          </td>
          <td v-else class="text-right">0</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
export default {
  props: ["info"],
  data() {
    return {
      separator: "horizontal"
    };
  }
};
</script>
