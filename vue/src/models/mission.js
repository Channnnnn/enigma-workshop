import { Rotor } from "./rotor";
import { Circuit } from "./circuit";

export const Symbol = {
  _reset: 'Reset',
  _nice: 'Nice',
  _excellent: 'Excellent',
  _score: 'Score',
  _rank: 'Rank'
}

export class Mission {
  major/* : number */;
  minor/* : number */;
  cover/* : string */;
  layout/* : string[][] */;
  rotors/* : { [id: string]: Rotor } */ = {};
  circuits/* : { [id: string]: Circuit } */ = {};
  steps/* : string[] */ = [];
  answer/* : number */;

/**
 * 
 * @param {{
    major: number,
    minor: number,
    cover: string,
    layout: string[][],
    rotors: { [id: string]: Rotor },
    circuits: { [id: string]: Circuit },
    answer: number
  }} attrs 
  */
  constructor(attrs) {
    if (attrs) { Object.assign(this, attrs); }
  }

  get unlocked() {
    return Object.keys(this.rotors).filter(k => !this.rotors[k].isUnlock).length === 0;
  }

  dial(id) {
    const circuit = this.circuits[id];
    circuit.dial.rotate();
    circuit.rotors.forEach(r => { r.rotate(); });
  }

  reset() {
    Object.keys(this.rotors).forEach(k => this.rotors[k].reset());
  }
}

const tutorialRotors = {
  R01: new Rotor({ id: 'R01', ticks: 2, state: 1 }),
  R11: new Rotor({ id: 'R01', ticks: 2, state: 1 }),
  R02: new Rotor({ id: 'R02', ticks: 2, state: 0 })
}
export const tutorialMissions = [
  new Mission({
    major: 1,
    minor: 1,
    cover: 'Touch rotor to make it green',
    layout: [['R01']],
    answer: 1,
    rotors: {
      R01: tutorialRotors.R01
    },
    circuits: { 
      R01: new Circuit({ dial: tutorialRotors.R01, rotors: [] })
    }
  }),
  new Mission({
    major: 1,
    minor: 2,
    cover: 'Make rotors green',
    layout: [['R11'], ['R02']],
    answer: 2,
    rotors: {
      R01: tutorialRotors.R11,
      R02: tutorialRotors.R02
    },
    circuits: { 
      R01: new Circuit({ dial: tutorialRotors.R11, rotors: [tutorialRotors.R02] }),
      R02: new Circuit({ dial: tutorialRotors.R02, rotors: [] })
    }
  })
]
