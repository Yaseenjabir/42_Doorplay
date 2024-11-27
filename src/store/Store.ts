import { create } from "zustand";
import { runSingleDoorAPI } from "./Slices/runSingleDoorAPI";
import { globalData } from "./Slices/globalData";
import { DoorSchema } from "../utils/utils";
type State = {
  val: boolean;
  toggleVal: (val: boolean) => void;
  data: DoorSchema[];
  insertData: (val: DoorSchema[]) => void;
};

const useStore = create<State>((set) => ({
  ...runSingleDoorAPI(set),
  ...globalData(set),
}));

export default useStore;
