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
      return this.scores.findIndex(s => s.player === localStorage.getItem('player')) + 1;
    },
    visibility() {
      return this.splash === 'rank' ? '' : 'hidden';
    },
    suffix() {
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
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ranking {
  color: white;
  width: 100%;
  align-items: stretch;
  height: calc(100vh - 4rem)
}
.rank-group {
  color: goldenrod;
}
.rank-table {
  overflow: auto;
}
.rank-table table {
  width: 100%;
  border-spacing: 0;
}
.rank-table tr {
  height: 2em;
}
.rank-table tbody tr:nth-child(odd) {
  background-color: #fff2;
}
.rank-table tr, .rank-table th {
  border-top: 1px solid #ddd2;
  vertical-align: middle;
}

/* navigate.css */
.navigate {
  bottom: 0;
  padding: 1rem;
  width: 100%;
  align-items: unset;
}
.navigate .btn {
  padding: 0.5rem;
  font-size: 1.17rem;
  border-radius: 4px;
  border: none;
  transition: box-shadow 0.1s ease, all 0.3s ease;
  color: white;
  user-select: none;
}
.btn-submit {
  background-color: #73af3a;
  margin-bottom: 0.5rem;
}
.btn-submit:hover {
  background-color: #72af3a99;
}
.btn-submit:focus {
  outline: none;
  box-shadow: #a1e265 0 0 0 2px ;
}
.btn-continue {
  background-color: #23a0da;
}
.btn-continue:hover {
  background-color: #23a0da99;
}
.btn-continue:focus {
  outline: none;
  box-shadow: #53c3f7 0 0 0 2px;
}
</style>