export const darkThemeSlice = (set: any) => ({
  darkTheme: false,
  toggleDarkTheme: () => set((state: any) => ({ darkTheme: !state.darkTheme })),
});
