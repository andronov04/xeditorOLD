import type { Component } from 'solid-js';
import { useStore } from '../../store';
import { DEV_ASSET_URL, DEV_HEADER } from '../../constants';

const IS_ON_FRAME = window.parent !== window;

const Header: Component = () => {
  const store = useStore();

  return (
    <header id={'header'} class={'h-8 border-b border-b-base-300 flex justify-between items-center'}>
      <div className={'w-1/3'} />
      <div className={'w-1/3 flex gap-x-3 justify-center'}>
        {(!IS_ON_FRAME || DEV_HEADER) && store.assets.length ? (
          <button onClick={store.generate} class={'btn btn-xs'}>
            Generate
          </button>
        ) : null}
        {(!IS_ON_FRAME || DEV_HEADER) && store.assets.length ? (
          <button onClick={store.preview} class={'btn btn-xs'}>
            Repeat
          </button>
        ) : null}
        {(!IS_ON_FRAME || DEV_HEADER) && DEV_ASSET_URL && store.assets.length ? (
          <button onClick={store.capture} class={'btn btn-xs'}>
            Capture
          </button>
        ) : null}
      </div>
      <div className={'w-1/3 flex justify-end items-center'}>
        <div>{store.assets.length ? <div className={'px-2 text-xss'}>{Math.floor(store.scale * 100)}%</div> : null}</div>
      </div>
    </header>
  );
};

export default Header;
