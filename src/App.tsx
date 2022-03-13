import type { Component } from 'solid-js';
import Main from './components/Main';
import { onMount } from 'solid-js';
import { useStore } from './store';
import { MESSAGE_GENERATE_NEW, MESSAGE_GET_ASSET_META, MESSAGE_GET_DIGEST, MESSAGE_SEND_ASSET } from './constants';
import { dataDigest } from './digest';
import { deepCopy } from './utils';

const App: Component = () => {
  const state = useStore();

  onMount(async () => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.data?.type === MESSAGE_SEND_ASSET) {
          state.setAssets(event.data.data);
        } else if (event.data?.type === MESSAGE_GENERATE_NEW) {
          state.generate(event.data.data.requestId);
        } else if (event.data?.type === MESSAGE_GET_ASSET_META) {
          const meta = {
            digest: event.data.data.digest,
            hash: event.data.data.hash
          };
          state.updateAssetMeta(event.data.data.url, meta);

          // TODO generate digest
          // TODO Check how to works with many
          // console.log('data', event.data.data);
          dataDigest(deepCopy(state.assets)).then((data) => {
            // console.log('dataDigest-data', data);
            window.parent.window.postMessage(
              {
                type: MESSAGE_GET_DIGEST,
                requestId: event.data.requestId,
                data: data
              },
              document.referrer
            );
          });
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
