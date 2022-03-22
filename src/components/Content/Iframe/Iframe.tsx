import { useStore } from '../../../store';
import { deepCopy, getUrl } from '../../../utils';
import { MESSAGE_SEND_DATA, MESSAGE_SEND_TO_DATA } from '../../../constants';
import { IAsset } from '../../../types';
import { onMount } from 'solid-js';

const Iframe = (props: { asset: IAsset }) => {
  const store = useStore();
  // console.log('asset', asset);
  const initRequestId = `initial_${props.asset?.asset?.id}`;
  const url = getUrl(props.asset);
  onMount(() => {
    if (!props.asset.state) {
      // Only once
      window.addEventListener(
        'message',
        (event) => {
          if (event.data?.type === MESSAGE_SEND_TO_DATA) {
            if (props.asset.state) {
              store.updateAsset({ ...props.asset, state: event.data.data });
            } else {
              store.updateAsset({ ...props.asset, state: event.data.data, requestId: initRequestId });
            }
          }
        },
        false
      );
    }
  });

  return (
    <div
      style={{
        width: `${store.root.state.width.value}px`,
        height: `${store.root.state.height.value}px`,
        transform: `scale(${store.scale})`
      }}
      class={'iframe_container'}
    >
      {url ? (
        <iframe
          width={'100%'}
          height={'100%'}
          src={`${url}?editor=1&data=${props.asset.state ? 1 : 0}&requestId=${props.asset.requestId ?? 'initial'}`}
          class={'iframe'}
          onLoad={(e) => {
            // TODO Patch store
            // console.log('asset-onLoad', props.asset);

            if (props.asset.state) {
              e.currentTarget.contentWindow?.postMessage(
                {
                  type: MESSAGE_SEND_DATA,
                  requestId: props.asset.requestId ?? 'initial',
                  data: deepCopy(props.asset.state)
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
};

export default Iframe;
