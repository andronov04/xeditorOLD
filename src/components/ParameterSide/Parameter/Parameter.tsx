import { IParams } from '../../../types';
import { createEffect, createMemo, onCleanup, onMount } from 'solid-js';
import { DragGesture } from '@use-gesture/vanilla';
import { createStore } from 'solid-js/store';
import { deepCopy, invertedRange, range } from '../../../utils';
import debounce from 'lodash.debounce';
import { useStore } from '../../../store';
import Tooltip from '../../Library/Tooltip/Tooltip';

export const InputNumber = (props: { value: number; min?: number; max?: number; setValue: (val: number) => void }) => {
  // const { value } = props;
  // TODO Validation and valid min/max
  return (
    <input
      type={'number'}
      min={props.min ?? Infinity}
      max={props.max ?? Infinity}
      class={'bg-dark52 w-8 outline-none rounded-sm p-1 text-xs text-white'}
      value={props.value}
      onKeyUp={(e) => {
        props.setValue(parseInt(e.currentTarget?.value));
      }}
    />
  );
};

export const InputCheckbox = (props: { value: boolean; setValue: (val: boolean) => void }) => {
  // const { value } = props;
  // TODO Validation
  return (
    <input
      type={'checkbox'}
      class={'bg-dark52 w-4 input-checkbox h-4 text-dark52 outline-none rounded-sm text-xs appearance-none '}
      checked={props.value}
      onChange={(e) => {
        props.setValue(e.currentTarget?.checked);
      }}
    />
  );
};

export const InputRange = (props: { min: number; max: number; minMin: number; maxMax: number; setValue: (val: number, key: string) => void }) => {
  const floor = true; // TODO Use props;
  const pointSize = '16px';
  const { minMin, maxMax, setValue } = props;
  // const min = props.min;
  // const max = props.max;
  // const [state, setState] = createStore({ width: 138 });
  let lineWidth = 0;
  let refPoint1: any;
  let refPoint2: any;
  let refOuterLine: any;

  onMount(async () => {
    const outerLine = refOuterLine as HTMLDivElement;
    // let width = outerLine.getBoundingClientRect().width;
    // set width
    // setState({ width: width });

    const points = [refPoint1, refPoint2] as HTMLDivElement[];
    const gestures: any = [];

    points.forEach((point) => {
      const gesture = new DragGesture(
        point,
        ({ event, first, xy: [x], movement: [mx], memo = {} }) => {
          if (first) {
            const { width, left } = outerLine.getBoundingClientRect();
            lineWidth = width - parseFloat(pointSize);

            memo.pos = invertedRange((x - left) / width, props.min, props.max);
            const delta = Math.abs(memo.pos - props.min) - Math.abs(memo.pos - props.max);
            memo.key = delta < 0 || (delta === 0 && memo.pos <= props.min) ? 'min' : 'max';
            memo.pos = memo.key === 'min' ? props.min : props.max; //value[memo.key]
          }

          const newValue = memo.pos + invertedRange(mx / lineWidth, 0, props.max - props.min);
          let value = newValue;
          if (floor) {
            value = Math.floor(newValue);
          } // TODO Step

          // console.log('newValue', memo.key, value);
          // TODO Set interval good

          // setState({[memo.key]: value});
          setValue(value, memo.key);

          return memo;
        },
        { axis: 'x' }
      );

      gestures.push(gesture);
    });

    onCleanup(() => gestures.forEach((g: any) => g.destroy()));
  });

  const minStyle = createMemo(() => `calc(${range(props.min, minMin, maxMax)} * (100% - ${pointSize} - 8px) + 0px)`);
  const maxStyle = createMemo(() => `calc(${1 - range(props.max, minMin, maxMax)} * (100% - ${pointSize} - 8px) + 0px)`);

  return (
    <div class={'relative'}>
      <div ref={refOuterLine} class={'h-1.5 w-full bg-dark52 rounded-full'}>
        <div
          style={{
            left: minStyle(),
            right: maxStyle()
          }}
          class={'absolute h-1.5 w-auto bg-darkE7 rounded-full'}
        />
      </div>

      <div
        ref={refPoint1}
        style={{
          top: '-5.5px',
          left: minStyle(),
          width: pointSize,
          height: pointSize
        }}
        class={'touch-none bg-white cursor-pointer hover:opacity-80 absolute h-4 w-4 rounded-full'}
      />

      <div
        ref={refPoint2}
        style={{
          top: '-5.5px',
          right: maxStyle(),
          width: pointSize,
          height: pointSize
        }}
        class={'touch-none bg-white cursor-pointer hover:opacity-80 absolute h-4 w-4 rounded-full'}
      />
    </div>
  );
};

