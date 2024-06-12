import React from "react";
import Card from "./components/Card/Card";
import Info from "./components/Info/Info";
import Chat from "./components/Chat/Chat";
import useTranslation from "../../../../../../../Shared/hooks/useTranslation";

export default function Buttons() {
  const { translation } = useTranslation();

  return (
    <div className="flex justify-between sm:gap-x-10 gap-x-4 mt-20">
      <Card
        icon={Info}
        text={translation.Spiritual_Family.info_text}
        fire={20}
      />
      <Card
        icon={Chat}
        text={translation.Spiritual_Family.chat_text}
        fire={20}
      />
    </div>
  );
}
