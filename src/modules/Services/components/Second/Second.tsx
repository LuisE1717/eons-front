import { createRef, useEffect, useState } from "react";
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
import { showToast } from "@components/UI/Toast";

export default function Second({ first_time, toast }) {
  const ref = createRef<HTMLDivElement>();

  const [selected, setSelected] = useState<SECTIONS | null>(null);

  const [showInstructions, setShowInstructions] = useState(false);

  const isInView = useInView(ref, {
    once: true,
    amount: "some",
  });
  useEffect(() => {
    
    toast === "read" && showToast("Es necesario que lea las instrucciones de uso antes de utilizar nuestros servicios.", "info");
  },[])

  function handleBookClick() {
    if (first_time) {
      setShowInstructions(true);
      // Si necesitas desactivar el efecto después del primer uso:
      // localStorage.setItem('first_time', 'false');
    }
    handleChange(SECTIONS.BOOK);
  }

  function handleChange(s: SECTIONS) {
    setSelected((prev) => {
      return s === prev ? null : s;
    });
  }

  const CLASS = clsx(
    "bg-no-repeat bg-center bg-contain",
    "w-full flex max-w-[650px]",
    "md:min-h-[600px] h-max",
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
          "mb-12": selected !== null,
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
            "gap-x-12": selected !== null,
          }
        )}
      >
        <div className="relative">
          <Icon
            visible={isInView}
            selected={selected === SECTIONS.BOOK}
            icon={Book}
            handleClick={() => handleBookClick()}
          />
          {first_time && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-full"
              style={{ pointerEvents: "none" }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl "
                animate={{
                  boxShadow: [
                    "0px 0px 5px rgba(128,0,128,0.5)",
                    "0px 0px 15px rgba(128,0,128,0.9)",
                    "0px 0px 5px rgba(128,0,128,0.5)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
              />
            </motion.div>
          )}
        </div>

        <motion.div
          style={{
            transform: isInView ? "scale(1)" : "scale(0.1)",
          }}
          className={CLASS}
        >
          {selected === null && <Empty />}
          {selected === SECTIONS.BOOK && <BookInfo first_time={first_time} />}
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
