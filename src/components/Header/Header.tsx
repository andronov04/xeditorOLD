import type { Component } from 'solid-js';
import { useStore } from '../../store';
import { DEV_ASSET_URL, DEV_HEADER } from '../../constants';

const IS_ON_FRAME = window.parent !== window;

const Header: Component = () => {
  const store = useStore();

  return (
    <header id={'header'} class={'h-7 border-b border-b-dark4A bg-dark29 flex justify-between items-center'}>
      <div className={'w-1/3'} />
      <div className={'w-1/3 flex gap-x-3 justify-center'}>
        {(!IS_ON_FRAME || DEV_HEADER) && store.assets.length ? (
          <button
            onClick={store.generate}
            class={'outline-0 select-none text-black font-400 hover:opacity-80 text-smm cursor-pointer px-1.5 py-0.5 bg-white rounded-sm'}
          >
            Generate
          </button>
        ) : null}
        {(!IS_ON_FRAME || DEV_HEADER) && store.assets.length ? (
          <button
            onClick={store.preview}
            class={'outline-0 select-none text-black font-400 hover:opacity-80 text-smm cursor-pointer px-1.5 py-0.5 bg-white rounded-sm'}
          >
            Repeat
          </button>
        ) : null}
        {(!IS_ON_FRAME || DEV_HEADER) && DEV_ASSET_URL && store.assets.length ? (
          <button
            onClick={store.capture}
            class={'outline-0 select-none text-black font-400 hover:opacity-80 text-smm cursor-pointer px-1.5 py-0.5 bg-white rounded-sm'}
          >
            Capture
          </button>
        ) : null}
      </div>
      <div className={'w-1/3 flex justify-end'}>{store.assets.length ? <div className={'px-2 text-xss'}>{Math.floor(store.scale * 100)}%</div> : null}</div>
    </header>
  );
};

export default Header;
