// TODO Import IParams from sdk
export interface IParams {
  name: string;

  min?: number;
  max?: number;
  minMin?: number;
  maxMax?: number;

  value?: number;

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
  nodes: IAssetData[];
  params: IParams;
  values: IValues;
}

export interface IAsset {
  url: string;
  data?: IAssetData;
  hash?: string;
}

export interface IState {
  assets: IAsset[];
  setAssets: (assets: IAsset[]) => void;
  updateAsset: (assets: IAsset) => void;
  updateAssetParams: (key: string, params: any) => void;

  activeNodeId: number;
  setActiveNodeId: (id: number) => void;

  generate: () => void;
}
