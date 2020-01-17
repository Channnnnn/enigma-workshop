<template>
  <div class="control">
    <div class="timer">
      <i class="fa fa-stopwatch"></i>
      <div>{{timer}}</div>
    </div>
    <button @click="$emit('reset')"><i class="fa fa-undo-alt"></i></button>
    <div class="steps">
      <i class="fa fa-shoe-prints"></i>
      <div>{{steps}}</div>
    </div>
  </div>
</template>

<script>
import { formatTimer } from '../scripts/timer';
export default {
  name: 'control',
  props: {
    started: Number 
  },
  data() {
    return {
      elapsed: 0,
      intervalId: undefined
    }
  },
  watch: {
    started(value) {
      if (value && this.intervalId === undefined) {
        this.intervalId = setInterval(() => {
          this.elapsed += 1000
        }, 1000);
      }
    }
  },
  computed: {
    timer() {
      return formatTimer(+new Date() - this.started);
    }
  },
}
</script>

<style>

</style>