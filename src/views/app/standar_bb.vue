<template>
  <div>
    <v-toolbar flat color="grey lighten-4" dense>
      <v-toolbar-title class="mr-2">Antrhopometry</v-toolbar-title>
      <v-btn-toggle mandatory dense v-model="mode" @change="loadData($event)">
        <v-btn small value="men">laki - laki</v-btn>
        <v-btn small value="women">perempuan</v-btn>
      </v-btn-toggle>
      <v-spacer/>
    </v-toolbar>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <td>Umur (bulan)</td>
            <td>-3SD</td>
            <td>-2SD</td>
            <td>-1SD</td>
            <td>Median</td>
            <td>1SD</td>
            <td>2SD</td>
            <td>3SD</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td>{{ row.umur }}</td>
            <td>{{ row.min_c }}</td>
            <td>{{ row.min_b }}</td>
            <td>{{ row.min_a }}</td>
            <td>{{ row.median }}</td>
            <td>{{ row.plus_a }}</td>
            <td>{{ row.plus_b }}</td>
            <td>{{ row.plus_c }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { instance } from '@/services/axios';

export default {
  data: () => ({
    mode: 'men',
    rows: []
  }),
  methods: {
    async loadData (type) {
      const resp = await instance.get(`/who/bb_median/${type}`);
      this.rows = resp.data;
    }
  },
  mounted () {
    this.loadData(this.mode)
  }
}
</script>
