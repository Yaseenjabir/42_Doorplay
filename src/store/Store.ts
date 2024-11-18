import { create } from "zustand";
import { darkThemeSlice } from "./Slices/darktThemeSlice";

type State = { darkTheme: boolean; toggleDarkTheme: () => void };

const useStore = create<State>((set) => ({
  ...darkThemeSlice(set),
}));

export default useStore;
