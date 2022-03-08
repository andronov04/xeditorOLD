import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { useStore } from '../../store';
import { IAssetData } from '../../types';

const MAIN_NODE_NAME = 'Node';

const StructureNode = (props: {
  data: IAssetData,
  index: number,
  activeNodeId: number,
  setActiveNodeId: (id: number) => void,
}) => {

  return (
    <div class={`${props.index === 0 ? '': 'pl-2'}`}>
      {<h4
        onClick={() => {
          props.setActiveNodeId(props.data.id);
        }}
        id={`structure_${props.index}`}
        class={`cursor-pointer hover:opacity-80 ${props.activeNodeId === props.data.id ? 'font-bold' : ''}`}>
        {props.data.params?.name ?? (props.index === 0 ? MAIN_NODE_NAME : `Element #${props.data.id}`)}
      </h4>}

      {<For each={props.data.nodes}>{asset =>
        <>
          {<StructureNode
            activeNodeId={props.activeNodeId}
            data={asset}
            setActiveNodeId={props.setActiveNodeId}
            index={props.index+1}
          />}
        </>
      }</For>}
    </div>
  );
}

const StructureSide: Component = () => {
  const state = useStore();
  return (
    <aside class={'p-2 absolute bg-dark21 z-20 w-250 h-full top-0 left-0'}>
      <h2>Structure</h2>

      <div style={{ height: '95%' }} class={'text-sm overflow-scroll'}>
        <For each={state.assets}>{asset =>
          <>
            {asset.data?.nodes.length && <StructureNode
              activeNodeId={state.activeNodeId}
              data={asset.data}
              setActiveNodeId={state.setActiveNodeId}
              index={0}
            />}
          </>
        }</For>
      </div>

    </aside>
  );
};

export default StructureSide;
