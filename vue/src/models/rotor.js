const STEP = 1;
const KEY = 0;
export class Rotor {
  _initialState;

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
    return this.state === KEY;
  }

  rotate() {
    this.steps += STEP;
    this.state = this.steps % this.ticks;
  }

  reset() {
    this.state = this._initialState;
    this.steps = this.state;
  }
}
