import create from 'solid-zustand';
import produce, { setAutoFreeze } from 'immer';
import { IAsset, IAssetMeta, IState } from '../types';
import { getUrl, searchBy } from '../utils';

setAutoFreeze(false);

export const useStore = create<IState>((set) => ({
  assets: [],
  root: {
    id: 0,
    childrenCount: 0,
    children: [],
    params: {
      width: {
        name: 'Width',
        value: 1000
      },
      height: {
        name: 'Height',
        value: 1000
      }
    },
    values: {
      width: 1000,
      height: 1000
    }
  },
  updateRoot: (root) => set(() => ({ root })),
  setAssets: (assets) => set(() => ({ assets })),
  updateAsset: (payload: IAsset) =>
    set(
      produce((state) => {
        const idx = (state.assets as IAsset[]).findIndex((a) => getUrl(a) === getUrl(payload));
        const assets = [...state.assets];
        assets[idx] = { ...assets[idx], ...payload };
        return { assets };
      })
    ),
  updateAssetMeta: (url: string, meta: IAssetMeta) =>
    set(
      produce((state) => {
        const idx = (state.assets as IAsset[]).findIndex((a) => getUrl(a) === url);
        const assets = [...state.assets];
        assets[idx] = { ...assets[idx], meta };
        return { assets };
      })
    ),
  updateAssetParams: (keys: string[], params: any) =>
    set(
      produce((state) => {
        const idx = 0; // TODO use active current
        const assets = [...state.assets];
        const asset = assets[idx] as IAsset;
        if (asset) {
          const data = searchBy([asset?.data], state.activeNodeId, 'children') as any;
          Object.keys(params).forEach((k) => {
            // TODO Optimization
            let _params = data.params;
            keys.forEach((key) => {
              _params = _params[key];
            });
            if (_params !== undefined && _params[k] !== params[k]) {
              _params[k] = params[k];
            }
          });
        }
      })
    ),

  generate: (requestId: string) =>
    set((state) => {
      const assets = [...state.assets];
      assets.forEach((asset) => {
        asset.requestId = requestId;
      });
      return { assets };
    }),

  activeNodeId: 1,
  setActiveNodeId: (id) => set(() => ({ activeNodeId: id })),

  scale: 1,
  setScale: (scale) => set(() => ({ scale }))
}));
