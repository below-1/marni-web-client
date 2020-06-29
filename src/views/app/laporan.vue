<template>
	<div id="laporan">
		<v-card>
			<v-card-title>
				Download Laporan
			</v-card-title>
			<v-card-text class="download-links">
				<a class="link" href="http://localhost:5000/api/report/alternatif" target="_blank">
					Laporan Alternatif
					<v-icon class="ml-2">picture_as_pdf</v-icon>
				</a>
				<a class="link" href="http://localhost:5000/api/report/perangkingan" target="_blank">
					Laporan Perangkingan
					<v-icon class="ml-2">picture_as_pdf</v-icon>
				</a>
			</v-card-text>
		</v-card>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'view-laporan'
});
</script>

<style>
.download-links .link {
	display: block;
	font-size: 16px;
	margin-bottom: 16px;
	text-decoration: underline;
	cursor: pointer;
}
</style>