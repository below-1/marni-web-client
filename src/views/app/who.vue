<template>
  <div>
    <v-toolbar flat color="grey lighten-4" dense>
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
        dense
        placeholder="Keyword pencarian berdasarkan nama pasien dan nama penyakit."
        prepend-icon="mdi-magnify"
      />
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
    >
      <template v-slot:item.weight="{ item }">
        <div>
          [{{ item.weight_a.toFixed(3) }}, {{ item.weight_b.toFixed(3) }}, {{ item.weight_c.toFixed(3) }}]
        </div>
      </template>
      <template v-slot:item.action="{ item }">
        <div>

          <v-btn :to="`/app/kriteria/${item.id}/subs`" small depressed>
            subs
          </v-btn>

          <v-btn dark small icon :to="`/app/kriteria/${item.id}/edit`">
            <v-icon small color="green">
              create
            </v-icon>
          </v-btn>

          <v-btn dark small icon @click="del(item.id)">
            <v-icon small color="red">
              remove
            </v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
const DIM = 5;
const INF = 10000000;
const BB_TB_MAP = [
//  P         P         L         L         P         P         L       L
//  Low,      Upper     Low,      Upper     Low,      Upper     Low,    Upper

    [0,       50,       0,        52,       0,        3.8,      0,      3.9],
    [50,      67.8,     52,       70,       3.8,      6,        3.9,    7.6],
    [67.8,    79.2,     70,       80.5,     6,        11.5,     7.6,    12],
    [79.2,    80.5,     80.5,     81.9,     11.5,     13,       12  ,   15],
    [80.5,    INF,      81.9,     INF,      13,       INF,      15,     INF],

    [0,       53,       0,        55,       0,        4,        0,      4.85],
    [53,      70,       55,       80,       4,        8,        4.85,   8],
    [70,      92.9,     80,       93.9,     8,        14.8,     8,      15.3],
    [92.9,    96.8,     93.9,     96,       14.8,     16,       15.3,   16.7],
    [96.8,    INF,      96,       INF,      16,       INF,      16.7,   INF],

    [0,       55,       0,        56.8,     0,        5,        0,      5.5],
                                                      // X
    [55,      85,       56.8,     88.7,     5,        9.8,      5.5,    11.12],
    [85,      101.7,    88.7,     103.5,    9.8,      18.1,     11.2,   18.3],
    [101.7,   105,      103.5,    105,      18.1,     19,       18.3,   19.8],
    [105,     INF,      105,      INF,      19,       INF,      19.8,   INF],

    [0,       56,       0,        58,       0,        6,        0,      6.3],
    [56,      93,       58,       93.8,     6,        12.2,     6.3,    12.6],
    [93,      111.3,    93.8,     111.7,    12.2,     21.5,     12.6,   21.2],
    [111.3,   112.3,    111.7,    112,      21.5,     22,       21.2,   22.3],
    [112.3,   INF,      112,      INF,      23,       INF,      23.3,   INF],

    [0,       59,       0,        60,       0,        7,        0,      7.2],
    [59,      98.5,     60,       99.8,     7,        12.8,     7.2,    13.9],
    [98.5,    118.9,    99.8,     119.2,    12.8,     24.9,     13.9,   24.2],
    [118.9,   121,      119.2,    120,      24.9,     26.8,     24.2,   26.9],
    [121,     INF,      120,      INF,      26.8,     INF,      26.9,     INF]
];

export default {
  data: () => ({
    BB_TB_MAP
  })
}
</script>