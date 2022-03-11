import type { Component } from 'solid-js';
import Main from './components/Main';
import { onMount } from 'solid-js';
import { useStore } from './store';
import { MESSAGE_GENERATE_NEW, MESSAGE_GET_ASSET_META, MESSAGE_SEND_ASSET } from './constants';

const App: Component = () => {
  const state = useStore();

  onMount(async () => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.data?.type === MESSAGE_SEND_ASSET) {
          state.setAssets(event.data.data);
        } else if (event.data?.type === MESSAGE_GENERATE_NEW) {
          state.generate();
        } else if (event.data?.type === MESSAGE_GET_ASSET_META) {
          window.parent.window.postMessage(
            {
              type: MESSAGE_GET_ASSET_META,
              data: event.data.data
            },
            document.referrer
          );
        }
      },
      false
    );
    // const test_metadata = {
    //   name: 'Suprematism'
    // };
    // state.setAssets([
    //   {
    //     url: DEV_ASSET_URL ?? 'http://localhost:8001',
    //     metadata: test_metadata
    //   }
    // ]);
  });

  return <Main />;
};

export default App;
