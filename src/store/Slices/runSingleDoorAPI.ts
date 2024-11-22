export const runSingleDoorAPI = (set: any) => ({
  val: true,
  toggleVal: (newVal?: boolean) =>
    set((state: any) => ({
      val: newVal !== undefined ? newVal : !state.val,
    })),
});
