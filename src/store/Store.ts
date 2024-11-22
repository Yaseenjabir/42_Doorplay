import { create } from "zustand";
import { darkThemeSlice } from "./Slices/darktThemeSlice";
import { runSingleDoorAPI } from "./Slices/runSingleDoorAPI";
type State = {
  darkTheme: boolean;
  toggleDarkTheme: () => void;
  val: boolean;
  toggleVal: (val: boolean) => void;
};

const useStore = create<State>((set) => ({
  ...darkThemeSlice(set),
  ...runSingleDoorAPI(set),
}));

export default useStore;
