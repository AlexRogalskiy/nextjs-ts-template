import ColorHash from 'color-hash';

const colorHashers = {
  decoration: new ColorHash({ lightness: 0.4, saturation: 1 }),
  text: new ColorHash({ lightness: 0.35, saturation: 0.35 }),
  bg: new ColorHash({ lightness: 0.93, saturation: 0.2 }),
};

export default colorHashers;
