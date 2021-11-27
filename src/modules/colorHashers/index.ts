import ColorHash from 'color-hash';
import { ColorHasher, ColorHashers } from './types';

type Options = ConstructorParameters<typeof ColorHash>[0];

const createHexColorHasher = (options: Options): ColorHasher => {
  const colorHash = new ColorHash(options);
  return (source) => colorHash.hex(source);
};

const colorHashers: ColorHashers = {
  decoration: createHexColorHasher({ lightness: 0.4, saturation: 1 }),
  text: createHexColorHasher({ lightness: 0.35, saturation: 0.35 }),
  bg: createHexColorHasher({ lightness: 0.93, saturation: 0.2 }),
};

export default colorHashers;
