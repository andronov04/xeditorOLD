import create from 'solid-zustand';
import produce, { setAutoFreeze } from 'immer';
import { IAsset, IState } from '../types';
import { getUrl } from '../utils';
import { USE_GENERATE, USE_REPEAT, USE_REQUEST_CAPTURE } from '../constants';
import { random } from '@andronov04/xsdk';

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
        mode: 'abs',
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
        // New size if random set
        if (state.root.state.size.mode === 'rnd') {
          const width = random.betweenInt(state.root.state.size.extend.width.min, state.root.state.size.extend.width.max);
          const height = random.betweenInt(state.root.state.size.extend.height.min, state.root.state.size.extend.height.max);
          state.root.state.size.extend.width.value = width;
          state.root.state.size.extend.height.value = height;
        }

        state.assets.forEach((asset: IAsset) => {
          asset.proxies?.asset()?.postMessage({ type: USE_GENERATE }, getUrl(asset));
        });
      })
    ),
  preview: () =>
    set(
      produce((state) => {
        state.assets.forEach((asset: IAsset) => {
          asset.proxies?.asset()?.postMessage({ type: USE_REPEAT }, getUrl(asset));
        });
      })
    ),
  capture: () =>
    set(
      produce((state) => {
        // TODO handle return and upload ipfs
        state.assets.forEach((asset: IAsset) => {
          asset.proxies?.asset()?.postMessage({ type: USE_REQUEST_CAPTURE }, getUrl(asset));
        });
      })
    )
}));
