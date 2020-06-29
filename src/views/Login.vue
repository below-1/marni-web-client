<template>
	<v-dialog :value="true" width=500>
		<v-card>
			<v-card-title>
				Login
			</v-card-title>

				<v-card-text v-if="state == 'fail'" class="red white--text text-center">
					<div class="title py-0 my-0">
						Gagal Login
					</div>
				</v-card-text>

				<v-card-text>
					<v-text-field
						label="Username"
						v-model="username"
					/>

					<v-text-field
						label="Password"
						type="password"
						v-model="password"
					/>
				</v-card-text>
				<v-card-actions >
					<v-btn dark color="green" depressed @click="handleLogin">
						Login
					</v-btn>
				</v-card-actions>

		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { isLoggedIn, login } from '@/services/auth';

export default Vue.extend({
	name: 'Login',

	data: () => ({
		username: '',
		password: '',
		state: 'idle'
	}),

	methods: {
		handleLogin() {
			const payload = { username: this.username, password: this.password };
			const result = login(payload);
			if (!result) {
				this.state = 'fail';
			} else {
				this.$router.replace('/app/balita/list');
			}
		}
	},

	mounted() {
		if (isLoggedIn()) {
			this.$router.replace('/app/balita/list');
		}
	}
});
</script>