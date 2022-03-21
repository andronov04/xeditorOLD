import type { Component } from 'solid-js';
import { useStore } from '../../store';
import { IAssetData, IParams } from '../../types';
import { createMemo, For } from 'solid-js';
import { Parameter } from './Parameter/Parameter';
import { RESERVED_LIST, searchBy } from '../../utils';

const Parameters = (props: { data: IAssetData; keys: string[]; index: number }) => {
  const state = useStore();

  const _data = createMemo(() => {
    return props.index === 0 ? searchBy([props.data], state.activeNodeId, 'children') : props.data;
  });

  const entries = createMemo(() => Object.entries(_data().params as IParams));
  const values = createMemo(() => _data().values);

  return (
    <div>
      {props.index !== 0 && <h3>{props.data.params.name}</h3>}
      <div class={`${props.index === 0 ? '' : 'pl-2'}`}>
        {
          <For each={entries().filter((a) => !RESERVED_LIST.includes(a[0]))} fallback={<div>Loading...</div>}>
            {(entry) => {
              const _keys = Object.keys(entry[1]);
              const inter = _keys.filter((a) => RESERVED_LIST.includes(a));

              if (inter.length !== _keys.length && typeof entry[1] === 'object') {
                return (
                  <Parameters keys={[...props.keys, entry[0]]} data={{ params: entry[1], values: values()[entry[0]] } as IAssetData} index={props.index + 1} />
                );
              }
              return (
                <div class={'mb-2'}>
                  <Parameter keys={props.keys} key={entry[0]} params={entry[1] as any} value={values()[entry[0]]} />
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
    <aside class={'p-2 select-none absolute bg-dark21 z-20 w-250 h-full top-0 right-0'}>
      <h2>Parameters</h2>

      <div style={{ height: '95%' }} class={'pt-2 text-sm overflow-scroll'}>
        {
          <For each={state.assets} fallback={<div>Loading...</div>}>
            {(assets) => <>{assets.data && <Parameters keys={[]} data={assets.data} index={0} />}</>}
          </For>
        }
      </div>
    </aside>
  );
};

export default ParameterSide;
