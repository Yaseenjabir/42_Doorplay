export const globalReviews = (set: any) => ({
  globalReviews: [],
  insertReviews: (newData: any) =>
    set((state: any) => ({
      globalReviews: [...state.globalReviews, ...newData],
    })),
});
