<template>
	<div id="settings">
		<v-card>
			<v-card-title>
				Data Kriteria
			</v-card-title>
			<v-card-text class="download-links">
        <v-data-table
          :headers="headers"
          :items="items"
          hide-default-footer
        >
        </v-data-table>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {
  name: 'settings',
  data: () => ({
    headers: [
      {
        text: 'Kriteria',
        value: 'kriteria'
      },
      {
        text: 'Kode',
        value: 'kode'
      },
      {
        text: 'Penilaian',
        value: 'penilaian'
      }
    ],
    items: []
  })
}
</script>