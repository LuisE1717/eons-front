import clsx from "clsx";
import { useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function Info({ children }: Props) {
  const menu = useRef(null);
  const getUp = useRef(null);
  const getBottom = useRef(null);

  const CLASS = clsx(
    "sm:max-h-[1000px] max-h-[400px]",
    "hide-scrollbar overflow-auto",
    "rounded-xl",
    "w-full max-w-[650px]",
    "flex-col flex",
    "sm:py-12 py-4 sm:px-20 px-8",
    "bg-white",
    "shadow-gray-400 shadow-md"
  );

  return (
    <motion.div
      ref={menu}
      className={CLASS}
      animate={{ scale: [0.2, 1] }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.25],
      }}
    >
      {/* <button ref={getUp}
      onMouseOver={()=>{
        console.log(menu)
        menu.current?.scrollTo({ top: menu.current?.scrollHeight, behavior: "smooth" });
      }}
      id="scrollButton" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Scroll Up
      </button> */}
      {children}
      {/* <button
       ref={getBottom}
       id="scrollButton" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Scroll Down
      </button> */}
    </motion.div>
  );
}
