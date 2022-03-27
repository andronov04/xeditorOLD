import type { Component } from 'solid-js';
import { useStore } from '../../store';
import Iframe from '../Iframe/Iframe';
import { For } from 'solid-js';
import { getUrl } from '../../utils';

const StructureSide: Component = () => {
  const store = useStore();

  return (
    <aside id={'left'} class={'p-2 select-none absolute bg-dark21 z-20 w-250 h-full top-0 left-0'}>
      <h2>Structure</h2>

      <div style={{ height: '95%' }} class={'text-sm pt-2 overflow-scroll'}>
        <h2
          onClick={() => {
            //
          }}
          class={`cursor-pointer hover:opacity-80 `}
        >
          Design
        </h2>
        <div style={{ height: '95%' }} class={'pt-2 text-sm overflow-scroll'}>
          <For each={store.assets.sort((a, b) => b.order - a.order)} fallback={<p>Loading...</p>}>
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
