import { useRef, useState } from "react";
import Menu from "./components/Menu/Menu";

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
  position?: "bottom" | "left";
  no_close?:boolean;
}

export default function Dropdown({
  header,
  children,
  position = "bottom",
  no_close
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

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
        <Menu wrapRef={ref} handleClose={no_close?() =>{}:handleClose} position={position}>
          {children}
        </Menu>
      )}
    </div>
  );
}
