import type { Component } from 'solid-js';
import { useStore } from '../../store';
import Iframe from '../Iframe/Iframe';
import { createMemo, For } from 'solid-js';
import { getUrl } from '../../utils';

interface IParameterInput {
  value: string | number;
  name?: string;
  style?: any;
}

const ParameterInput = (props: IParameterInput) => {
  return (
    <label className={'bg-dart2C'} style={{ width: '50%', 'border-radius': '0.125rem', ...props.style }}>
      <span>{props.name ?? 'Value'}</span>
      <input type="number" value={props.value} />
    </label>
  );
};

const Parameter = (props: { item: any; key: string }) => {
  const store = useStore();
  const item = createMemo(() => store.root.state[props.key], store.root.state[props.key]);
  const mode = createMemo(() => item().mode, [item().mode]);

  const navs = [
    {
      key: 'random',
      name: 'Random',
      active: mode() === 'rnd',
      code: 'rnd',
      onChange: () => {
        const _item = { ...item(), mode: 'rnd' };
        const _root = { ...store.root, state: { ...store.root.state, [props.key]: { ...store.root[props.key], ..._item } } };
        store.updateRoot(_root);
      }
    },
    {
      key: 'template',
      name: 'Template',
      active: mode() === 'tmpl',
      code: 'tmpl',
      onChange: () => {
        const _item = { ...item(), mode: 'tmpl' };
        const _root = { ...store.root, state: { ...store.root.state, [props.key]: { ...store.root[props.key], ..._item } } };
        store.updateRoot(_root);
      }
    },
    {
      key: 'absolute',
      name: 'Absolute',
      active: mode() === 'abs',
      code: 'abs',
      onChange: () => {
        const _item = { ...item(), mode: 'abs' };
        const _root = { ...store.root, state: { ...store.root.state, [props.key]: { ...store.root[props.key], ..._item } } };
        store.updateRoot(_root);
      }
    }
  ];

  return (
    <div className={'p-[5px] item border-b border-b-dark4A'}>
      <header>
        <h2>{item().name}</h2>
        <nav className={'nav'}>
          {navs.map((nav: any) => {
            const active = mode() === nav.code;
            return (
              <>
                <div onClick={nav.onChange} class={`nav__item ${active ? 'active' : ''}`} style="width: 50%;">
                  {nav.name}
                </div>
              </>
            );
          })}
        </nav>
      </header>
      <main>
        <div
          className={`${mode() === 'rnd' ? 'flex' : 'hidden'} ${
            mode() === 'rnd' && Object.keys(item().extend ?? {}).length ? 'flex-col' : ''
          } controls gap-y-1 active`}
        >
          {Object.keys(item().extend ?? {}).map((key) => (
            <div className={'flex gap-x-4'}>
              <ParameterInput name={`Min ${item().extend[key].name.slice(0, 1)}`} value={item().extend[key].min} />
              <ParameterInput name={`Max ${item().extend[key].name.slice(0, 1)}`} value={item().extend[key].max} />
            </div>
          ))}
        </div>
        <div
          className={`${mode() === 'tmpl' ? 'flex' : 'hidden'} ${
            mode() === 'tmpl' && Object.keys(item().extend ?? {}).length ? 'flex-col' : ''
          } controls gap-y-1 active`}
        >
          <select
            style={{ display: 'block' }}
            className="form-select form-select-sm
      appearance-none
      block
      w-full
      px-2
      py-1
      text-sm
      font-normal
      text-dark99
      bg-dart2C bg-clip-padding bg-no-repeat
      rounded-sm
      cursor-pointer
      transition
      ease-in-out
      m-0
      focus:bg-dark41 focus:outline-none"
            aria-label="Default select example"
          >
            {item().select?.map((sel: any) => (
              <option value={`${sel.value}`}>{sel.label}</option>
            ))}
          </select>
        </div>
        <div
          className={`${mode() === 'abs' ? 'flex' : 'hidden'} ${
            mode() === 'abs' && Object.keys(item().extend ?? {}).length ? 'flex-col' : ''
          } controls gap-y-1 active`}
        >
          {Object.keys(item().extend ?? {}).map((key) => (
            <ParameterInput name={item().extend[key].name} value={item().extend[key].value} />
          ))}
        </div>
      </main>
      <footer
        style={{
          padding: '0.2rem 0rem',
          'font-size': '0.7rem',
          'line-height': '1rem'
        }}
      >
        <span>
          Current:{' '}
          <b>
            {item().extend ? (
              <>
                {Object.values(item().extend ?? {})
                  .map((a: any) => a.value)
                  .join('x')}
              </>
            ) : (
              <>
                {item().value}
                {item().unit}
              </>
            )}
          </b>
        </span>
      </footer>
    </div>
  );
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
    <aside id={'right'} class={'border-l border-l-dark4A select-none absolute bg-dark21 z-20 w-250 h-full top-0 right-0'}>
      <div style={{ height: '95%' }} class={'text-sm overflow-scroll'}>
        <For each={store.assets.sort((a, b) => b.order - a.order)} fallback={<div />}>
          {(asset) => {
            const url = getUrl(asset);
            return (
              <Iframe
                style={{
                  display: store.activeAssetId === asset.asset?.id ? 'block' : 'none'
                }}
                url={`${url}?node=0&editor=1&view=1&xhash=x014fCd6F6a11B0cCd3E6DC6BFc322e4E8a6b916bFBbFcDfa5dd4c5`}
                onLoad={(proxy) => {
                  store.updateAssetProxy(asset.asset?.id ?? 0, 'param', proxy);
                }}
              />
            );
          }}
        </For>
        {store.activeAssetId === -1 ? <RootParameters /> : null}
      </div>
    </aside>
  );
};

export default ParameterSide;
