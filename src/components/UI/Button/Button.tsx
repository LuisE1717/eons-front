import clsx from "clsx";
import Loading from "./components/Loading/Loading";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit";
  loading: boolean;
  text_loading?: string;
  color?: "default" | "primary";
  full?: boolean;
  size?: "base" | "sm" | "xs";
  shadow?: "bottom" | "default";
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
  shadow = "default",
}: Props) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
  };

  const CLASS = clsx(
    "rounded-full",
    "transition-all duration-500",
    "flex justify-center",
    "bg-transparent",
    "shadow-lg",
    "text-lg",
    "py-4 px-10",

    { "opacity-60": disabled },
    { "w-full": full, "w-max": !full }
  );

  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={handleClick}
      className={CLASS}
    >
      {loading ? <Loading text_loading={text_loading} /> : children}
    </button>
  );
}