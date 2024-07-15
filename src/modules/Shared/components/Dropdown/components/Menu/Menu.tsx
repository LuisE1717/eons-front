import clsx from "clsx";
import { type RefObject } from "react";
import useClickOutside from "./hooks/useClickOutside";

interface Props {
  handleClose(): void;
  wrapRef: RefObject<HTMLDivElement>;
  children: React.ReactNode;
  position: "bottom" | "left";
}

export default function Menu({
  handleClose,
  wrapRef,
  children,
  position,
}: Props) {
  useClickOutside({ element: wrapRef, onClickOutside: handleClose });

  return (
    <ul
      onClick={handleClose}
      className={clsx(
        "absolute",
        "z-20",
        position === "left" && "left-0 top-0",
        position === "left" && "flex",
        "overflow-auto",
        "mt-2",
        "bg-white",
        "shadow",
        "rounded-md"
      )}
      style={{
        transform: position === "left" ? `translateX(-100%)` : undefined,
      }}
    >
      {children}
    </ul>
  );
}
