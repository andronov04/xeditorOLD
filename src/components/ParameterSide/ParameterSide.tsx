import type { Component } from 'solid-js';
import { useStore } from '../../store';
import Iframe from '../Iframe/Iframe';
import { createEffect, createMemo, For, onMount } from 'solid-js';
import { getUrl } from '../../utils';
import { h, app } from 'hyperapp';
import { TEMPLATE_FORMATS } from '../../constants';

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

const Parameter = () => {
  const store = useStore();
  let refContainer: any;

  const state = {
    title: 'Size',
    helper: 'between',
    width: store.root.width.value,
    height: store.root.height.value,
    min: 800,
    max: 1200,
    minW: 800,
    maxW: 1200,
    minH: 800,
    maxH: 1200,
    minMin: 100,
    maxMax: 4000,
    tmplIdx: store.root.tmplIdx ?? 0,
    mode: store.root.sizeMode
  } as any;

  const setState = (state: any, newState: any) => {
    if (newState.tmplIdx) {
      const format = TEMPLATE_FORMATS[newState.tmplIdx];
      if (format) {
        const _root = {
          ...store.root,
          width: { ...store.root.width, value: format.width },
          height: { ...store.root.height, value: format.height }
        };
        store.updateRoot(_root);
      }
    }
    if (newState.mode) {
      const _root = { ...store.root };
      _root.sizeMode = newState.mode;
      store.updateRoot(_root);
    }
    if (newState.minW) {
      const _root = { ...store.root, width: { ...store.root.width, min: newState.minW } };
      store.updateRoot(_root);
    }
    if (newState.maxW) {
      const _root = { ...store.root, width: { ...store.root.width, max: newState.maxW } };
      store.updateRoot(_root);
    }
    if (newState.minH) {
      const _root = { ...store.root, height: { ...store.root.height, min: newState.minH } };
      store.updateRoot(_root);
    }
    if (newState.maxH) {
      const _root = { ...store.root, height: { ...store.root.height, max: newState.maxH } };
      store.updateRoot(_root);
    }
    if (newState.width) {
      const _root = { ...store.root, width: { ...store.root.width, value: newState.width } };
      store.updateRoot(_root);
    }
    if (newState.height) {
      const _root = { ...store.root, height: { ...store.root.height, value: newState.height } };
      store.updateRoot(_root);
    }
    return { ...state, ...newState };
  };

  createEffect(() => {
    const doc = document.querySelector('#result_size');
    if (doc) {
      (doc as HTMLElement).innerHTML = `${store.root.width.value}x${store.root.height.value}`;
    }
    state.width = store.root.width.value;
    state.height = store.root.height.value;
    setState(state, { width: store.root.width.value, height: store.root.height.value });
  });

  const preSetState = () => {
    return {
      width: store.root.width.value,
      height: store.root.height.value
    };
  };

  onMount(() => {
    // IT's very bad bad, rewrite

    app({
      init: state,
      view: ({ tmplIdx, mode, width, height, minW, minH, maxW, maxH }: any) =>
        h('main', { class: 'p-1' }, [
          h('h5', { innerHTML: state.title, class: 'text-sm' }),
          tabComponent(
            {
              mode,
              onChange: (state: any, mode: any) => {
                const st = preSetState();
                return setState(state, { mode, ...st });
              }
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
                          event.preventDefault();
                          event.stopPropagation();
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
                          return setState(state, { minW: val });
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
              ]),
              h('div', {}, [
                h('h3', { class: 'text-xs pb-1 pt-1', innerHTML: 'Height' }),
                h('div', { class: 'flex gap-x-2' }, [
                  h('div', { class: 'w-1/2' }, [
                    inputComponent(
                      {
                        name: 'Min',
                        value: minH,
                        oninput: (state: any, event: any) => {
                          event.preventDefault();
                          event.stopPropagation();
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
                          return setState(state, { minH: val });
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
                        value: maxH,
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
                          return setState(state, { maxH: val });
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
              h(
                'select',
                {
                  class: 'select select-bordered select-xs w-full max-w-xs',
                  onchange: (state, e) => {
                    return setState(state, { tmplIdx: (e.target as HTMLSelectElement).value });
                  }
                },
                [
                  h('option', { selected: false, value: -1, innerHTML: 'Current Format' }),
                  ...TEMPLATE_FORMATS.map((fr, i) =>
                    h('option', {
                      value: i,
                      selected: i == tmplIdx,
                      innerHTML: fr.label
                    })
                  )
                ]
              )
            ]),

          // result out
          h('div', { class: 'text-xs' }, [h('h5', { class: '', innerHTML: 'Current: ' }, [h('b', { id: 'result_size', innerHTML: `${width}x${height}` })])]),

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
  return (
    <div style={{ color: '#999FA5' }} class={'cnttr'}>
      <Parameter />
    </div>
  );
};

const ParameterSide: Component = () => {
  const store = useStore();

  return (
    <aside id={'right'} class={'border-l border-l-base-300 bg-base-100 select-none absolute z-20 w-250 h-full top-0 right-0'}>
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
