export interface IAssetState {
  [key: string]: any;
}

export interface IAssetBase {
  id: number;
  name: string;
  metadata?: any;
}

export interface IAssetProxy {
  asset: () => WindowProxy | null;
  node: () => WindowProxy | null;
  param: () => WindowProxy | null;
}

export interface IAsset {
  state?: IAssetState;
  asset?: IAssetBase;
  proxies?: IAssetProxy;
  order: number;
}

export interface IState {
  assets: IAsset[];
  setAssets: (assets: IAsset[]) => void;
  updateAssetProxy: (id: number, kind: 'node' | 'param' | 'asset', proxy: WindowProxy) => void;

  root: any;
  updateRoot: (root: any) => void;

  activeAssetId: number;
  setActiveAssetId: (assetId: number) => void;

  scale: number;
  setScale: (scale: number) => void;

  generate: () => void;
  preview: () => void;
}
