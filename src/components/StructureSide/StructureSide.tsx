import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { useStore } from '../../store';
import { IAssetData, IParams } from '../../types';

const StructureNode = (props: { data: IAssetData; name?: string; index: number; activeNodeId: number; setActiveNodeId: (id: number) => void }) => {
  return (
    <div
      style={{
        'border-left-color': '#525252',
        'border-left-width': '1px',
        'border-left-style': 'solid'
      }}
      class={'ml-1 pl-1'}
    >
      <h4
        onClick={() => {
          props.setActiveNodeId(props.data.id);
        }}
        id={`structure_${props.index}`}
        class={`relative cursor-pointer hover:opacity-80 ${props.activeNodeId === props.data.id ? 'font-bold' : ''}`}
      >
        {(props.data.params as unknown as IParams)?.name ?? (props.index === 0 ? props.name : `Node #${props.data.id}`)}

        {/*{props.data.childrenCount ? <i class={'text-small absolute -top-1 ml-0.5'}>{props.data.childrenCount}</i> : null}*/}
      </h4>

      {
        <For each={props.data.children}>
          {(asset) => <>{<StructureNode activeNodeId={props.activeNodeId} data={asset} setActiveNodeId={props.setActiveNodeId} index={props.index + 1} />}</>}
        </For>
      }
    </div>
  );
};

const StructureSide: Component = () => {
  const state = useStore();
  return (
    <aside id={'left'} class={'p-2 select-none absolute bg-dark21 z-20 w-250 h-full top-0 left-0'}>
      <h2>Structure</h2>

      <div style={{ height: '95%' }} class={'text-sm pt-2 overflow-scroll'}>
        <h2 class={'cursor-pointer hover:opacity-80'}>Design</h2>
        <For each={state.assets} fallback={<div>Loading...</div>}>
          {(asset) => (
            <div>
              {asset.data?.children.length && (
                <StructureNode
                  name={asset.asset?.name ?? ''}
                  activeNodeId={state.activeNodeId}
                  data={asset.data}
                  setActiveNodeId={state.setActiveNodeId}
                  index={0}
                />
              )}
            </div>
          )}
        </For>
      </div>
    </aside>
  );
};

export default StructureSide;
