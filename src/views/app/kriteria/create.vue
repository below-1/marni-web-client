<template>
  <v-dialog :value="true" width=500>
    <v-card>
      <v-card-title>Input Data Kriteria</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="item.kode"
          label="Kode"
        />
        <v-text-field
          v-model="item.label"
          label="Label"
        />
        
        <v-select
          v-model="weight"
          :items="weight_options"
          label="bobot"
        >
        </v-select>

        <v-select
          v-model="item.type_kriteria"
          :items="options.type"
          label="Tipe"
        >
        </v-select>


        <v-text-field
          label="default"
          v-if="item.type_kriteria == 'numeric'"
          v-model.number="item.defaultValue"
          type="number"
        />

        <v-text-field
          label="default"
          v-else
          v-model="item.defaultValue"
        />

      </v-card-text>
      <v-card-actions>
        <v-btn text @click="save">
          Simpan
        </v-btn>
        <v-btn text @click="$router.back()">
          Batal
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { instance as axios } from '@/services/axios';

const weight_options = [
  { text: 'sangat rendah', value: [0, 0, 0.25] },
  { text: 'rendah', value: [0, 0.25, 0.5] },
  { text: 'normal', value: [0.25, 0.5, 0.75] },
  { text: 'tinggi', value: [0.5, 0.75, 1.0] },
  { text: 'sangat tinggi', value: [0.75, 0.75, 1.0] }
];

export default {
  data: () => ({
    item: {
      label: '',
      kode: '',
      weight_a: 0,
      weight_b: 0,
      weight_c: 0,
      type_kriteria: 'categorial',
      defaultValue: ''
    },
    options: {
      type: ['categorial', 'numeric']
    },
    weight: weight_options[0].value,
    weight_options: [...weight_options]
  }),
  methods: {
    save () {
      const item = { ...this.item };
      item.weight_a = this.weight[0];
      item.weight_b = this.weight[1];
      item.weight_c = this.weight[2];
      axios.post('/kriteria/', item)
        .then(resp => {
          alert('sukses menambah data kriteria');
          this.$router.push('/app/kriteria/list');
        })
        .catch(err => {
          alert('gagal menambah data kriteria');
        })
    }
  }
}
</script>