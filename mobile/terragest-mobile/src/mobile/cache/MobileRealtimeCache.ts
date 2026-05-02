export const MobileRealtimeCache = {

  cache: {} as any,

  set(
    key: string,
    value: any
  ) {

    this.cache[key] =
      value;
  },

  get(
    key: string
  ) {

    return this.cache[key];
  },
};
