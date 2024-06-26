import { motion } from "framer-motion";

interface Props {
  visible: boolean;
}

export default function Empty({ visible }: Props) {
  return (
    <motion.figure
      style={{
        width: "100%",
        maxWidth: `500px`,
        transform: visible ? "scale(1)" : "scale(0.1)",
      }}
      className="transition-all duration-700"
    >
      <img src="/triangle.webp" alt="" className="object-contain w-full" />
    </motion.figure>
  );
}
