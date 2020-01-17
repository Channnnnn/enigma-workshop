export class Rotor {
  STEP = 1;
  KEY = 0;

  id;
  ticks;
  state;
  steps = 0;

  /**
   * @param {{id: String, ticks: Number, state: Number}} attrs 
   */
  constructor(attrs) {
      if (attrs) {
          Object.assign(this, attrs);
          this.steps = this.state;
          this._initialState = this.state;
      }
  }

  get isUnlock() {
      return this.state === this.KEY;
  }

  rotate() {
      this.steps += this.STEP;
      this.state = this.steps % this.ticks;
  }

  reset() {
      this.state = this._initialState;
      this.steps = this.state;
  }
}