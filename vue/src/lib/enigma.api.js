import { api } from '@/assets/api.config.json';
import { Rotor } from '../models/rotor';
import { Circuit } from '../models/circuit';
import { Mission } from '../models/mission';

function request(path, params = { method: 'GET' }) {
  return fetch(api + '/api' + path, params);
}
function toJSON(res) {
  if (res.ok) {
    return res.json();
  } else if (res.status === 401) {
    return [];
  }
}
export function getMission(level) {
  return request('/mission/' + level).then(toJSON).then(toMissions);
}
export function submitScore(name, level, time, step) {
  return request('/score/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      player: name,
      level: level,
      time: time,
      step: step
    })
  }).then(() => true)
}
export function getRanking() {
  return request('/score/rank').then(toJSON);
}

export function toMissions(missionArray) {
  /* (1) .map() = loop each item in `missionArray`, each item named `mission` */
  return missionArray.map(mission => {

    /* (2) .map().foreach() = loop each item in `mission.rotors`,
                              each item named `r` */
    /* return Rotor with key-value id */
    const rotors = {};
    mission.rotors.map(r => new Rotor({
      id: r.id,
      ticks: r.ticks,
      state: r.state
    })).forEach(r => rotors[r.id] = r);

    /* (3) .map().foreach() = loop each item in `mission.circuits`,
                              each item named `c` */
    /* Create Circuit without `switch` rotor */
    /* return Circuit with key-value id */
    const circuits = {};
    mission.circuits.map(c => new Circuit({
      dial: rotors[c.switch],
      rotors: c.rotors.filter(r => r !== c.switch).map(r => rotors[r])
    })).forEach(c => circuits[c.dial.id] = c);

    return new Mission({
      major: mission.major,
      minor: mission.minor,
      cover: '',
      layout: mission.layout,
      rotors: rotors,
      circuits: circuits,
      answer: mission.answer
    });
  })
}