export const InputInterval = (props: { min: number; max: number; minMin: number; maxMax: number; setParams: (params: any) => void }) => {
  const { minMin, maxMax } = props;
  const [state, setState] = createStore({ min: props.min, max: props.max, minMin, maxMax });

  createEffect(() => {
    props.setParams({ min: state.min, max: state.max });
  });

  return (
    <div class={'flex gap-x-2 items-center hover:opacity-80'}>
      <div class={'w-8'}>
        <InputNumber
          value={state.min}
          setValue={(val) => {
            setState({ min: val });
          }}
        />
      </div>
      <div class={'flex-grow'}>
        <InputRange
          minMin={minMin}
          maxMax={maxMax}
          min={state.min}
          max={state.max}
          setValue={(val, key) => {
            setState({ [key]: val });
          }}
        />
      </div>
      <div class={'w-8'}>
        <InputNumber
          value={state.max}
          setValue={(val) => {
            setState({ max: val });
          }}
        />
      </div>
    </div>
  );
};

export const InputArray = (props: { array: any[]; setParams: (params: any) => void }) => {
  const [state, setState] = createStore<{ indexer: number[]; array: any[] }>({
    indexer: props.array.map((_, i) => i),
    array: []
  });
  onMount(async () => {
    setState({ ...state, array: deepCopy(props.array) });
  });

  return (
    <div class={'overflow-scroll max-h-[10rem] '}>
      <ul class={'w-full flex justify-center gap-y-2 flex-col '}>
        {state.array.map((a, i) => {
          const isArr = typeof a === 'object' && a.length === 2;
          const obj = isArr ? a[0] : a;
          return (
            <li class={'flex items-center hover:opacity-80'}>
              <label class={'flex-grow inline-flex cursor-pointer items-center'}>
                <InputCheckbox
                  value={state.indexer.some((idx) => idx === i)}
                  setValue={(val) => {
                    let indexer: any = [...state.indexer, ...[i]];
                    if (!val) {
                      indexer = [...state.indexer.filter((a) => a !== i)];
                    }
                    setState({ indexer });
                    props.setParams({ array: [...state.array.filter((_, i) => indexer.includes(i))] });
                  }}
                />
                <div class={'px-2'}>
                  <h5 class={'text-smm'}>{obj?.name ?? obj?.value ?? obj}</h5>
                  {obj?.description ? <p class={'opacity-50 text-xss'}>{obj?.description}</p> : null}
                </div>
              </label>
              {isArr ? (
                <div>
                  <InputNumber
                    value={a[1]}
                    min={0}
                    max={100}
                    setValue={(val) => {
                      const new_array = deepCopy([...state.array.filter((_, i) => state.indexer.includes(i))]);
                      new_array[i][1] = val;
                      props.setParams({ array: new_array });
                    }}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const Parameter = (props: { keys: string[]; key: string; params: IParams; value: any }) => {
  const state = useStore();
  const key = props.key;
  const params = props.params;
  const keys = props.keys; // Parent keys
  const value = props.value;
  // console.log('k-v', key, params, value);
  // debounce update data assets params
  const setParams = debounce((params: any) => {
    state.updateAssetParams([...keys, key], params);
  }, 1000);

  return (
    <div>
      <div class={'flex justify-start items-center w-full'}>
        <div class={'cursor-pointer hover:opacity-80 flex'}>
          <div class="flex items-center justify-center w-full">
            <label for={`toggle_${key}`} class="flex items-center cursor-pointer">
              <div class="relative w-8 ">
                <input checked={true} type="checkbox" id={`toggle_${key}`} class="sr-only input-checkbox-params" />
                <div class="block bg-dart2C w-8 h-4 rounded-full" />
                <div class="dot absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 0 24 24" width="10px" fill="#fff">
                    <path d="M10.59 9.17L6.12 4.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.46 4.46 1.42-1.4zm4.76-4.32l1.19 1.19L4.7 17.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L17.96 7.46l1.19 1.19c.31.31.85.09.85-.36V4.5c0-.28-.22-.5-.5-.5h-3.79c-.45 0-.67.54-.36.85zm-.52 8.56l-1.41 1.41 3.13 3.13-1.2 1.2c-.31.31-.09.85.36.85h3.79c.28 0 .5-.22.5-.5v-3.79c0-.45-.54-.67-.85-.35l-1.19 1.19-3.13-3.14z" />
                  </svg>
                </div>
              </div>
            </label>
          </div>
        </div>
        <h4 class={'relative pl-1 text-smm flex-grow'}>
          {/*{value}*/}
          {params.name ?? key}
          {params.hint ? (
            <div class={'absolute right-0 top-0'}>
              <Tooltip text={params.hint} />
            </div>
          ) : null}
        </h4>
      </div>
      <p class={'opacity-50 text-xs'}>{params.description}</p>
      {params.min !== undefined && params.max !== undefined && (
        <div class={'py-1'}>
          <InputInterval
            min={params.min}
            max={params.max}
            minMin={params.min}
            maxMax={params.max}
            setParams={setParams}
            // minMin={params.minMin ?? Infinity}
            // maxMax={params.maxMax ?? Infinity}
          />
        </div>
      )}
      {params.array?.length && (
        <div class={'py-1'}>
          <InputArray array={params.array} setParams={setParams} />
        </div>
      )}
    </div>
  );
};
