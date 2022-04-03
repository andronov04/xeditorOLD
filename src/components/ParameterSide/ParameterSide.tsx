import type { Component } from 'solid-js';
import { useStore } from '../../store';
import Iframe from '../Iframe/Iframe';
import { createMemo, For, onMount } from 'solid-js';
import { getUrl } from '../../utils';
import { h, app } from 'hyperapp';

export const tabComponent = (props: any, nav: any[] = []): any => {
  return h(
    'div',
    { class: 'tabs tabs-boxed w-full' },
    nav.map((nv) =>
      h('a', {
        class: `tab  w-1/3 tab-xs ${nv.key === props.mode ? 'tab-active' : ''}`,
        onclick: [props.onChange, nv.key],
        innerHTML: nv.title
      })
    ) as any
  );
};

export const inputComponent = ({ oninput, name, value }: any, inputOptions = {}): any => {
  return h('div', { class: 'form-control' }, [
    h('label', { class: 'input-group input-group-xs' }, [
      h('span', { class: 'px-1', innerHTML: name }),
      h('input', {
        class: 'input appearance-none input-bordered text-xs input-xs w-full',
        defaultValue: value,
        oninput,
        type: 'number',
        ...inputOptions
      })
    ])
  ]);
};

const formats = [
  {
    label: '11x14 Poster (1008x792)',
    value: 1
  },
  {
    label: 'Instagram Post (1080x1080)',
    value: 2
  }
]; // todo move

