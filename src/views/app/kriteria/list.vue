<template>
  <div>
    <v-toolbar flat color="grey lighten-4" dense>
      <v-app-bar-nav-icon @click="$router.push('/app/kriteria/add')">
        <v-icon color="blue accent-2" large>
          add
        </v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Data Kriteria</v-toolbar-title>
      <v-spacer/>
      <v-text-field
        v-model="keyword"
        hide-details
        flat
        dense
        placeholder="Keyword pencarian berdasarkan nama pasien dan nama penyakit."
        prepend-icon="mdi-magnify"
      />
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
    >
      <template v-slot:item.weight="{ item }">
        <div>
          [{{ item.weight_a.toFixed(3) }}, {{ item.weight_b.toFixed(3) }}, {{ item.weight_c.toFixed(3) }}]
        </div>
      </template>
      <template v-slot:item.action="{ item }">
        <div>

          <v-btn :to="`/app/kriteria/${item.id}/subs`" small depressed>
            subs
          </v-btn>

          <v-btn dark small icon @click="del(item.id)">
            <v-icon small color="red">
              remove
            </v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { instance as axios } from '@/services/axios';

export default {
  name: 'list-kriteria',
  data: () => ({
    keyword: '',
    headers: [
      {
        text: 'ID',
        value: 'id'
      },
      {
        text: 'Kode',
        value: 'kode'
      },
      {
        text: 'Label',
        value: 'label'
      },
      {
        text: 'bobot',
        value: 'weight'
      },
      {
        text: 'Tipe',
        value: 'type_kriteria'
      },
      {
        text: 'Nilai Default',
        value: 'defaultValue'
      },
      {
        text: '',
        value: 'action'
      }
    ],
    items: []
  }),
  methods: {
    loadData () {
      axios.get('/kriteria')
        .then(resp => resp.data)
        .then(data => {
          this.items = data;
        })
        .catch(err => {
          console.log(err);
          alert('gagal mengambil data kriteria');
        })
    },
    del (id) {
      axios.delete(`/kriteria/${id}`)
        .then(resp => {
          return this.loadData()
        })
        .catch(err => {
          console.log(err);
          alert('gagal menghapus data')
        })
    }
  },
  mounted () {
    this.loadData();
  }
}
</script>
