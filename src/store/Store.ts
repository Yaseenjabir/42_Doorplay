import { create } from "zustand";
import { runSingleDoorAPI } from "./Slices/runSingleDoorAPI";
import { globalData } from "./Slices/globalData";
import { DoorSchema, ReviewModel } from "../utils/utils";
import { globalReviews } from "./Slices/globalReviews";
type State = {
  val: boolean;
  toggleVal: (val: boolean) => void;
  globalData: DoorSchema[];
  insertData: (val: DoorSchema[]) => void;
  insertReviews: (val: ReviewModel[]) => void;
  globalReviews: ReviewModel[];
};

const useStore = create<State>((set) => ({
  ...runSingleDoorAPI(set),
  ...globalData(set),
  ...globalReviews(set),
}));

export default useStore;
