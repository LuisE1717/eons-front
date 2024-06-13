import { useRef } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Info({ children }: Props) {
  const menu = useRef(null)
  const getUp = useRef(null)
  const getBottom = useRef(null)


  return (
    <div ref={menu} className="
    sm:max-h-[1000px] 
    max-h-[400px]
    hide-scrollbar
    overflow-auto
    rounded-xl w-full max-w-[650px] flex-col flex sm:py-12 py-4 sm:px-20 px-8 bg-white shadow-gray-400 shadow-md">
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
    </div>
  );
}
