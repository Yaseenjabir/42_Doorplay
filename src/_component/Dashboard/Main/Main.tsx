import React from "react";
import Header from "./Header";
import AddDoor from "../../Dashboard 2/AddDoor/AddDoor";
import UpdateDoor from "../../Dashboard 2/UpdateDoor/UpdateDoor";
import useStore from "../../../store/Store";

interface MenuINT {
  nav: string | null;
  setShowMenu: (val: boolean) => void;
}

const Main: React.FC<MenuINT> = ({ setShowMenu, nav }) => {
  const { darkTheme } = useStore();

  return (
    <div className={`flex-1 w-full transition-all ease-in-out duration-500`}>
      <Header darkTheme={darkTheme} setShowMenu={setShowMenu} />
      {nav === "Add Door" ? (
        <AddDoor />
      ) : nav === "Update Door" ? (
        <UpdateDoor />
      ) : (
        <div>Delete Door</div>
      )}
    </div>
  );
};

export default Main;
