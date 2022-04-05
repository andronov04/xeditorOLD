import { hash } from '@andronov04/xsdk';

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
  hash: string;
  assets: IAsset[];
  addAsset: (asset: IAsset) => void;
  removeAsset: (assetId: number) => void;
  updateAssetProxy: (id: number, kind: 'node' | 'param' | 'asset', proxy: WindowProxy) => void;

  digest: string;
  setDigest: (digest: string) => void;

  root: any;
  updateRoot: (root: any) => void;

  activeAssetId: number;
  setActiveAssetId: (assetId: number, send?: boolean) => void;

  scale: number;
  setScale: (scale: number) => void;

  generate: () => void;
  preview: () => void;
  capture: () => void;

  theme: string;
  setTheme: (theme: string) => void;
}

export enum EType {
  NONE = 0,
  PARAMS,
  NODES,
  ASSET,
}
