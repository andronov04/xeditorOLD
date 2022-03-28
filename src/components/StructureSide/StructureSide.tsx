import type { Component } from 'solid-js';
import { useStore } from '../../store';
import Iframe from '../Iframe/Iframe';
import { For } from 'solid-js';
import { getUrl } from '../../utils';
import { USE_REQUEST_CHANGE_NODE_CMD } from '../../constants';

const StructureSide: Component = () => {
  const store = useStore();

  return (
    <aside id={'left'} class={'border-r border-r-dark4A select-none absolute bg-dark21 z-20 w-250 h-full top-0 left-0'}>
      <div style={{ height: '95%' }} class={'p-[5px] text-sm overflow-scroll'}>
        <h2
          onClick={() => {
            store.setActiveAssetId(-1);
            // TODO Use correct asset
            store.assets[0]?.proxies?.param()?.postMessage({ type: USE_REQUEST_CHANGE_NODE_CMD, nodeId: -1 }, getUrl(store.assets[0]));
            store.assets[0]?.proxies?.node()?.postMessage({ type: USE_REQUEST_CHANGE_NODE_CMD, nodeId: -1 }, getUrl(store.assets[0]));
          }}
          class={`cursor-pointer ${store.activeAssetId === -1 ? 'font-bold' : ''} hover:opacity-80 `}
        >
          Design
        </h2>
        <div
          style={{
            // 'border-left-color': '#525252',
            // 'border-left-width': '1px',
            // 'border-left-style': 'solid',
            height: '95%'
          }}
          class={'pl-1 text-sm overflow-scroll'}
        >
          <For each={store.assets.sort((a, b) => b.order - a.order)} fallback={<div />}>
            {(asset) => {
              const url = getUrl(asset);
              return (
                <Iframe
                  url={`${url}?node=0&editor=1&view=2&xhash=x014fCd6F6a11B0cCd3E6DC6BFc322e4E8a6b916bFBbFcDfa5dd4c5`}
                  onLoad={(proxy) => {
                    store.updateAssetProxy(asset.asset?.id ?? 0, 'node', proxy);
                  }}
                />
              );
            }}
          </For>
        </div>
      </div>
    </aside>
  );
};

export default StructureSide;
