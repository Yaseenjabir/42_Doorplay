export const globalEmails = (set: any) => ({
  globalEmails: [],
  insertEmails: (newData: any) =>
    set((state: any) => {
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
