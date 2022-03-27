import type { Component } from 'solid-js';
import { createEffect, For } from 'solid-js';
import { useStore } from '../../store';
import ContentIframe from './ContentIframe/ContentIframe';

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;
const DEFAULT_PADDING = 100;

const Content: Component = () => {
  const store = useStore();

  createEffect(async () => {
    const designWidth = store.root.state?.width?.value ?? DEFAULT_WIDTH;
    const designHeight = store.root.state?.height?.value ?? DEFAULT_HEIGHT;
    const header = document.getElementById('header')?.getBoundingClientRect();
    const left = document.getElementById('left')?.getBoundingClientRect();
    const right = document.getElementById('left')?.getBoundingClientRect();
    const container = document.getElementById('container')?.getBoundingClientRect();
    // Calculate viewport and good scaling
    if (header && left && right && container) {
      const width = container.width - right.width - left.width;
      const height = container.height - header.height;
      const minSize = Math.min(width, height);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const maxSize = Math.max(designWidth, designHeight);
      const scale = minSize / (maxSize + DEFAULT_PADDING);
      store.setScale(scale);
    }
  }, [store.root.state.width.value, store.root.state.height.value]);

  return (
    <section id={'container'} class={'absolute w-full h-full z-10 flex justify-center items-center'}>
      <For each={store.assets.sort((a, b) => b.order - a.order)} fallback={<p>Loading...</p>}>
        {(asset) => {
          return <ContentIframe asset={asset} />;
        }}
      </For>
    </section>
  );
};

export default Content;
