import type { Component } from 'solid-js';
import { useStore } from '../../store';

const IS_ON_FRAME = window.parent !== window;

const Header: Component = () => {
  const state = useStore();

  return (
    <header class={'h-10 bg-dart2C flex justify-between items-center px-2'}>
      <div className={'w-1/3'} />
      <div className={'w-1/3 flex justify-center'}>
        {!IS_ON_FRAME ? (
          <button
            onClick={() => {
              state.generate(Math.random().toString());
            }}
            class={'outline-0 select-none text-black font-semibold hover:opacity-80 text-base cursor-pointer px-3 py-1 bg-white rounded-sm'}
          >
            Generate
          </button>
        ) : null}
      </div>
      <div className={'w-1/3 flex justify-end'} />
    </header>
  );
};

export default Header;
