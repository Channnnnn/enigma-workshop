<template>
  <div :class="['splash-wrapper', 'flex-column', visibility]">
    <div class="ranking flex-column">
      <div class="header"><h1>Player Ranking</h1></div>
      <div class="rank-group">
        <h1><i class="fa fa-trophy"></i></h1>
        <h2>Your Ranking</h2>
        <h2>{{ranking}}&nbsp;<sup>{{suffix}}</sup></h2>
      </div>
      <div class="rank-table">
        <!-- Add table -->
        <table>
          <thead>
            <tr>
              <th>
                <i class="fa fa-trophy"></i>
              </th>
              <th>Player</th>
              <th>Record</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rank, i) in scores" :key="i">
              <td>{{i+1}}</td>
              <td>{{rank.player}}</td>
              <td>{{rank.score}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="navigate flex-column">
      <button class="btn btn-continue" @click="onContinue">Next Mission</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ranking',
  props: {
    splash: String,
    scores: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ranking() {
      /* Implement rank finder */
      return 'TODO: Implement rank finder'
      return this.scores.findIndex(s => s.player === localStorage.getItem('player')) + 1;
    },
    visibility() {
      return this.splash === '_rank' ? '' : 'hidden';
    },
    suffix() {
      /* Implement cardinal number suffix */
      return ''
      const suffixes = { 
        1: 'st',
        2: 'nd',
        3: 'rd'
      };
      return suffixes[this.ranking % 10] || 'th';
    }
  },
  methods: {
    onContinue() {
      this.$emit('nextmission');
    }
  }
}
</script>

<style>
@import '../styles/rank.css';
@import '../styles/navigate.css';
</style>
