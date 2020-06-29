<template>
  <div id="pkm-wrapper">
    <v-app-bar
      app
      absolute
      dark
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      height=120
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(27,94,32, .7), rgba(27,94,32, .7)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon>
        <v-icon dark color="green">
          add
        </v-icon>
      </v-app-bar-nav-icon>
      <v-spacer/>
      <v-toolbar-title style="font-size: 18px;">
        Sistem Pendukung Keputusan Penentuan Status Gizi Buruk Balita Puskesmas Tetaf, Kec. Kuatnana, Kab. TTS, NTT
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn @click="handleLogout" text>Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols=10 offset=1>
            <v-toolbar dense extended extension-height="2px">
              <v-toolbar-items>
                <v-btn text to="/">Home</v-btn>
                <v-btn text to="/app/balita/list">Alternatif</v-btn>
                <v-btn text to="/app/rank">Perangkingan</v-btn>
                <v-btn text to="/app/laporan">Laporan</v-btn>
                <v-btn text to="/app/settings">Kriteria</v-btn>
              </v-toolbar-items>
              <v-spacer/>
              <template #extension>
                <div class="green" style="height: 2px; width: 100%;"></div>
              </template>
            </v-toolbar>
            <v-card>
              <router-view/>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
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