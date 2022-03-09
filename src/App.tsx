import type { Component } from 'solid-js';
import Main from './components/Main';
import { onMount } from 'solid-js';
import { useStore } from './store';
import { DEV_ASSET_URL } from './constants';

const App: Component = () => {
  const state = useStore();

  onMount(async () => {
    state.setAssets([{ url: DEV_ASSET_URL ?? 'http://localhost:8001' }]);
  });

  return <Main />;
};

export default App;
