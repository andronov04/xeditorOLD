import { createStore } from 'solid-js/store';

const Tooltip = (props: { text: string }) => {
  const [state, setState] = createStore({ open: false });
  let refTip: any;

  return (
    <div class={'relative inline tooltip'}>
      {state.open ? (
        <div
          style={{ 'margin-left': '-15px' }}
          class={' whitespace-nowrap w-auto text-xss left-full z-30 transform -translate-x-full top-0 px-1 py-0.5 bg-dark41 absolute rounded-sm'}
        >
          {props.text}
        </div>
      ) : null}
      <span
        onMouseEnter={() => {
          setState({ open: true });
        }}
        onMouseLeave={() => {
          setState({ open: false });
        }}
        ref={refTip}
        class="cursor-pointer text-small p-0.5 bg-dark41 rounded-sm"
      >
        ?
      </span>
    </div>
  );
};

export default Tooltip;
