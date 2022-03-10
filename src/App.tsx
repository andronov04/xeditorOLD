import type { Component } from 'solid-js';
import Main from './components/Main';
import { onMount } from 'solid-js';
import { useStore } from './store';
import { DEV_ASSET_URL } from './constants';

const App: Component = () => {
  const state = useStore();

  onMount(async () => {
    const test_metadata = {
      name: 'Suprematism'
    };
    state.setAssets([
      {
        url: DEV_ASSET_URL ?? 'http://localhost:8001',
        metadata: test_metadata
      }
    ]);
  });

  return <Main />;
};

export default App;
