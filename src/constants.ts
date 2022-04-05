export const DEV_ASSET_URL = import.meta.env.VITE_DEV_ASSET_URL as string;
export const DEV_HEADER = import.meta.env.VITE_DEV_HEADER as boolean;
export const IFRAME_ALLOW = 'gyroscope; accelerometer; xr-spatial-tracking; microphone; camera;';

export const USE_ADD_NODE_STATE = 'X_USE_ADD_NODE_STATE';
export const USE_ADD_PARAM_STATE = 'X_USE_ADD_PARAM_STATE';
export const USE_REQUEST_CHANGE_NODE_CMD = 'X_USE_REQUEST_CHANGE_NODE_CMD';
export const USE_GENERATE = 'X_USE_GENERATE';
export const USE_UPDATE_HASH = 'X_USE_UPDATE_HASH';
export const USE_REPEAT = 'X_USE_REPEAT';
export const USE_COMPLETE_CAPTURE = 'X_COMPLETE_CAPTURE';
export const USE_REQUEST_CAPTURE = 'X_REQUEST_CAPTURE';
export const USE_CHANGE_PARAM_STATE = 'X_USE_CHANGE_PARAM_STATE';

export const USE_ADD_ASSET = 'X_ADD_ASSET';
export const USE_REMOVE_ASSET = 'X_REMOVE_ASSET';
export const USE_PREPARE = 'X_PREPARE';
export const RESPONSE_PREPARE = 'X_RESPONSE_PREPARE';
export const USE_SET_THEME = 'X_USE_SET_THEME';

// new
export const USE_SET_NODE = 'X_USE_SET_NODE';
export const USE_SET_PARAM = 'X_USE_SET_PARAM';
export const USE_PROXY_TARGET = 'X_USE_PROXY_TARGET';
export const USE_REGENERATE = 'X_USE_REGENERATE';

export const THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter'
];

export const TEMPLATE_FORMATS = [
  {
    label: 'Poster 2:3 (1600x2400)',
    width: 1600,
    height: 2400,
    value: 1
  },
  {
    label: 'Poster 16:9 (2048x1152)',
    width: 2048,
    height: 1152,
    value: 2
  },
  {
    label: 'Twitter Banner (1500x500)',
    width: 1500,
    height: 500,
    value: 3
  },
  {
    label: 'Twitter Post (1024x512)',
    width: 1024,
    height: 512,
    value: 4
  },
  {
    label: 'Instagram Post (1080x1080)',
    width: 1080,
    height: 1080,
    value: 5
  },
  {
    label: 'Postcard (1500x2100)',
    width: 1500,
    height: 2100,
    value: 6
  }
];
