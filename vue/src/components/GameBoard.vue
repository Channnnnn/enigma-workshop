<template>
  <div class="board">
    <SplashComponent :splash="splash" @dismiss="onDismiss"/>
    <ScoreComponent v-bind="missionScore" :splash="splash" @nextmission="onNextMission" @rank="onRanking"/>
    <RankComponent :scores="rankingScore" :splash="splash" @nextmission="onNextMission"/>
    <div class="mission">Mission {{mission.major}}-{{mission.minor}}</div>
    <div class="rotor-container">
      <RotorComponent 
      v-for="(rotor, i) in rotors" 
      :key="rotor.id" 
      :rotor="rotor"
      :style="'left:'+positions[i].x+'px;top:'+positions[i].y+'px;'" 
      @dial="onDial"/>
    </div>
    <div class="control-container">
      <ControlComponent :steps="steps.length" @resetgame="onReset" ref="controlRef"/>
    </div>
  </div>
</template>

<script>
import RotorComponent from "./Rotor";
import SplashComponent from "./Splash";
import ScoreComponent from "./Score";
import RankComponent from "./Rank";
import ControlComponent from "./Control";
import { tutorialMissions, Mission, Symbol } from '../models/mission';
import * as enigmaApi from '../lib/enigma.api'; 
import { scoreSummary } from '../lib/missionManager';
export default {
  name: 'Board',
  components: {
    RotorComponent,
    SplashComponent,
    ScoreComponent,
    RankComponent,
    ControlComponent
  },
  data() {
    return {
      splash: '', /* menu indicator */
      level: 1,
      missions: tutorialMissions,
      completed: [], /* for score submission */

      mission: new Mission({major: 0, minor: 0, cover: '', answer: 0, layout: [], rotors: {}, circuits: {}}),
      positions: [], /* for rotors */
      steps: [],
      missionScore: null,
      rankingScore: []
    }
  },
  computed: {
    rotors() {
      return Object.keys(this.mission.rotors).map(k => this.mission.rotors[k]);
    },
    unlocked() {
      return this.mission.unlocked;
    }
  },
  watch: {
    unlocked(val) {
      /* if unlocked write step to mission then push to completed mission */
      if (val) {
        this.mission.steps = this.steps;
        this.completed.push(this.mission);
        if (this.steps.length > this.mission.answer) {
          this.splash = '_nice'
        } else {
          this.splash = '_excellent'
        }
        setTimeout(async () => {
          if (this.missions.length === 0) {
            this.missionScore = scoreSummary(this.level, this.$refs.controlRef.elapsed, this.completed);
            this.splash = '_score';
            this.$refs.controlRef.clearTick();
          } else {
            this.symbol = Symbol[this.splash];
            this.start(this.missions.shift());
          }
        }, 1000);
      }
    },
    splash(val) {
      if (val) {
        this.$refs.controlRef.clearTick();
      }
    }
  },
  methods: {
    start(mission) {
      this.mission = mission;
      this.splash = mission.cover;
      this.positions = [];
      this.steps = [];
      const rows = this.mission.layout.length;
      const columns = this.mission.layout[0].length;
      const margin = 100;

      const width = columns * margin;
      const height = (3-rows) * margin;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (this.mission.layout[i][j] !== null) {
            this.positions.push({
              y: (height/2) + (i * margin),
              x: (-width/2) + (j * margin)
            });
          }
        }
      }
    },
    onDial(id) {
      this.mission.dial(id)
      this.steps.push(id);
    },
    onDismiss() {
      this.$refs.controlRef.startTick();
    },
    onReset() {
      this.steps = [];
      this.symbol = Symbol.Reset;
      this.splash = '_reset';
      this.mission.reset();
    },
    async onRanking() {
      this.rankingScore = await enigmaApi.getRanking();
      this.splash = '_rank';
    },
    async onNextMission() {
      this.missions = await enigmaApi.getMission(++this.level);
      this.$refs.controlRef.startTick();
      this.start(this.missions.shift());
    }
  },
  async created() {
    let missions = await enigmaApi.getMission(this.level);
    if (this.level === 1) {
      missions = missions.slice(2);
    } else if (this.level > 1) {
      this.missions = [];
    }
    this.missions = this.missions.concat(missions);
    this.start(this.missions.shift());
  }
}
</script>

<style>
.board {
  height: 100%;
}
.board > .mission{
  font-size: 2em;
  color: #888;
  margin-top: 1rem;
  position: fixed;
  width: 100%;
}
.rotor-container {
  transform: translate(50vw, 30vh);
  width: fit-content;
}
.control-container{
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1.5em;
}

@import '../styles/splash-wrapper.css';
</style>
