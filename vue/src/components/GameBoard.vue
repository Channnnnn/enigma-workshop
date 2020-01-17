<template>
  <div class="board">
    <SplashComponent
    :splash="splash"
    @dismiss="onDismiss"/>
    <ScoreComponent v-bind="missionScore" :splash="splash" @nextmission="onNextMission" @rank="onRanking"/>
    <RankComponent :scores="rankingScore" :splash="splash" @nextmission="onNextMission"/>
    <header>Mission {{mission.major}}-{{mission.minor}}</header>
    <div class="rotor-container">
      <RotorComponent 
      v-for="(rotor, i) in rotors" 
      :key="rotor.id" 
      :rotor="rotor"
      :style="'left:'+positions[i].x+'px;top:'+positions[i].y+'px;'" 
      @dial="onDial"/>
    </div>
    <footer>

    </footer>
  </div>
</template>

<script>
import RotorComponent from "./Rotor";
import SplashComponent from "./Splash";
import ScoreComponent from "./Score";
import RankComponent from "./Rank";
import { tutorialMissions, Mission, Symbol } from '../models/mission';
import * as enigmaApi from '../scripts/enigma.api'; 
export default {
  name: 'Board',
  components: {
    RotorComponent,
    SplashComponent,
    ScoreComponent,
    RankComponent
  },
  data() {
    return {
      splash: '',
      level: 1,
      missions: tutorialMissions,
      completed: [],

      mission: new Mission({major: 0, minor: 0, cover: '', answer: 0, layout: [], rotors: {}, circuits: {}}),
      positions: [],
      started: undefined,
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
      if (val) {
        this.mission.steps = this.steps;
        this.completed.push(this.mission);
        setTimeout(async () => {
          if (this.missions.length === 0) {
            this.missionScore = {
              level: this.level,
              time: +new Date() - this.started,
              steps: this.completed.map(m => m.steps.length).reduce((sum, current) => sum+current, 0),
              answer: this.completed.map(m => m.answer).reduce((sum, current) => sum+current, 0)
            }
            this.splash = '_score';
          } else {
            if (this.steps.length > this.mission.answer) {
              this.splash = '_nice'
            } else {
              this.splash = '_excellent'
            }
            this.symbol = Symbol[this.splash];
            this.start(this.missions.shift());
          }
        }, 1000);
      }
    }
  },
  methods: {
    start(mission) {
      this.mission = mission;
      this.splash = mission.cover;
      this.positions = [];
      this.steps = [];
      if (this.started === undefined && ((this.level === 1 && this.completed.length === 2) || this.level > 1)) {
        this.started = +new Date();
      }

      const rows = this.mission.layout.length;
      const columns = this.mission.layout[0].length;
      const margin = 100;

      const width = columns * margin;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (this.mission.layout[i][j] !== null) {
            this.positions.push({
              y: i * margin,
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
      this.splash = '';
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
      this.missions = await enigmaApi.getMission(this.level++);
      this.start(this.missions.shift());
      this.splash = '_ready';
    }
  },
  async created() {
    let missions = await enigmaApi.getMission(this.level);
    if (this.level === 1) {
      missions = missions.slice(2);
    } else if (this.level > 1) {
      this.missions = [];
    }
    this.level++;
    this.missions = this.missions.concat(missions);
    this.start(this.missions.shift());
  }
}
</script>

<style>
.board {
  height: 100%;
}
.rotor-container {
  transform: translate(50vw, 35vh);
  width: fit-content;
}
.splash-wrapper{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: #012D;
  opacity: 1;
  overflow: hidden;
  transition: all 0.3s ease;
}
.hidden {
  opacity: 0;
  pointer-events: none;
}
</style>
