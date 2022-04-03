import type { Component } from 'solid-js';
import { useStore } from '../../store';
import { THEMES } from '../../constants';

const Footer: Component = () => {
  const store = useStore();

  return (
    <footer id={'header'} class={'h-5 overflow-hidden border-t border-t-base-300 w-full border-b border-b-base-300 flex justify-end items-center'}>
      <div style={{ width: '100px' }} className={'overflow-hidden'}>
        <select
          onChange={(e) => {
            store.setTheme((e.target as HTMLSelectElement).value);
          }}
          class="select font-medium opacity-50 text-right select-xs select-ghost outline-none"
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
