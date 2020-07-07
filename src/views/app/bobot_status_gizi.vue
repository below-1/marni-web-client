<template>
  <div>
    <v-toolbar flat color="grey lighten-4" dense>
      <v-toolbar-title class="mr-2">Bobot Status Gizi</v-toolbar-title>

      <v-btn-toggle mandatory dense v-model="mode" @change="loadData()" class="mr-2">
        <v-btn small value="tinggi">tinggi</v-btn>
        <v-btn small value="berat">berat</v-btn>
      </v-btn-toggle>

      <v-text-field
        dense
        small
        hide-details
        boxed
        type="number" 
        label="umur" 
        min="0" 
        v-model="umur" 
        max="5" 
        @change="loadData()"
      />

      <v-spacer/>
    </v-toolbar>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <td>Bobot</td>
            <td>Perempuan</td>
            <td>Laki - Laki</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td>{{ row.label }}</td>
            <td>{{ row.woman_low }} - {{ row.woman_upper }}</td>
            <td>{{ row.man_low }} - {{ row.man_upper }}</td>
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
    mode: 'berat',
    umur: 0,
    rows: []
  }),
  methods: {
    async loadData () {
      const resp = await instance.get(`/who/bobot_sg`, {
        params: {
          mode: this.mode,
          umur: this.umur
        }
      });
      this.rows = resp.data;
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
