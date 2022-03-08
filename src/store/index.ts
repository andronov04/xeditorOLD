import create from 'solid-zustand';
import produce, { setAutoFreeze } from 'immer';
import { IAsset, IAssetData, IState } from '../types';
import { deepCopy, searchBy } from '../utils';

setAutoFreeze(false);

export const useStore = create<IState>((set) => ({
  assets: [],
  setAssets: (assets) => set((_) => ({ assets })),
  updateAsset: (payload: IAsset) =>
    set(
      produce((state) => {
        const idx = (state.assets as IAsset[]).findIndex((a) => a.url === payload.url);
        const assets = [...state.assets];
        assets[idx] = { url: payload.url, data: payload.data, hash: payload.hash };
        return { assets };
      })
    ),
  updateAssetParams: (key: string, params: any) =>
    set(
      produce((state) => {
        const idx = 0; // TODO use active current
        const assets = [...state.assets];
        const asset = assets[idx] as IAsset;
        if (asset) {
          const data = searchBy([asset?.data], state.activeNodeId, 'nodes') as any;
          Object.keys(params).forEach(k => { // TODO Optimization
            if (data.params?.[key]?.[k] !== undefined) {
              if (data.params[key][k] !== params[k]) {
                data.params[key][k] = params[k];
              }
            }
          })
        }
      })
    ),

  generate: () =>
    set((state) => {
      const assets = [...state.assets];
      assets.forEach((asset) => {
        asset.hash = Math.random().toString();
      });
      return { assets };
    }),

  activeNodeId: 1,
  setActiveNodeId: (id) => set((_) => ({ activeNodeId: id })),
}));
