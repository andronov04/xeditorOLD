import type { Component } from 'solid-js';
import { For, onMount } from 'solid-js';
import { useStore } from '../../store';
import { deepCopy, getUrl } from '../../utils';
import { MESSAGE_SEND_DATA, MESSAGE_SEND_TO_DATA } from '../../constants';

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;
const DEFAULT_PADDING = 100;

const Content: Component = () => {
  const state = useStore();
  const designWidth = state.root?.values.width ?? DEFAULT_WIDTH;
  const designHeight = state.root?.values.height ?? DEFAULT_HEIGHT;

  onMount(async () => {
    const header = document.getElementById('header')?.getBoundingClientRect();
    const left = document.getElementById('left')?.getBoundingClientRect();
    const right = document.getElementById('left')?.getBoundingClientRect();
    const container = document.getElementById('container')?.getBoundingClientRect();
    // Calculate viewport
    // and good scaling
    if (header && left && right && container) {
      const width = container.width - right.width - left.width;
      const height = container.height - header.height;
      const minSize = Math.min(width, height);
      const maxSize = Math.max(designWidth, designHeight);
      state.setScale(minSize / (maxSize + DEFAULT_PADDING));
    }
  });
  // width: `${asset.data?.values?.width ?? DEFAULT_WIDTH}px`,
  // height: `${asset.data?.values?.height ?? DEFAULT_HEIGHT}px`

  return (
    <section id={'container'} class={'absolute w-full h-full z-10 flex justify-center items-center'}>
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
                width: `${designWidth}px`,
                height: `${designHeight}px`,
                transform: `scale(${state.scale})`
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
                          type: MESSAGE_SEND_DATA,
                          requestId: asset.requestId ?? 'initial',
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
