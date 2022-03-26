// TODO Import from sdk
import { IAsset } from '../types';

export const RESERVED_LIST = ['min', 'mode', 'type', 'max', 'value', 'step', 'node', 'name', 'description', 'hint', 'options', 'floor', 'array', 'options'];

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

// TODO use ipfs configuration ???
export const IPFS_PREFIX_URL = 'https://art3s.mypinata.cloud/ipfs/'; // 'https://ipfs.io/ipfs/';

export const ipfsToUrl = (ipfs: string): string => {
  const preIpfs = ipfs.slice(7);
  return `${IPFS_PREFIX_URL}${preIpfs}`;
};

export const getUrl = (asset: IAsset): string => {
  let url = asset.asset?.metadata?.artifactUri;
  if (url.startsWith('ipfs://')) {
    url = ipfsToUrl(url);
  }
  return url;
};

export const postData = (type: string, requestId: string, data: any): void => {
  window.parent.window.postMessage({ type, requestId, data }, document.referrer);
};
