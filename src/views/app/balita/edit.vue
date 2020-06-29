<template>
  <v-dialog :value="true" width=500>
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="item.nama"
          label="Nama"
        />
        <v-text-field
          v-model="item.tanggalLahir"
          type="date"
          label="Tanggal Lahir"
        />
        <v-text-field
          v-model.number="item.beratBadan"
          type="number"
          label="Berat Badan"
        />
        <v-text-field
          v-model.number="item.tinggiBadan"
          type="number"
          label="Tinggi Badan"
        />

        <v-select
          v-model="item.sex"
          :items="optionsSex"
          label="Jenis Kelamin"
        >
        </v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="onSave">
          Simpan
        </v-btn>
        <v-btn text @click="$router.back()">
          Batal
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { apiGetOneBalita, apiUpdateBalita } from '@/services/balita';

type IData = {
  item: {
    nama: string;
    tanggalLahir: string;
    beratBadan: number;
    tinggiBadan: number;
    woman: boolean;
    sex: 'PEREMPUAN' | 'LAKI_LAKI';
  },
  optionsSex: any[]
};

const defData = () => ({
  item: {
    nama: '',
    tanggalLahir: '',
    beratBadan: 0,
    tinggiBadan: 0,
    sex: 'LAKI_LAKI',
    woman: true
  },
  optionsSex: [
    { text: 'Perempuan', value: 'PEREMPUAN' },
    { text: 'Laki - Laki', value: 'LAKI_LAKI' }
  ]
});

export default Vue.extend({

  props: ['id'],

  data: defData,

  methods: {

    async onSave() {
      const payload = {
        ...this.item
      };
      try {
        await apiUpdateBalita(this.id, payload);
        alert('Sukses mengubah data balita');
      } catch (err) {
        alert('Gagal mengubah data balita');
        console.log(err);
      } finally {
        this.$router.back();
      }

    }

  },

  async mounted () {
    this.item = await apiGetOneBalita(this.id);
    this.item.tanggalLahir = this.item.tanggalLahir.substring(0, 10);
  }
});
</script>