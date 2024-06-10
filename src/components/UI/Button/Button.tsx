import clsx from "clsx";
import Loading from "./components/Loading/Loading";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  loading: boolean;
}

export default function Button({
  children,
  disabled = false,
  onClick,
  loading,
  type = "button",
}: Props) {
  const CLASS = clsx(
    "border-2 border-gray-200",
    "px-8 py-3",
    "font-medium",
    "rounded-full",
    "transition-all duration-200",
    "bg-white",
    "w-full",
    "sm:text-lg text-base",
    "shadow-md",
    "flex justify-center",

    { "hover:shadow-lg": !disabled },
    { "opacity-60": disabled }
  );

  return (
    <button
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      className={CLASS}
    >
      {loading ? <Loading /> : children}
    </button>
  );
}
