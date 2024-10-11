import React from "react";

export default function Button({handleCustomPayment,loading}) {
  return (
    <button
      disabled={loading}
      type="button"
      className="transition-all duration-200 hover:translate-x-1.5"
      onClick={handleCustomPayment}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 12L31 24L19 36"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
