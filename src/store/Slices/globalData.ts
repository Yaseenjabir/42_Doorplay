export const globalData = (set: any) => ({
  globalData: [],
  insertData: (newData: any) =>
    set((state: any) => {
      const updatedData = [
        ...state.globalData,
        ...newData.filter(
          (newEmail: any) =>
            !state.globalData.some((email: any) => email._id === newEmail._id)
        ),
      ];

      return {
        globalData: updatedData,
      };
    }),
});