const Parameter = (props: { item: any; key: string }) => {
  const store = useStore();
  let refContainer: any;

  onMount(() => {
    const state = {
      title: 'Size',
      helper: 'between',
      width: 1000,
      height: 1000,
      min: 800,
      max: 1200,
      minW: 800,
      maxW: 1200,
      minH: 800,
      maxH: 1200,
      minMin: 100,
      maxMax: 4000,
      mode: 'abs'
    } as any;

    // IT's very bad bad, rewrite
    const setState = (state: any, newState: any) => {
      // console.log('setState', state, newState);
      // if (newState.mode) {
      //   const item = store.root.state[props.key];
      //   const _item = { ...item, mode: newState.mode, extend: { ...item.extend } };
      //   const _root = { ...store.root, state: { ...store.root.state, [props.key]: { ...store.root[props.key], ..._item } } };
      //   store.updateRoot(_root);
      // }
      // if (newState.width) {
      //   const item = store.root.state[props.key];
      //   const _item = { ...item, mode: newState.mode, extend: { ...item.extend, width: { ...item.extend.width, value: newState.width } } };
      //   const _root = { ...store.root, state: { ...store.root.state, [props.key]: { ...store.root[props.key], ..._item } } };
      //   store.updateRoot(_root);
      // }
      //state:
      // size:
      // extend:
      // height:
      // max: 1000
      // min: 500
      // mode: "abs"
      // name: "Height"
      // unit: "px"
      // value: 1000
      // if (
      //   const _root = { ...store.root, state: { ...store.root.state, [props.key]: { ...store.root[props.key], ..._item } } };
      //   store.updateRoot(_root);
      // )
      return { ...state, ...newState };
    };

    app({
      init: state,
      view: ({ min, max, mode, width, height, minW, minH, maxW, maxH }: any) =>
        h('main', { class: 'p-1' }, [
          h('h5', { innerHTML: state.title, class: 'text-sm' }),
          tabComponent(
            {
              mode,
              onChange: (state: any, mode: any) => setState(state, { mode })
            },
            [
              {
                title: 'Random',
                key: 'rnd'
              },
              {
                title: 'Template',
                key: 'tmpl'
              },
              {
                title: 'Absolute',
                key: 'abs'
              }
            ]
          ),

          mode === 'rnd' &&
            h('div', { class: 'py-2' }, [
              h('div', {}, [
                h('h3', { class: 'text-xs pb-1', innerHTML: 'Width' }),
                h('div', { class: 'flex gap-x-2' }, [
                  h('div', { class: 'w-1/2' }, [
                    inputComponent(
                      {
                        name: 'Min',
                        value: minW,
                        oninput: (state: any, event: any) => {
                          const val = state.step ? parseFloat(event.target.value) : parseInt(event.target.value);
                          if (isNaN(val)) {
                            event.target.classList.add('input-error');
                            return state;
                          }
                          if (val > state.maxMax) {
                            event.target.classList.add('input-error');
                            return state;
                          }
                          if (val < state.minMin) {
                            event.target.classList.add('input-error');
                            return state;
                          }

                          event.target.classList.remove('input-error');
                          return setState(state, { minW: event.target.value });
                        }
                      },
                      {
                        min: state.minMin,
                        max: state.maxMax,
                        step: state.step
                      }
                    )
                  ]),
                  h('div', { class: 'w-1/2' }, [
                    inputComponent(
                      {
                        name: 'Max',
                        value: maxW,
                        oninput: (state: any, event: any) => {
                          const val = state.step ? parseFloat(event.target.value) : parseInt(event.target.value);
                          if (isNaN(val)) {
                            event.target.classList.add('input-error');
                            return state;
                          }
                          if (val > state.maxMax) {
                            event.target.classList.add('input-error');
                            return state;
                          }
                          if (val < state.minMin) {
                            event.target.classList.add('input-error');
                            return state;
                          }

                          event.target.classList.remove('input-error');
                          return setState(state, { maxW: val });
                        }
                      },
                      {
                        min: state.minMin,
                        max: state.maxMax,
                        step: state.step
                      }
                    )
                  ])
                ])
              ])
            ]),

          mode === 'abs' &&
            h('div', { class: 'py-2' }, [
              h('div', { class: 'flex gap-x-2' }, [
                h('div', { class: 'w-1/2' }, [
                  inputComponent(
                    {
                      name: 'Width',
                      value: width,
                      oninput: (state: any, event: any) => {
                        const val = state.step ? parseFloat(event.target.value) : parseInt(event.target.value);
                        if (isNaN(val)) {
                          event.target.classList.add('input-error');
                          return state;
                        }
                        if (val > state.maxMax) {
                          event.target.classList.add('input-error');
                          return state;
                        }
                        if (val < state.minMin) {
                          event.target.classList.add('input-error');
                          return state;
                        }

                        event.target.classList.remove('input-error');
                        return setState(state, { width: val });
                      }
                    },
                    {
                      min: state.minMin,
                      max: state.maxMax,
                      step: state.step
                    }
                  )
                ]),
                h('div', { class: 'w-1/2' }, [
                  inputComponent(
                    {
                      name: 'Height',
                      value: height,
                      oninput: (state: any, event: any) => {
                        const val = state.step ? parseFloat(event.target.value) : parseInt(event.target.value);
                        if (isNaN(val)) {
                          event.target.classList.add('input-error');
                          return state;
                        }
                        if (val > state.maxMax) {
                          event.target.classList.add('input-error');
                          return state;
                        }
                        if (val < state.minMin) {
                          event.target.classList.add('input-error');
                          return state;
                        }

                        event.target.classList.remove('input-error');
                        return setState(state, { height: val });
                      }
                    },
                    {
                      min: state.minMin,
                      max: state.maxMax,
                      step: state.step
                    }
                  )
                ])
              ])
            ]),

          mode === 'tmpl' &&
            h('div', { class: 'py-2' }, [
              h('select', { class: 'select select-bordered select-xs w-full max-w-xs' }, [...formats.map((fr) => h('option', { innerHTML: fr.label }))])
            ]),

          // result out
          h('div', { class: 'text-xs' }, [h('h5', { class: '', innerHTML: 'Current: ' }, [h('b', { class: '', innerHTML: `${width}x${height}` })])]),

          h('div', { class: 'divider my-0' })
        ]),
      node: refContainer
    });
    return () => {
      // todo destroy
    };
  });

  return <div ref={refContainer} className={'relative'} />;
};

const RootParameters = () => {
  const store = useStore();
  const entries = createMemo(() => Object.entries(store.root.state), [store.root.state]);
  return (
    <div style={{ color: '#999FA5' }} class={'cnttr'}>
      {entries().map((entry) => (
        <Parameter key={entry[0]} item={entry[1]} />
      ))}
    </div>
  );
};

const ParameterSide: Component = () => {
  const store = useStore();

  return (
    <aside id={'right'} class={'border-l border-l-base-300 select-none absolute z-20 w-250 h-full top-0 right-0'}>
      <div style={{ height: '95%' }} class={'text-sm overflow-scroll'}>
        <For each={store.assets.sort((a, b) => b.order - a.order)} fallback={<div />}>
          {(asset) => {
            const url = getUrl(asset);
            return (
              <Iframe
                style={{
                  display: store.activeAssetId === asset.asset?.id ? 'block' : 'none'
                }}
                url={`${url}?node=0&editor=1&view=1&hash=x014fCd6F6a11B0cCd3E6DC6BFc322e4E8a6b916bFBbFcDfa5dd4c5`}
                onLoad={(proxy) => {
                  store.updateAssetProxy(asset.asset?.id ?? 0, 'param', proxy);
                }}
              />
            );
          }}
        </For>
        {store.activeAssetId === -1 && store.assets.length ? <RootParameters /> : null}
      </div>
    </aside>
  );
};

export default ParameterSide;
