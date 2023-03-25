import { Save } from "./types";

export function calculateTotalCompletions(saves: Save[]): number {
  return saves.reduce((acc, save) => {
    // Check only completed timers
    const dayCompletions = save.timers.filter(
      (timer) => timer.delta === 0
    ).length;
    return dayCompletions + acc;
  }, 0);
}

export function calculateAverageCompletion(saves: Save[]): number {
  if (saves.length <= 0) {
    return 0;
  }
  const totalCompletion = saves.reduce((acc, save) => acc + save.completion, 0);
  const averageCompletion = totalCompletion / saves.length;
  return Math.round(averageCompletion);
}
