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
    degree() {
      return (this.rotor.steps * this.tickDegree) + 45;
    },
    isUnlock() {
      return this.rotor.isUnlock; 
    },
    tickDegree(){
      return Math.floor(360 / this.rotor.ticks);
    },
    tickTheta() { 
      return 2 * Math.PI / this.rotor.ticks;
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
      console.log(JSON.stringify(points))
      return points; 
    },
  },
  methods: {
    dial() {
      this.$emit('dial', this.rotor.id);
    }
  }
}
</script>

<style scoped>
.rotor{
	width: 86px;
	height: 86px;
	text-align: center;
	font-size: 20px;
	cursor: pointer;
	position: absolute;
  /* position: relative; */
}
/* .vector {
	background: rgb(214,214,214);
	background: -moz-linear-gradient(top, rgba(214,214,214,1) 0%, rgba(242,242,242,1) 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(214,214,214,1)), color-stop(100%,rgba(242,242,242,1)));
	background: -webkit-linear-gradient(top, rgba(214,214,214,1) 0%,rgba(242,242,242,1) 100%);
	background: -o-linear-gradient(top, rgba(214,214,214,1) 0%,rgba(242,242,242,1) 100%);
	background: -ms-linear-gradient(top, rgba(214,214,214,1) 0%,rgba(242,242,242,1) 100%);
	background: linear-gradient(to bottom, rgba(214,214,214,1) 0%,rgba(242,242,242,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d6d6d6', endColorstr='#f2f2f2',GradientType=0 );
	border-radius: 45px;
} */
.vector {
	background: #646464;
    background-image: radial-gradient(top, #616161 0%, #616161 20%, #535353 60%);
    border-radius: 50%;
    box-shadow: 0 0 4px #1C1C17;
    transition: all .3s ease;
}
.vector .knob {
	width: 80px;
	height: 80px;
	text-align: center;
	vertical-align: middle;
	margin: 3px;
	background: url(../assets/rotor-default.png) no-repeat;
	background-size: 100% 100%;
}
/* .vector.success {
	background: -moz-linear-gradient(top,  rgba(219,240,67,1) 0%, rgba(210,230,56,1) 50%, rgba(230,240,163,1) 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(219,240,67,1)), color-stop(50%,rgba(210,230,56,1)), color-stop(100%,rgba(230,240,163,1)));
	background: -webkit-linear-gradient(top,  rgba(219,240,67,1) 0%,rgba(210,230,56,1) 50%,rgba(230,240,163,1) 100%);
	background: -o-linear-gradient(top,  rgba(219,240,67,1) 0%,rgba(210,230,56,1) 50%,rgba(230,240,163,1) 100%);
	background: -ms-linear-gradient(top,  rgba(219,240,67,1) 0%,rgba(210,230,56,1) 50%,rgba(230,240,163,1) 100%);
	background: linear-gradient(to bottom,  rgba(219,240,67,1) 0%,rgba(210,230,56,1) 50%,rgba(230,240,163,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#dbf043', endColorstr='#e6f0a3',GradientType=0 );
} */

.vector.success {
	background: #7FFF00;
    box-shadow: 0 0 4px #1C1C17,
                        0 0 5px #7FFF00;
}

.rotor .tick-point{
	width: 4px;
	height: 4px;
	border-radius: 2px;
	background-color: #aaaaaa;
	position: absolute;
}
.rotor .ticker {
	width: 80px;
	height: 80px;
	padding: 22px;
	-moz-transition: all 0.5s ease;
	-webkit-transition: all 0.5s ease;
	-o-transition: all 0.5s ease;
	transition: all 0.5s ease;
}
/* .rotor .tick{
	width: 6px;
	height: 6px;
	border-radius: 3px;
	-moz-transition: all 0.5s ease;
	-webkit-transition: all 0.5s ease;
	-o-transition: all 0.5s ease;
	transition: all 0.5s ease;
	background-color: #aaaaaa;
} */
.rotor .tick {
	width: 6px;
	height: 6px;
	-moz-transition: all 0.5s ease;
	-webkit-transition: all 0.5s ease;
	-o-transition: all 0.5s ease;
	background: #646464;
    background-image: radial-gradient(top, #616161 0%, #616161 20%, #535353 60%);
    border-radius: 50%;
    box-shadow: 0 0 1px #1C1C17;
    transition: all .3s ease;
}
.rotor.success .tick{
	background-color: #32CD32;
}
</style>