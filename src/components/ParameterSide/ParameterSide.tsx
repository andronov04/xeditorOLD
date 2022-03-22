import type { Component } from 'solid-js';
import { useStore } from '../../store';
import { IAssetState, IBaseState, IParams } from '../../types';
import { createMemo, For } from 'solid-js';
import { Parameter } from './Parameter/Parameter';
import { RESERVED_LIST, searchBy } from '../../utils';

const Parameters = (props: { state: IAssetState; keys: string[]; index: number }) => {
  const store = useStore();

  const _data = createMemo(() => {
    return store.activeNodeId === -1 ? store.root : props.index === 0 ? searchBy([props.state], store.activeNodeId, 'children') : props.state;
  });
  const entries = createMemo(() => _data().state);

  return (
    <div>
      {props.index !== 0 && <h3>{(props.state.state as unknown as IParams).name}</h3>}
      <div class={`${props.index === 0 ? '' : 'pl-2'}`}>
        {
          <For each={Object.entries(entries() as IBaseState).filter((a) => !RESERVED_LIST.includes(a[0]))} fallback={<div>Loading...</div>}>
            {(entry) => {
              const _keys = Object.keys(entry[1]);
              const inter = _keys.filter((a) => RESERVED_LIST.includes(a));

              if (inter.length !== _keys.length && typeof entry[1] === 'object') {
                return (
                  <Parameters keys={[...props.keys, entry[0]]} state={{ ...props.state, state: entry[1] as unknown as IBaseState }} index={props.index + 1} />
                );
              }
              return (
                <div class={'mb-2'}>
                  <Parameter keys={props.keys} key={entry[0]} params={entry[1]} />
                </div>
              );
            }}
          </For>
        }
      </div>
    </div>
  );
};

const ParameterSide: Component = () => {
  const state = useStore();

  return (
    <aside id={'right'} class={'p-2 select-none absolute bg-dark21 z-20 w-250 h-full top-0 right-0'}>
      <h2>Parameters</h2>

      <div style={{ height: '95%' }} class={'pt-2 text-sm overflow-scroll'}>
        {
          <For each={state.assets} fallback={<div>Loading...</div>}>
            {(assets) => <>{assets.state && <Parameters keys={[]} state={assets.state} index={0} />}</>}
          </For>
        }
      </div>
    </aside>
  );
};

export default ParameterSide;
