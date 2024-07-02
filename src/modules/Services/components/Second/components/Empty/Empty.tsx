import { motion } from "framer-motion";

export default function Empty() {
  return (
    <motion.figure className="w-full max-w-[650px] md:hidden">
      <img src="/triangle.webp" alt="" className="object-contain w-full" />
    </motion.figure>
  );
}
