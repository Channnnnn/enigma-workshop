<template>
  <div class="control">
    <div class="timer">
      <i class="fa fa-stopwatch"></i>
      <div>{{timer}}<!-- get timer --></div>
    </div>
    <!-- Reset button hook with undo-alt icon -->
    <button class="reset" @click="$emit('resetgame')"><i class="fa fa-undo-alt"></i></button>
    <div class="steps">
      <i class="fa fa-shoe-prints"></i>
      <div>{{steps}}<!-- steps --></div>
    </div>
  </div>
</template>

<script>
import { formatTimer } from '../lib/timer';
export default {
  name: 'control',
  props: {
    steps: Number
  },
  data() {
    return {
      elapsed: 0,
      intervalId: undefined
    }
  },
  computed: {
    timer() {
      return formatTimer(this.elapsed);
    }
  },
  methods: {
    startTick() {
      this.intervalId = setInterval(() => {
        this.elapsed += 1000
      }, 1000);
    },
    clearTick() {
      clearInterval(this.intervalId);
    }
  }
}
</script>

<style>
@import '../styles/control.css';
</style>
