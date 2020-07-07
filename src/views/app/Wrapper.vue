<template>
  <div id="pkm-wrapper">
    <v-app-bar
      dark
      flat
      fade-img-on-scroll
    >
      <v-app-bar-nav-icon>
        <v-icon dark color="green">
          add
        </v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title style="font-size: 18px;">
        SIAPKM
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn @click="handleLogout" text>Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-toolbar dense flat dark color="green">
      <v-toolbar-items>
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/app/balita/list">Alternatif</v-btn>
        <v-btn text to="/app/rank">Nilai</v-btn>
        <v-btn text to="/app/laporan">Laporan</v-btn>
        <v-btn text to="/app/kriteria/list">Kriteria</v-btn>
        <v-btn text to="/app/priors">Defuzzifikasi</v-btn>
        <v-btn text to="/app/standar_bb">Anthropometry</v-btn>
        <v-btn text to="/app/sg">Status Gizi</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-main>
      <div class="px-6 my-6">
        <router-view/>
      </div>
    </v-main>
    <v-footer app class="mt-4 pa-4">
      <v-flex
        xs12
        class="text-center"
      >
        {{ new Date().getFullYear() }} — <strong>Marni Nokas</strong>
      </v-flex>
    </v-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { isLoggedIn, logout } from '@/services/auth';

export default Vue.extend({
  name: 'AppWrapper',

  methods: {
    handleLogout() {
      logout();
      this.$router.replace('/login');
    }
  },

  mounted () {
    if (!isLoggedIn()) {
      this.$router.replace('/login');
    }
  }
});
</script>

<style lang="scss">
.v-toolbar__extension {
  padding: 0;
}

#pkm-wrapper {
  .v-btn {
    text-transform: none;
  }
}
</style>