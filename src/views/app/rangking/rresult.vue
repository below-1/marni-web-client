<template>
  <div id="balita-list">
    <v-card tile flat>
      <v-toolbar flat>
        <v-toolbar-title>Hasil Perangkingan</v-toolbar-title>
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
      <v-data-table
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
  keyword: ''
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