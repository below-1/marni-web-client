<template>
  <div>
    <v-toolbar dense flat color="grey lighten-5">
      <v-app-bar-nav-icon @click="$router.push(`/app/kriteria/${id}/subs/add`)">
        <v-icon color="blue accent-2" large>
          add
        </v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Data Sub Kriteria</v-toolbar-title>
    </v-toolbar>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Kode</th>
            <th class="text-left">Label</th>
            <th class="text-left">Bobot</th>
            <th class="text-left"></th>
            <th class="text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.kode }}</td>
            <td>{{ item.label }}</td>
            <td>
              [{{ item.weight_a.toFixed(3) }}, {{ item.weight_b.toFixed(3) }}, {{ item.weight_c.toFixed(3) }}]
            </td>
            <td></td>
            <td class="text-right">
              <v-btn dark small icon :to="`/app/kriteria/${item.id}/edit`">
                <v-icon small color="green">
                  create
                </v-icon>
              </v-btn>

              <v-btn dark small icon @click="del(item.id)">
                <v-icon small color="red">
                  remove
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { instance as axios } from '@/services/axios';

export default {
  name: 'list-sub-kriteria',
  props: ['id'],
  data: () => ({
    items: []
  }),
  methods: {
    loadData () {
      return axios.get(`/kriteria/${this.id}/subs`)
      .then(resp => resp.data)
      .then(data => {
        this.items = data;
      })
      .catch(err => {
        console.log(err);
        alert('gagal mengambil data sub kriteria');
      })
    },
    del (idSub) {
      axios.delete(`/subs/${idSub}`)
        .then(resp => {
          alert('sukses menghapus data subkriteria');
          return this.loadData();
        })
        .catch(err => {
          console.log(err);
          alert('gagal menghapus data');
        })
    }
  },
  mounted () {
    console.log('here');
    this.loadData();
  }
}
</script>