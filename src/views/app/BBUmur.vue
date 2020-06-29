<template>
  <div id="bb-umur">
    <v-card tile flat>
      <v-toolbar flat>
        <v-toolbar-title>Hasil BB/Umur</v-toolbar-title>
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

        <template v-slot:item.bb="{ item }">
          <div class="text-capitalize">Gizi {{ item.bb }}</div>
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
  headers: any[],
  items: any[],
  keyword: string
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
      text: 'Berat Badan',
      value: 'beratBadan'
    },
    {
      text: 'Jenis Kelamin',
      value: 'sex'
    },
    {
      text: 'Kategori Gizi',
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
      items = items.map((it: any) => ({
        ...it,
        formatV: formatV(it.v),
        bb: '-',
        bb_ket: '-'
      }));

      this.items = items;

      let bb_umur_params = items.map((it: any) => {
        return {
          age_in_month: 24,
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