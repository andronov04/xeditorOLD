import type { Component } from 'solid-js';
import { For, onMount } from 'solid-js';
import { useStore } from '../../store';
import { deepCopy } from '../../utils';
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
      <For each={state.assets} fallback={<p>Loading...</p>}>
        {(asset) => {
          if (!asset.data) {
            // Only once
            window.addEventListener(
              'message',
              (event) => {
                if (![MESSAGE_SEND_TO_DATA].includes(event.data?.type)) {
                  return;
                }
                // console.log('event.data: ', event.data);
                if (asset.data) {
                  // TODO Why?
                  state.updateAsset({ url: asset.url, data: { ...asset.data, values: event.data.data.values }, hash: asset.hash });
                } else if (event.data.data) {
                  state.updateAsset({ url: asset.url, data: event.data.data, hash: asset.hash });
                }
              },
              false
            );
          }
          console.log('asset: ', asset);

          return (
            <div
              style={{
                width: `${asset.data?.values?.width ?? DEFAULT_WIDTH}px`,
                height: `${asset.data?.values?.height ?? DEFAULT_HEIGHT}px`
              }}
              class={'iframe_container'}
            >
              <iframe
                width={'100%'}
                height={'100%'}
                src={`${asset.url}?editor=1&data=${asset.data ? 1 : 0}${asset.hash ? `&test=${asset.hash}` : ''}`}
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
                      asset.url
                    );
                  }
                  // console.log('load frame')
                }}
                sandbox={'allow-same-origin allow-scripts'}
              />
            </div>
          );
        }}
      </For>
    </section>
  );
};

export default Content;
