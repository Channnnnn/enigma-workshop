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
        <h1><i v-for="(star, i) in stars" :key="i" class="fa fa-star"></i></h1>
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
import { formatTimer } from '../scripts/timer';
import * as enigmaApi from '../scripts/enigma.api';
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
      return this.splash === 'score' ? '' : 'hidden';
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
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score .header {
  color: #BBB;
  position: fixed;
  top: 0;
  user-select: none;
}
.score .score-group {
  margin-bottom: 24px;
  color: white;
  user-select: none;
}
.score .score-group h1, .score .score-group h2 {
  margin: 0.25rem 0;
}
.score .score-group i.fa {
  font-size: 1.25em;
  margin-bottom: 0.25em;
}

.fixed-position {
  position: fixed;
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