import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function Info({ children }: Props) {
  const menu = useRef<HTMLDivElement | null>(null);
  const [have, setHave] = useState(false);

  const CLASS = clsx(
    "relative",
    "hide-scrollbar",
    "rounded-xl",
    "w-full max-w-[400px]",
    "h-[430px]",
    "bg-white",
    "shadow-gray-400 shadow-md",
    "flex flex-col" // Agregado para el layout flexbox
  );

  useEffect(() => {
    function check() {
      let value = false;

      if (menu.current) {
        value =
          menu.current.scrollHeight > menu.current.offsetHeight ||
          menu.current.scrollWidth > menu.current.offsetWidth;
      }

      setHave(value);
    }

    window.addEventListener("resize", check);
    check();

    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  function scroll(way: "top" | "bottom") {
    if (menu.current) {
      const posicionActual = menu.current.scrollTop;
      const distance = 100;
      const nuevaPosicion =
        way === "bottom"
          ? posicionActual + distance
          : posicionActual - distance;

      menu.current.scrollTo({ top: nuevaPosicion, behavior: "smooth" });
    }
  }

  return (
    <div className={CLASS}>
      {/* Contenedor superior para la flecha */}
      {have && (
        <div className="h-8 flex items-center justify-center bg-white">
          <button 
            onClick={() => scroll("top")}
            className="hover:bg-gray-100 p-1 rounded-full transition-colors"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 30L25 18L37 30"
                stroke="#000000"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Contenedor principal del contenido */}
      <motion.div
        ref={menu}
        className="overflow-y-auto flex-1 px-6 py-2 flex flex-col items-center"
        animate={{ scale: [0.2, 1] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.25],
        }}
      >
        {children}
      </motion.div>

      {/* Contenedor inferior para la flecha */}
      {have && (
        <div className="h-8 flex items-center justify-center bg-white">
          <button 
            onClick={() => scroll("bottom")}
            className="hover:bg-gray-100 p-1 rounded-full transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36 18L24 30L12 18"
                stroke="#000000"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}