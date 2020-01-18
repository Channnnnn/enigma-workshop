<template>
  <div class="rotor vector" :class="{'success': isUnlock}">
    <div class="knob" @click="dial">
      <div class="ticker" :style="'transform: rotate('+degree+'deg);'">
        <div class="tick"></div>
      </div>
    </div>
    <div 
    v-for="(point) in points" 
    :key="JSON.stringify(point)" 
    class="tick-point" 
    :style="'left:'+point.left+'px; top:'+point.top+'px;'"></div>
  </div>
</template>

<script>
import { Rotor } from "../models/rotor";
export const ROTOR_SIZE = 86;
const TICK_SIZE = 4;
const RADIUS = 35;
export default {
  name: 'rotor',
  props: {
    rotor: Rotor
  },
  data() {
    return {
      steps: this.rotor.state,
      state: this.rotor.state,
    }
  },
  computed: {
    tickDegree(){
      return Math.floor(360 / this.rotor.ticks);
    },
    tickTheta() { 
      return 2 * Math.PI / this.rotor.ticks;
    },
    /* steps*degree + 45 = 12pm position */
    degree() {
      return (this.rotor.steps * this.tickDegree) + 45;
    },
    /* refer to rotor model */
    isUnlock() {
      return this.rotor.isUnlock; 
    },
    points() {
      const points = [];
      for (let i = 0; i < this.rotor.ticks; i++) {
        let t = (i * this.tickTheta) - Math.PI / 2;
        let pos = {
          x: ROTOR_SIZE / 2 + (RADIUS * Math.cos(t)),
          y: ROTOR_SIZE / 2 + (RADIUS * Math.sin(t)),
        }
        points.push({
          left: pos.x - TICK_SIZE / 2,
          top: pos.y - TICK_SIZE / 2
        });
      }
      return points; 
    },
  },
  methods: {
    /* emit dial id */
    dial() {
      this.$emit('dial', this.rotor.id);
    }
  }
}
</script>

<style>
@import '../styles/rotor.css';
</style>
