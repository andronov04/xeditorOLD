import type { Component } from 'solid-js';
import Main from './components/Main';
import { onMount } from 'solid-js';
import { useStore } from './store';
import { DEV_ASSET_URL } from './constants';

const App: Component = () => {
  const state = useStore();

  onMount(async () => {
    const temp_url = 'https://crxatorz.mypinata.cloud/ipfs/QmZhrQ4pwkCZSaHMpJLU6Mt1tfkRHFCoawx19ym9w544Bt';
    // Use from postData
    state.setAssets([{ url: temp_url ?? DEV_ASSET_URL ?? 'http://localhost:8001' }]);
  });

  return <Main />;
};

export default App;
