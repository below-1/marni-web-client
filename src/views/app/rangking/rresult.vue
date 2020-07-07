<template>
  <div id="balita-list">
    <v-card tile flat>
      <v-toolbar flat>
        <v-toolbar-title class="mr-2">Hasil Nilai</v-toolbar-title>

        <v-btn-toggle mandatory dense v-model="mode">
          <v-btn small value="normal">nilai</v-btn>
          <v-btn small value="defuzz">defuzzifikasi</v-btn>
          <v-btn small value="normed">normalisasi</v-btn>
        </v-btn-toggle>

        <v-spacer/>
        <v-text-field
          v-model="keyword"
          hide-details
          hide-default-footer
          flat
          placeholder="Keyword pencarian berdasarkan nama pasien dan nama penyakit."
          prepend-icon="mdi-magnify"
        />
      </v-toolbar>

      <v-simple-table v-if="mode == 'normed'">
        <template v-slot:default>
          <thead>
            <tr>
              <td>Id</td>
              <td>Alternatif</td>
              <td>C1</td>
              <td>C2</td>
              <td>C3</td>
              <td>C4</td>
              <td>V</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.fuzz[0].toFixed(3) }}</td>
              <td>{{ item.fuzz[1].toFixed(3) }}</td>
              <td>{{ item.fuzz[2].toFixed(3) }}</td>
              <td>{{ item.fuzz[3].toFixed(3) }}</td>
              <td>
                {{ item.v.toFixed(3) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-simple-table v-if="mode == 'defuzz'">
        <template v-slot:default>
          <thead>
            <tr>
              <td>Id</td>
              <td>Alternatif</td>
              <td>C1</td>
              <td>C2</td>
              <td>C3</td>
              <td>C4</td>
              <td>V</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.norm[0].toFixed(3) }}</td>
              <td>{{ item.norm[1].toFixed(3) }}</td>
              <td>{{ item.norm[2].toFixed(3) }}</td>
              <td>{{ item.norm[3].toFixed(3) }}</td>
              <td>
                {{ item.v.toFixed(3) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-data-table
        v-if="mode == 'normal'"
        :headers="headers"
        :items="filtered"
        hide-default-footer
        :server-items-length="filtered.length"
        :items-per-page="filtered.length"
      >
        <template v-slot:item.sex="{ item }">
          {{ item.sex == 'PEREMPUAN' ? 'Perempuan' : 'Laki - Laki' }}
        </template>

        <template v-slot:item.v="{ item }">
          {{ item.v.toFixed(3) }}
        </template>

      </v-data-table>

    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { apiRank } from '@/services/rank';
import { formatV, bb_umur_format } from '@/util';
import { instance as ax } from "@/services/axios";

type IData = {
  headers: any[];
  items: any[];
  keyword: string;
  mode: 'normal' | 'defuzz' | 'normed';
}

const defData = () => ({

  headers: [
    {
      text: 'ID',
      value: 'id'
    },
    {
      text: 'Nama',
      value: 'nama'
    },
    {
      text: 'Umur',
      value: 'age'
    },
    {
      text: 'BB',
      value: 'beratBadan'
    },
    {
      text: 'TB',
      value: 'tinggiBadan'
    },
    {
      text: 'JK',
      value: 'sex'
    },
    {
      text: 'V',
      value: 'v'
    },
    {
      text: 'BB/U',
      value: 'bb'
    },
    {
      text: 'Ket',
      value: 'bb_ket'
    }
  ],
  items: [] as any[],
  keyword: '',
  mode: 'normal'
});

export default Vue.extend({

  data: defData,

  computed: {
    filtered () {
      const keywordUpper = this.keyword.toUpperCase();
      const items: any[] = this.items;
      return items.filter((it: any) => {
        return it.nama.toUpperCase().includes(keywordUpper);
      });
    }
  },

  methods: {

    async loadRank() {
      let items = await apiRank();
      this.items = items.map((it: any) => ({
        ...it,
        formatV: formatV(it.v),
        bb: '-'
      }));
      console.log(items[0]);

      let bb_umur_params = items.map((it: any) => {
        return {
          age_in_month: it.age * 12,
          bb: it.beratBadan,
          sex: it.sex
        }
      });
      const resp = await ax.post('bb_lookup', bb_umur_params);
      const bb_data = resp.data;
      for (let i=0; i < items.length; i++) {
        this.items[i].bb = bb_data[i];
        this.items[i].bb_ket = bb_umur_format(bb_data[i]);
      }
    }

  },

  mounted() {
    this.loadRank();
  }

});

</script>

<style lang="scss">
  #balita-list {
    margin-top: 20px;
  }
</style>