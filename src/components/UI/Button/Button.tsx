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
  full?: boolean;
  size?: "base" | "sm";
}

export default function Button({
  children,
  disabled = false,
  onClick,
  loading,
  type = "button",
  text_loading,
  color = "default",
  full = true,
  size = "base",
}: Props) {
  const CLASS = clsx(
    "border-2 border-gray-200",
    "font-medium",
    "rounded-full",
    "transition-all duration-200",
    "shadow-md",
    "flex justify-center",

    { "hover:shadow-lg": !disabled },
    { "opacity-60": disabled },

    { "bg-white": color === "default", "bg-primary": color === "primary" },

    { "text-black": color === "default", "text-white": color === "primary" },

    { "w-full": full, "w-max": !full },

    { "px-8 py-3": size === "base", "px-5 py-2": size === "sm" },

    { "sm:text-lg text-base": size === "base", "text-sm": size === "sm" }
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
