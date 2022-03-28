import type { Component } from 'solid-js';
import { useStore } from '../../store';

const IS_ON_FRAME = window.parent !== window;

const Header: Component = () => {
  const store = useStore();

  return (
    <header id={'header'} class={'h-7 border-b border-b-dark4A bg-dart2C flex justify-between items-center'}>
      <div className={'w-1/3'} />
      <div className={'w-1/3 flex gap-x-3 justify-center'}>
        {!IS_ON_FRAME ? (
          <button
            onClick={store.generate}
            class={'outline-0 select-none text-black font-400 hover:opacity-80 text-smm cursor-pointer px-1.5 py-0.5 bg-white rounded-sm'}
          >
            Generate
          </button>
        ) : null}
        {!IS_ON_FRAME ? (
          <button
            onClick={store.preview}
            class={'outline-0 select-none text-black font-400 hover:opacity-80 text-smm cursor-pointer px-1.5 py-0.5 bg-white rounded-sm'}
          >
            Repeat
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
