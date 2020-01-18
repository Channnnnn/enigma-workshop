<template>
  <div :class="['splash-wrapper', visibility]">
    <div class="splash">
      <h3 v-if="icon"><i :class="['fa', icon]"></i></h3>
      <h3>{{title}}</h3>
      <button class="btn-close"
      v-if="!icon"
      @click="dismiss">Go</button>
    </div>
  </div>
</template>

<script>
import { Symbol } from '../models/mission';
export default {
  name: 'splash',
  props: {
    splash: String
  },
  data() {
    return {
      timer: null,
      visible: false
    }
  },
  computed: {
    /* visible if not score or rank, and not dismissed, else hidden */
    visibility() {
      return !['_score', '_rank'].includes(this.splash) && this.visible ? '' : 'hidden';
    },
    /* set visible, map splash */
    title() {
      this.setVisible();
      return Symbol[this.splash] || this.splash;
    },
    /* if title is keyword with _ skip, map title to icon */
    icon() {
      if (this.title[0] === '_') return '';
      if (this.title === Symbol._reset) return 'fa-undo-alt';
      else if (this.title === Symbol._nice) return 'fa-thumbs-up';
      else if (this.title === Symbol._excellent) return 'fa-medal';
      else return '';
    }
  },
  watch: {
    /* when icon is changed, reset timer, if has icon set timeout 700ms*/
    icon(val) {
      clearTimeout(this.timer);
      if (val) {
        this.timer = setTimeout(() => { this.dismiss() }, 700);
      }
    }
  },
  methods: {
    /* set visible if splash is empty  */
    setVisible() {
      this.visible = this.splash !== '';
    },
    /* emit dismiss & hise */
    dismiss() {
      this.$emit('dismiss');
      this.visible = false;
    }
  }
}
</script>

<style>
@import '../styles/splash.css';
</style>
