import clsx from "clsx";
import { motion } from "framer-motion";

interface Props {
  icon: React.FC<{ size: number }>;
  selected: boolean;
  handleClick(): void;
  visible: boolean;
}

export default function Icon({ selected, icon, handleClick, visible }: Props) {
  const CLASS = clsx(
    "shadow-gray-400",
    "sm:px-6 px-3.5 sm:py-4 py-2.5",
    "rounded-2xl",
    "cursor-pointer",
    "transition-all duration-500",

    {
      "shadow-inner": selected,
      "shadow-md": !selected,
    }
  );

  return (
    <motion.div
      className={CLASS}
      onClick={handleClick}
      style={{
        opacity: visible ? "1" : "0.1",
        transform: visible ? `translateX(0)` : `translateX(-20px)`,
        transitionDelay: "0.4s",
      }}
    >
      <i className="stroke-primary">{icon({ size: 36 })}</i>
    </motion.div>
  );
}
