
const DELAY_MS = process.env.DELAY_MS ? Number.parseInt(process.env.DELAY_MS, 10) : 0;
const DELAY_FCP_MS = process.env.DELAY_MS ? Number.parseInt(process.env.DELAY_MS, 10) : 0;
const DELAY_LCP_MS = process.env.DELAY_MS ? Number.parseInt(process.env.DELAY_MS, 10) : 0;

export function sleep(time: number = DELAY_MS, callback?: Function): Promise<void> {
  if (time === 0) {
    return Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      if (callback) callback();
      resolve();
    }, time);
  });
}

export function sleepFCP(callback?: Function): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      if (callback) callback();
      resolve();
    }, DELAY_FCP_MS);
  });
}

export function sleepLCP(callback?: Function): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      if (callback) callback();
      resolve();
    }, DELAY_FCP_MS);
  });
}
