export class Circuit {
  dial;
  rotors;

  /**
   * @typedef {import('./rotor').Rotor} Rotor
   * @param {{dial: Rotor, rotors: Rotor[]}} attrs 
   */
  constructor(attrs) {
    this.dial = attrs.dial;
    this.rotors = attrs.rotors;
  }
}