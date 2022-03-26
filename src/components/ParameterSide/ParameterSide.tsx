import type { Component } from 'solid-js';
import { useStore } from '../../store';
import Iframe from '../Iframe/Iframe';
import { For } from 'solid-js';

const ParameterSide: Component = () => {
  const store = useStore();
  const url = 'http://localhost:8001/?node=0&view=1&xhash=x014fCd6F6a11B0cCd3E6DC6BFc322e4E8a6b916bFBbFcDfa5dd4c5'; //editor=1

  return (
    <aside id={'right'} class={'p-2 select-none absolute bg-dark21 z-20 w-250 h-full top-0 right-0'}>
      <h2>Parameters</h2>

      <div style={{ height: '95%' }} class={'pt-2 text-sm overflow-scroll'}>
        <For each={store.assets.sort((a, b) => b.order - a.order)} fallback={<p>Loading...</p>}>
          {(asset) => {
            return (
              <Iframe
                url={url}
                onLoad={(proxy) => {
                  store.updateAssetProxy(asset.asset?.id ?? 0, 'param', proxy);
                }}
              />
            );
          }}
        </For>
      </div>
    </aside>
  );
};

export default ParameterSide;

//{
//           <For each={state.assets} fallback={<div>Loading...</div>}>
//             {(assets) => <>{assets.state && <Parameters keys={[]} state={assets.state} index={0} />}</>}
//           </For>
//         }
