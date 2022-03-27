import { IFRAME_ALLOW } from '../../constants';

interface IIframe {
  url: string;
  onLoad?: (proxy: WindowProxy) => void;
}

const Iframe = (props: IIframe) => {
  return (
    <iframe
      width={'100%'}
      height={'100%'}
      style={{
        'max-width': '100%',
        'max-height': '100%'
      }}
      src={props.url}
      class={'iframe'}
      allow={IFRAME_ALLOW}
      onLoad={(e) => {
        if (e.currentTarget.contentWindow) {
          props.onLoad?.(e.currentTarget.contentWindow);
        }
      }}
      sandbox={'allow-same-origin allow-scripts'}
    />
  );
};

export default Iframe;
