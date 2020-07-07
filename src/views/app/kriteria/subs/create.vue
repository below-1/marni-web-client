<template>
  <v-dialog :value="true" width=500>
    <v-card>
      <v-card-title>Input Data Sub Kriteria {{ kriteria.label }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="item.kode"
          label="Kode"
        />
        <v-text-field
          v-model="item.label"
          label="Label"
        />

        <div v-if="kriteria.type_kriteria == 'numeric'">
          <v-text-field
            v-model.number="item.range_min"
            type="number"
            step="0.01"
            label="Min"
          />
          <v-select
            v-model="item.range_lower_sign"
            :items="options.sign"
            label="Tanda Batas Bawah"
          />
          <v-text-field
            v-model.number="item.range_max"
            type="number"
            step="0.01"
            label="Max"
          />
          <v-select
            v-model="item.range_upper_sign"
            :items="options.sign"
            label="Tanda Batas Atas"
          />
        </div>

        <div>
          <div>Bobot</div>
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
        </div>
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
  props: ['id'],
  data: () => ({
    item: {
      label: '',
      kode: '',
      cat_value: 0,
      range_min: 0,
      range_max: 0,
      range_lower_sign: '<',
      range_upper_sign: '<',
      weight_a: 0,
      weight_b: 0,
      weight_c: 0,
    },
    options: {
      sign: ['<', '<=']
    },
    kriteria: {
      id: 0,
      label: '',
      kode: '',
      type_kriteria: 'numeric'
    }
  }),
  methods: {
    async load () {
      const kriteriaResp = await axios.get(`/kriteria/${this.id}`)
      this.kriteria = { ...kriteriaResp.data };
    },
    save () {
      const payload = this.kriteria.type_kriteria == 'categorial'
        ? {
          label: this.item.label,
          kode: this.item.kode,
          weight_c: this.item.weight_c,
          weight_b: this.item.weight_b,
          weight_a: this.item.weight_a
        }
        : { ...this.item };
      axios.post(`/kriteria/${this.id}/subs`, payload)
        .then(resp => {
          alert('sukses menambah data sub kriteria');
          this.$router.push(`/app/kriteria/${this.id}/subs`);
        })
        .catch(err => {
          alert('gagal menambah data sub kriteria');
        })
    }
  },
  mounted () {
    this.load();
  }
}
</script>