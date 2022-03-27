import { useStore } from '../../../store';
import { getUrl } from '../../../utils';
import { IAsset } from '../../../types';
import Iframe from '../../Iframe/Iframe';

const ContentIframe = (props: { asset: IAsset }) => {
  const store = useStore();
  const url = getUrl(props.asset);

  //
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
        <Iframe
          url={`${url}?editor=1&view=3&data=${props.asset.state ? 1 : 0}&requestId=initial`}
          onLoad={(proxy) => {
            store.updateAssetProxy(props.asset.asset?.id ?? 0, 'asset', proxy);
          }}
        />
      ) : null}
    </div>
  );
};

export default ContentIframe;

//<iframe
//           width={'100%'}
//           height={'100%'}
//           style={{
//             'max-width': '100%',
//             'max-height': '100%'
//           }}
//           src={`${url}?editor=1&data=${props.asset.state ? 1 : 0}&requestId=${props.asset.requestId ?? 'initial'}`}
//           class={'iframe'}
//           allow={IFRAME_ALLOW}
//           onLoad={(e) => {
//             // TODO Patch store
//             // console.log('asset-onLoad', props.asset);
//
//             // if (props.asset.state) {
//             //   e.currentTarget.contentWindow?.postMessage(
//             //     {
//             //       type: MESSAGE_SEND_DATA,
//             //       requestId: props.asset.requestId ?? 'initial',
//             //       data: deepCopy(props.asset.state)
//             //     },
//             //     url
//             //   );
//             // }
//           }}
//           sandbox={'allow-same-origin allow-scripts'}
//         />
//  onMount(() => {
//     if (!props.asset.state) {
//       // // Only once
//       // window.addEventListener(
//       //   'message',
//       //   (event) => {
//       //     // if (event.data?.type === MESSAGE_SEND_TO_DATA) {
//       //     //   if (props.asset.state) {
//       //     //     store.updateAsset({ ...props.asset, state: event.data.data });
//       //     //   } else {
//       //     //     store.updateAsset({ ...props.asset, state: event.data.data, requestId: initRequestId });
//       //     //   }
//       //     // }
//       //   },
//       //   false
//       // );
//     }
//   });
