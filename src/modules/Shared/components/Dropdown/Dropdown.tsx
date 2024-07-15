import { createRef, useState } from "react";
import Menu from "./components/Menu/Menu";

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
  position?: "bottom" | "left";
}

export default function Dropdown({
  header,
  children,
  position = "bottom",
}: Props) {
  const ref = createRef<HTMLDivElement>();

  const [openMenu, setOpenMenu] = useState(false);

  function handleOpen() {
    setOpenMenu((prev) => !prev);
  }

  function handleClose() {
    setOpenMenu(false);
  }

  return (
    <div className="cursor-pointer relative" ref={ref}>
      <div onClick={handleOpen}>{header}</div>

      {openMenu && (
        <Menu wrapRef={ref} handleClose={handleClose} position={position}>
          {children}
        </Menu>
      )}
    </div>
  );
}
