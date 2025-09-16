export const checkInstructionsSeen = (): boolean => {
  if (typeof window === 'undefined') return false;
  const seen = localStorage.getItem('hasSeenInstructions');
  return seen === 'true';
};

export const markInstructionsAsSeen = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('hasSeenInstructions', 'true');
};