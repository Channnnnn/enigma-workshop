export function scoreSummary(level, elapsed, completedMission) {
  return {
    level: level,
    time: elapsed,
    steps: completedMission.map(m => m.steps.length).reduce((sum, current) => sum+current, 0),
    answer: completedMission.map(m => m.answer).reduce((sum, current) => sum+current, 0)
  }
}
