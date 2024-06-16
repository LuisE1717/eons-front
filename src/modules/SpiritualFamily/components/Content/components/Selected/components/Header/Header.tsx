import React from "react";
import Back from "./components/Back/Back";
import Menu from "./components/Menu/Menu";
import Dropdown from "../../../../../../../Shared/components/Dropdown/Dropdown";
import DropdownItem from "../../../../../../../Shared/components/DropdownItem/DropdownItem";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";

interface Props {
  handleClose(): void;
  id:string;
}

export default function Header({ handleClose, id }: Props) {
  const { translation } = useTranslation();

  return (
    <header className="py-2 flex justify-between items-center">
      <button onClick={handleClose}>
        <Back />
      </button>

      <Dropdown header={<Menu />}>
        <DropdownItem text={translation.Spiritual_Family.edit_name_text} />
        <DropdownItem text={translation.Spiritual_Family.edit_image_text} />
        <DropdownItem
          text={translation.Spiritual_Family.edit_description_text}
        />
        <DropdownItem id={id} text={translation.Spiritual_Family.delete_text} />
      </Dropdown>
    </header>
  );
}
