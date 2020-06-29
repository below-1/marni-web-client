<template>
  <div id="home">
    <v-app-bar
      app
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(27,94,32, .7), rgba(27,94,32, .7)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon>
        <v-icon dark color="red">
          add
        </v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        siapkm
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn text to="/login">Login</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <div class="hero">
        <v-container>
          <v-row>
            <v-col cols=8 offset=2 class="text-center">
              <v-icon color="red" size="180">
                add
              </v-icon>
              <div style="font-size: 22px;" class="font-weight-bold white--text">
                Sistem Pendukung Keputusan Penentuan Status Gizi Buruk Balita Puskesmas Tetaf, Kec. Kuatnana, Kab. TTS, NTT
              </div>
              <v-divider class="pt-1 grey darken-2" style="margin-top: 60px;"/>
            </v-col>
          </v-row>
        </v-container>
      </div>
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
import HelloWorld from '../components/HelloWorld.vue';

export default Vue.extend({
  components: {
    HelloWorld,
  },
});
</script>

<style lang="scss">
$bg-1: rgba(0, 0, 0, 0.7);
$bg-2: rgba(27,94,32, .7);

#home {
  .v-toolbar__extension {
    padding: 0 !important;
  }

  .hero {
    margin: 0;
    padding: 0;
    background: linear-gradient(to right, $bg-1, $bg-1),
      url('/img/bg2.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 100vw;
  }

  #info {
    min-height: 60vh;
  }

  #gallery {
    min-height: 80vh;
  }
}
</style>