<template>
  <div class="q-pa-md">
    <q-table
      :separator="separator"
      :filter="filter"
      :data="data"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"
      class="my-sticky-header-table"
      flat
      bordered
      rows-per-page-label="Por pagina:"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.calories }}
          </q-td>
          <q-td key="actions" :props="props">
            <div class="q-gutter-md">
              <q-btn dense size="sm" color="info" icon="remove_red_eye" />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: "",
      separator: "horizontal",
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 6
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "right",
          label: "DNI",
          field: "calories",
          sortable: true
        },
        {
          name: "actions",
          align: "right",
          label: "Push",
          field: "actions"
        }
      ],
      data: [
        {
          name: "Frozen Yogurt Frozen",
          calories: 45464746,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        }
      ]
    };
  }
};
</script>
