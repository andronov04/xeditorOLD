import type { Component } from 'solid-js';
import Main from './components/Main';
import { onMount } from 'solid-js';
import { useStore } from './store';
import { DEV_ASSET_URL, USE_ADD_NODE_STATE, USE_ADD_PARAM_STATE, USE_CHANGE_PARAM_STATE, USE_REQUEST_CHANGE_NODE_CMD } from './constants';
import { dataDigest } from './digest';
import { deepCopy, getUrl, postData } from './utils';

const App: Component = () => {
  const store = useStore();

  onMount(async () => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.data.type === USE_CHANGE_PARAM_STATE) {
          // TODO Use correct asset
          // console.log('USE_CHANGE_PARAM_STATE:::', event.data);
          store.assets[0]?.proxies?.asset()?.postMessage(event.data, event.origin);
        }
        if (event.data.type === USE_ADD_NODE_STATE) {
          // console.log('EDITOR:::', event.data);
          // TODO Use correct asset
          store.assets[0]?.proxies?.node()?.postMessage(event.data, event.origin);
          store.assets[0]?.proxies?.param()?.postMessage(event.data, event.origin);
        }
        if (event.data.type === USE_ADD_PARAM_STATE) {
          // TODO Use correct asset
          store.assets[0]?.proxies?.param()?.postMessage(event.data, event.origin);
        }
        if (event.data.type === USE_REQUEST_CHANGE_NODE_CMD) {
          const assetId = useStore.getState().assets.find((a) => a && getUrl(a)?.includes(event.origin))?.asset?.id ?? -1;
          useStore.getState().setActiveAssetId(assetId);
          // TODO Use correct asset
          store.assets[0]?.proxies?.param()?.postMessage(event.data, event.origin);
          store.assets[0]?.proxies?.node()?.postMessage(event.data, event.origin);
        }
        // if (event.data?.type === MESSAGE_SEND_ASSET) {
        //   state.setAssets(event.data.data);
        // } else if (event.data?.type === MESSAGE_GENERATE_NEW) {
        //   state.generate(event.data.data.requestId);
        // } else if (event.data?.type === MESSAGE_GET_ASSET_META) {
        //   const meta = {
        //     digest: event.data.data.digest,
        //     hash: event.data.data.hash
        //   };
        //   state.updateAssetMeta(event.data.data.url, meta);
        //
        //   // TODO generate digest
        //   // TODO Check how to works with many
        //   // console.log('data', event.data.data);
        //   dataDigest(deepCopy(state.assets)).then((data) => {
        //     // console.log('dataDigest-data', data);
        //     postData(MESSAGE_GET_DIGEST, event.data.requestId, data);
        //   });
        // }
      },
      false
    );
    if (DEV_ASSET_URL) {
      setTimeout(() => {
        const test_metadata = {
          name: 'Suprematism',
          artifactUri: DEV_ASSET_URL ?? 'http://localhost:8001'
        };
        store.setAssets([
          {
            asset: {
              id: 1,
              name: 'Suprematism',
              metadata: test_metadata
            },
            order: 1
          }
        ]);
      }, 500);
    }
  });

  return <Main />;
};

export default App;
