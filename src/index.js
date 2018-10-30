import hash from 'object-hash';

const defaultSerializeKeyFunction = (parent, args, context, { parentType, fieldName }) => {
  return hash({ parentType: parentType.toString(), fieldName, args });
};

const memoize = async (store, key, opts, resolver, { parent, args, context, info }) => {
  const cacheKey = typeof key === 'function' ? await key(parent, args, context, info) : key;
  const cachedResult = await store.get(cacheKey);
  if (!cachedResult) {
    const result = await resolver(parent, args, context, info);
    const cached = store.set(cacheKey, result, opts);
    return result;
  }
  return cachedResult;
};

export default ({ store: defaultStore = new Map(), key: defaultSerializeKey = defaultSerializeKeyFunction } = {}) => {
  return {
    cache: (resolver, { store = defaultStore, key = defaultSerializeKey, ...opts } = {}) => {
      return async (parent, args, context, info) => {
        return memoize(store, key, opts, resolver, { parent, args, context, info });
      };
    },
  };
};
