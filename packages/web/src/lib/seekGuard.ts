export const SEEK_TOLERANCE_SECONDS = 1;

export const clampSeekTime = (requestedSeconds: number, maxWatchedSeconds: number): number =>
  requestedSeconds > maxWatchedSeconds + SEEK_TOLERANCE_SECONDS ? maxWatchedSeconds : requestedSeconds;
