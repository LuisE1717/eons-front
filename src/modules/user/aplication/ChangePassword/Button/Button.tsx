import { useEffect, useState } from "react";
import clsx from "clsx";

interface Props {
  text: string;
  question?: string;
  handleSubmit:any;
  loading:boolean;
  loading_text:string;
}

export default function Button({ question, text, loading_text,handleSubmit,loading }: Props) {

  function handleClick() {
    handleSubmit()
  }

  const CLASS = clsx(
    "inline-flex",
    "justify-center",
    "border-2 border-gray-200",
    "px-8 py-3",
    "font-medium",
    "rounded-full",
    "transition-all duration-200",
    "bg-white",
    "w-full",
    "sm:text-lg text-base",
    "shadow-md",

    { "hover:shadow-lg": !loading },
  );

  return (
    <div className="flex flex-col items-center w-full">
      <p className="mb-2 text-sm text-gray-400">{question}</p>

      <button disabled={loading} onClick={handleClick} className={CLASS}>
      {loading &&
            <svg className="animate-spin -ml-1 mr-4 sm:mt-0 md:mt-1 md:h-5 md:w-5 h-4 w-4 text-fuchsia-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            }
            <span>{loading?loading_text:text}</span>
      </button>
    </div>
  );
}
