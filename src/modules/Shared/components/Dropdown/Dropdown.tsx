import { createRef, useState } from "react";
import Menu from "./components/Menu/Menu";

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function Dropdown({ header, children }: Props) {
  const ref = createRef<HTMLDivElement>();

  const [openMenu, setOpenMenu] = useState(false);

  function handleOpen() {
    setOpenMenu((prev) => !prev);
  }

  function handleClose() {
    setOpenMenu(false);
  }

  return (
    <div className="cursor-pointer" ref={ref}>
      <div onClick={handleOpen}>{header}</div>

      {openMenu && (
        <Menu wrapRef={ref} handleClose={handleClose}>
          {children}
        </Menu>
      )}
    </div>
  );
}
