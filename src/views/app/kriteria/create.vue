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
        <v-row>
          <v-col>
            <v-text-field
              v-model.number="item.weight_a"
              type="number"
            />
          </v-col>
          <v-col>
          <v-text-field
            v-model.number="item.weight_b"
            type="number"
          />
          </v-col>
          <v-col>
          <v-text-field
            v-model.number="item.weight_c"
            type="number"
          />
          </v-col>
        </v-row>

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
    }
  }),
  methods: {
    save () {
      axios.post('/kriteria/', this.item)
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