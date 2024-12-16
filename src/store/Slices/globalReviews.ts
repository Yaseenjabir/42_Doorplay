export const globalReviews = (set: any) => ({
  globalReviews: [],
  insertReviews: (newData: any) =>
    set((state: any) => {
      const updatedReviews = [
        ...state.globalReviews,
        ...newData.filter(
          (newEmail: any) =>
            !state.globalReviews.some(
              (email: any) => email._id === newEmail._id
            )
        ),
      ];

      return {
        globalReviews: updatedReviews,
      };
    }),
});
