<template>
  <div :class="['splash-wrapper', visibility]">
    <div class="splash">
      <h3 v-if="icon"><i :class="['fa', icon]"></i></h3>
      <h3>{{title}}</h3>
      <button class="btn-close"
      v-if="!icon"
      @click="$emit('dismiss')">Go</button>
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
      timer: null
    }
  },
  computed: {
    visibility() {
      return this.splash ? '' : 'hidden';
    },
    title() {
      return Symbol[this.splash] || this.splash;
    },
    icon() {
      if (this.splash === Symbol._reset) return 'fa-undo-alt';
      else if (this.splash === Symbol._nice) return 'fa-thumbs-up';
      else if (this.splash === Symbol._excellent) return 'fa-medal';
      else return '';
    }
  },
  watch: {
    icon(val) {
      clearTimeout(this.timer);
      if (val) {
        this.timer = setTimeout(() => { this.dismiss() }, 700);
      }
    }
  }
}
</script>

<style>
.splash {
  color: #fff;
}
.splash i.fa {
  font-size: 3em;
}
.btn-close {
  cursor: pointer;
  min-width: 200px;
  font-size: 1.75em;
  padding: 0.25em;
  color: #fff;
  background-color: transparent;
  border: 3px solid #fff;
  border-radius: 4px;
}
</style>