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
import { apiCreateBalita } from '@/services/balita';

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
    woman: true,
    sex: 'PEREMPUAN'
  },
  optionsSex: [
    { text: 'Perempuan', value: 'PEREMPUAN' },
    { text: 'Laki - Laki', value: 'LAKI_LAKI' }
  ]
});

export default Vue.extend({
  data: defData,

  methods: {

    async onSave() {
      const payload = {
        ...this.item
      };
      try {
        await apiCreateBalita(payload);
        alert('Sukses menambah data balita');
      } catch (err) {
        alert('Gagal menambah data balita');
        console.log(err);
      } finally {
        this.$router.back();
      }

    }

  }
});
</script>