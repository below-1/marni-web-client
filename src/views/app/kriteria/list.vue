<template>
  <v-card tile flat>
    <v-toolbar flat>
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
        placeholder="Keyword pencarian berdasarkan nama pasien dan nama penyakit."
        prepend-icon="mdi-magnify"
      />
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: 'list-kriteria'
}
</script>
