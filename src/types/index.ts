// TODO Import IParams from sdk
export interface IParams {
  name: string;

  min?: number;
  max?: number;
  minMin?: number;
  maxMax?: number;

  mode?: 'abs' | 'gen';

  value?: number;
  array?: any[];

  floor?: boolean;

  nodeId?: string;

  description?: string;
  hint?: string;
}

export interface IBaseState {
  [key: string]: IParams;
}

export interface IAssetState {
  id: number;
  children: IAssetState[];
  state: IBaseState;
  childrenCount: number;
}

export interface IAssetBase {
  id: number;
  name: string;
  metadata?: any;
}
export interface IAssetMeta {
  digest: string;
  hash: string;
}

export interface IAsset {
  state?: IAssetState;
  asset?: IAssetBase;
  order: number;
  meta?: IAssetMeta;
  requestId?: string; // temp
}

export interface IState {
  assets: IAsset[];

  root: IAssetState;
  updateRoot: (root: IAssetState) => void;

  setAssets: (assets: IAsset[]) => void;
  updateAsset: (asset: IAsset) => void;
  updateAssetMeta: (url: string, meta: IAssetMeta) => void;
  updateAssetState: (keys: string[], state: any) => void;

  activeNodeId: number;
  setActiveNodeId: (id: number) => void;

  generate: (requestId: string) => void;

  scale: number;
  setScale: (scale: number) => void;
}
