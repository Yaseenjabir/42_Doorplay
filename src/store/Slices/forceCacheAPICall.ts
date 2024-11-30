export const forceCacheAPICall = (set: any) => ({
  value: true,
  setValue: () => set((state: any) => ({ value: !state.value })),
});
