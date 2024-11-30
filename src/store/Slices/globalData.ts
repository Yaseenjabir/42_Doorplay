export const globalData = (set: any) => ({
  globalData: [],
  insertData: (newData: any) =>
    set((state: any) => ({ globalData: [...state.globalData, ...newData] })),
});
