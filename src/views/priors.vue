<template>
  <div>
    <v-toolbar flat color="grey lighten-4" dense>
      <v-spacer/>
      <v-toolbar-title>Defuzifikasi</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <td>Kriteria</td>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>Defuzzifikasi</td>
            <td>Wij</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="criteria in priors" :key="criteria.c">
            <td>{{ criteria.c }}</td>
            <td v-for="(w, wi) in criteria.w" :key="`${criteria.c}-${wi}`">
              {{ w }}
            </td>
            <td>
              {{ criteria.defuzz.toFixed(3) }}
            </td>
            <td>
              {{ criteria.norm.toFixed(3) }}
            </td>
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
    priors: []
  }),
  mounted () {
    instance.get('/priors')
      .then(resp => {
        this.priors = resp.data;
      })
      .catch(err => {
        alert('gagal');
        console.log(err);
      })
  }
}
</script>
