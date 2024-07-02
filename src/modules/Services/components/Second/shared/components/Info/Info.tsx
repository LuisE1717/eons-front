import clsx from "clsx";
import { useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function Info({ children }: Props) {
  const menu = useRef(null);

  const CLASS = clsx(
    "hide-scrollbar overflow-auto",
    "rounded-xl",
    "w-full max-w-[400px]",
    "flex-col flex",
    "px-6 py-4",
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
      {children}
    </motion.div>
  );
}
