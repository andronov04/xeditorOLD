import type { Component } from 'solid-js';
import { useStore } from '../../store';
import { USE_GENERATE } from '../../constants';
import { getUrl } from '../../utils';

const IS_ON_FRAME = window.parent !== window;

const Header: Component = () => {
  const store = useStore();

  return (
    <header id={'header'} class={'h-8 bg-dart2C flex justify-between items-center'}>
      <div className={'w-1/3'} />
      <div className={'w-1/3 flex justify-center'}>
        {!IS_ON_FRAME ? (
          <button
            onClick={() => {
              // state.generate(Math.random().toString());
              // TODO Use correct asset
              store.assets[0]?.proxies?.asset()?.postMessage({ type: USE_GENERATE }, getUrl(store.assets[0]));
            }}
            class={'outline-0 select-none text-black font-semibold hover:opacity-80 text-sm cursor-pointer px-2 py-0.5 bg-white rounded-sm'}
          >
            Generate
          </button>
        ) : null}
      </div>
      <div className={'w-1/3 flex justify-end'}>
        <div className={'px-2 text-xss'}>{Math.floor(store.scale * 100)}%</div>
      </div>
    </header>
  );
};

export default Header;
