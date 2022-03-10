import type { Component } from 'solid-js';
import { useStore } from '../../store';

const IS_ON_FRAME = window.parent !== window;

const Header: Component = () => {
  const state = useStore();

  return (
    <header>
      {!IS_ON_FRAME ? (
        <button
          onClick={() => {
            state.generate();
          }}
          class={'absolute outline-0 left-1/2 transform -translate-x-1/2 hover:opacity-80 text-base cursor-pointer z-30 top-2 px-3 py-1 bg-dart2C rounded-sm'}
        >
          Generate
        </button>
      ) : null}
    </header>
  );
};

export default Header;
