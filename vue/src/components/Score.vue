<template>
  <div :class="['splash-wrapper', 'flex-column', visibility]">
    <div class="score flex-column">
      <div class="header"><h1>Player Score</h1></div>
      <div class="score-group">
        <h1><i class="fa fa-stopwatch"></i></h1>
        <h2>Time</h2>
        <h2>{{duration}}</h2>
      </div>
      <div class="score-group">
        <h1><i class="fa fa-shoe-prints"></i></h1>
        <h2>Steps</h2>
        <h2>{{steps}}</h2>
      </div>
      <div class="score-group">
        <h1><i class="fa fa-star" v-for="(star, i) in stars" :key="i"></i></h1>
        <h2>{{compliment}}</h2>
      </div>
    </div>
    <div class="navigate flex-column fixed-position">
      <button class="btn btn-submit" @click="onSubmit">Submit Score</button>
      <button class="btn btn-continue" @click="onContinue">Next Mission</button>
    </div>
  </div>
</template>

<script>
import { formatTimer } from '../lib/timer';
import * as enigmaApi from '../lib/enigma.api';
export default {
  name: 'score',
  props: {
    level: Number,
    time: Number,
    steps: Number,
    answer: Number,
    splash: String
  },
  computed: {
    visibility() {
      return this.splash === '_score' ? '' : 'hidden';
    },
    duration() {
      return formatTimer(this.time);
    },
    score() {
      let score = Math.floor((this.answer / this.steps) * 5);
      return Math.max(1, Math.min(score, 5));
    },
    stars() {
      return Array.from({length: this.score}).fill(1)
    },
    compliment() {
      const compliment = {
        5: 'Excellent!',
        4: 'Great!',
        3: 'Nice',
        2: 'Good',
        1: 'Fine'
      }
      return compliment[this.score];
    }
  },
  methods: {
    onSubmit() {
      let name = localStorage.getItem('player');
      do {
        name = prompt('Player Name:').trim();
      } while (!name);
      localStorage.setItem('player', name);
      if (!this.level || !this.time || ! this.steps) return;
      enigmaApi
        .submitScore(name, this.level, Math.floor(this.time / 1000), this.steps)
        .then(success => {
          if (success) {
            this.$emit('rank');
          }
        });
    },
    onContinue() {
      this.$emit('nextmission');
    }
  }
}
</script>

<style>
@import '../styles/score.css';
@import '../styles/navigate.css';
</style>