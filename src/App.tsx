import type { Component } from 'solid-js';
import Main from './components/Main';
import { onMount } from 'solid-js';
import { useStore } from './store';
import {
  DEV_ASSET_URL,
  RESPONSE_PREPARE,
  USE_ADD_ASSET,
  USE_ADD_NODE_STATE,
  USE_ADD_PARAM_STATE,
  USE_CHANGE_PARAM_STATE,
  USE_COMPLETE_CAPTURE,
  USE_PREPARE,
  USE_PROXY_TARGET,
  USE_REMOVE_ASSET,
  USE_REQUEST_CAPTURE,
  USE_REQUEST_CHANGE_NODE_CMD,
  USE_SET_NODE, USE_SET_PARAM,
  USE_SET_THEME,
  USE_UPDATE_HASH
} from './constants';
import { debounce, deepCopy, digest, getUrl, postData } from './utils';
import { nanoid } from 'nanoid';
import { EType } from './types';

const setDigest = (requestId?: string) => {
  useStore.getState().assets.forEach((asset) => {
    asset.proxies?.asset()?.postMessage(
      {
        type: USE_PREPARE,
        requestId: requestId ?? nanoid(),
        assetId: asset.asset?.id
      },
      getUrl(asset)
    );
  });
};

const setDigestBounce = debounce(setDigest, 2000);

