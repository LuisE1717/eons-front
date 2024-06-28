import { createRef, useState } from "react";
import { SECTIONS } from "./constants";
import BookInfo from "./components/BookInfo/BookInfo";
import MessageInfo from "./components/MessageInfo/MessageInfo";
import UserInfo from "./components/UserInfo/UserInfo";
import Icon from "./shared/components/Icon/Icon";
import User from "./components/User/User";
import Book from "./components/Book/Book";
import Message from "./components/Message/Message";
import Empty from "./components/Empty/Empty";
import { useInView, motion } from "framer-motion";

export default function Second() {
  const ref = createRef<HTMLDivElement>();

  const [selected, setSelected] = useState<SECTIONS | null>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: "some",
  });

  function handleChange(s: SECTIONS) {
    setSelected(s);
  }

  return (
    <section
      ref={ref}
      className="flex flex-col items-center sm:py-14 py-6 w-full"
    >
      <div ref={ref} className="flex justify-center mb-6 gap-x-10">
        <Icon
          visible={isInView}
          selected={selected === SECTIONS.USER}
          icon={User}
          handleClick={() => handleChange(SECTIONS.USER)}
        />
      </div>

      <motion.div className="flex items-end sm:gap-x-12 gap-x-4 w-full justify-center">
        <Icon
          visible={isInView}
          selected={selected === SECTIONS.BOOK}
          icon={Book}
          handleClick={() => handleChange(SECTIONS.BOOK)}
        />

        {selected === null && <Empty visible={isInView} />}
        {selected === SECTIONS.BOOK && <BookInfo />}
        {selected === SECTIONS.MESSAGES && <MessageInfo />}
        {selected === SECTIONS.USER && <UserInfo />}

        <Icon
          visible={isInView}
          selected={selected === SECTIONS.MESSAGES}
          icon={Message}
          handleClick={() => handleChange(SECTIONS.MESSAGES)}
        />
      </motion.div>
    </section>
  );
}
