export const globalData = (set: any) => ({
  data: [],
  insertData: (newData: any) =>
    set((state: any) => ({ data: [...state.data, ...newData] })),
});
