import { useStore } from '../../../store';
import { getUrl } from '../../../utils';
import { IAsset } from '../../../types';
import Iframe from '../../Iframe/Iframe';

const ContentIframe = (props: { asset: IAsset }) => {
  const store = useStore();
  const url = getUrl(props.asset);
  return (
    <div
      style={{
        width: `${store.root.width.value}px`,
        height: `${store.root.height.value}px`,
        position: 'absolute'
      }}
      class={'iframe_container'}
    >
      {url ? (
        <Iframe
          url={`${url}?editor=1&view=3&data=${props.asset.state ? 1 : 0}&requestId=initial`}
          onLoad={(proxy) => {
            store.updateAssetProxy(props.asset.asset?.id ?? 0, 'asset', proxy);
            store.setTheme(store.theme);
          }}
        />
      ) : null}
    </div>
  );
};

export default ContentIframe;
