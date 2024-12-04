import { AppProvider } from "@toolpad/core/react-router-dom";
import { Outlet } from "react-router-dom";
import type { Navigation } from "@toolpad/core";
import Logo from "../../../public/AR Garage - Logo.png";
import { IoMdAdd } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { MdHome } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Dashboard",
  },
  {
    segment: "dashboard",
    title: "Add Door",
    icon: <IoMdAdd className="text-2xl" />,
  },
  {
    segment: "dashboard/update-door",
    title: "Update Door",
    icon: <RxUpdate className="text-2xl" />,
  },
  {
    segment: "dashboard/emails",
    title: "Emails",
    icon: <TfiEmail className="text-2xl" />,
  },
  {
    title: "Home",
    icon: <MdHome className="text-2xl" />,
  },
];

const BRANDING = {
  title: "A&R Doors",
  logo: <img src={Logo} />,
};

export default function Master() {
  return (
    <AppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </AppProvider>
  );
}
