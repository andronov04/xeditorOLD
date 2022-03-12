// TODO Import IParams from sdk
export interface IParams {
  name: string;

  min?: number;
  max?: number;
  minMin?: number;
  maxMax?: number;

  value?: number;
  array?: any[];

  floor?: boolean;

  nodeId?: string;

  description?: string;
  hint?: string;
}

export interface IValues {
  [key: string]: any;
}

export interface IAssetData {
  id: number;
  children: IAssetData[];
  params: IParams;
  values: IValues;
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
  data?: IAssetData;
  asset?: IAssetBase;
  order: number;
  meta?: IAssetMeta;
  requestId?: string; // temp
}

export interface IState {
  assets: IAsset[];
  setAssets: (assets: IAsset[]) => void;
  updateAsset: (asset: IAsset) => void;
  updateAssetMeta: (url: string, meta: IAssetMeta) => void;
  updateAssetParams: (keys: string[], params: any) => void;

  activeNodeId: number;
  setActiveNodeId: (id: number) => void;

  generate: (requestId: string) => void;
}
