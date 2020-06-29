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

<script>
export default {
  
}
</script>