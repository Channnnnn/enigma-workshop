<template>
    <!-- div.rotor.vector  .success:isUnlock -->
    <div :class="['rotor', 'vector', {'success': isUnlocked}]">
        <!-- div.knob click to dial -->
        <div class="knob" @click="dial">
            <!-- div.ticker rotate by degree -->
            <div class="ticker" :style="'transform: rotate('+degree+'deg)'">
                <!-- div.tick -->
                <div class="tick"></div>
            </div>
        </div>
        <!-- div.tick-point per points  offset left+top -->
        <div class="tick-point" v-for="(point, index) in points" :key="index"
        :style="'left: '+point.left+'px; top: '+point.top+'px;'"></div>
    </div>
</template>

<script>
const ROTOR_SIZE = 86;
const TICK_SIZE = 4;
const RADIUS = 35;
import { Rotor } from '../models/rotor'
export default {
    name: 'rotor',
    props: {
        rotor: Rotor
    },
    data() {
        return {
            // state: this.rotor.state,
            // steps: this.rotor.state
        }
    },
    computed: {
        steps() {
            return this.rotor.steps;
        },
        state() {
            return this.rotor.state;
        },
        isUnlocked() {
            return this.rotor.isUnlock;
        },
        tickDegree() {
            return Math.floor(360 / this.rotor.ticks);
        },
        tickTheta() {
            return 2 * Math.PI / this.rotor.ticks;
        },
        degree() {
            return this.steps*this.tickDegree + 45;
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
        }
    },
    methods: {
        dial() {
            this.$emit('dial', this.rotor.id);
        }
    }
}
</script>

<style>
@import '../styles/rotor.css';
</style>