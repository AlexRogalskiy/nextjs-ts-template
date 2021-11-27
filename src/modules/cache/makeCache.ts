import * as R from 'remeda';
import { getNow } from '@/utils/time';

interface StoreItem<DataItem> {
  saved: number;
  data: DataItem;
}

const makeCacheStore = <DataItem>() => {
  let value: Record<string, StoreItem<DataItem>> = {};

  return {
    get: (key: string) => value[key],
    set: <T extends StoreItem<DataItem>>(key: string, data: T) => {
      value = R.addProp(value, key, data);
    },
    remove: <K extends keyof typeof value>(key: K) => {
      value = R.omit(value, [key]);
    },
    flush: () => {
      value = {};
    },
  };
};

type OnDelete = (key: string) => void;

const makeAccessIndex = (maxLength: number, onDelete: OnDelete) => {
  let value: string[] = [];

  const getIndex = (key: string) => value.indexOf(key);

  const accessIndex = {
    append: (key: string) => {
      value = [...value, key];
      if (value.length > maxLength) {
        onDelete(value[0]);
        value = R.drop(value, 1);
      }
      return accessIndex;
    },
    removeByIndex: (index: number) => {
      value = R.concat(R.drop(value, index - 1), R.dropLast(value, index));
      return accessIndex;
    },
    remove: (key: string) => {
      const index = getIndex(key);
      return accessIndex.removeByIndex(index);
    },
    refreshPosition: (key: string) => {
      accessIndex.remove(key).append(key);
      return accessIndex;
    },
    flush: () => {
      value = [];
      return accessIndex;
    },
  };

  return accessIndex;
};

const makeCache = <DataItem>(expiry: number, maxLength = 50) => {
  const store = makeCacheStore<DataItem>();
  const onAccessIndexFullDelete: OnDelete = (key) => {
    store.remove(key);
  };
  const accessIndex = makeAccessIndex(maxLength, onAccessIndexFullDelete);

  const cache = {
    set: <T extends DataItem>(key: string, data: T) => {
      if (store.get(key)) {
        accessIndex.refreshPosition(key);
      } else {
        accessIndex.append(key);
      }
      store.set(key, {
        saved: getNow(),
        data,
      });
    },
    get: (key: string) => {
      const item = store.get(key);
      if (!item) {
        return undefined;
      }
      const isExpired = getNow() - item.saved > expiry;
      if (isExpired) {
        cache.remove(key);
        return undefined;
      }
      accessIndex.refreshPosition(key);
      return item.data;
    },
    remove: (key: string) => {
      store.remove(key);
      accessIndex.remove(key);
    },
    flush: () => {
      accessIndex.flush();
      store.flush();
    },
  };
  return cache;
};

export default makeCache;
