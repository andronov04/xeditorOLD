import type { Component } from 'solid-js';
import { useStore } from '../../store';
import { onMount } from 'solid-js';

const Header: Component = () => {
  const state = useStore();

  onMount(async () => {
    document.addEventListener('keyup', (event) => {
      if (event.code === 'Space') {
        state.generate();
      }
    });
  });

  return (
    <header>
      <button
        onClick={() => {
          state.generate();
        }}
        class={'absolute outline-0 left-1/2 transform -translate-x-1/2 hover:opacity-80 text-base cursor-pointer z-30 top-2 px-3 py-1 bg-dart2C rounded-sm'}
      >
        Generate
      </button>
    </header>
  );
};

export default Header;