const App: Component = () => {
  const store = useStore();

  onMount(async () => {
    const theme = localStorage.getItem('theme') ?? 'dark';
    store.setTheme(theme);

    window.addEventListener(
      'message',
      async (event) => {
        // new
        switch (event.data?.type) {
          case USE_PROXY_TARGET: {
            const asset = useStore.getState().assets.find((a) => a && getUrl(a)?.includes(event.origin));
            if (!asset) {
              break;
            }
            (event.data.target as EType[]).map((target) => {
              if (target === EType.ASSET) {
                asset.proxies?.asset()?.postMessage(event.data.data, event.origin);
              }
              if (target === EType.NODES) {
                asset.proxies?.node()?.postMessage(event.data.data, event.origin);
              }
              if (target === EType.PARAMS) {
                asset.proxies?.param()?.postMessage(event.data.data, event.origin);
              }
            });
            if ([USE_SET_NODE, USE_SET_PARAM].includes(event.data.data.type)) {
              setDigestBounce();
            }
            break;
          }
        }
        if (event.data.type === RESPONSE_PREPARE) {
          // // TODO WAIT ALL
          const responseValue = store.assets.map((a) => {
            return {
              id: a.asset?.id,
              order: a.order,
              data: {
                digest: event.data.data.digest,
                hash: event.data.data.hash,
                valueState: event.data.data.valueState
              }
            };
          });
          const responseState = store.assets.map((a) => {
            return {
              id: a.asset?.id,
              order: a.order,
              data: {
                digest: event.data.data.digest,
                hash: event.data.data.hash,
                state: event.data.data.state
              }
            };
          });

          // TODO Check sort good
          const valueState = {
            assets: responseValue,
            root: {
              width: useStore.getState().root.width.value,
              height: useStore.getState().root.height.value
            }
          };
          const digestId = await digest(JSON.stringify(valueState));
          // window.parent.window.postMessage(
          //   {
          //     type: event.data.type,
          //     requestId: event.data.requestId,
          //     data: {
          //       state: {
          //         assets: responseState,
          //         root: {
          //           width: useStore.getState().root.width.value,
          //           height: useStore.getState().root.height.value
          //         }
          //       },
          //       valueState,
          //       digest: digestId
          //     }
          //   },
          //   document.referrer
          // );

          useStore.getState().setDigest(digestId);
        }

        // if (event.data.type === USE_PREPARE) {
        //   // Get store and digest and hashes from assets;
        //   // TODO WAIT ALL
        //   setDigest(event.data.requestId);
        //   // store.assets.forEach((asset) => {
        //   //   asset.proxies?.asset()?.postMessage(
        //   //     {
        //   //       type: event.data.type,
        //   //       requestId: event.data.requestId,
        //   //       assetId: asset.asset?.id
        //   //     },
        //   //     getUrl(asset)
        //   //   );
        //   // });
        // }
        // // if (event.data.type === USE_SET_THEME) {
        // //   console.log('USE_SET_THEME::', event.data);
        // //   store.setTheme(event.data.data.theme);
        // // }
        //
        // if (event.data.type === USE_COMPLETE_CAPTURE) {
        //   // send to web3, parent
        //   console.log('USE_COMPLETE_CAPTURE::', event.data);
        // }
        // if (event.data.type === USE_CHANGE_PARAM_STATE) {
        //   // TODO Use correct asset
        //   // console.log('USE_CHANGE_PARAM_STATE:::', event.data);
        //   store.assets[0]?.proxies?.asset()?.postMessage(event.data, event.origin);
        // }
        // if (event.data.type === USE_ADD_NODE_STATE) {
        //   // console.log('EDITOR:::', event.data);
        //   // TODO Use correct asset
        //   store.assets[0]?.proxies?.node()?.postMessage(event.data, event.origin);
        //   store.assets[0]?.proxies?.param()?.postMessage(event.data, event.origin);
        //
        //   // after last get node, time get digest
        //   setDigestBounce();
        // }
        // if (event.data.type === USE_ADD_PARAM_STATE) {
        //   // TODO Use correct asset
        //   store.assets[0]?.proxies?.param()?.postMessage(event.data, event.origin);
        //
        //   // after last get param, time get digest
        //   setDigestBounce();
        // }
        // if (event.data.type === USE_REQUEST_CHANGE_NODE_CMD) {
        //   const assetId = useStore.getState().assets.find((a) => a && getUrl(a)?.includes(event.origin))?.asset?.id ?? -1;
        //   useStore.getState().setActiveAssetId(assetId);
        //   // TODO Use correct asset
        //   store.assets[0]?.proxies?.param()?.postMessage(event.data, event.origin);
        //   store.assets[0]?.proxies?.node()?.postMessage(event.data, event.origin);
        // }
        // if (event.data?.type === USE_ADD_ASSET) {
        //   // Add Asset
        //   const asset = {
        //     asset: event.data.data,
        //     order: 1
        //   };
        //   store.addAsset(asset);
        // }
        // if (event.data?.type === USE_REMOVE_ASSET) {
        //   // remove Asset
        //   store.removeAsset(event.data.data.assetId);
        // }
        // if (event.data?.type === USE_UPDATE_HASH) {
        //   // TODO Use correct asset // USE targers
        //   store.assets[0]?.proxies?.param()?.postMessage(event.data, event.origin);
        //   store.assets[0]?.proxies?.node()?.postMessage(event.data, event.origin);
        // }
        // // if (event.data?.type === MESSAGE_SEND_ASSET) {
        // //   state.setAssets(event.data.data);
        // // } else if (event.data?.type === MESSAGE_GENERATE_NEW) {
        // //   state.generate(event.data.data.requestId);
        // // } else if (event.data?.type === MESSAGE_GET_ASSET_META) {
        // //   const meta = {
        // //     digest: event.data.data.digest,
        // //     hash: event.data.data.hash
        // //   };
        // //   state.updateAssetMeta(event.data.data.url, meta);
        // //
        // //   // TODO generate digest
        // //   // TODO Check how to works with many
        // //   // console.log('data', event.data.data);
        // //   dataDigest(deepCopy(state.assets)).then((data) => {
        // //     // console.log('dataDigest-data', data);
        // //     postData(MESSAGE_GET_DIGEST, event.data.requestId, data);
        // //   });
        // // }
      },
      false
    );
    if (DEV_ASSET_URL) {
      setTimeout(() => {
        const test_metadata = {
          name: 'Suprematism',
          artifactUri: DEV_ASSET_URL ?? 'http://localhost:8001'
        };
        store.addAsset({
          asset: {
            id: 1,
            name: 'Suprematism',
            metadata: test_metadata
          },
          order: 1
        });
      }, 500);
    }
  });

  return <Main />;
};

export default App;
