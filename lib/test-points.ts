const POINT_DECIMALS = 2;
const POINT_SCALE = 10 ** POINT_DECIMALS;

export function roundTestPoints(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.round((value + Number.EPSILON) * POINT_SCALE) / POINT_SCALE;
}

export function sumTestPoints(items: readonly { points: number }[]) {
  return roundTestPoints(items.reduce((total, item) => total + Number(item.points || 0), 0));
}
