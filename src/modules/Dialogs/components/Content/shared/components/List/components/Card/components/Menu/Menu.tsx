import clsx from "clsx";
import Item from "./components/Item/Item";
import { type RefObject } from "react";
import useClickOutside from "./hooks/useClickOutside";
import { getI18N } from "../../../../../../../../../../../i18n";
import useTranslation from "../../../../../../../../../../Shared/hooks/useTranslation";

interface Props {
  handleAdd(): void;
  handleDelete(): void;
  handleClose(): void;
  wrapRef: RefObject<HTMLDivElement>;
}

export default function Menu({
  handleAdd,
  handleDelete,
  handleClose,
  wrapRef,
}: Props) {
  const { translation } = useTranslation();

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
      <Item handleClick={handleAdd} text={translation.Dialogs.add_text} />
      <Item handleClick={handleDelete} text={translation.Dialogs.delete_text} />
    </ul>
  );
}
