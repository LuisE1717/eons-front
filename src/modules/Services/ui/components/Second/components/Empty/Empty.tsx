import { motion } from "framer-motion";

export default function Empty() {
  return (
    <motion.figure
      className="w-full max-w-[650px] md:hidden"
      animate={{ scale: [0.2, 1] }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.25],
      }}
    >
      <img src="/triangle.webp" alt="" className="object-contain w-full" />
    </motion.figure>
  );
}
