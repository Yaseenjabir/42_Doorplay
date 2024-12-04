import { create } from "zustand";
import { runSingleDoorAPI } from "./Slices/runSingleDoorAPI";
import { globalData } from "./Slices/globalData";
import { DoorSchema, EmailModel, ReviewModel } from "../utils/utils";
import { globalReviews } from "./Slices/globalReviews";
import { globalEmails } from "./Slices/globalEmails";
type State = {
  val: boolean;
  toggleVal: (val: boolean) => void;
  globalData: DoorSchema[];
  insertData: (val: DoorSchema[]) => void;
  insertReviews: (val: ReviewModel[]) => void;
  globalReviews: ReviewModel[];
  globalEmails: EmailModel[];
  insertEmails: (val: EmailModel[]) => void;
};

const useStore = create<State>((set) => ({
  ...runSingleDoorAPI(set),
  ...globalData(set),
  ...globalReviews(set),
  ...globalEmails(set),
}));

export default useStore;
