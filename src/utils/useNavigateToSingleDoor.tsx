import { useNavigate } from "react-router-dom";
import { DoorSchema } from "./utils";

export function useNavigateToSingleDoor() {
  const navigate = useNavigate();

  const navigateToSingleDoor = (item: DoorSchema) => {
    navigate(
      `/${item.category === "garage" ? "garage-doors" : "commercial-doors"}/${encodeURIComponent(item.title.replace(/\s+/g, "-"))}?id=${item._id}`
    );
  };

  return navigateToSingleDoor;
}
