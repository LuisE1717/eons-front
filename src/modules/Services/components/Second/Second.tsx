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
import clsx from "clsx";
import FirstTime from "./components/FirstTime/FirstTime";

export default function Second({ first_time }) {
  const ref = createRef<HTMLDivElement>();

  const [selected, setSelected] = useState<SECTIONS | null>(first_time?SECTIONS.BOOK:null);

  const isInView = useInView(ref, {
    once: true,
    amount: "some",
  });

  function handleChange(s: SECTIONS) {
    setSelected((prev) => {
      return s === prev ? null : s;
    });
  }

  const CLASS = clsx(
    "bg-no-repeat bg-center bg-contain",
    "w-full flex max-w-[650px]",
    "md:min-h-[600px] min-h-[500px] h-max",
    "justify-center items-center",
    "transition-all duration-700",
    "md:bg-triangle bg-none"
  );
  return (
    <section
      ref={ref}
      className="flex flex-col items-center sm:py-14 py-6 w-full"
    >
      <div
        ref={ref}
        className={clsx("flex justify-center transition-all duration-300", {
          "mb-6": selected !== null,
          "mb-0": selected === null,
        })}
      >
        <Icon
          visible={isInView}
          selected={selected === SECTIONS.USER}
          icon={User}
          handleClick={() => handleChange(SECTIONS.USER)}
        />
      </div>

      <motion.div
        className={clsx(
          "flex items-end w-full justify-center transition-all duration-300",
          {
            "gap-x-0": selected === null,
            "gap-x-6": selected !== null,
          }
        )}
      >
        <Icon
          visible={isInView}
          selected={selected === SECTIONS.BOOK}
          icon={Book}
          handleClick={() => handleChange(SECTIONS.BOOK)}
        />

        <motion.div
          style={{
            transform: isInView ? "scale(1)" : "scale(0.1)",
          }}
          className={CLASS}
        >
          {selected === null && <Empty />}
          {selected === SECTIONS.BOOK && <BookInfo first_time={first_time}/>}
          {selected === SECTIONS.MESSAGES && <MessageInfo />}
          {selected === SECTIONS.USER && <UserInfo />}
        </motion.div>

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
