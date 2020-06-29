<template>
  <div id="balita-list">
    <v-card tile flat>
      <v-toolbar flat>
        <v-app-bar-nav-icon @click="$router.push('/app/balita/add')">
          <v-icon color="blue accent-2" large>
            add
          </v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title>Data Alternatif</v-toolbar-title>
        <v-spacer/>
        <v-text-field
          v-model="keyword"
          hide-details
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

        <template v-slot:item.action="{ item }">
          <div>
            <v-btn dark small icon :to="`/app/balita/edit/${item.id}`">
              <v-icon small color="green">
                create
              </v-icon>
            </v-btn>

            <v-btn dark small icon @click="onDelete(item.id)">
              <v-icon small color="red">
                remove
              </v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { apiListBalita, apiDeleteBalita } from '@/services/balita';

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
      text: 'Berat Badan',
      value: 'beratBadan'
    },
    {
      text: 'Tinggi Badan',
      value: 'tinggiBadan'
    },
    {
      text: 'Jenis Kelamin',
      value: 'sex'
    },
    {
      text: '',
      value: 'action'
    }
  ],
  items: [],
  keyword: ''
});

export default Vue.extend({

  data: defData,

  computed: {
    filtered () {
      const keywordUpper = this.keyword.toUpperCase();
      return this.items.filter((it: any) => {
        return it.nama.toUpperCase().includes(keywordUpper);
      });
    }
  },

  methods: {

    async loadDataBalita() {
      this.items = await apiListBalita();
    },

    async onDelete(id: number) {
      try {
        await apiDeleteBalita(id);
        alert('Sukses menghapus data balita');
      } catch (err) {
        alert('Gagal menghapus data balita');
        console.log(err);
      } finally {
        this.loadDataBalita();
      }
    }

  },

  mounted() {
    this.loadDataBalita();
  }

});

</script>

<style lang="scss">
  #balita-list {
    margin-top: 20px;
  }
</style>