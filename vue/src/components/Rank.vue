<template>
  <div :class="['splash-wrapper', 'flex-column', visibility]">
    <div class="ranking flex-column">
      <div class="header"><h1>Player Ranking</h1></div>
      <div class="rank-group">
        <h1><i class="fa fa-trophy"></i></h1>
        <h2>Your Ranking</h2>
        <h2><!-- 4) ranking + suffix --></h2>
      </div>
      <div class="rank-table">
        <!-- 4) Add table -->
        <!-- 4) thead (trophy,Player,Record) tbody list of scores -->
      </div>
    </div>
    <div class="navigate flex-column">
      <!-- 4) button.btn.btn-continue click:onContinue emit `nextmission` -->
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
    visibility() {
      return this.splash === '_rank' ? '' : 'hidden';
    },
    /* 4) ranking: find player name index from localstorage */
    /* 4) suffix: cardinal number suffix */
  }
}
</script>

<style>
@import '../styles/rank.css';
@import '../styles/navigate.css';
</style>
