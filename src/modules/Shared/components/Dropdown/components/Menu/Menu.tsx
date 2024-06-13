import clsx from "clsx";
import { type RefObject } from "react";
import useClickOutside from "./hooks/useClickOutside";

interface Props {
  handleClose(): void;
  wrapRef: RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export default function Menu({ handleClose, wrapRef, children }: Props) {
  useClickOutside({ element: wrapRef, onClickOutside: handleClose });

  return (
    <ul
      onClick={handleClose}
      className={clsx(
        "absolute",
        "z-20",
        "-translate-x-8",
        "overflow-auto",
        "mt-2",
        "bg-white",
        "shadow"
      )}
    >
      {children}
    </ul>
  );
}
