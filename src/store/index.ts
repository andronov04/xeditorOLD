import create from 'solid-zustand';
import produce, { setAutoFreeze } from 'immer';
import { IAsset, IState } from '../types';
import { getUrl } from '../utils';
import { USE_GENERATE, USE_REPEAT } from '../constants';

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
    active: true,
    state: {
      size: {
        mode: 'rnd',
        unit: 'px',
        name: 'Size',
        select: [
          {
            label: '11x14 Poster (1008x792)',
            value: 1
          },
          {
            label: 'Instagram Post (1080x1080)',
            value: 2
          }
        ],
        extend: {
          width: {
            name: 'Width',
            value: 1000,
            unit: 'px',
            min: 500,
            max: 1000,
            mode: 'abs'
            // minMin: 100,
            // maxMax: 4000
          },
          height: {
            name: 'Height',
            value: 1000,
            unit: 'px',
            min: 500,
            max: 1000,
            mode: 'abs'
            // minMin: 100,
            // maxMax: 4000
          }
        }
      }
    }
  },
  updateRoot: (root: any) =>
    set(
      produce((state) => {
        // state.root.state.size.mode = 'rnd';
        return { root };
      })
    ),

  activeAssetId: -1, // -1 root
  setActiveAssetId: (assetId) => set(() => ({ activeAssetId: assetId })),

  scale: 1,
  setScale: (scale) => set(() => ({ scale })),

  generate: () =>
    set(
      produce((state) => {
        console.log('generate');
        // TODO Generate or get width and height
        // TODO Use correct asset
        state.assets[0]?.proxies?.asset()?.postMessage({ type: USE_GENERATE }, getUrl(state.assets[0]));
      })
    ),
  preview: () =>
    set(
      produce((state) => {
        console.log('preview');
        // TODO Use correct asset
        state.assets[0]?.proxies?.asset()?.postMessage({ type: USE_REPEAT }, getUrl(state.assets[0]));
      })
    )
}));
