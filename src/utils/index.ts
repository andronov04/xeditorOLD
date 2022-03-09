// TODO Import from sdk
export const RESERVED_LIST = ['min', 'max', 'value', 'step', 'node', 'name', 'description', 'hint', 'options', 'floor', 'array', 'options'];

export const clamp = (x: number, min: number, max: number) => (x > max ? max : x < min ? min : x);

export const range = (v: number, min: number, max: number) => {
  if (max === min) return 0;
  const _v = clamp(v, min, max);
  return (_v - min) / (max - min);
};

export const invertedRange = (p: number, min: number, max: number) => p * (max - min) + min;

export const deepCopy = (data: any) => JSON.parse(JSON.stringify(data));

export const searchBy = (arr: any, itemId: number, key: string) => {
  return arr.reduce((a: any, item: any) => {
    if (a) return a;
    if (item.id === itemId) return item;
    if (item[key]) return searchBy(item[key], itemId, key);
  }, null);
};
