#Vue enigma
```
> npm i
> npm run serve
```
Project overview

##Components
***GameBoard.vue***
Root component & maintain game states / UI states
  - ***Splash.vue***
    Modal with icon badge or text with dismiss icon
  - ***Control.vue***
    Game timer + Reset button + Move step counter
  - ***Rotor.vue***
    (Main) Knob with unlock state
  - ***Score.vue***
    Mission ending screen
  - ***Rank.vue***
    Ranking screen

##Models
***rotor.js***
Rotor state and method for interaction
***circuit.js***
Make one rotor turn multiple rotors
***mission.js***
Create level layout and store move step

##Lib
***enigma.api.js***
Connect to game API
***scoreSummary.js***
Score object
***timer.js***
Milliseconds formatter
