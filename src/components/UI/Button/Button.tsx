import clsx from "clsx";
import Loading from "./components/Loading/Loading";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  loading: boolean;
  text_loading?: string;
  color?: "default" | "primary";
}

export default function Button({
  children,
  disabled = false,
  onClick,
  loading,
  type = "button",
  text_loading,
  color = "default",
}: Props) {
  const CLASS = clsx(
    "border-2 border-gray-200",
    "px-8 py-3",
    "font-medium",
    "rounded-full",
    "transition-all duration-200",
    "w-full",
    "sm:text-lg text-base",
    "shadow-md",
    "flex justify-center",

    { "hover:shadow-lg": !disabled },
    { "opacity-60": disabled },

    { "bg-white": color === "default", "bg-primary": color === "primary" },

    { "text-black": color === "default", "text-white": color === "primary" }
  );

  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={CLASS}
    >
      {loading ? <Loading text_loading={text_loading} /> : children}
    </button>
  );
}
