import create from 'solid-zustand';
import produce, { setAutoFreeze } from 'immer';
import { random } from '@andronov04/xsdk';
import { IAsset, IAssetMeta, IAssetState, IState } from '../types';
import { deepCopy, getUrl, searchBy } from '../utils';

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
  updateAssetState: (keys: string[], params: any) =>
    set(
      produce((state) => {
        // TODO Validation How to validate?
        const idx = 0; // TODO use active current
        const assets = [...state.assets];
        const asset = assets[idx] as IAsset;
        if (asset) {
          const data = state.activeNodeId === -1 ? state.root : (searchBy([asset?.state], state.activeNodeId, 'children') as any);
          Object.keys(params).forEach((k) => {
            // TODO Optimization
            let _params = data.state;
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
      // Test upd width/height
      const root: IAssetState = deepCopy(state.root);
      if (root?.state?.width) {
        root.state.width.value =
          !root.state.width.mode ?? root.state.width?.mode === 'gen'
            ? random.betweenInt(root.state.width.min ?? 100, root.state.width.max ?? 4000)
            : root.state.width.value;
      }
      if (root?.state?.height) {
        root.state.height.value =
          !root.state.height.mode ?? root.state.height?.mode === 'gen'
            ? random.betweenInt(root.state.height.min ?? 100, root.state.height.max ?? 4000)
            : root.state.height.value;
      }
      return { assets, root };
      // return { assets };
    }),

  activeNodeId: 1,
  setActiveNodeId: (id) => set(() => ({ activeNodeId: id })),

  scale: 1,
  setScale: (scale) => set(() => ({ scale }))
}));
