import create from 'solid-zustand';
import produce, { setAutoFreeze } from 'immer';
import { IAsset, IState } from '../types';
import { getUrl } from '../utils';
import { USE_GENERATE, USE_REGENERATE, USE_REPEAT, USE_REQUEST_CAPTURE, USE_SET_THEME, USE_SWITCH_NODE } from '../constants';
import { hash, random } from '@andronov04/xsdk';

setAutoFreeze(false);
const PROXIES: { [key: string]: WindowProxy } = {};

export const useStore = create<IState>((set) => ({
  hash: '',
  assets: [],
  addAsset: (asset) =>
    set(
      produce((state) => {
        state.assets.push(asset);
      })
    ),
  removeAsset: (assetId) =>
    set(
      produce((state) => {
        const index = (state.assets as IAsset[]).findIndex((a) => a.asset?.id === assetId);
        state.assets.splice(index, 1);
      })
    ),
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

  digest: '',
  setDigest: (digest) =>
    set(
      produce((state) => {
        state.digest = digest;
      })
    ),

  root: {
    sizeMode: 'abs',
    tmplIdx: 0,
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
  },
  updateRoot: (root: any) =>
    set(
      produce((state) => {
        // state.root.state.size.mode = 'rnd';
        return { root };
      })
    ),

  activeAssetId: -1, //-1, // -1 root
  setActiveAssetId: (assetId, send = true) =>
    set(
      produce((state) => {
        if (send) {
          const data = {
            type: USE_SWITCH_NODE,
            from: 0,
            data: {
              node: {
                pk: -1,
                root: false,
                slug: '#'
              }
            }
          };
          state.assets.forEach((asset: IAsset) => {
            asset.proxies?.param()?.postMessage(data, getUrl(asset));
            asset.proxies?.node()?.postMessage(data, getUrl(asset));
            asset.proxies?.asset()?.postMessage(data, getUrl(asset));
          });
        }
        state.activeAssetId = assetId;
      })
    ),

  scale: 1,
  setScale: (scale) => set(() => ({ scale })),

  generate: () =>
    set(
      produce((state) => {
        state.digest = '';
        // state.hash = hash();
        // New size if random set
        if (state.root.sizeMode === 'rnd') {
          const width = random.betweenInt(state.root.width.min, state.root.width.max);
          const height = random.betweenInt(state.root.height.min, state.root.height.max);
          state.root.width.value = width;
          state.root.height.value = height;
        } else if (state.root.sizeMode === 'tmpl') {
          // state.root.state.size.extend.width.value = width;
          // state.root.state.size.extend.height.value = height;
        }
        const _hash = hash();

        state.assets.forEach((asset: IAsset) => {
          asset.proxies?.param()?.postMessage({ type: USE_REGENERATE, data: { hash: _hash } }, getUrl(asset));
          asset.proxies?.node()?.postMessage({ type: USE_REGENERATE, data: { hash: _hash } }, getUrl(asset));
          asset.proxies?.asset()?.postMessage({ type: USE_REGENERATE, data: { hash: _hash } }, getUrl(asset));
          // asset.proxies?.asset()?.postMessage({ type: USE_GENERATE }, getUrl(asset));
        });
        // after ready
        state.hash = _hash;
      })
    ),
  preview: () =>
    set(
      produce((state) => {
        state.assets.forEach((asset: IAsset) => {
          asset.proxies?.param()?.postMessage({ type: USE_REGENERATE, data: { hash: state.hash } }, getUrl(asset));
          asset.proxies?.node()?.postMessage({ type: USE_REGENERATE, data: { hash: state.hash } }, getUrl(asset));
          asset.proxies?.asset()?.postMessage({ type: USE_REGENERATE, data: { hash: state.hash } }, getUrl(asset));
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
    ),

  theme: 'dark',
  setTheme: (theme) =>
    set(
      produce((state) => {
        state.theme = theme;
        localStorage.setItem('theme', theme);
        // local storage save
        const doc = document.querySelector('html');
        if (doc) {
          doc.dataset['theme'] = theme;
        }
        state.assets.forEach((asset: IAsset) => {
          asset.proxies?.node?.()?.postMessage(
            {
              type: USE_SET_THEME,
              data: {
                theme: theme
              }
            },
            getUrl(asset)
          );
          asset.proxies?.param?.()?.postMessage(
            {
              type: USE_SET_THEME,
              data: {
                theme: theme
              }
            },
            getUrl(asset)
          );
          asset.proxies?.asset?.()?.postMessage(
            {
              type: USE_SET_THEME,
              data: {
                theme: theme
              }
            },
            getUrl(asset)
          );
        });
      })
    )
}));
