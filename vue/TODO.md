# 1) Rotor component
```
<!-- div.rotor.vetor  .success:isUnlock -->
  <!-- div.knob click to dial -->
    <!-- div.ticker rotate by degree -->
      <!-- div.tick -->
<!-- div.tick-point per points  offset left+top -->
```
```
const ROTOR_SIZE = 86; const TICK_SIZE = 4; const RADIUS = 35;
/* Rotor model props */
/* clone rotor state to local state */
/* clone rotor state to local steps */
/* degree getter: steps*degree + 45 = 12pm position */
/* isUnlock getter: refer to rotor model */
/* tickDegree getter: Math.floor(360 / this.rotor.ticks) */
/* tickTheta getter: 2 * Math.PI / this.rotor.ticks */
/* points getter:
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
*/
/* dial() emit `dial` with rotor id */
```
`use onDial() to call (mission model) dial with id and save to steps`

# 2) Control component
```
<div class="control">
  <div class="timer">
    <i class="fa fa-stopwatch"></i>
    <div><!-- get timer --></div>
  </div>
  <button class="reset"><i class="fa fa-undo-alt"></i></button>
  <div class="steps">
    <i class="fa fa-shoe-prints"></i>
    <div><!-- steps --></div>
  </div>
</div>
```
```
/* use time formatter */
/* Move steps props */
/* elapsed & tick timer id in local state */
/* formatted time getter */
/* start & pause method */
/* emit `resetgame` on click reset */
```
`use onReset() to clear steps & set splash _reset & call mission reset`
`pass steps length to component, ref this component as controlRef`

# 3) Score component
```
<!-- add visibility class -->
<div class="splash-wrapper flex-column">
  <div class="score flex-column">
    <div class="header"><h1>Player Score</h1></div>
    <div class="score-group">
      <h1><i class="fa fa-stopwatch"></i></h1>
      <h2>Time</h2>
      <h2><!-- get fromatted duration --></h2>
    </div>
    <div class="score-group">
      <h1><i class="fa fa-shoe-prints"></i></h1>
      <h2>Steps</h2>
      <h2><!-- steps --></h2>
    </div>
    <div class="score-group">
      <!-- h1 > stars icon -->
      <!-- h2 compliment -->
    </div>
  </div>
  <div class="navigate flex-column fixed-position">
    <!-- button.btn.btn-submit -->
    <!-- button.btn.btn-continue -->
  </div>
</div>
```
```
/* use time formatter */
/* use api */
/* Props level,time,steps,answer,splash */
/* visibility getter: only _score splash */
/* duration getter: formatted time */
/* score getter: answer/steps 1-5 */
/* stars getter: array of star element */
/* compliment getter: Excellent! Great! Nice Good Fine */
/* onSubmit() prompt save name to localstorage, submit (name, level, time(sec), steps), then rank */
/* onContinue() emit `nextmission` */
```

# 4) Ranking component
`Use hint in component file`
`Create ranking handler`

# 5) enigma.api.js
```
/* use api json value */
/* request() fetch /api/:path with method */
/* toJSON() when 401 return [] */
/* getMission() `/mission/:level` then convert to missions */
/* submitScore() post `/score/submit` with player, level, time, step */
/* getRanking() `/score/rank` */
/* toMission()
  (1) .map() = loop each item in `missionArray`, each item named `mission`
  (2) .map().foreach()  loop each item in `mission.rotors`,
                        each item named `r` (id, ticks, state)
      Create Rotor
      return rotors as key-value with id
  (3) .map().foreach()  loop each item in `mission.circuits`,
                        each item named `c` (switch, rotors)
      Create Circuit (dial, rotors) without `switch` rotor
      return circuits as key-value with dial id
  (4) return Mission object
*/
```
