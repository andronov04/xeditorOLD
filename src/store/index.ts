import create from 'solid-zustand';
import produce, { setAutoFreeze } from 'immer';
import { IAsset, IState } from '../types';
import { getUrl } from '../utils';

setAutoFreeze(false);
const PROXIES: { [key: string]: WindowProxy } = {};

export const useStore = create<IState>((set) => ({
  assets: [],
  setAssets: (assets) => set(() => ({ assets })),
  updateAssetProxy: (id: number, kind: 'node' | 'param' | 'asset', proxy: WindowProxy) =>
    set(
      produce((state) => {
        const idx = (state.assets as IAsset[]).findIndex((a) => a.asset?.id === id);
        const assets = [...state.assets];
        PROXIES[kind] = proxy;
        assets[idx] = {
          ...assets[idx],
          proxies: {
            ...assets[idx].proxies,
            [kind]: () => PROXIES[kind]
          }
        } as IAsset;
        return { assets };
      })
    ),

  root: {
    id: -1,
    childrenCount: 0,
    children: [],
    state: {
      width: {
        name: 'Width',
        value: 1000,
        min: 500,
        max: 1000,
        mode: 'abs'
        // minMin: 100,
        // maxMax: 4000
      },
      height: {
        name: 'Height',
        value: 1000,
        min: 500,
        max: 1000,
        mode: 'abs'
        // minMin: 100,
        // maxMax: 4000
      }
    }
  },
  updateRoot: (root) => set(() => ({ root })),

  scale: 1,
  setScale: (scale) => set(() => ({ scale }))
}));
