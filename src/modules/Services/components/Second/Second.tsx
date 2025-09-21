import { createRef, useEffect, useState, useCallback, memo } from "react";
import { SECTIONS } from "./constants";
import Icon from "./shared/components/Icon/Icon";
import User from "./components/User/User";
import Book from "./components/Book/Book";
import Message from "./components/Message/Message";
import Empty from "./components/Empty/Empty";
import { useInView, motion } from "framer-motion";
import clsx from "clsx";
import { showToast } from "@components/UI/Toast";
import { checkInstructionsSeen } from "../../../../utils/developmentHelpers";
import React from "react";

// Componentes cargados perezosamente
const BookInfo = React.lazy(() => import("./components/BookInfo/BookInfo"));
const MessageInfo = React.lazy(() => import("./components/MessageInfo/MessageInfo"));
const UserInfo = React.lazy(() => import("./components/UserInfo/UserInfo"));
const FirstTime = React.lazy(() => import("./components/FirstTime/FirstTime"));

function SecondComponent({ first_time, toast }) {
  const ref = createRef<HTMLDivElement>();
  const [selected, setSelected] = useState<SECTIONS | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [hasSeenInstructions, setHasSeenInstructions] = useState(false);

  const isInView = useInView(ref, {
    once: true,
    amount: "some",
  });

  useEffect(() => {
    const seen = checkInstructionsSeen();
    setHasSeenInstructions(seen);
    
    if (toast === "read" && first_time && !seen) {
      showToast("Es necesario que lea las instrucciones de uso antes de utilizar nuestros servicios.", "info");
    }
  }, [first_time, toast]);

  const handleBookClick = useCallback(() => {
    if (first_time && !hasSeenInstructions) {
      setShowInstructions(true);
    }
    handleChange(SECTIONS.BOOK);
  }, [first_time, hasSeenInstructions]);

  const handleChange = useCallback((s: SECTIONS) => {
    setSelected((prev) => {
      return s === prev ? null : s;
    });
  }, []);

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
            handleClick={handleBookClick}
          />
          {first_time && !hasSeenInstructions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-full"
              style={{ pointerEvents: "none" }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: [
                    "0 0 8px rgba(128,0,128,0.3), 0 0 20px rgba(128,0,128,0.6)",
                    "0 0 20px rgba(128,0,128,0.8), 0 0 40px rgba(128,0,128,1), 0 0 60px rgba(128,0,128,0.9)",
                    "0 0 8px rgba(128,0,128,0.3), 0 0 20px rgba(128,0,128,0.6)",
                  ],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier suave tipo "easeInOut" más pronunciado
                }}
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
          {selected === SECTIONS.BOOK && (
            <React.Suspense fallback={<div>Cargando...</div>}>
              <BookInfo first_time={first_time && !hasSeenInstructions} />
            </React.Suspense>
          )}
          {selected === SECTIONS.MESSAGES && (
            <React.Suspense fallback={<div>Cargando...</div>}>
              <MessageInfo />
            </React.Suspense>
          )}
          {selected === SECTIONS.USER && (
            <React.Suspense fallback={<div>Cargando...</div>}>
              <UserInfo />
            </React.Suspense>
          )}
        </motion.div>

        <Icon
          visible={isInView}
          selected={selected === SECTIONS.MESSAGES}
          icon={Message}
          handleClick={() => handleChange(SECTIONS.MESSAGES)}
        />
      </motion.div>

      {showInstructions && (
        <React.Suspense fallback={<div>Cargando...</div>}>
          <FirstTime setSelected={setSelected} />
        </React.Suspense>
      )}
    </section>
  );
}

export default memo(SecondComponent);

/*
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
*/