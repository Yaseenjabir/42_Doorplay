export const globalEmails = (set: any) => ({
  globalEmails: [],
  insertEmails: (newData: any) =>
    set((state: any) => {
      // Merge the existing globalEmails with newData while removing duplicates based on _id
      const updatedEmails = [
        ...state.globalEmails,
        ...newData.filter(
          (newEmail: any) =>
            !state.globalEmails.some((email: any) => email._id === newEmail._id)
        ),
      ];

      return {
        globalEmails: updatedEmails,
      };
    }),
});
