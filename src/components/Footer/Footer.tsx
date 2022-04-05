import type { Component } from 'solid-js';
import { useStore } from '../../store';
import { THEMES } from '../../constants';

const Footer: Component = () => {
  const store = useStore();

  return (
    <footer id={'header'} class={'px-2 h-5 overflow-hidden border-t border-t-base-300 w-full border-b border-b-base-300 flex justify-between items-center'}>
      <div className={'text-xsss'}>
        {!store.digest && store.assets.length ? <span class="animate-ping inline-flex h-1 w-1 rounded-full bg-primary opacity-75" /> : null}
        {store.digest && store.assets.length ? <p>{store.digest}</p> : null}
      </div>
      <div style={{ width: '100px' }} className={'overflow-hidden'}>
        <select
          onChange={(e) => {
            store.setTheme((e.target as HTMLSelectElement).value);
          }}
          class="select font-medium opacity-50 text-right select-xs text-xsss select-ghost outline-none"
        >
          {THEMES.map((theme) => (
            <option selected={theme === store.theme}>{theme}</option>
          ))}
        </select>
      </div>
    </footer>
  );
};

export default Footer;
