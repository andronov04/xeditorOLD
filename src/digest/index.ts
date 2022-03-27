import { digest, RESERVED_LIST } from '@andronov04/xsdk';
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

// TODO Use from sdk
const getValues = (state = {}): IDigestPayloadValues => {
  let values: any = {};
  const cb = (data: any, val: any = {}) => {
    Object.entries(data).forEach((entry: [string, any]) => {
      if (RESERVED_LIST.includes(entry[0])) {
        return;
      }
      if (entry[1].value !== undefined) {
        val[entry[0]] = entry[1].value;
      } else if (typeof entry[1] === 'number') {
        val[entry[0]] = entry[1];
      } else {
        val[entry[0]] = {};
        cb(entry[1], val[entry[0]]);
      }
      values = { ...values, val };
    });
  };
  cb(state, {});
  values = { ...values.val };

  return values;
};

export const dataDigest = async (assets: IAsset[]): Promise<IDigestData> => {
  const payload: IDigestPayload[] = assets
    .sort((a, b) => a.order - b.order)
    .map((asset) => {
      const values: IDigestPayloadValues = getValues(asset.state);
      // recursiveValues(asset.state, [0], values);
      return {
        id: asset.asset?.id ?? 0,
        order: asset.order,
        values: values,
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
