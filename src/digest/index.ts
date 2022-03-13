import { digest } from '@andronov04/xsdk';
import { IAsset } from '../types';

interface IDigestPayloadValues {
  [key: string]: number | string;
}

interface IDigestPayload {
  id: number;
  order: number;
  values: IDigestPayloadValues;
  digest: string;
  hash: string;
}

interface IDigestData {
  data: string;
  digest: string;
}

const recursiveValues = (items: any, indices: number[], values: IDigestPayloadValues) => {
  // TODO Fast decision, need rewrite
  Object.entries(items.values ?? {}).forEach((entry) => {
    const key = `${indices.join('.')}.${entry[0]}`;
    values[key] = entry[1] as string | number;
  });
  items.children.forEach((child: any, i: number) => {
    recursiveValues(child, [...indices, i], values);
  });
};

export const dataDigest = async (assets: IAsset[]): Promise<IDigestData> => {
  const payload: IDigestPayload[] = assets
    .sort((a, b) => a.order - b.order)
    .map((asset) => {
      const values: IDigestPayloadValues = {};
      recursiveValues(asset.data, [0], values);
      return {
        id: asset.asset?.id ?? 0,
        order: asset.order,
        values: values, // TODO Values is bad in array, remove hind desc and others
        digest: asset.meta?.digest ?? '',
        hash: asset.meta?.hash ?? ''
      };
    });
  const data = JSON.stringify(payload);
  const digestString = await digest(data);
  return {
    data,
    digest: digestString
  };
};
