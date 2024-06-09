import React, { useState } from "react";
import { SECTIONS } from "./constants";
import BookInfo from "./components/BookInfo/BookInfo";
import MessageInfo from "./components/MessageInfo/MessageInfo";
import UserInfo from "./components/UserInfo/UserInfo";
import Icon from "./shared/components/Icon/Icon";
import User from "./components/User/User";
import Book from "./components/Book/Book";
import Message from "./components/Message/Message";

export default function Second() {
  const [selected, setSelected] = useState<SECTIONS>(SECTIONS.BOOK);

  function handleChange(s: SECTIONS) {
    setSelected(s);
  }

  return (
    <section className="flex flex-col items-center sm:py-14 py-6 w-full">
      <div className="flex justify-center mb-6 gap-x-10">
        <Icon
          selected={selected === SECTIONS.USER}
          icon={User}
          handleClick={() => handleChange(SECTIONS.USER)}
        />
      </div>

      <div className="flex items-end sm:gap-x-12 gap-x-4 w-full justify-center">
        <Icon
          selected={selected === SECTIONS.BOOK}
          icon={Book}
          handleClick={() => handleChange(SECTIONS.BOOK)}
        />

        {selected === SECTIONS.BOOK && <BookInfo />}
        {selected === SECTIONS.MESSAGES && <MessageInfo />}
        {selected === SECTIONS.USER && <UserInfo />}

        <Icon
          selected={selected === SECTIONS.MESSAGES}
          icon={Message}
          handleClick={() => handleChange(SECTIONS.MESSAGES)}
        />
      </div>
    </section>
  );
}
