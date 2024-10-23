import React from "react";
import MobileHeader from "./MobileHeader/MobileHeader";
import DesktopHeader from "./DesktopHeader/DesktopHeader";

const Header: React.FC = () => {
  return (
    <>
      <MobileHeader />
      <DesktopHeader />
    </>
  );
};

export default Header;
