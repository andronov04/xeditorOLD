import type { Component } from 'solid-js';
import { For, onMount } from 'solid-js';
import { useStore } from '../../store';
import { deepCopy, getUrl } from '../../utils';
import { MESSAGE_SEND_TO_DATA } from '../../constants';

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 400;

const Content: Component = () => {
  const state = useStore();

  onMount(async () => {
    /**/
  });

  return (
    <section class={'absolute w-full h-full z-10 flex justify-center items-center'}>
      <For each={state.assets.sort((a, b) => b.order - a.order)} fallback={<p>Loading...</p>}>
        {(asset) => {
          // console.log('asset', asset);
          const initRequestId = `initial_${asset?.asset?.id}`;
          const url = getUrl(asset);
          if (!asset.data) {
            // Only once
            window.addEventListener(
              'message',
              (event) => {
                if (event.data?.type === MESSAGE_SEND_TO_DATA) {
                  if (asset.data) {
                    // TODO Why?
                    state.updateAsset({ ...asset, data: { ...asset.data, values: event.data.data.values } });
                  } else if (event.data.data) {
                    state.updateAsset({ ...asset, data: event.data.data, requestId: initRequestId });
                  }
                }
              },
              false
            );
          }

          return (
            <div
              style={{
                width: `${asset.data?.values?.width ?? DEFAULT_WIDTH}px`,
                height: `${asset.data?.values?.height ?? DEFAULT_HEIGHT}px`
              }}
              class={'iframe_container'}
            >
              {url ? (
                <iframe
                  width={'100%'}
                  height={'100%'}
                  src={`${url}?editor=1&data=${asset.data ? 1 : 0}&requestId=${asset.requestId ?? 'initial'}`}
                  class={'iframe'}
                  onLoad={(e) => {
                    // TODO Patch store
                    console.log('asset-onLoad', asset);

                    if (asset.data) {
                      // TODO Cache use {id:params}
                      // const data = deepCopy(asset.data);
                      // const dictionary: any = { id: data.params };
                      // console.log('dictionary', dictionary);
                      e.currentTarget.contentWindow?.postMessage(
                        {
                          type: 'X_SEND_DATA',
                          data: deepCopy(asset.data)
                        },
                        url
                      );
                    }
                  }}
                  sandbox={'allow-same-origin allow-scripts'}
                />
              ) : null}
            </div>
          );
        }}
      </For>
    </section>
  );
};

export default Content;
