import create from 'solid-zustand';
import produce, { setAutoFreeze } from 'immer';
import { IAsset, IAssetMeta, IAssetState, IState } from '../types';
import { deepCopy, getUrl } from '../utils';

setAutoFreeze(false);

export const useStore = create<IState>((set) => ({
  assets: [],
  root: {
    id: -1,
    childrenCount: 0,
    children: [],
    state: {
      width: {
        name: 'Width',
        value: 1000,
        min: 500,
        max: 1000
        // minMin: 100,
        // maxMax: 4000
      },
      height: {
        name: 'Height',
        value: 1000,
        min: 500,
        max: 1000
        // minMin: 100,
        // maxMax: 4000
      }
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
  updateAssetState: (keys: string[], st: any) =>
    set(
      produce((state) => {
        // const idx = 0; // TODO use active current
        // const assets = [...state.assets];
        // const asset = assets[idx] as IAsset;
        // if (asset) {
        //   const data = searchBy([asset?.data], state.activeNodeId, 'children') as any;
        //   Object.keys(params).forEach((k) => {
        //     // TODO Optimization
        //     let _params = data.params;
        //     keys.forEach((key) => {
        //       _params = _params[key];
        //     });
        //     if (_params !== undefined && _params[k] !== params[k]) {
        //       _params[k] = params[k];
        //     }
        //   });
        // }
      })
    ),

  generate: (requestId: string) =>
    set((state) => {
      const assets = [...state.assets];
      assets.forEach((asset) => {
        asset.requestId = requestId;
      });
      // // Test upd width/height
      // const root: IAssetState = deepCopy(state.root);
      // if (root?.state?.width) {
      //   root.state.width.value = 500;
      // }
      // if (root?.state?.height) {
      //   root.state.height.value = 500;
      // }
      // return { assets, root };
      return { assets };
    }),

  activeNodeId: 1,
  setActiveNodeId: (id) => set(() => ({ activeNodeId: id })),

  scale: 1,
  setScale: (scale) => set(() => ({ scale }))
}));
